const { usersService } = require('../service');
const { userParamsSchema } = require('../validation');

const passport = require('passport');
const authPublic = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (_, user) => {
    try {
      await userParamsSchema.validateAsync(req.body);
      const updatedUser =
        user &&
        (await usersService
          .findByIdAndUpdate(user._id, req.body, {
            new: true,
            runValidators: true,
          })
          .lean());
      req.user = updatedUser;
    } catch (error) {
      next(error);
    }
    next();
  })(req, res, next);
};

module.exports = authPublic;
