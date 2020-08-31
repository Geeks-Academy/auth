import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/', passport.authenticate('github'));

router.get(
  '/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

export default router;
