import { Router } from 'express';
import { createEmployee } from '../controllers/employee.controller';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorize';

const router = Router();

// Only ADMIN can create employees
router.post('/', authenticate, authorize('ADMIN'), createEmployee);

export default router;
