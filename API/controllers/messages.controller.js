const voirMessages = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const infos = await voirMessagesService({ ticketId });
    res.json(infos);
  } catch (error) {
    console.log(error)
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
