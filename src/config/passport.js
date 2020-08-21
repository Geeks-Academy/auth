const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/User');
const config = require('./index');

passport.use(new GithubStrategy(config.githubOAuth, 
  (accessToken, refreshToken, profile, cb) => {
    User.findById(profile.id, (err, user) => {
      if(!user) {
        let user = new User({
          _id: profile.id,
          username: profile.displayName,
          token: accessToken
        });

        user.save();
      } else {
        cb(err, user);
      }
    })
}))