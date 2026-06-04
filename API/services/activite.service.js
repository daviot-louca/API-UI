const activites = require("../models/activite.model");
const Ticket = require("../models/ticket.model");
const { Op } = require("sequelize");

const voirToutesActivitesService = async () => {
  const data = await activites.findAll({ order: [["createdAt", "DESC"]] });
  return data;
};

const voirmesActivitesRecentesService = async (id) => {
  const tickets = await Ticket.findAll({
    where: {
      userId: id,
    },
  });

  const ticketsIds = tickets.map((ticket) => ticket.id);

  const data = await activites.findAll({
    where: {
      ticketId: {
        [Op.in]: ticketsIds,
      },
    },
    order: [["createdAt", "DESC"]],
  });

  return data;
};
module.exports = {
  voirToutesActivitesService,
  voirmesActivitesRecentesService,
};
