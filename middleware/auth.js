const passport = require('passport')
const { Unauthorized } = require('http-errors');

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      throw new Unauthorized();
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;
