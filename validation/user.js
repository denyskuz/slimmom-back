const Joi = require('joi');

const userParamsSchema = Joi.object({
  height: Joi.number().min(10).max(300).required().example('150'),
  age: Joi.number().integer().min(1).max(200).required().example('18'),
  currentWeight: Joi.number()
    .integer()
    .min(10)
    .max(500)
    .required()
    .example('60'),
  desiredWeight: Joi.number()
    .integer()
    .min(10)
    .max(500)
    .required()
    .example('50'),
  bloodType: Joi.number().integer().min(1).max(4).required().example('1'),
}).required();

const loginSchema = Joi.object({
  password: Joi.string().min(6).required().example('Dikfj434io'),
  email: Joi.string().required().example('nic@gmail.com'),
}).required();

const registrationSchema = Joi.object({
  password: Joi.string().min(6).required().example('Dikfj434io'),
  email: Joi.string().required().example('nic@gmail.com'),
  name: Joi.string().required().example('Nic'),
  height: Joi.number().min(10).max(300).example('150'),
  age: Joi.number().integer().min(1).max(200).example('18'),
  currentWeight: Joi.number().integer().min(10).max(500).example('60'),
  desiredWeight: Joi.number().integer().min(10).max(500).example('50'),
  bloodType: Joi.number().integer().min(1).max(4).example('1'),
}).required();

module.exports = {
  userParamsSchema,
  loginSchema,
  registrationSchema,
};
