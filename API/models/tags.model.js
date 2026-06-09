const {DataTypes} = require ("sequelize")
const db = require ("../config/db.config")

const tags = db.define("tags",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nom:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    categoryId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
})

module.exports = tags;