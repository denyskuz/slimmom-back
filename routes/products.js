const express = require('express');
const { auth, tryCatchWrapper } = require('../middleware');
const productController = require('../controller/product.controller');

const productRouter = express.Router();

productRouter.get('/', tryCatchWrapper(productController.getPublicCalories));

productRouter.patch('/', auth, tryCatchWrapper(productController.getCaloriesByUser));

productRouter.get('/', auth, tryCatchWrapper(productController.getProducts));

module.exports = productRouter;
