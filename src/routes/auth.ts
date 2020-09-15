import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { OAuthStrategy, Profile, VerifyFunction } from "passport-google-oauth";

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
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyFunction
    ) => {
      return done(null, profile);
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
