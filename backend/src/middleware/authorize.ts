import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
import { ForbiddenError, UnauthorizedError } from '../utils/AppError';

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (!allowedRoles.includes(user.role as UserRole)) {
      return next(new ForbiddenError('You do not have permission to perform this action'));
    }

    next();
  };
};
