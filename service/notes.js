const { Schema, Types, model } = require("mongoose");

const notesShema = new Schema(
  {
    owner: {
      type: Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
    product: {
      type: Types.ObjectId,
      ref: "product",
      required: [true, "Product id is required"],
    },
    weight: {
      type: Number,
      required: [true, "Product weight is required"],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    kCal: {
      type: Number,
      required: [true, "Product kilo calories is required"],
    },
  },
  {
    versionKey: false,
  }
);

const notesServise = model("notes", notesShema);

module.exports = notesServise;
