const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();



const app = express();
const productRouter = require("./routes/api/products");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public", { maxAge: "31536000" }));

app.use("/api/products", productRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found nothing" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
