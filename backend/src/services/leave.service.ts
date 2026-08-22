import { prisma } from '../config/prisma';
import { BadRequestError } from '../utils/AppError';
import { LeaveRequestStatus, LeaveApprovalStatus } from '@prisma/client';

export class LeaveService {
  
  static async getAllLeaveRequests(companyId: string) {
    return prisma.leaveRequest.findMany({
      where: {
        employee: { companyId }
      },
      include: {
        employee: { select: { id: true, firstName: true, lastName: true } },
        leaveType: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getMyLeaveRequests(employeeId: string) {
    return prisma.leaveRequest.findMany({
      where: { employeeId },
      include: { leaveType: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getLeaveBalances(employeeId: string, year: number) {
    return prisma.leaveBalance.findMany({
      where: { employeeId, year },
      include: { leaveType: true }
    });
  }

  static async createLeaveRequest(employeeId: string, data: { leaveTypeId: string, startDate: string, endDate: string, totalDays: number, remarks?: string }) {
    const { leaveTypeId, startDate, endDate, totalDays, remarks } = data;
    
    if (!leaveTypeId || !startDate || !endDate || !totalDays) {
      throw new BadRequestError('Missing required fields for leave request');
    }

    // Basic validation
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      throw new BadRequestError('End date cannot be before start date');
    }

    // In a real app, we'd also check if they have enough balance here

    return prisma.leaveRequest.create({
      data: {
        employeeId,
        leaveTypeId,
        startDate: start,
        endDate: end,
        totalDays,
        remarks,
        status: LeaveRequestStatus.PENDING
      },
      include: { leaveType: true }
    });
  }

  static async updateLeaveRequestStatus(requestId: string, approverId: string, status: LeaveApprovalStatus) {
    const request = await prisma.leaveRequest.findUnique({ where: { id: requestId }});
    if (!request) {
      throw new BadRequestError('Leave request not found');
    }

    if (request.status !== LeaveRequestStatus.PENDING) {
      throw new BadRequestError('Can only approve/reject pending requests');
    }

    // Transaction to update request and create approval record
    const result = await prisma.$transaction(async (tx) => {
      
      const newReqStatus = status === LeaveApprovalStatus.APPROVED ? LeaveRequestStatus.APPROVED : LeaveRequestStatus.REJECTED;

      const updatedRequest = await tx.leaveRequest.update({
        where: { id: requestId },
        data: { status: newReqStatus },
        include: { leaveType: true, employee: { select: { firstName: true, lastName: true } } }
      });

      await tx.leaveApproval.create({
        data: {
          leaveRequestId: requestId,
          approverId: approverId,
          status: status,
          approvedAt: new Date()
        }
      });

      // If approved, we would ideally deduct from LeaveBalance here
      // For this implementation, we assume that happens in a background job or via a trigger,
      // or we can do a simple deduction if balance exists.

      return updatedRequest;
    });

    return result;
  }
}
