import { Router } from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee } from '../controllers/employee.controller';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorize';

const router = Router();

// Only ADMIN can create employees
router.post('/', authenticate, authorize('ADMIN'), createEmployee);

// Everyone authenticated can access these, but controller logic restricts access
router.get('/', authenticate, getAllEmployees);
router.get('/:id', authenticate, getEmployeeById);
router.put('/:id', authenticate, updateEmployee);

export default router;
