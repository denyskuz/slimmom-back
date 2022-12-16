const express = require("express");
const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");
const { notesService } = require("../service");
const router = express.Router();

router.post("/", async (req, res, next) => {
  // #swagger.tags = ['Diary']
  // #swagger.description = 'Eнд-поінт на додавання з`їденого продукту у конкретний день'
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }

  return next();
});

router.get("/", async (req, res, next) => {
  // #swagger.tags = ['Diary']
  // #swagger.description = 'Eнд-поінт на отримання всієї інформації щодо конкретного дня'
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }

  return next();
});

router.delete("/:id", async (req, res, next) => {
  // #swagger.tags = ['Diary']
  // #swagger.description = 'Eнд-поінт для видалення з`їденого продукту в конкретний день'
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }

  return next();
});

module.exports = router;
