import { Express, default as express } from 'express';
import cors from 'cors';

export default function initialize(app: Express): Express {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors);

  return app;
}
