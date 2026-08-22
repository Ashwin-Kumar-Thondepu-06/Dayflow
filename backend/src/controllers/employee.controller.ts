import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from '../services/employee.service';

export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminCompanyId = req.user?.companyId;
    if (!adminCompanyId) {
      return res.status(401).json({ success: false, message: 'Admin company missing' });
    }

    const employee = await EmployeeService.createEmployee(adminCompanyId, req.body);
    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};
