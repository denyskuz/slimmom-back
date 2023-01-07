const { Unauthorized } = require('http-errors');
const { loginSchema, registrationSchema } = require('../validation');
const { usersService, sessionServise } = require('../service');
const refresh = require('../middleware');

async function registration(req, res, next) {
  await registrationSchema.validateAsync(req.body);
  const newUser = await usersService.create({ ...req.body });

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
  const session = await sessionServise.create({ owner: user._id });
  const refreshToken = usersService.createRefreshToken(session._id);
  const accessToken = usersService.createAccessToken(session._id);

  const { name, age, height, currentWeight, bloodType, desiredWeight } = user;

  return res.json({
    status: 'success',
    data: {
      accessToken,
      refreshToken,
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
  const { _id } = req.session;
  await sessionServise.findByIdAndDelete(_id);
  return res.status(204).json();
}

async function refresh(req, res, next) {
  const accessToken = usersService.createAccessToken(session._id);
}

async function current(req, res, next) {
  const { session } = req;
  const { email, name, age, height, currentWeight, bloodType, desiredWeight } =
  session.owner;
  return res.status(200).json({
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
}

module.exports = {
  registration,
  login,
  logout,
  current,
};
