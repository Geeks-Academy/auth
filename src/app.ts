import { Express, default as express } from 'express';
import cors from 'cors';
import routes from './routes';

export default function initialize(app: Express): Express {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.use(routes());

  return app;
}
