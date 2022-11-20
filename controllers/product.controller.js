const { getProductService, createProductService } = require("../services/product.services")

// const Product = require('../models/Product')
exports.getProducts = async (req, res) => {
    try {
        // const products = await Product.find({})
        // const products = await Product.find({ status: { $ne: "out-of-stock" } })
        // const products = await Product.find({ quantity: { $gt: 300 } })
        // const products = await Product.find({}, 'name quantity')
        // const products = await Product.find({}, '-name -quantity')
        // const products = await Product.find({}).limit(1)
        // const products = await Product.find({}).sort({ quantity: -1 })
        // const products = await Product.find({ name: { $in: ['chal', 'dhal'] } })
        // const products = await Product.find({ $or: [{ _id: "63791ef2b8399503e00f1e22" }, { name: "al" }] })
        const products = await getProductService()
        res.status(200).json({
            status: "success",
            data: products
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "cant find the data",
            error: error.message

        })
    }
}

exports.createProduct = async (req, res, next) => {
    //save or create
    try {
        const result = await createProductService(req.body)
        result.logger()
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
}