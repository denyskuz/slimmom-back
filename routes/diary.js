const express = require('express');
const { auth, tryCatchWrapper } = require('../middleware');
const diaryController = require('../controller/diary.controller');

const diaryAuth = express.Router();

diaryAuth.post('/', auth, tryCatchWrapper(diaryController.addDiaryData));

diaryAuth.get('/:date', auth, tryCatchWrapper(diaryController.getDiaryByDate));

diaryAuth.delete(
  '/:noteId',
  auth,
  tryCatchWrapper(diaryController.removeDiary)
);

module.exports = diaryAuth;
