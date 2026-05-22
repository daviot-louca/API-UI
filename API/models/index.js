const sequelize =
    require("../config/db.config");

const User =
    require("./user.model");

const Ticket =
    require("./ticket.model");

const Message =
    require("./message.model");

const db = {};

/* CONNEXION */

db.sequelize = sequelize;

/* MODELS */

db.user = User;

db.ticket = Ticket;

db.message = Message;

/* RELATIONS USER ↔ TICKET */

db.user.hasMany(
    db.ticket,
    {
        foreignKey: "userId",
        onDelete: "CASCADE"
    }
);

db.ticket.belongsTo(
    db.user,
    {
        foreignKey: "userId"
    }
);

/* RELATIONS USER ↔ MESSAGE */

db.user.hasMany(
    db.message,
    {
        foreignKey: "userId",
        onDelete:"NO ACTION"
    }
);

db.message.belongsTo(
    db.user,
    {
        foreignKey: "userId",
        onDelete:"NO ACTION"
    }
);

/* RELATIONS TICKET ↔ MESSAGE */

db.ticket.hasMany(
    db.message,
    {
        foreignKey: "ticketId",
        onDelete: "CASCADE"
    }
);

db.message.belongsTo(
    db.ticket,
    {
        foreignKey: "ticketId"
    }
);

module.exports = db;