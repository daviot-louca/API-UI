const messages = require("../models/message.model");
const user = require("../models/user.model");
const voirMessagesService = async ({ ticketId }) => {
  const infos = await messages.findAll({
    where: { ticketId },
    include: [user],
    order: [["createdAt", "ASC"]],
  });
  return infos;
};

const envoyerMessagesService = async ({ ticketId, message, userId }) => {
  const infos = await messages.create(
    {
      ticketId,
      message,
      userId,
      isRead: false,
    }
  );
  return infos;
};

module.exports = { voirMessagesService, envoyerMessagesService };
