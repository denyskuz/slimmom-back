const express = require('express');
const { auth, tryCatchWrapper } = require('../middleware');
const authController = require('../controller/auth.controller');

const authRouter = express.Router();


authRouter.post('/registration', tryCatchWrapper(authController.registration));

authRouter.post('/login', tryCatchWrapper(authController.login));

authRouter.get('/logout', auth, tryCatchWrapper(authController.logout));

module.exports = authRouter;
