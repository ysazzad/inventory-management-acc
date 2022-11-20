const mongoose = require('mongoose');

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
// mongoose middleware  for saving data : pre/post
productSchema.pre('save', function (next) {
    console.log("before saving data");
    if (this.quantity == 0) {
        this.status = "out-of-stock"
    }
    next()
})
productSchema.post('save', function (doc, next) {
    console.log("after saving data");
    next()
})

productSchema.methods.logger = function () {
    console.log(`data saved for ${this.name}`);
}
//schema -> model -> queries
const Product = mongoose.model('Product', productSchema)

module.exports = Product