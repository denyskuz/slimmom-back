const Joi = require('joi');

const productsQuerySchema = Joi.object({
  title: Joi.string().example('Грінки'),
  category: Joi.string().example('боби'),
}).required();

module.exports = {
  productsQuerySchema,
};
