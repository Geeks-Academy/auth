import { Router, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import passport from "passport";
import { OAuthStrategy, VerifyFunction } from "passport-google-oauth";
import { IProfile } from "../models/User.d";
import { User } from "../models/User";

dotenv.config();

const { consumerKey, consumerSecret, callbackURL } = process.env as {
  [key: string]: string;
};

const router = Router();

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

passport.use(
  new OAuthStrategy(
    {
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
      callbackURL: callbackURL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: IProfile,
      done: VerifyFunction
    ) => {
      try {
        const user = await User.findOneOrCreate(accessToken, profile);
        return done(null, user);
      } catch (error) {
        throw error;
      }
    }
  )
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req: Request, res: Response) => {
    res.redirect("/");
  }
);

export default router;
