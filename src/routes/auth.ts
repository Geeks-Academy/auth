import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { OAuthStrategy, Profile, VerifyFunction } from "passport-google-oauth";
import { User } from "../models/User";

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
      consumerKey: "GOOGLE_CONSUMER_KEY",
      consumerSecret: "GOOGLE_CONSUMER_SECRET",
      callbackURL: "/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
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
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    res.redirect("/");
  }
);

export default router;
