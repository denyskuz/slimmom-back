const express = require('express');
const { BadRequest } = require('http-errors');
const { usersService, productsService, productCalc } = require('../service');
const { userParamsSchema, productsQuerySchema } = require('../validation');
const { auth, tryCatchWrapper } = require('../middleware');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { error, value } = userParamsSchema.validate(req.body);
  if (error) {
    return next(BadRequest(error.message));
  }
  const products = await productsService.find({
    [`groupBloodNotAllowed.${value.bloodType}`]: true,
  });
  const kCal = productCalc(value);

  return res.json({
    kCal,
    products,
  });
});

router.patch('/', auth, async (req, res, next) => {
  const { error, value } = userParamsSchema.validate(req.body);
  if (error) {
    return next(BadRequest(error.message));
  }
  const products = await productsService.find({
    [`groupBloodNotAllowed.${value.bloodType}`]: true,
  });
  const kCal = productCalc(value);
  const user = await usersService
    .findByIdAndUpdate(req.user._id, value, {
      new: true,
      runValidators: true,
    })
    .lean();
  return res.json({
    message: user && `${user.name} parameters updated`,
    kCal,
    products,
  });
});

router.get('/', auth, async (req, res, next) => {
  const { error } = productsQuerySchema.validate(req.query);
  if (error) {
    return next(BadRequest(error.message));
  }
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
});

module.exports = tryCatchWrapper(router);
