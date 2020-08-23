const AuthController = {
  redirectUser: (req, res) => {
    if(!req.user) res.redirect('/login');
    res.redirect('/');
  }
}

module.exports = AuthController;