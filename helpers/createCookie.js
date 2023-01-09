const { cookieName, expiresCookieTime } = require('./constants');

const createCookie = (res, token) => {
  try {
    const expires = new Date(Date.now() + expiresCookieTime * 60 * 1000);
    res.cookie(cookieName, token, { signed: true, expires });
  } catch (error) {
    console.error(error);
  }
};

module.exports = createCookie;
