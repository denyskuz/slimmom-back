const express = require("express");
const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");
const { uS } = require("../service");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Енд-поінт реєстрації'
  // #swagger.responses[400] = { description: 'Bad request' }

    return next();
});

router.post("/login", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Енд-поінт аутентифікації'
  // #swagger.responses[400] = { description: 'Bad request' }

    return next();
});

router.get("/logout", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Енд-поінт виходу з облікового запису'
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }

    return next();
});

module.exports = router;
