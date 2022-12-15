const { Schema, model } = require("mongoose");

const productsShema = new Schema({
  categories: {
    type: [String],
  },
  weight: {
    type: Number,
  },
  title: [
    {
      ru: String,
      ua: String,
    },
  ],
  calories: {
    type: Number,
  },
  groupBloodNotAllowed: {
    type: [Boolean],
  },
});

const productsServise = model("products", productsShema);

module.exports = productsServise;
