const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const { loginSchema, registrationSchema } = require('../validation');
const { usersService } = require('../service');

async function registration(req, res, next) {
  const accessToken = nanoid();
  await registrationSchema.validateAsync(req.body);
  const newUser = await usersService.create({ accessToken, ...req.body });

  return res.status(201).json({
    status: 'success',
    data: {
      message: 'Registration successful',
      user: {
        email: newUser.email,
        name: newUser.name,
      },
    },
  });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  await loginSchema.validateAsync(req.body);
  const user = await usersService.findOne({ email });
  if (!user || !user.validPassword(password)) {
    throw new Unauthorized('Incorrect login or password');
  }
  const payload = {
    id: user.id,
    email: user.email,
  };

  const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '1h' });
  await usersService.findByIdAndUpdate(user._id, { accessToken });
  const { name, age, height, currentWeight, bloodType, desiredWeight } = user;

  return res.json({
    status: 'success',
    data: {
      accessToken,
      user: {
        email,
        name,
        age,
        height,
        currentWeight,
        desiredWeight,
        bloodType,
      },
    },
  });
}

async function logout(req, res, next) {
  const { _id } = req.user;
  await usersService.findByIdAndUpdate(_id, { accessToken: '' });
  return res.status(204).json();
}

async function current(req, res, next) {
  const { user } = req;
  console.log('user', user);
  const { email, name, age, height, currentWeight, bloodType, desiredWeight } =
    user;
  return res.status(200).json({
    status: 'success',
    data: {
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
}

module.exports = {
  registration,
  login,
  logout,
  current,
};
