const productCalc = require('./productCalc');
const pageParams = require('./pageParams');
const pageInfo = require('./pageInfo');
const searchRegex = require('./searchRegex');
const createToken = require('./createToken');
const createCookie = require('./createCookie');
const {
  cookieName,
  expiresCookieTime,
  expiresAccessTime,
  expiresRefreshTime,
} = require('./constants');

module.exports = {
  productCalc,
  pageParams,
  pageInfo,
  searchRegex,
  createToken,
  createCookie,
  cookieName,
  expiresCookieTime,
  expiresAccessTime,
  expiresRefreshTime,
};
