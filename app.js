const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const productRouter = require("./routes/api/products");
const authRouter = require("./routes/api/auth");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const corsOptions = {
  origin: "https://stem-server-db.onrender.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public", { maxAge: "31536000" }));

app.use("/api/users", authRouter);
app.use("/api/products", productRouter);
app.post("/api/products/order", productRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found nothing" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
