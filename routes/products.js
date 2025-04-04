const express = require('express')
const router = express.Router()
const productsController = require("../controllers/products")

// GET all products
router.get('/', productsController.getAllProducts)

// GET single product
router.get('/:productID', productsController.getSingleProduct)

module.exports = router