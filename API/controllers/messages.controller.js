const {voirMessagesService,envoyerMessagesService} = require("../services/messages.service")

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
        const {ticketId} = req.params;
        const {message} = req.body
        const userId = req.user.id
        const infos  = await envoyerMessagesService({ticketId,message,userId})
        res.json(infos)
    } catch (error) {
        console.log(error)
    }
};

module.exports = {voirMessages,envoyerMessages}
