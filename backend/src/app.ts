import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { requestId } from './middleware/requestId';
import { apiRateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import routes from './routes';

const app = express();

// 1. Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: config.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// 2. Parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

// 3. Request Tracking & Logging
app.use(requestId);

// 4. Rate Limiting (Basic protection for all routes)
app.use('/api', apiRateLimiter);

// 5. Routes
app.use('/api/v1', routes);

// 6. Not Found & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
