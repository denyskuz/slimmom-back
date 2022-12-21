const j2s = require('joi-to-swagger');
const {
  userParamsSchema,
  noteParamsSchema,
  loginSchema,
  registrationSchema,
} = require('../validation');

const { swagger: userParams } = j2s(userParamsSchema);
const { swagger: noteParams } = j2s(noteParamsSchema);
const { swagger: loginParams } = j2s(loginSchema);
const { swagger: registrationParams } = j2s(registrationSchema);

const requestBodies = {
  userParams,
  noteParams,
  loginParams,
  registrationParams,
};

module.exports = requestBodies;
