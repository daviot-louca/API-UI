const {DataTypes} = require("sequelize")
const db = require("../config/db.config")

const activites = db.define("activites",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    action:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    ticketId:{
        type:DataTypes.INTEGER,
    }
})

module.exports = activites