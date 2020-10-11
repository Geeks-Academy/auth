import { Express } from 'express';
// import passport, { Profile } from 'passport';
// import GoogleStrategy from 'passport-google-oauth';
// import * as userController from '../controllers/user.controller'
// import { GoogleUser } from '../models/user/user.model';

import AWS from 'aws-sdk';
const ssm = new AWS.SSM();

function getParameterFromSystemManager() {
  // Fetches a parameter called REPO_NAME from SSM parameter store.
  // Requires a policy for SSM:GetParameter on the parameter being read.
  var params = {
      Name: '/programmersonly/auth/GOOGLE_CLIENT_ID',
      /* required */
      WithDecryption: /*true ||*/ false
  };
  console.log('in the getParameterFromSystemManager function')
  var request = ssm.getParameter(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data.Parameter.Value); // successful response
      
  });
}

const AWSParams = getParameterFromSystemManager()
console.log(AWSParams)

const googleRoute = (app: Express): void => {

  // let userProfile: GoogleUser;

  // app.use(passport.initialize());
  // app.use(passport.session());

  // passport.serializeUser(function(user, cb) {
  //   cb(null, user);
  // });

  // passport.deserializeUser(function(obj, cb) {
  //   cb(null, obj);
  // });

  // console.log(process.env)
  // const GoogleStrategyOAuth2Strategy = GoogleStrategy.OAuth2Strategy;
  // const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
  // const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
  // const GOOGLE_CALLBACKURL = process.env.GOOGLE_CALLBACKURL as string;
  // passport.use(new GoogleStrategyOAuth2Strategy({
  //     clientID: GOOGLE_CLIENT_ID,
  //     clientSecret: GOOGLE_CLIENT_SECRET,
  //     callbackURL: GOOGLE_CALLBACKURL
  //   },
  //   (accessToken: string, 
  //     refreshToken: string, 
  //     profile: Profile, 
  //     done: (info: null, userProfile: GoogleUser
  //     ) => void) => {

  //       userProfile = profile as GoogleUser;
  //       return done(null, userProfile);
  //   }
  // ));
  
  // app.get('/auth/google', 
  //   passport.authenticate('google', { scope : ['profile', 'email'] }));
  
  // app.get('/auth/google/callback', 
  //   passport.authenticate('google', { failureRedirect: '/error' }),
  //   (req, res) => userController.loginUserViaGoogle(userProfile, req, res)  );

};

export default googleRoute;
