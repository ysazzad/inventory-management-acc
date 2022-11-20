const Product = require('../models/Product')


exports.getProductService = async () => {
    const products = await Product.find()
    return products
}

exports.createProductService = async (data) => {
    const product = new Product(data)
    const result = await product.save()
    return result
}