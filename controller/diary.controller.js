const { isValidObjectId } = require('mongoose');
const { BadRequest } = require('http-errors');
const { notesService } = require('../service');
const { noteParamsSchema, noteDateSchema } = require('../validation');

async function addDiaryData (req, res, next) {
  try {
    await noteParamsSchema.validateAsync(req.body);
    const { weight, product, date } = req.body;
    if (!isValidObjectId(product)) {
      return next(BadRequest('product is not correct'));
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
};

async function getDiaryByDate (req, res, next) {
  try {
    const date = req.params.date;
    console.log('sdfsdfsdfsd', date)
    await noteDateSchema.validateAsync(date);
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    console.log('start', start);
    console.log('end', end);
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
    console.log('error =====>')
    next(BadRequest(error.message));
  }
  next();
};

async function removeDiary (req, res, next) {
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
};

module.exports = {
    addDiaryData,
    getDiaryByDate,
    removeDiary
};