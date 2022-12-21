const express = require('express');
const { isValidObjectId } = require('mongoose');
const { BadRequest } = require('http-errors');
const { notesService } = require('../service');
const { noteParamsSchema, noteDateSchema } = require('../validation');
const { auth, tryCatchWrapper } = require('../middleware');
const router = express.Router();

router.use(auth);

router.post('/', async (req, res, next) => {
  try {
    await noteParamsSchema.validateAsync(req.body);
    const { weight, product, date } = req.body;
    if (!isValidObjectId(product)) {
      return next(BadRequest);
    }
    const note = await notesService.create({
      owner: req.user._id,
      weight,
      product,
      date,
    });
    if (note) {
      return res.status(201).json({
        message: 'new note created',
        note,
      });
    }
  } catch (error) {
    next(BadRequest(error.message));
  }
  next();
});

router.get('/:date', async (req, res, next) => {
  try {
    const date = req.params.date;
    await noteDateSchema.validateAsync(date);
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const notes = await notesService
      .find({
        owner: req.user._id,
        date: {
          $gte: start,
          $lte: end,
        },
      })
      .populate('product');

    res.json({
      notes,
    });
  } catch (error) {
    next(BadRequest(error.message));
  }
  next();
});

router.delete('/:noteId', async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    if (!isValidObjectId(noteId)) {
      return next(BadRequest);
    }
    const note = await notesService.findOneAndDelete({
      owner: req.user._id,
      _id: noteId,
    });
    if (note) {
      return res.json({
        message: 'note deleted',
        note,
      });
    }
  } catch (error) {
    next(BadRequest(error.message));
  }
  next();
});

module.exports = tryCatchWrapper(router);
