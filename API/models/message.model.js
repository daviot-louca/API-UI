const {
    DataTypes
} = require("sequelize");

const db =
    require("../config/db.config");

const Message =
    db.define("message", {

        id: {

            type: DataTypes.INTEGER,

            primaryKey: true,

            autoIncrement: true
        },

        content: {

            type: DataTypes.TEXT,

            allowNull: false
        },

        isRead: {

            type: DataTypes.BOOLEAN,

            defaultValue: false
        }
    });

module.exports = Message;