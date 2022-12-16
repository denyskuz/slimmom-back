const Joi = require("joi");

const userParamsShema = Joi.object({
  height: Joi.number().min(10).max(300)
    .required()
    .example("150"),
  age: Joi.number().integer().min(1).max(200)
    .required()
    .example("18"),
  currentWeight: Joi.number().integer().min(10).max(500)
    .required()
    .example("60"),
  desiredWeight: Joi.number().integer().min(10).max(500)
    .required()
    .example("50"),
  bloodType: Joi.number().integer().min(1).max(4)
    .required()
    .example("1"),
}).required();

module.exports = {
  userParamsShema,
};
