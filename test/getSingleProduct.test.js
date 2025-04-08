const { getSingleProduct } = require('../controllers/products')

describe('getSingleProduct', () => {
    test('SUCCESS - id 1', async () => {
        const req = {
            params: {
                productID: 1
            }
          }
      
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }

        await getSingleProduct(req, res)
        const product = res.json.mock.calls[0][0]
        expect(res.status).toHaveBeenCalledWith(200)
        expect(product).toHaveProperty('vehicleType', 'SUV')
        expect(product).toHaveProperty('vehicleModel', 'Honda Vezel 2021')
        expect(product).toHaveProperty('transmissionType', 'Automatic')
        expect(product).toHaveProperty('pricePerDay', "80.00")
        expect(product).toHaveProperty('fuelType', 'Petrol')
    })
})