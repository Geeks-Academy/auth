const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/User');
const config = require('./index');

passport.use(new GithubStrategy(config.githubOAuth, 
  (accessToken, refreshToken, profile, cb) => {
    User.findOneOrCreate(accessToken, profile, (err, user) => {
      if(err) return cb(err);
      cb(null, user);
    });
}))

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((userID, done) => {
  User.findOne({ id: userID }, (err, user) => {
    if(err) return done(err);
    done(null, user);
  })
});