import { Request, Response, NextFunction } from 'express';
import { AttendanceService } from '../services/attendance.service';

export const getDailyAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ success: false, message: 'Company ID missing' });

    // Ensure date string is provided
    const dateStr = req.query.date as string;
    if (!dateStr) {
      return res.status(400).json({ success: false, message: 'Date parameter is required' });
    }

    const records = await AttendanceService.getDailyAttendance(companyId, dateStr);
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

export const getMyMonthlyAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = req.user?.companyId;
    const employeeId = req.user?.employeeId;
    
    if (!companyId || !employeeId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const year = parseInt(req.query.year as string);
    const month = parseInt(req.query.month as string);

    if (isNaN(year) || isNaN(month)) {
      return res.status(400).json({ success: false, message: 'Valid year and month parameters required' });
    }

    const records = await AttendanceService.getMonthlyAttendance(companyId, employeeId, year, month);
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};
