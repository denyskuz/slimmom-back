const passport = require('passport');
const { Unauthorized } = require('http-errors');

const auth = (req, res, next) => {
  passport.authenticate("cookie", { session: false }, (err, session) => {
    if (!session || err) {
      return next(Unauthorized());
    }
    req.session = session;
    next();
  })(req, res, next);
};

module.exports = auth;
