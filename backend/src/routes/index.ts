import { Router } from 'express';
import { prisma } from '../config/prisma';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running correctly',
  });
});

router.get('/health/database', async (req, res, next) => {
  try {
    // A simple query to check the database connection
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      success: true,
      message: 'Database is connected',
    });
  } catch (error) {
    next(error);
  }
});

import authRoutes from './auth.routes';
import employeeRoutes from './employee.routes';
import attendanceRoutes from './attendance.routes';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorize';

// Feature routes will be registered here in the future
router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);
router.use('/attendance', attendanceRoutes);

// Test routes for RBAC
router.get('/test/public', (req, res) => {
  res.json({ message: 'Public endpoint' });
});

router.get('/test/protected', authenticate, (req, res) => {
  res.json({ message: 'Authenticated endpoint', user: req.user });
});

router.get('/test/admin-only', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ message: 'Admin endpoint accepted', user: req.user });
});

router.get('/test/employee-only', authenticate, authorize('EMPLOYEE'), (req, res) => {
  res.json({ message: 'Employee endpoint accepted', user: req.user });
});

export default router;
