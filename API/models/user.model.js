const db = require("../config/db.config")
const { DataTypes } = require('sequelize')

const user = db.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
    username: { type: DataTypes.STRING, allowNull:false,unique:true },
    email:{type:DataTypes.STRING,allowNull:false,unique:true},
    password:{type:DataTypes.STRING,allowNull:false},
    role:{type:DataTypes.STRING,allowNull:false, defaultValue:"user"}
})

module.exports = user;