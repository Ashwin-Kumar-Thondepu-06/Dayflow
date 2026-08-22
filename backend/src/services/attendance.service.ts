import { prisma } from '../config/prisma';
import { BadRequestError } from '../utils/AppError';

export class AttendanceService {
  // Admin View: Get attendance for all employees in a company on a specific date
  static async getDailyAttendance(companyId: string, dateStr: string) {
    const targetDate = new Date(dateStr);
    targetDate.setUTCHours(0, 0, 0, 0);

    const nextDate = new Date(targetDate);
    nextDate.setDate(targetDate.getDate() + 1);

    // Fetch all employees in the company
    const employees = await prisma.employee.findMany({
      where: { companyId },
      include: {
        attendances: {
          where: {
            date: {
              gte: targetDate,
              lt: nextDate,
            }
          }
        }
      },
      orderBy: { firstName: 'asc' }
    });

    return employees.map(emp => {
      const record = emp.attendances[0];
      return {
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`.trim(),
        date: targetDate.toISOString(),
        checkIn: record?.checkIn || null,
        checkOut: record?.checkOut || null,
        status: record?.status || 'ABSENT',
        workMinutes: record?.workMinutes || 0,
        overtimeMinutes: record?.overtimeMinutes || 0
      };
    });
  }

  // Employee View: Get attendance for a specific employee in a specific month
  static async getMonthlyAttendance(companyId: string, employeeId: string, year: number, month: number) {
    // Validate employee belongs to company
    const employee = await prisma.employee.findFirst({
      where: { id: employeeId, companyId }
    });

    if (!employee) {
      throw new BadRequestError('Employee not found');
    }

    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 1));

    const records = await prisma.attendance.findMany({
      where: {
        employeeId,
        date: {
          gte: startDate,
          lt: endDate
        }
      },
      orderBy: { date: 'asc' }
    });

    return records;
  }
}
