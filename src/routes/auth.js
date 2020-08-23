const router = require('express').Router();
const passport = require('passport');
const AuthController = require('../controllers/AuthController');

router.get('/', passport.authenticate('github'));

router.get('/callback', passport.authenticate('github'), AuthController.redirectUser)

module.exports = router;