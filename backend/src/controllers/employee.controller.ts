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

export const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ success: false, message: 'Company ID missing' });

    const employees = await EmployeeService.getAllEmployees(companyId);
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ success: false, message: 'Company ID missing' });

    // Admins can see anyone, employees can see themselves
    if (req.user.role !== 'COMPANY' && req.user.role !== 'ADMIN' && req.user.employeeId !== req.params.id) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const employee = await EmployeeService.getEmployeeById(companyId, req.params.id);
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ success: false, message: 'Company ID missing' });

    // Admins can update anyone, employees can update themselves
    if (req.user.role !== 'COMPANY' && req.user.role !== 'ADMIN' && req.user.employeeId !== req.params.id) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const employee = await EmployeeService.updateEmployee(companyId, req.params.id, req.body);
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};
