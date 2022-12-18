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
  const newProduct = notesService.create(req.body);
  if (newProduct) {
    return res.status(201).json({
      message: "new product created"
    })
  }
  return next();
});

router.get("/", async (req, res, next) => {
  // #swagger.tags = ['Diary']
  // #swagger.description = 'Eнд-поінт на отримання всієї інформації щодо конкретного дня'
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }
  const products = await notesService.find();
  res.json({
    products
  })
  return next();
});

router.delete("/:id", async (req, res, next) => {
  // #swagger.tags = ['Diary']
  // #swagger.description = 'Eнд-поінт для видалення з`їденого продукту в конкретний день'
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }
  const { productId } = req.params;
  const product = notesService.findById({ _id: productId })
  if (product) {
    await notesService.findByIdAndDelete({
      _id: productId
    });
  return res.status(200).json({
      message: "product deleted"
    });
  }
  return next();
});

module.exports = router;
