const j2s = require("joi-to-swagger");
const {
  userParamsShema
} = require("../validation");

const { swagger: userParams } = j2s(userParamsShema);

const requestBodies = {
  userParams,
};

module.exports = requestBodies;
