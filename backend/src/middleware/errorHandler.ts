import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { config } from '../config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const reqId = req.headers['x-request-id'] || 'unknown';

  let statusCode = 500;
  let code = 'INTERNAL_SERVER_ERROR';
  let message = 'An unexpected error occurred.';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    code = err.code;
    message = err.message;
  } else {
    // Log unexpected errors
    logger.error('Unhandled Error', err, { requestId: reqId });
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      ...(config.NODE_ENV === 'development' && !(err instanceof AppError) ? { stack: err.stack } : {}),
    },
    requestId: reqId,
  });
};
