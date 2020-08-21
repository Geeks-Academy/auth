const router = require('express').Router();
const passport = require('passport');

router.get('/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/')
)

router.get('/', passport.authenticate('github'));

module.exports = router;