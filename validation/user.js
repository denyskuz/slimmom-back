const Joi = require("joi");

const userParamsShema = Joi.object({
  height: Joi.number()
    .required()
    .error(new Error('Missing required "height" field'))
    .example("150"),
  age: Joi.number()
    .required()
    .error(new Error('Missing required "age" field'))
    .example("18"),
  currentWeight: Joi.number()
    .required()
    .error(new Error('Missing required "currentWeight" field'))
    .example("60"),
  desiredWeight: Joi.number()
    .required()
    .error(new Error('Missing required "desiredWeight" field'))
    .example("50"),
  bloodType: Joi.array()
    .items(Joi.any(), Joi.boolean())
    .length(5)
    .has(Joi.boolean().valid(true))
    .required()
    .error(new Error('Missing required "bloodType" field'))
    .example("[null, true, false, false, false]"),
}).required();

module.exports = {
  userParamsShema,
};
