const {
  voirMessagesService,
  envoyerMessagesService,
  voirTicketsMessagerieService,
  voirToutTicketsMessageriesService,
  marquerMessagesLusService
} = require("../services/messages.service");

const voirMessages = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const infos = await voirMessagesService({
      ticketId,
      userId: req.user.id,
      role: req.user.role,
    });

    res.json(infos);
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: error.message,
    });
  }
};
const envoyerMessages = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { message } = req.body;
    const userId = req.user.id;
    const infos = await envoyerMessagesService({ ticketId, message, userId });
    res.json(infos);
  } catch (error) {
    console.log(error);
  }
};

const voirTicketsMessageries = async (req, res) => {
  try {
    const tickets = await voirTicketsMessagerieService(req.user.id);

    res.json(tickets);
  } catch (error) {
    console.log(error);
  }
};

const voirToutTicketsMessageries = async (req, res) => {
  try {
    const tickets = await voirToutTicketsMessageriesService();

    res.json(tickets);
  } catch (error) {
    console.log(error);
  }
};

const marquerMessagesLus = async (req, res) => {
  try {
    console.log("ticketId", req.params.ticketId);
    console.log("userId", req.user.id);

    await marquerMessagesLusService(
      req.params.ticketId,
      req.user.id
    );

    res.json({
      message: "messages lus",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  voirMessages,
  envoyerMessages,
  voirTicketsMessageries,
  voirToutTicketsMessageries,
  marquerMessagesLus
};
