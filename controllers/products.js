const Product = require("../models/products")

// GET all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// GET single product
const getSingleProduct = async (req, res) => {
    const { productID } = req.params
    
    try {
        const product = await Product.findByPk(productID)
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllProducts, 
    getSingleProduct
}