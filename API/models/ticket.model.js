const { DataTypes } = require('sequelize');
const db = require("../config/db.config");

const ticket = db.define("ticket", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    type:{
        allowNull:false,
        type:DataTypes.TEXT
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT
    },

    status: {
        type: DataTypes.ENUM("remis","en cours","résolu"),
        defaultValue:"remis"
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    categoryId:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    priority:{
        type:DataTypes.ENUM("faible","moyenne","haute","urgente"),
        defaultValue:"faible"
    },
    closedAt:{
        type:DataTypes.DATE,
        allowNull:true
    }
    
},{
        timestamps:true
    });

module.exports = ticket;
