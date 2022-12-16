const { Schema, model } = require("mongoose");

const usersShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    accessToken: {
      type: String,
      required: [true, "Access token is required"],
      unique: true,
    },
    height: {
      type: Number,
      required: [true, "Height is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    currentWeight: {
      type: Number,
      required: [true, "Current weight is required"],
    },
    desiredWeight: {
      type: Number,
      required: [true, "Desired weight is required"],
    },
    bloodType: {
      type: Number,
      required: [true, "Blood type is required"],
    },
  },
  {
    versionKey: false,
  }
);

const usersServise = model("users", usersShema);

module.exports = usersServise;
