const users = require('./user');
const diary = require('./diary');
const products = require('./products');

module.exports = {
  ...users,
  ...diary,
  ...products,
};
