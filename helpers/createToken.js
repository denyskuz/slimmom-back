const jwt = require('jsonwebtoken');

const createToken = (_id, expiresIn, secret) => {
  try {
    const token = jwt.sign({ _id }, secret, {
      expiresIn,
    });
    return token;
  } catch (error) {
    console.error(error);
  }
};

module.exports = createToken;
