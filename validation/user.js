const Joi = require("joi");

const userParamsShema = Joi.object({
  height: Joi.number()
    .required()
    .error(new Error('Missing required "height" field')),
  age: Joi.number().required().error(new Error('Missing required "age" field')),
  currentWeight: Joi.number()
    .required()
    .error(new Error('Missing required "currentWeight" field')),
  desiredWeight: Joi.number()
    .required()
    .error(new Error('Missing required "desiredWeight" field')),
  bloodType: Joi.array()
    .items(Joi.any(), Joi.boolean().required())
    .length(5)
    .has(Joi.boolean().valid(true))
    .required()
    .error(new Error('Missing required "bloodType" field')),
}).required();

module.exports = {
  userParamsShema,
};
