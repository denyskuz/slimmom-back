const { Schema, model } = require("mongoose");
const bCrypt = require("bcryptjs");

const usersSchema = new Schema(
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
      type: Number
    },
    age: {
      type: Number
    },
    currentWeight: {
      type: Number
    },
    desiredWeight: {
      type: Number
    },
    bloodType: {
      type: Number
    },
  },
  {
    versionKey: false,
  }
);

usersSchema.methods.setPassword = function(password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

usersSchema.methods.validPassword = function(password) {
  return bCrypt.compareSync(password, this.password);
};

const usersService = model("users", usersSchema);

module.exports = usersService;