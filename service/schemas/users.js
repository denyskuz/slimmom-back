const { Schema, model } = require('mongoose');
const {
  createToken,
  expiresAccessTime,
  expiresRefreshTime,
} = require('../../helpers');
const bCrypt = require('bcryptjs');

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

usersSchema.pre('save', async function save(next) {
  try {
    this.password = await bCrypt.hash(this.password, await bCrypt.genSalt(6));
    return next();
  } catch (err) {
    return next(err);
  }
});

usersSchema.methods = {
  validPassword: async function (password) {
    try {
      return await bCrypt.compare(password, this.password);
    } catch (error) {
      console.error(error);
    }
  },
  createAccessToken: function (sessionId) {
    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
    return createToken(sessionId, expiresAccessTime, accessSecret);
  },
  createRefreshToken: function (sessionId) {
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    return createToken(sessionId, expiresRefreshTime, refreshSecret);
  },
};

const usersService = model('users', usersSchema);

module.exports = usersService;
