const express = require('express');
const { tryCatchWrapper, authPublic } = require('../middleware');
const productController = require('../controller/product.controller');

const productRouter = express.Router();

productRouter.post(
  '/',
  tryCatchWrapper(authPublic),
  tryCatchWrapper(productController.getCalories)
);

productRouter.post(
  '/categories',
  tryCatchWrapper(authPublic),
  tryCatchWrapper(productController.getCategories)
);

productRouter.get('/', tryCatchWrapper(productController.getProducts));

module.exports = productRouter;
