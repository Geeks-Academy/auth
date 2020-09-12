import passport from 'passport';
import GithubStrategy from './githubStrategy';
import User from '../models/user';

passport.use(GithubStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findOne({ id });

  if (user) done(null, user);

  done('User not found');
});
