const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('mysqldb', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
})

module.exports = sequelize