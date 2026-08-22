import { Router } from 'express';
import { getDailyAttendance, getMyMonthlyAttendance } from '../controllers/attendance.controller';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorize';

const router = Router();

// Only ADMIN/COMPANY can view the full daily roster
router.get('/', authenticate, authorize('ADMIN', 'COMPANY'), getDailyAttendance);

// Any authenticated employee can view their own monthly attendance
router.get('/me', authenticate, getMyMonthlyAttendance);

export default router;
