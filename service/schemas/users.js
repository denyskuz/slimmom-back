const { Schema, model } = require('mongoose');
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
    accessToken: {
      type: String,
      required: [true, 'Access token is required'],
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
    this.password = bCrypt.hashSync(this.password, bCrypt.genSaltSync(6));
    return next();
  } catch (err) {
    return next(err);
  }
});

usersSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const usersService = model('users', usersSchema);

module.exports = usersService;
