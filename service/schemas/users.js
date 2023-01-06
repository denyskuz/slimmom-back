const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const bCrypt = require('bcryptjs');
const sessionServise = require('./session');

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    height: {
      type: Number,
      default: 0,
    },
    age: {
      type: Number,
      default: 0,
    },
    currentWeight: {
      type: Number,
      default: 0,
    },
    desiredWeight: {
      type: Number,
      default: 0,
    },
    bloodType: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

const usersService = model('users', usersSchema);

usersSchema.pre('save', async function save(next) {
  try {
    this.password = bCrypt.hashSync(this.password, bCrypt.genSaltSync(6));
    return next();
  } catch (err) {
    return next(err);
  }
});

usersSchema.methods = {
  validPassword: async function (password) {
    return bCrypt.compareSync(password, this.password);
  },
  createAccessToken: async function () {
    try {
      const { _id, name } = this;
      const session = await sessionServise.create({ owner: _id });
      const accessSecret = process.env.ACCESS_TOKEN_SECRET;
      const accessToken = jwt.sign(
        { user: { _id: session._id, name } },
        accessSecret,
        {
          expiresIn: '10m',
        }
      );
      return accessToken;
    } catch (error) {
      console.error(error);
    }
  },
  createRefreshToken: async function () {
    try {
      const { _id, name } = this;
      const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
      const refreshToken = jwt.sign({ user: { _id, name } }, refreshSecret, {
        expiresIn: '1d',
      });
      this.accessToken = refreshToken;
      this.markModified('accessToken');
      await this.save();
      return refreshToken;
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = usersService;
