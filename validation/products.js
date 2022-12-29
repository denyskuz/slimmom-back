const Joi = require('joi');

const productsQuerySchema = Joi.object({
  title: Joi.string().example('Грінки'),
  category: Joi.string().example('боби'),
  currentPage: Joi.number().example(1),
  pageSize: Joi.number().example(10),
}).required();

const badProductsQuerySchema = Joi.object({
  currentPage: Joi.number().example(1),
  pageSize: Joi.number().example(10),
  category: Joi.string().example('боби'),
});

const categoriesQuerySchema = Joi.object({
  currentPage: Joi.number().example(1),
  pageSize: Joi.number().example(10),
});

module.exports = {
  productsQuerySchema,
  badProductsQuerySchema,
  categoriesQuerySchema,
};
