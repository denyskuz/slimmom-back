const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const passportCookie = require('passport-cookie');
const { sessionServise } = require('../service');
const { cookieName } = require('../helpers');

const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: refreshSecret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, async function (payload, done) {
    const session = await sessionServise
      .findById(payload._id)
      .populate('owner');
    if (!session || !session.owner) {
      return done(new Error('User not found'));
    }
    return done(null, session);
  })
);

// Cookie Strategy
const CookieStrategy = passportCookie.Strategy;
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
passport.use(
  new CookieStrategy(
    {
      cookieName,
      signed: true,
      passReqToCallback: true,
    },
    async function (req, token, done) {
      const payload = jwt.decode(token, { secretOrKey: accessSecret });
      const session = await sessionServise
        .findById(payload._id)
        .populate('owner');
      if (!session || !session.owner) {
        return done(new Error('User not found'));
      }
      return done(null, session);
    }
  )
);
