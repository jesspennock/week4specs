require('dotenv').config()

const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialact: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
}) 

module.exports = {
    sequelize
}