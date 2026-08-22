import { prisma } from '../config/prisma';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../utils/AppError';
import { generateEmployeeCode, generateRandomPassword } from '../utils/generateId';
import { sendCredentialsEmail } from '../utils/mailer';
import { UserRole } from '@prisma/client';

export class EmployeeService {
  static async createEmployee(
    adminCompanyId: string,
    data: Record<string, string>
  ) {
    const { firstName, lastName, email, phone, departmentId, designationId } = data;

    if (!firstName || !email) {
      throw new BadRequestError('First name and email are required');
    }

    const company = await prisma.company.findUnique({ where: { id: adminCompanyId } });
    if (!company) {
      throw new BadRequestError('Admin company not found');
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestError('Email is already registered');
    }

    // Auto-generate employee code
    const employeeCode = await generateEmployeeCode(company.name, firstName, lastName);
    
    // Auto-generate random password
    const plaintextPassword = generateRandomPassword();
    const passwordHash = await bcrypt.hash(plaintextPassword, 10);

    const user = await prisma.$transaction(async (tx) => {
      return await tx.user.create({
        data: {
          email,
          passwordHash,
          role: UserRole.EMPLOYEE,
          companyId: company.id,
          forcePasswordChange: true, // Force change on first login
          employee: {
            create: {
              companyId: company.id,
              employeeCode,
              firstName,
              lastName: lastName || '',
              phone: phone || null,
              joiningDate: new Date(),
              departmentId: departmentId || null,
              designationId: designationId || null,
            },
          },
        },
        include: { employee: true, company: true },
      });
    });

    // Send the email with credentials asynchronously
    sendCredentialsEmail(email, firstName, employeeCode, plaintextPassword);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      employeeId: user.employee?.id,
      employeeCode: user.employee?.employeeCode,
      generatedPassword: plaintextPassword, // Returned ONLY once so admin can share it
    };
  }

  static async getAllEmployees(companyId: string) {
    return prisma.employee.findMany({
      where: { companyId },
      include: {
        user: { select: { email: true, status: true, role: true } },
        department: true,
        designation: true,
        manager: { select: { firstName: true, lastName: true } }
      },
      orderBy: { firstName: 'asc' }
    });
  }

  static async getEmployeeById(companyId: string, id: string) {
    const employee = await prisma.employee.findFirst({
      where: { id, companyId },
      include: {
        user: { select: { email: true, status: true, role: true } },
        department: true,
        designation: true,
        manager: { select: { id: true, firstName: true, lastName: true, employeeCode: true } },
        subordinates: { select: { id: true, firstName: true, lastName: true, employeeCode: true, designation: true } }
      }
    });

    if (!employee) {
      throw new BadRequestError('Employee not found');
    }
    return employee;
  }

  static async updateEmployee(companyId: string, id: string, data: Record<string, any>) {
    // Only allow updating specific fields
    const { firstName, lastName, phone, dateOfBirth, departmentId, designationId, managerId } = data;
    
    // Validate if employee exists
    await this.getEmployeeById(companyId, id);

    return prisma.employee.update({
      where: { id },
      data: {
        firstName,
        lastName,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        departmentId,
        designationId,
        managerId
      },
      include: {
        user: { select: { email: true } },
        department: true,
        designation: true
      }
    });
  }
}
