const messages = require("../models/message.model");
const user = require("../models/user.model");
const Ticket = require("../models/ticket.model");
const { Op } = require("sequelize");
const voirMessagesService = async ({ ticketId, userId, role }) => {
  const ticket = await Ticket.findByPk(ticketId);

  if (!ticket) {
    throw new Error("Ticket introuvable");
  }

  if (role !== "administrateur" && ticket.userId !== userId) {
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

const voirTicketsMessagerieService = async (userId) => {
  const tickets = await Ticket.findAll({
    where: {
      userId,
    },
    include: [
      user,
      {
        model: messages,
        required: true,
      },
    ],
  });

  return tickets;
};

const voirToutTicketsMessageriesService = async () => {
  const tickets = await Ticket.findAll({
    include: [
      user,
      {
        model: messages,
        required: true,
      },
    ],
  });
  return tickets;
};

const marquerMessagesLusService = async (
  ticketId,
  currentUserId
) => {
  await messages.update(
    {
      isRead: true,
    },
    {
      where: {
        ticketId,
        isRead: false,
        userId: {
          [Op.ne]: currentUserId,
        },
      },
    }
  );
};

module.exports = {
  voirMessagesService,
  envoyerMessagesService,
  voirTicketsMessagerieService,
  voirToutTicketsMessageriesService,
  marquerMessagesLusService
};
