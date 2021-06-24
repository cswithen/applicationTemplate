const express = require("express");
const path = require("path");
const app = express();
module.exports = app;

//logging middleware
const morgan = require("morgan");
app.use(morgan("dev"));

//bodyParsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api routes
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

//static assets
app.use(express.static(path.join(__dirname, "../public")));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

app.use(function (error, req, res, next) {
  console.error(error);
  console.error(error.stack);
  res
    .status(error.status || 500)
    .send(error.message || "Internal server error.");
});
