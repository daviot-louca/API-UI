const {
  allCategoriesServices,
  ajoutCategoriesServices,
  modifierCategoriesServices,
  supprimerCategoriesServices,
} = require("../services/categories.service");

const allCategories = async (req, res) => {
  try {
    const infos = await allCategoriesServices();
    res.json(infos);
  } catch (error) {
    console.log(error);
  }
};

const ajoutCategories = async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;
    const infos = await ajoutCategoriesServices({
      name,
      description,
      icon,
      color,
    });
    res.json(infos);
  } catch (error) {
    res.status(500).json("problème dans le ajout categories");
  }
};

const modifierCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, color } = req.body;
    const infos = await modifierCategoriesServices({
      id,
      name,
      description,
      icon,
      color,
    });
    res.json(infos);
  } catch (error) {
    console.log(error);
  }
};

const supprimerCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const infos = await supprimerCategoriesServices({
      id,
    });
    res.json(infos);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allCategories,
  ajoutCategories,
  modifierCategories,
  supprimerCategories,
};
