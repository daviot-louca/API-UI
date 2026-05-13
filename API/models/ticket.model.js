const { DataTypes } = require('sequelize');
const db = require("../config/db.config");

const ticket = db.define("ticket", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
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
        type: DataTypes.ENUM("remis","ouvert","en cours","résolu"),
        defaultValue:"remis"
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = ticket;