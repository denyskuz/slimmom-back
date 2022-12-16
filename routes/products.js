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
    groupBloodNotAllowed: value.bloodType,
  });
  const kCal = productCalc(value);

  return res.json({
    kCal,
    products,
  });
});

module.exports = router;
