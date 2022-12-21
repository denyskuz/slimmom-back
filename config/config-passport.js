const passport = require('passport');
const passportJWT = require('passport-jwt');
const { usersService } = require('../service');

const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, async function (payload, done) {
    const user = await usersService.findById(payload.id);

    if (!user || !user.accessToken) {
      return done(new Error('User not found'));
    }
    return done(null, user);
  })
);
