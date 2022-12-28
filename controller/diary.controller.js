const { isValidObjectId } = require('mongoose');
const { BadRequest } = require('http-errors');
const { productsService, notesService } = require('../service');
const { noteParamsSchema, noteDateSchema } = require('../validation');

async function addDiaryData(req, res, next) {
  await noteParamsSchema.validateAsync(req.body);
  const { weight, product, date } = req.body;
  if (!isValidObjectId(product)) {
    return next(BadRequest('product id is not correct'));
  }
  const productItem = await productsService.findById(product);
  if (!productItem) {
    return next(BadRequest('product is not correct'));
  }
  const note = await notesService.create({
    owner: req.user._id,
    weight,
    product,
    date,
  });
  note.product = productItem;
  if (note) {
    return res.status(201).json({
      message: 'new note created',
      note,
    });
  }
  next();
}

async function getDiaryByDate(req, res, next) {
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
  next();
}

async function removeDiary(req, res, next) {
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
  next();
}

module.exports = {
  addDiaryData,
  getDiaryByDate,
  removeDiary,
};
