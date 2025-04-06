const Product = require("../models/products")
const ProductBooking = require("../models/productBookings")
const { Sequelize } = require('sequelize')

// GET all products
const getAllProducts = async (req, res) => {
    const {
        vehicleType, 
        transmissionType, 
        priceRangeLow, 
        priceRangeHigh,
        dateStart, 
        dateEnd
    } = req.query

    const whereConditions = {}

    if (vehicleType) 
        whereConditions.vehicleType = { [Sequelize.Op.in]: vehicleType.split(',') }
    if (transmissionType) 
        whereConditions.transmissionType = { [Sequelize.Op.in]: transmissionType.split(',') }

    if (priceRangeLow || priceRangeHigh) {
        whereConditions.pricePerDay = {}
        if (priceRangeLow) whereConditions.pricePerDay[Sequelize.Op.gte] = priceRangeLow
        if (priceRangeHigh) whereConditions.pricePerDay[Sequelize.Op.lte] = priceRangeHigh
    }
    
    if (dateStart && dateEnd) {
        const startDate = new Date(dateStart)
        const endDate = new Date(dateEnd)
        
        const allDates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            allDates.push(currentDate.toISOString())
            currentDate.setDate(currentDate.getDate() + 1)
        }

        const bookedProducts = await ProductBooking.findAll({
            where: {
                date: {
                    [Sequelize.Op.in]: allDates,
                }
            },
            attributes: [
                'productID',
                [Sequelize.fn('COUNT', Sequelize.col('date')), 'bookedDatesCount']
            ],
            group: ['productID'], 
            having: Sequelize.literal(`COUNT(DISTINCT date) = ${allDates.length}`) 
        })

        const bookedProductIDs = bookedProducts.map((p) => p.productID)

        if (bookedProductIDs.length > 0) {
            console.log('yes')
            whereConditions.id = { [Sequelize.Op.notIn]: bookedProductIDs }
        }

    }

    try {
        const products = await Product.findAll({ where: whereConditions })
        
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