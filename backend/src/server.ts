import app from './app';
import { config } from './config';
import { prisma } from './config/prisma';
import { logger } from './utils/logger';

const startServer = () => {
  const server = app.listen(config.PORT, () => {
    logger.info(`Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`);
  });

  // Graceful Shutdown implementation
  const gracefulShutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Shutting down gracefully...`);
    
    server.close(async () => {
      logger.info('HTTP server closed.');
      
      try {
        await prisma.$disconnect();
        logger.info('Prisma database connection closed.');
        process.exit(0);
      } catch (err) {
        logger.error('Error during database disconnection', err);
        process.exit(1);
      }
    });

    // Force close if it takes too long (e.g. 10s)
    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

startServer();
