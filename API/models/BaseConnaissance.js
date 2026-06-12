const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const BaseConnaissances = db.define("BaseConnaissances", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  ticketId: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  
},{timestamps:true});

module.exports = BaseConnaissances;
