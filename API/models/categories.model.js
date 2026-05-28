const {DataTypes} = require ("sequelize")
const db = require("../config/db.config")

const category= db.define("category",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    icon:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    color:{
        type:DataTypes.TEXT,
        allowNull:false

    }
    
},{tableName:"category"})

module.exports = category;