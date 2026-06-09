const sequelize = require("../config/db.config");

const User = require("./user.model");

const Ticket = require("./ticket.model");

const Message = require("./message.model");

const category = require("./categories.model");
const activites = require("./activite.model");
const tags = require ("./tags.model")
const db = {};

/* CONNEXION */

db.sequelize = sequelize;

/* MODELS */

db.user = User;

db.ticket = Ticket;

db.message = Message;

db.categories = category;

db.activites = activites;

db.tags = tags;

/* RELATIONS USER ↔ TICKET */

db.user.hasMany(db.ticket, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

db.ticket.belongsTo(db.user, {
  foreignKey: "userId",
});

/* RELATIONS USER ↔ MESSAGE */

db.user.hasMany(db.message, {
  foreignKey: "userId",
  onDelete: "NO ACTION",
});

db.message.belongsTo(db.user, {
  foreignKey: "userId",
  onDelete: "NO ACTION",
});

/* RELATIONS TICKET ↔ MESSAGE */

db.ticket.hasMany(db.message, {
  foreignKey: "ticketId",
  onDelete: "CASCADE",
});

db.message.belongsTo(db.ticket, {
  foreignKey: "ticketId",
});

/*Relations Tickets <=> Categories */

db.ticket.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "category",
});
db.categories.hasMany(db.ticket, { foreignKey: "categoryId" });

/*Relations activite <=> user */

db.user.hasMany(db.activites, {foreignKey:"userId"})

db.activites.belongsTo(db.user, {foreignKey:"userId"})

/*Relations ticket <=> activite */

db.ticket.hasMany(db.activites, {foreignKey:"ticketId"})

db.activites.belongsTo(db.ticket, {foreignKey:"ticketId"})

/*Relations categories <=> tags */

db.categories.hasMany(db.tags,{foreignKey:"categoryId",onDelete:"CASCADE"})
db.tags.belongsTo(db.categories,{foreignKey:"categoryId"})

module.exports = db;
