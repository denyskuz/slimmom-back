const { Schema, Types, model } = require('mongoose');

const sessionShema = new Schema(
  {
    owner: {
      type: Types.ObjectId,
      ref: 'users',
      required: [true, 'User id is required'],
    },
  },
  {
    versionKey: false,
  }
);

const sessionServise = model('sessions', sessionShema);

module.exports = sessionServise;
