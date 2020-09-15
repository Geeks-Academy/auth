import { Express, default as express } from 'express';
import cors from 'cors';
import routes from './routes';
import passport from 'passport';

require('./passport');

const initialize = (): Express => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(routes());

  app.use(passport.initialize());
  app.use(passport.session());

  return app;
};

export default initialize;
