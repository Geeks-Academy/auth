import { Express } from 'express';
import passport, { Profile } from 'passport';
import GithubStrategy from 'passport-github';
import * as userController from '../controllers/user.controller'
import { GithubUser } from '../models/user/user.model';

const githubRoute = (app: Express): void => {

let userProfile: GithubUser;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const GithubStrategyOAuthStrategy = GithubStrategy.Strategy;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;
const GITHUB_CALLBACKURL = process.env.GITHUB_CALLBACKURL as string;

passport.use(new GithubStrategyOAuthStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACKURL
  },
  (accessToken: string, 
    refreshToken: string, 
    profile: Profile, 
    done: (info: null, userProfile: GithubUser
    ) => void) => {

      userProfile = profile as GithubUser;
      return done(null, userProfile);
  }
));
 
app.get('/auth/github', passport.authenticate('github', { scope : ['profile', 'email'] }));
 
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/error' }),
  (req, res) => userController.loginUserViaGithub(userProfile, req, res)  );

};

export default githubRoute;
