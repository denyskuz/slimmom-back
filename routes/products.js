const express = require("express");
const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");
const { pS, productCalc } = require("../service");
const { userParamsShema } = require("../validation");
const router = express.Router();

router.post("/", async (req, res, next) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Публічний енд-поінт на отримання денної норми ккал та списку нерекомендованих продуктів'
  // #swagger.responses[400] = { description: 'Bad request' }
  /*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/components/requestBodies/userParams' }}  
  */

  const { error, value } = userParamsShema.validate(req.body);
  if (error) {
    return next(BadRequest(error.message));
  }
  const products = await pS.find({
    [`groupBloodNotAllowed.${value.bloodType}`]: true,
  });
  const kCal = productCalc(value);

  return res.json({
    kCal,
    products,
  });
});

router.patch("/", async (req, res, next) => {
  // #swagger.tags = ['Products']
  /* #swagger.description = 'Приватний енд-поінт на отримання денної норми ккал та списку нерекомендованих 
  продуктів, записує надану/отриману інформацію у БД' */
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }
  return next();
});

router.get("/", async (req, res, next) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'енд-поінт на пошук продуктів з БД по query-рядку'
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }
  return next();
});

module.exports = router;
