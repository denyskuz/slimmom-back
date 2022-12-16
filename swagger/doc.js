const { version } = require("../package.json");
const requestBodies= require("./requestBodies");

const doc = {
  info: {
    version,
    title: "Slim Mom OpenAPI "+ version,
    description: "Swagger SlimMom openAPI",
  },
  servers: [
    {
      url: `https://slimmom-s41d.onrender.com`,
    },
  ],
  externalDocs: {
    description: "Find out more about Swagger",
    url: "http://swagger.io",
  },
  components: {
    requestBodies,
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

module.exports = doc;
