const sequelize = require("../config/db.config");

const user = require("./user.model");
const ticket = require("./ticket.model");

const db = {};

// connexion sequelize
db.sequelize = sequelize;

// modèles
db.user = user;
db.ticket = ticket;

// relations
db.user.hasMany(db.ticket,{foreignKey:"userId",onDelete:"CASCADE"});
db.ticket.belongsTo(db.user);

module.exports = db;