const { getAllProducts } = require('../controllers/products')

describe('getAllProducts', () => {
    test('SUCCESS - no query', async () => {
        const req = {
            query: {}
          }
      
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }

        await getAllProducts(req, res)
        const products = res.json.mock.calls[0][0]
        expect(res.status).toHaveBeenCalledWith(200)
        expect(products).toHaveLength(17)
    })

    test('SUCCESS - specific query', async () => {
        const req = {
            query: {
              vehicleType: 'SUV,Saloon',
              transmissionType: 'Automatic',
              priceRangeLow: 90,
              priceRangeHigh: 120,
              dateStart: '2025-01-10T00:00:00.000Z',
              dateEnd: '2025-01-11T00:00:00.000Z'
            }
          }
      
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }

        await getAllProducts(req, res)
        const products = res.json.mock.calls[0][0]
        expect(res.status).toHaveBeenCalledWith(200)
        expect(products).toHaveLength(2)
    })
})