import { Express } from 'express';
import healthRoutes from './health';
import authRoutes from './auth';

export default (app: Express): Express => {
  app.use('/health', healthRoutes);
  app.use('/auth', authRoutes);

  return app;
};
