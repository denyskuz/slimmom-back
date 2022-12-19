const j2s = require("joi-to-swagger");
const {
  userParamsSchema
} = require("../validation");

const { swagger: userParams } = j2s(userParamsSchema);

const requestBodies = {
  userParams,
};

module.exports = requestBodies;
