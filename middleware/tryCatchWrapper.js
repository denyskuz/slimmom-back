const { Conflict } = require('http-errors');

function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      if (error.message.includes('duplicate key error collection')) {
        next(Conflict('User with this email already registered'));
      }
      next(error);
    }
  };
}

module.exports = tryCatchWrapper;
