const Joi = require('joi');

const noteParamsSchema = Joi.object({
  weight: Joi.number().min(10).max(500).required().example('80'),
  product: Joi.string().required().example('5d51694802b2373622ff554d'),
  date: Joi.date().iso().required().example('2022-12-21'),
}).required();

const noteDateSchema = Joi.date().iso().required().example('2022-12-21');

module.exports = {
  noteParamsSchema,
  noteDateSchema,
};
