const express = require("express");
const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");
const { notesService } = require("../service");
const { noteParamsSchema } = require("../validation");
const router = express.Router();

router.post("/", async (req, res, next) => {
  // #swagger.tags = ['Diary']
  await noteParamsSchema.validateAsync(req.body);
  const { weight, product, date } = req.body;

  const note = notesService.create({
    owner: req.user._id,
    ...req.body,
  });
  if (note) {
    return res.status(201).json({
      message: "new note created",
      note,
    });
  }

  return next();
});

router.get("/:date", async (req, res, next) => {
  let { date } = req.params.date;
  if (!date) {
    date = new Date();
  }
  const notes = await notesService.find({
    owner: req.user._id,
    date: req.params.date,
  });
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
  if (!isValidObjectId(noteId)) {
    return next(BadRequest);
  }
  const note = await notesService.findOneAndDelete({
    owner: req.user._id,
    _id: noteId,
  });
  if (note) {
    return res.json({
      message: "note deleted",
      note,
    });
  }
  return next(BadRequest);
});

module.exports = router;
