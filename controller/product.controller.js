const { usersService, productsService } = require('../service');
const {
  userParamsSchema,
  productsQuerySchema,
  badProductsQuerySchema,
} = require('../validation');
const { productCalc, pageParams } = require('../helpers');

async function getCalories(req, res, next) {
  await userParamsSchema.validateAsync(req.body);
  await badProductsQuerySchema.validateAsync(req.query);
  const { skip, limit } = pageParams(req.query);

  const products = await productsService
    .find({
      [`groupBloodNotAllowed.${req.body.bloodType}`]: true,
    })
    .skip(skip)
    .limit(limit);
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
    message: user ? `private ${user.name} parameters updated` : 'public',
    kCal,
    products,
  });
}

async function getCategories(req, res, next) {
  await userParamsSchema.validateAsync(req.body);

  const categories = await productsService
    .aggregate()
    .match({ [`groupBloodNotAllowed.${req.body.bloodType}`]: true })
    .project({ categories: 1 })
    .unwind('$categories')
    .group({ _id: '$categories' })
    .group({ _id: 'categories', titles: { $push: '$_id' } });

  return res.json({
    titles: categories[0].titles,
  });
}

async function getProducts(req, res, next) {
  await productsQuerySchema.validateAsync(req.query);
  const { title, category } = req.query;
  const { skip, limit } = pageParams(req.query);
  const products = await productsService
    .find({
      $or: [
        { 'title.ru': { $regex: '^' + title, $options: 'i' } },
        { 'title.ua': { $regex: '^' + title, $options: 'i' } },
        { categories: { $regex: '^' + category, $options: 'i' } },
      ],
    })
    .skip(skip)
    .limit(limit);
  return res.json({
    products,
  });
}

module.exports = {
  getCalories,
  getCategories,
  getProducts,
};
