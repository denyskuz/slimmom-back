const express = require('express');
const { tryCatchWrapper, authPublic } = require('../middleware');
const productController = require('../controller/product.controller');

const productRouter = express.Router();

productRouter.post(
  '/',
  authPublic,
  tryCatchWrapper(productController.getCalories)
);

productRouter.post(
  '/categories',
  tryCatchWrapper(productController.getCategories)
);

productRouter.get('/', tryCatchWrapper(productController.getProducts));

module.exports = productRouter;
