const passport = require('passport');
const { Unauthorized } = require('http-errors');

const authPublic = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authPublic;
