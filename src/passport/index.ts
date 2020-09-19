import passport from 'passport';
import GithubStrategy from './githubStrategy';
import { IUser } from '../models/User.d';
import { User } from '../models/User';

passport.use(GithubStrategy());

passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findOne({ id });

  if (user) done(null, user);

  done('User not found');
});
