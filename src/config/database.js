const sequelize = require('sequelize')

const db = new sequelize({
    database: 'jwt_auth',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = db