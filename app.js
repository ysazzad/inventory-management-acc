const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

//middleware
app.use(express.json());
app.use(cors());

//routes
const productRoutes = require('./router/product.router')

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
app.use("/api/v1/product", productRoutes)


module.exports = app;
