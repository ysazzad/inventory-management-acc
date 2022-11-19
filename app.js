const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

//middleware
app.use(express.json());
app.use(cors());

//schema design
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
    trim: true,
    unique: [true, "name must be unique"],
    minLength: [3, "name must be at least 3 characters"],
    maxLength: [100, "name length is too large"]
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price cant be negative"]
  },
  unit: {
    type: String,
    required: true,
    enum: {
      values: ['pcs', 'litre', 'kg'],
      message: "unit value cant be {VALUE} , must be kg/litre/pcs"
    }
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "quantity cant be negative"],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value)
        if (isInteger) {
          return true
        } else {
          return false
        }
      }
    },
    message: "quantity must be an integer"
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['in-stock', 'out-of-stock', 'discontinued'],
      message: "status cant be {VALUE}"
    }
  },
  // supplier: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Supplier"
  // },
  // categories: [
  //   {
  //     name: {
  //       type: String,
  //       required: true
  //     },
  //     _id: mongoose.Schema.Types.ObjectId
  //   }
  // ]
},
  { timestamps: true, }
)
//schema -> model -> queries
const Product = mongoose.model('Product', productSchema)
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
//posting to database
app.post("/api/v1/product", async (req, res, next) => {
  //save or create
  try {
    const product = new Product(req.body)
    if (product.quantity == 0) {
      product.status = "out-of-stock"
    }
    const result = await product.save()
    res.status(200).json({
      status: 'success',
      message: 'data inserted successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data is not inserted",
      error: error.message
    })
  }
})

module.exports = app;
