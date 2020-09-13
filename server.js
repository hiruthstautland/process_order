require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const ordersRouter = require("./routers/orders");

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.use(express.static("build"));

app.use("/api", ordersRouter);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ msg: "Invalid token" });
  }

  next(err, req, res);
});

app.listen(port, () => {
  console.log(`Express server is running on port: ${port}`);
});
