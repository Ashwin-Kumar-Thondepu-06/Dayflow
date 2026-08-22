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

import authRoutes from '../modules/auth/auth.routes';

// Feature routes will be registered here in the future
router.use('/auth', authRoutes);

export default router;
