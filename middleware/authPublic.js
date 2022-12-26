const passport = require('passport');
const authPublic = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (_, user) => {
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authPublic;
