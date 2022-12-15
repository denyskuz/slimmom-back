const express = require("express");
const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");
const { pS, productCalc } = require("../service");
const { userParamsShema } = require("../validation");
const router = express.Router();

/**
 * публічний енд-поінт на отримання денної норми ккал та списку нерекомендованих продуктів
 */
router.post("/", async (req, res, next) => {
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
