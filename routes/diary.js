const express = require("express");
const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");
const { notesService } = require("../service");
const { noteParamsSchema } = require("../validation")
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { error } = noteParamsSchema.validate(req.body);
  if (error) {
    return next(BadRequest(error.message));
  }
  const addNote = notesService.create({
    owner: req.user._id,
    product: req.product._id,
    ...req.body
  })
    if (addNote) {
      return res.status(201).json({
        message: "new note created",
        note: addNote,
      });
    }

  return next(BadRequest);
});

router.get("/:date", async (req, res, next) => {
  const notes = await notesService.find({
    owner: req.user._id,
    date: req.params.date
  })
  const { date } = req.params.date;
  if (!date) {
    date = new Date();
  }
  res.json({
    notes,
  });
  return next();
});

router.delete("/:noteId", async (req, res, next) => {
  // #swagger.tags = ['Diary']
  // #swagger.description = 'Eнд-поінт для видалення з`їденого продукту в конкретний день'
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }

  return next();
});

module.exports = router;
