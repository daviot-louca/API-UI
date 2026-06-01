const messages = require("../models/message.model");
const user = require("../models/user.model");
const Ticket = require("../models/ticket.model")
const voirMessagesService = async ({
  ticketId,
  userId,
  role,
}) => {
  const ticket = await Ticket.findByPk(ticketId);

  if (!ticket) {
    throw new Error("Ticket introuvable");
  }

  if (
    role !== "administrateur" &&
    ticket.userId !== userId
  ) {
    throw new Error("Accès refusé");
  }

  const infos = await messages.findAll({
    where: { ticketId },
    include: [user],
    order: [["createdAt", "ASC"]],
  });

  return infos;
};

const envoyerMessagesService = async ({ ticketId, message, userId }) => {
  const infos = await messages.create({
    ticketId,
    message,
    userId,
    isRead: false,
  });
  return infos;
};

module.exports = { voirMessagesService, envoyerMessagesService };
