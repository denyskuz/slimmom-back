const express = require('express');
const { auth, refresh, tryCatchWrapper } = require('../middleware');
const authController = require('../controller/auth.controller');

const authRouter = express.Router();

authRouter.post('/registration', tryCatchWrapper(authController.registration));

authRouter.post('/login', tryCatchWrapper(authController.login));

authRouter.get('/logout', auth, tryCatchWrapper(authController.logout));

authRouter.get('/current', auth, tryCatchWrapper(authController.current));

authRouter.get('/refresh', refresh, tryCatchWrapper(authController.refresh));

module.exports = authRouter;
