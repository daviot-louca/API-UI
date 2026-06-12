const {
  getAllService,
  getOneService,
  ajouterConnaissancesService,
  modifierConnaisssancesService,
  supprimerConnaisssancesService,
  suggestionConnaissancesService
} = require("../services/baseConnaissances.service");

const getAll = async (req, res) => {
  try {
    const infos = await getAllService();
    res.json(infos);
  } catch (error) {
    console.log(error);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const infos = await getOneService({ id });
    res.json(infos);
  } catch (error) {
    console.log(error);
  }
};

const ajouterConnaissances = async (req, res) => {
  try {
    const { title, content, categoryId, ticketId } = req.body;
    const infos = await ajouterConnaissancesService({
      title,
      content,
      categoryId,
      ticketId,
    });
    res.json(infos);
  } catch (error) {
    console.log(error);
  }
};

const modifierConnaisssances = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categoryId, ticketId } = req.body;
    const infos = await modifierConnaisssancesService({
      id,
      title,
      content,
      categoryId,
      ticketId,
    });
    res.json(infos);
  } catch (error) {
    console.log(error);
  }
};

const supprimerConnaissances = async (req, res) => {
  try {
    const { id } = req.params;
    const infos = await supprimerConnaisssancesService({
      id,
    });
    res.json(infos);
  } catch (error) {
    console.log(error);
  }
};

const suggestionConnaissances = async (req, res) => {
  try {
    const {title,description} = req.body
    const suggestions = await suggestionConnaissancesService({title,description});
    res.status(200).json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des suggestions",
    });
  }
};
module.exports = {
  getAll,
  getOne,
  ajouterConnaissances,
  modifierConnaisssances,
  supprimerConnaissances,
  suggestionConnaissances
};
