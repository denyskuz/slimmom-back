const { usersService, productsService, productCalc } = require('../service');
const { userParamsSchema, productsQuerySchema } = require('../validation');

async function getCalories(req, res, next) {
  try {
    await userParamsSchema.validateAsync(req.body);
    const products = await productsService.find({
      [`groupBloodNotAllowed.${req.body.bloodType}`]: true,
    });
    const kCal = productCalc(req.body);
    const user =
      req.user &&
      (await usersService
        .findByIdAndUpdate(req.user._id, req.body, {
          new: true,
          runValidators: true,
        })
        .lean());
    return res.json({
      message: user && `${user.name} parameters updated`,
      kCal,
      products,
    });
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    await productsQuerySchema.validateAsync(req.query);
    const { title, category } = req.query;
    const products = await productsService.find({
      $or: [
        { 'title.ru': { $regex: '^' + title, $options: 'i' } },
        { 'title.ua': { $regex: '^' + title, $options: 'i' } },
        { categories: { $regex: '^' + category, $options: 'i' } },
      ],
    });
    return res.json({
      products,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCalories,
  getProducts,
};
