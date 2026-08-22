import { Request, Response, NextFunction } from 'express';
import { LeaveService } from '../services/leave.service';
import { LeaveApprovalStatus } from '@prisma/client';

export const getAllLeaves = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ success: false, message: 'Company ID missing' });

    const leaves = await LeaveService.getAllLeaveRequests(companyId);
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    next(error);
  }
};

export const getMyLeaves = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employeeId = req.user?.employeeId;
    if (!employeeId) return res.status(401).json({ success: false, message: 'Employee ID missing' });

    const leaves = await LeaveService.getMyLeaveRequests(employeeId);
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    next(error);
  }
};

export const getMyLeaveBalances = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employeeId = req.user?.employeeId;
    if (!employeeId) return res.status(401).json({ success: false, message: 'Employee ID missing' });

    const year = new Date().getFullYear();
    const balances = await LeaveService.getLeaveBalances(employeeId, year);
    res.status(200).json({ success: true, data: balances });
  } catch (error) {
    next(error);
  }
};

export const createLeaveRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employeeId = req.user?.employeeId;
    if (!employeeId) return res.status(401).json({ success: false, message: 'Employee ID missing' });

    const leave = await LeaveService.createLeaveRequest(employeeId, req.body);
    res.status(201).json({ success: true, data: leave });
  } catch (error) {
    next(error);
  }
};

export const updateLeaveStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const approverId = req.user?.employeeId;
    if (!approverId) return res.status(401).json({ success: false, message: 'Approver ID missing' });

    const { status } = req.body;
    if (status !== 'APPROVED' && status !== 'REJECTED') {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const leave = await LeaveService.updateLeaveRequestStatus(
      req.params.id, 
      approverId, 
      status as LeaveApprovalStatus
    );
    
    res.status(200).json({ success: true, data: leave });
  } catch (error) {
    next(error);
  }
};
