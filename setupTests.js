const sequelize = require('./config')
const { seedData } = require("./seed")

beforeAll(async () => {
    await sequelize.sync({ force: true }).then(async () => {
        await seedData()
    })
})

afterAll(async () => {
    await sequelize.close()
})