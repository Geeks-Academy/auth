import { Express, default as express } from 'express';
import cors from 'cors';
import passport from 'passport';
import routes from './routes';

export default function initialize(app: Express): Express {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.use(routes());

  app.use(passport.initialize());
  app.use(passport.session());

  return app;
}
