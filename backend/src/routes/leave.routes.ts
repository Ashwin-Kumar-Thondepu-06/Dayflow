import { Router } from 'express';
import { 
  getAllLeaves, 
  getMyLeaves, 
  getMyLeaveBalances, 
  createLeaveRequest, 
  updateLeaveStatus 
} from '../controllers/leave.controller';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorize';

const router = Router();

// Employee specific routes
router.get('/me', authenticate, getMyLeaves);
router.get('/me/balance', authenticate, getMyLeaveBalances);
router.post('/', authenticate, createLeaveRequest);

// Admin/HR specific routes
router.get('/', authenticate, authorize('ADMIN', 'COMPANY'), getAllLeaves);
router.put('/:id/status', authenticate, authorize('ADMIN', 'COMPANY'), updateLeaveStatus);

export default router;
