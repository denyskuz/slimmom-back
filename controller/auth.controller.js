const { Conflict, Unauthorized, NotFound, BadRequest } = require('http-errors');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const { loginSchema, registrationSchema } = require('../validation');
const { usersService } = require('../service');

const secret = process.env.SECRET;

async function registration (req, res, next) {
  const { name, email, password } = req.body;
  const accessToken = nanoid();
  try {
    await registrationSchema.validateAsync(req.body);
    const newUser = new usersService({ name, email, accessToken });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: 'success',
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
    next(error);
  }
  return next();
};

async function login (req, res, next) {
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
    next(err);
  }
  next();
};

async function logout (req, res, next) {
  try {
    const { _id } = req.user;
    await usersService.findByIdAndUpdate(_id, { accessToken: '' });
    return res.status(204).json();
  } catch (err) { 
    next(err)
  }
}

module.exports = {
    registration,
    login,
    logout
};