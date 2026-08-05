const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

//middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando",
  });
});

module.exports = app;
