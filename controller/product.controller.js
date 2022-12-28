const { productsService } = require('../service');
const {
  productsQuerySchema,
  badProductsQuerySchema,
} = require('../validation');
const {
  productCalc,
  pageParams,
  pageInfo,
  searchRegex,
} = require('../helpers');

async function getCalories(req, res, next) {
  await badProductsQuerySchema.validateAsync(req.query);
  const { skip, limit } = pageParams(req.query);
  const { category } = req.query;
  const query = {
    [`groupBloodNotAllowed.${req.body.bloodType}`]: true,
  };
  if (category) {
    query.categories = category;
  }
  const products = await productsService.find(query).skip(skip).limit(limit);
  const kCal = productCalc(req.body);
  const page = pageInfo(req.query, await productsService.countDocuments(query));
  return res.json({
    kCal,
    page,
    products,
  });
}

async function getCategories(req, res, next) {
  const user =req.user;
  const categories = await productsService
    .aggregate()
    .match({ [`groupBloodNotAllowed.${req.body.bloodType}`]: true })
    .project({ categories: 1 })
    .unwind('$categories')
    .group({ _id: '$categories' })
    .group({ _id: 'categories', titles: { $push: '$_id' } });

  return res.json({
    message: user ? `${user.name} parameters calculated` : 'Parameters calculated',
    titles: categories[0].titles,
  });
}

async function getProducts(req, res, next) {
  await productsQuerySchema.validateAsync(req.query);
  const { title, category } = req.query;
  const { skip, limit } = pageParams(req.query);
  const titleRegex = searchRegex(title);
  const categoryRegex = searchRegex(category);
  const query = {
    $or: [
      { 'title.ru': titleRegex },
      { 'title.ua': titleRegex },
      { categories: categoryRegex },
    ],
  };
  const products = await productsService.find(query).skip(skip).limit(limit);
  const page = pageInfo(req.query, await productsService.countDocuments(query));
  return res.json({
    page,
    products,
  });
}

module.exports = {
  getCalories,
  getCategories,
  getProducts,
};
