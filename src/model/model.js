const sequelize = require('sequelize')
const db = require('../config/database')

const { DataTypes } = sequelize

const User = db.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    refresh_token: DataTypes.TEXT
},{
    freezeTableName: true
})

module.exports = User