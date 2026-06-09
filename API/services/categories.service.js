const categories = require("../models/categories.model");
const tags = require("../models/tags.model")

const allCategoriesServices = async () => {
  const infos = await categories.findAll({include:tags});
  return infos;
};

const ajoutCategoriesServices = async ({ name, description, icon, color }) => {
  const infos = await categories.create({
    name,
    description,
    icon,
    color,
  });
  return infos;
};

const modifierCategoriesServices = async ({
  id,
  name,
  description,
  icon,
  color,
}) => {
  const category = await categories.findByPk(id);
  if (!category) {
    console.log("trouve pas la categorie");
  }
  if (name !== undefined) {
    category.name = name;
  }
  if (description !== undefined) {
    category.description = description;
  }
  if (icon !== undefined) {
    category.icon = icon;
  }
  if (color !== undefined) {
    category.color = color;
  }
  return await category.save();
};

const supprimerCategoriesServices = async ({ id }) => {
  const infos = await categories.destroy({ where: { id } });
  return infos;
};

module.exports = {allCategoriesServices,ajoutCategoriesServices,modifierCategoriesServices,supprimerCategoriesServices}