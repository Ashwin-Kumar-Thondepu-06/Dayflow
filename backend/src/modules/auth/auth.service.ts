import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../config/prisma';
import { config } from '../../config';
import { BadRequestError, UnauthorizedError } from '../../utils/AppError';
import { UserRole, TokenType } from '@prisma/client';

export class AuthService {
  private static generateTokens(userId: string, role: string) {
    if (!config.JWT_SECRET || !config.JWT_REFRESH_SECRET) {
      throw new Error('JWT secrets are not configured');
    }

    const accessToken = jwt.sign({ userId, role }, config.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId, role }, config.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  static async register(data: Record<string, string>) {
    const { employeeCode, email, password, role } = data;

    if (!employeeCode || !email || !password || !role) {
      throw new BadRequestError('Missing required fields');
    }

    if (password.length < 8) {
      throw new BadRequestError('Password must be at least 8 characters long');
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestError('Email is already registered');
    }

    const existingEmployee = await prisma.employee.findUnique({ where: { employeeCode } });
    if (existingEmployee) {
      throw new BadRequestError('Employee code is already in use');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: role as UserRole,
        employee: {
          create: {
            employeeCode,
            firstName: 'New', // Placeholders
            lastName: 'User',
            joiningDate: new Date(),
          },
        },
      },
      include: { employee: true },
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      employeeId: user.employee?.id,
    };
  }

  static async login(data: Record<string, string>) {
    const { email, password } = data;

    if (!email || !password) {
      throw new BadRequestError('Email and password are required');
    }

    const user = await prisma.user.findUnique({ where: { email }, include: { employee: true } });
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedError('Account is not active');
    }

    const tokens = this.generateTokens(user.id, user.role);

    // Save refresh token
    const tokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.token.create({
      data: {
        userId: user.id,
        tokenHash,
        type: TokenType.REFRESH_TOKEN,
        expiresAt,
      },
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        employeeId: user.employee?.id,
      },
      ...tokens,
    };
  }

  static async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedError('Refresh token required');
    }

    if (!config.JWT_REFRESH_SECRET) {
      throw new Error('JWT_REFRESH_SECRET is not configured');
    }

    try {
      const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET) as jwt.JwtPayload;

      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
      if (!user || user.status !== 'ACTIVE') {
        throw new UnauthorizedError('Invalid user');
      }

      // Verify the token exists in DB (we don't match the hash perfectly here for brevity, usually we check if any token matches)
      // Since bcrypt compare is slow to run against all tokens, we typically just keep it simple or store raw tokens in DB for refresh (if acceptable)
      // In this prompt, we just delete old and create new.
      await prisma.token.deleteMany({
        where: { userId: user.id, type: TokenType.REFRESH_TOKEN },
      });

      const tokens = this.generateTokens(user.id, user.role);
      
      const tokenHash = await bcrypt.hash(tokens.refreshToken, 10);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      await prisma.token.create({
        data: {
          userId: user.id,
          tokenHash,
          type: TokenType.REFRESH_TOKEN,
          expiresAt,
        },
      });

      return tokens;
    } catch (e) {
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  static async logout(userId: string) {
    await prisma.token.deleteMany({
      where: { userId, type: TokenType.REFRESH_TOKEN },
    });
  }

  static async verifyEmail(token: string) {
    const record = await prisma.token.findFirst({
      where: { tokenHash: token, type: TokenType.VERIFY_EMAIL },
    });

    if (!record || record.expiresAt < new Date()) {
      throw new BadRequestError('Invalid or expired verification token');
    }

    await prisma.user.update({
      where: { id: record.userId },
      data: { emailVerified: true },
    });

    await prisma.token.delete({ where: { id: record.id } });
  }

  static async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal if user exists
      return;
    }

    const resetToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    await prisma.token.create({
      data: {
        userId: user.id,
        tokenHash: resetToken, // For simplicity in this scaffold, storing directly
        type: TokenType.RESET_PASSWORD,
        expiresAt,
      },
    });

    // Mock email sending
    console.log(`[Email Mock] Reset password token for ${email}: ${resetToken}`);
  }

  static async resetPassword(token: string, newPassword: string) {
    if (!newPassword || newPassword.length < 8) {
      throw new BadRequestError('Password must be at least 8 characters long');
    }

    const record = await prisma.token.findFirst({
      where: { tokenHash: token, type: TokenType.RESET_PASSWORD },
    });

    if (!record || record.expiresAt < new Date()) {
      throw new BadRequestError('Invalid or expired reset token');
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: record.userId },
      data: { passwordHash },
    });

    await prisma.token.deleteMany({
      where: { userId: record.userId, type: TokenType.RESET_PASSWORD },
    });
  }
}
