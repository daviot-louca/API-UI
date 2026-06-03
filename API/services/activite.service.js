const activites = require("../models/activite.model");

const voirToutesActivitesService = async () => {
  const data = await activites.findAll({order:[["createdAt","DESC"]]});
  return data;
};

const voirmesActivitesRecentesService = async (id) => {
  const data = await activites.findAll({ where: {userId: id },order:[["createdAt","DESC"]] });
  return data;
};

module.exports = {
  voirToutesActivitesService,
  voirmesActivitesRecentesService,
};
