const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/User');
const config = require('./index');

passport.use(new GithubStrategy(config.githubOAuth, 
  (accessToken, refreshToken, profile, cb) => {
    User.findOneOrCreate(accessToken, profile, (err, user) => {
      if(err) return cb(err);
      cb(user);
    });
}))