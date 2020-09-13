import { Router } from 'express';
import healthRoutes from './health';
import authRoutes from './auth';

export default (): Router => {
  const app = Router();

  app.use('/health', healthRoutes);
  app.use('/auth', authRoutes);

  return app;
};
