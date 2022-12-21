const express = require('express');
const { Conflict, Unauthorized, NotFound, BadRequest } = require('http-errors');
const { usersService } = require('../service');
const router = express.Router();
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const { loginSchema, registrationSchema } = require('../validation');
const { auth, tryCatchWrapper } = require('../middleware');

const secret = process.env.SECRET;

router.post('/registration', async (req, res, next) => {
  // #swagger.ignore = true
  const { name, email, password } = req.body;
  const accessToken = nanoid();
  try {
    await registrationSchema.validateAsync(req.body);
    const newUser = new usersService({ name, email, accessToken });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        message: 'Registration successful',
        user: {
          email,
          name,
        },
      },
    });
  } catch (error) {
    if (error.message.includes('duplicate key error collection')) {
      next(Conflict('User with this email already registered'));
    }
    next(BadRequest(error.message));
  }
  next();
});

router.post('/login', async (req, res, next) => {
  // #swagger.ignore = true
  const { email, password } = req.body;
  try {
    await loginSchema.validateAsync(req.body);
    const user = await usersService.findOne({ email });
    if (!user || !user.validPassword(password)) {
      throw new Unauthorized('Incorrect login or password');
    }
    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, secret, { expiresIn: '1h' });
    await usersService.findByIdAndUpdate(user._id, { accessToken });
    const { name, age, height, currentWeight, bloodType, desiredWeight } = user;
    res.json({
      status: 'success',
      data: {
        accessToken,
        user: {
          email,
          name,
          age,
          height,
          currentWeight,
          bloodType,
          desiredWeight,
        },
      },
    });
  } catch (err) {
    next(BadRequest(err.message));
  }
  next();
});

router.get('/logout', auth, async (req, res, next) => {
  // #swagger.ignore = true
  try {
    const { _id } = req.user;
    await usersService.findByIdAndUpdate(_id, { accessToken: '' });
    return res.status(204).json();
  } catch (err) {
    next(BadRequest(err.message));
  }
  next();
});

module.exports = tryCatchWrapper(router);
