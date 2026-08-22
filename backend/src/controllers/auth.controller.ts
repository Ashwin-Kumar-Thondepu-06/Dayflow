import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { uploadFileToS3 } from '../utils/s3';

const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let logoUrl: string | undefined;
    
    if (req.file) {
      try {
        logoUrl = await uploadFileToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
      } catch (uploadError) {
        console.error('Failed to upload logo to S3/Minio, falling back to undefined:', uploadError);
        // Continue without a logo if Minio is not configured or throws an error
      }
    }
    
    const user = await AuthService.register({
      ...req.body,
      logoUrl,
    });
    
    // Auto-login the user immediately after registration
    const { accessToken, refreshToken } = await AuthService.login({ email: req.body.email, password: req.body.password });
    setCookies(res, accessToken, refreshToken);
    
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, accessToken, refreshToken } = await AuthService.login(req.body);
    setCookies(res, accessToken, refreshToken);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    const { accessToken, refreshToken } = await AuthService.refresh(token);
    setCookies(res, accessToken, refreshToken);
    res.status(200).json({ success: true, message: 'Tokens refreshed' });
  } catch (error) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Just clear cookies as basic logout
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    await AuthService.verifyEmail(token);
    res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthService.forgotPassword(req.body.email);
    res.json({ success: true, message: 'If email exists, a reset link will be sent.' });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { currentPassword, newPassword } = req.body;
    await AuthService.changePassword(userId, currentPassword, newPassword);
    
    res.json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(200).json({ success: false, message: 'Not authenticated' });
    }

    // Usually we would fetch fresh user data here, but for now just returning the token payload is fine or fetch from DB
    const { prisma } = await import('../config/prisma');
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        companyId: true,
        forcePasswordChange: true,
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, newPassword } = req.body;
    await AuthService.resetPassword(token, newPassword);
    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
};
