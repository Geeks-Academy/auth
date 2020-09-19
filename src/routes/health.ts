import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import HealthCheckController from '../controllers/HealthCheckController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const healthCheckController = new HealthCheckController(mongoose.connection);
  res.json({
    status: healthCheckController.getServiceStatus(),
  });
});

export default router;
