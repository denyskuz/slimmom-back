const { Schema, Types, model } = require('mongoose');

const notesShema = new Schema(
  {
    owner: {
      type: Types.ObjectId,
      ref: 'users',
      required: [true, 'User id is required'],
    },
    product: {
      type: Types.ObjectId,
      ref: 'products',
      required: [true, 'Product id is required'],
    },
    weight: {
      type: Number,
      required: [true, 'Product weight is required'],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

const notesServise = model('notes', notesShema);

module.exports = notesServise;
