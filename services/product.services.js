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
exports.updateProductService = async (productId, data) => {
    const result = await Product.updateOne({ _id: productId }, { $inc: data }, { runValidators: true })
    return result;
    // const product = await Product.findById(productId)
    // const result = await product.set(data).save()
    // return result;
}