const express = require('express');
const { auth, tryCatchWrapper, authPublic } = require('../middleware');
const productController = require('../controller/product.controller');

const productRouter = express.Router();

productRouter.post(
  '/',
  authPublic,
  tryCatchWrapper(productController.getCalories)
);

productRouter.get('/', auth, tryCatchWrapper(productController.getProducts));

module.exports = productRouter;
