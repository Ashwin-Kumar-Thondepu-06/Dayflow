import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
import { ForbiddenError, UnauthorizedError } from '../utils/AppError';

/**
 * Ensures that the authenticated user is either an ADMIN
 * or the owner of the resource being requested.
 * 
 * @param getResourceId - A function to extract the owner's employeeId/userId from the request (e.g., from req.params.id)
 */
export const checkOwnership = (getResourceOwnerId: (req: Request) => string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    // Admins can access any resource
    if (user.role === UserRole.ADMIN) {
      return next();
    }

    const resourceOwnerId = getResourceOwnerId(req);

    // Employees can only access their own resources
    if (user.employeeId !== resourceOwnerId && user.id !== resourceOwnerId) {
      return next(new ForbiddenError('Access denied: You can only access your own resources'));
    }

    next();
  };
};
