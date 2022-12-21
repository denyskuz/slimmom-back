const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const noteParamsSchema = Joi.object({
  weight: Joi.number().min(10).max(500).required().example("80"),
  product: Joi.objectId().required().example("639aa3fb5e433813b2d2a1d8"),
  date: Joi.date().format("YYYY-MM-DD").greater("now"),
}).required();

module.exports = {
  noteParamsSchema,
};
