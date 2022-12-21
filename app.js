const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const { products, auth, diary } = require("./routes");

const app = express();
const formatsLogger = process.env.NODE_ENV === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

require('./config/config-passport')
app.use("/api/products", products);
app.use("/api/auth", auth);
app.use("/api/diary", diary);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(400).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(400).json({
      message: err.message,
    });
  }
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
});

module.exports = {
  app,
};
