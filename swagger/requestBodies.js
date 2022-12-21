const j2s = require("joi-to-swagger");
const {
  userParamsSchema,
  noteParamsSchema,
} = require("../validation");

const { swagger: userParams } = j2s(userParamsSchema);
const { swagger: noteParams } = j2s(noteParamsSchema);

const requestBodies = {
  userParams,
  noteParams,
};

module.exports = requestBodies;
