const baseConnaissances = require("../models/BaseConnaissance");
const Category = require("../models/categories.model");
const Ticket = require("../models/ticket.model");
const getAllService = async () => {
  const infos = await baseConnaissances.findAll({
    include: [Category, Ticket],
  });
  return infos;
};

const getOneService = async ({ id }) => {
  const infos = await baseConnaissances.findByPk(id, {
    include: [Ticket, Category],
  });
  return infos;
};

const ajouterConnaissancesService = async ({
  title,
  content,
  categoryId,
  ticketId,
}) => {
  const infos = await baseConnaissances.create({
    title,
    content,
    categoryId,
    ticketId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return infos;
};

const modifierConnaisssancesService = async ({
  id,
  title,
  content,
  categoryId,
  ticketId,
}) => {
  const connaissance = await baseConnaissances.findByPk(id);
  if (!connaissance) {
    throw new Error("article introuvable");
  }
  if (title !== undefined) {
    connaissance.title = title;
  }
  if (content !== undefined) {
    connaissance.content = content;
  }
  if (categoryId !== undefined) {
    connaissance.categoryId = categoryId;
  }
  if (ticketId !== undefined) {
    connaissance.ticketId = ticketId;
  }
  return connaissance.save();
};

const supprimerConnaisssancesService = async ({ id }) => {
  const infos = await baseConnaissances.destroy({ where: { id } });
  return infos;
};

const motsInutiles = [
  "de",
  "du",
  "des",
  "le",
  "la",
  "les",
  "un",
  "une",
  "et",
  "ou",
  "au",
  "aux",
  "se",
  "je",
  "tu",
  "il",
  "elle",
];
const suggestionConnaissancesService = async ({ title, description }) => {
  const analyseComplete = title + " " + description;
  const motsUtils = analyseComplete
    .toLowerCase()
    .split(" ")
    .filter((mot)=> mot.length>0)
    .filter((mot) => !motsInutiles.includes(mot));
  const article = await baseConnaissances.findAll();
  const score = [];
  for (var Iarticle = 0; Iarticle < article.length; Iarticle++) {
    var points = 0;
    for (var Imots = 0; Imots < motsUtils.length; Imots++) {
      if (article[Iarticle].title.toLowerCase().includes(motsUtils[Imots])) {
        points += 5;
      }
      if (article[Iarticle].content.toLowerCase().includes(motsUtils[Imots])) {
        points += 2;
      }
    }
    score.push({ article: article[Iarticle], points: points });
  }
  const scorePlusZero = score.filter((score)=> score.points!==0)
  const scoreDecroissant  = scorePlusZero.sort((a,b)=>b.points - a.points)
  const scoreCinqMeilleurs = scoreDecroissant.slice(0,5)
  return scoreCinqMeilleurs
};

module.exports = {
  getAllService,
  getOneService,
  ajouterConnaissancesService,
  modifierConnaisssancesService,
  supprimerConnaisssancesService,
  suggestionConnaissancesService
};
