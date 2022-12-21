const Joi = require('joi');

const noteParamsSchema = Joi.object({
  weight: Joi.number().min(10).max(500).required().example('80'),
  product: Joi.string().required().example('639aa3fb5e433813b2d2a1d8'),
  date: Joi.date()
    .iso()
    .greater(new Date().toDateString())
    .required()
    .example('2022-12-21'),
}).required();

const noteDateSchema = Joi.date()
  .iso()
  .greater(new Date().toDateString())
  .required()
  .example('2022-12-21');

module.exports = {
  noteParamsSchema,
  noteDateSchema,
};
