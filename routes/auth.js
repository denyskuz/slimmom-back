const express = require("express");
const { Conflict, Unauthorized, NotFound, BadRequest } = require('http-errors');
const { usersService } = require("../service");
const router = express.Router();
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const { loginSchema, registrationSchema } = require('../validation')
const { auth } = require('../middleware');

require('dotenv').config();
const secret = process.env.SECRET

router.post("/registration", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  const {name, email, password } = req.body
  const accessToken = nanoid();
  try {
    await registrationSchema.validateAsync(req.body);   
    const newUser = new usersService({ name, email, accessToken })
    newUser.setPassword(password)
    await newUser.save()
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          message: 'Registration successful',
          user: {
            email,
            name
          }
        },
      })
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      next(Conflict("User with this email already registered"));
    }
    next(error)
  }
    return next();
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try { 
    await loginSchema.validateAsync(req.body);
    const user = await usersService.findOne({ email });
    if (!user || !user.validPassword(password)) {
        throw new Unauthorized("Incorrect login or password");
    }
    const payload = {
      id: user.id,
      email: user.email,
    }
    const accessToken = jwt.sign(payload, secret, { expiresIn: '1h' })
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
          desiredWeight
        }
      },
    })
  } catch (err) { 
    console.log('err ====>', err);
    next(err)
  }

}) 

router.get("/logout", auth, async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Енд-поінт виходу з облікового запису'
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }

    return next();
});

module.exports = router;
