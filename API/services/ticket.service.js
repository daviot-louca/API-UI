const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");
const Category = require("../models/categories.model");
const activites = require("../models/activite.model");
const tags = require("../models/tags.model");
const { Op } = require("sequelize");

// SEE ALL ADMIN
const seeAllService = async ({
  pageNumber = 1,
  limitNumber = 10,
  status = "all",
  categoryId = "all",
  priority = "all",
  sort = "recent",
  search = "",
}) => {
  const limit = Number(limitNumber) || 10;

  const offset = (pageNumber - 1) * limit;

  // FILTERS
  const whereCondition = {};

  // STATUS
  if (status && status !== "all") {
    whereCondition.status = status;
  }

  // CATEGORY
  if (categoryId && categoryId !== "all") {
    whereCondition.categoryId = categoryId;
  }

  // PRIORITY
  if (priority && priority !== "all") {
    whereCondition.priority = priority;
  }

  if (search) {
    whereCondition[Op.or] = [
      {
        title: {
          [Op.like]: `%${search}%`,
        },
      },

      {
        description: {
          [Op.like]: `%${search}%`,
        },
      },
      {
        priority: {
          [Op.like]: `%${search}%`,
        },
      },
      {
        status: {
          [Op.like]: `%${search}%`,
        },
      },
      {
        "$category.name$": {
          [Op.like]: `%${search}%`,
        },
      },
      {
        "$user.username$": {
          [Op.like]: `%${search}%`,
        },
      },
    ];
  }

  // SORT
  let order = [["updatedAt", "DESC"]];

  if (sort === "oldest") {
    order = [["updatedAt", "ASC"]];
  }

  if (sort === "az") {
    order = [["title", "ASC"]];
  }

  if (sort === "za") {
    order = [["title", "DESC"]];
  }

  const data = await Ticket.findAndCountAll({
    where: whereCondition,

    order,

    limit,

    offset,

    include: [
      User,
      {
        model: Category,
        as: "category",
      },
    ],
  });

  return data;
};

// SEE USER TICKETS
const seeTicketService = async ({
  id,
  pageNumber = 1,
  limitNumber = 10,
  status = "all",
  categoryId = "all",
  priority = "all",
  sort = "recent",
  search = "",
}) => {
  const limit = Number(limitNumber) || 10;

  const offset = (pageNumber - 1) * limit;

  // FILTERS
  const whereCondition = {
    userId: id,
  };

  // STATUS
  if (status && status !== "all") {
    whereCondition.status = status;
  }

  // CATEGORY
  if (categoryId && categoryId !== "all") {
    whereCondition.categoryId = categoryId;
  }

  // PRIORITY
  if (priority && priority !== "all") {
    whereCondition.priority = priority;
  }

  // SORT
  let order = [["updatedAt", "DESC"]];

  if (sort === "oldest") {
    order = [["updatedAt", "ASC"]];
  }

  if (sort === "az") {
    order = [["title", "ASC"]];
  }

  if (sort === "za") {
    order = [["title", "DESC"]];
  }

  if (search) {
    whereCondition[Op.or] = [
      {
        title: {
          [Op.like]: `%${search}%`,
        },
      },

      {
        description: {
          [Op.like]: `%${search}%`,
        },
      },
    ];
  }

  const data = await Ticket.findAndCountAll({
    where: whereCondition,

    order,

    limit,

    offset,

    include: [
      User,
      {
        model: Category,
        as: "category",
      },
    ],
  });

  return data;
};

// SEE ONE
const seeTheTicketService = async (id) => {
  const data = await Ticket.findByPk(id, {
    include: [
      User,
      {
        model: Category,
        as: "category",
      },
    ],
  });

  return data;
};

// CREATE
const createTicketService = async ({
  id,
  title,
  description,
  status,
  priority,
}) => {
  //recherche par rapport aux tags
  const texteComplet = (title + " " + description).toLowerCase();
  const allTag = await tags.findAll();
  const CompterTagsParCategory = () => {
    const compteurCategory = {};
    for (var indexTag = 0; indexTag < allTag.length; indexTag++) {
      if (texteComplet.includes(allTag[indexTag].nom)) {
        if (compteurCategory[allTag[indexTag].categoryId] === undefined) {
          compteurCategory[allTag[indexTag].categoryId] = 1;
        } else {
          compteurCategory[allTag[indexTag].categoryId]++;
        }
      }
    }
    return compteurCategory;
  };
  const compteurCategories = CompterTagsParCategory();
  const trouverCategorieGagnante = (compteurCategories) => {
    let max = 0;
    let indexMax = 0;
    const keys = Object.keys(compteurCategories);
    for (let indexCompteur = 0; indexCompteur < keys.length; indexCompteur++) {
      if (compteurCategories[keys[indexCompteur]] > max) {
        max = compteurCategories[keys[indexCompteur]];
        indexMax = keys[indexCompteur];
      }
    }
    return {indexMax,max};
  };

  const compteurFiabilite = (max, compteurCategories) => {
    const values = Object.values(compteurCategories);
    const total = values.reduce((acc, valeur) => acc + valeur, 0);
    const fiabilite = (max / total)*100;
    return fiabilite;
  };

  const {indexMax} = trouverCategorieGagnante(compteurCategories);
  const {max} = trouverCategorieGagnante(compteurCategories);
  const categoryGagnante = await Category.findByPk(indexMax);
  const categoryvide = await Category.findOne({ where: { name: "Autres" } });
  const fiabilite = compteurFiabilite(max, compteurCategories);
  //envoie du tic
  const envoie = await Ticket.create({
    userId: id,
    categoryId: indexMax || categoryvide.id,
    type: categoryGagnante?.name || categoryvide.name,
    title,
    description,
    status,
    priority,
    scoreFiabilite: fiabilite,
  });
  await activites.create({
    action: "ticket créé",
    description: `création du ticket ${title}`,
    userId: id,
    ticketId: envoie.id,
  });
};

// UPDATE
const updateTicketService = async ({
  id,
  role,
  ticketId,
  type,
  title,
  description,
  status,
  priority,
}) => {
  const ticket = await Ticket.findByPk(ticketId);
  const ancienStatus = ticket.status;
  const anciennePriorite = ticket.priority;

  if (!ticket) {
    return "ticket introuvable";
  }

  if (role !== "administrateur" && ticket.userId !== id) {
    return "accès interdit";
  }

  // TYPE
  if (type !== undefined) {
    ticket.type = type;
  }

  // TITLE
  if (title !== undefined) {
    ticket.title = title;
  }

  // DESCRIPTION
  if (description !== undefined) {
    ticket.description = description;
  }

  // STATUS
  if (status !== undefined) {
    ticket.status = status;
  }

  // PRIORITY
  if (priority !== undefined) {
    ticket.priority = priority;
  }
  await ticket.save();
  if (ancienStatus !== ticket.status) {
    await activites.create({
      action: "Statut modifié",
      description: `Ticket passé de ${ancienStatus} à ${status}`,
      userId: id,
      ticketId: ticket.id,
    });
  }

  if (anciennePriorite !== ticket.priority) {
    await activites.create({
      action: "Priorité modifiée",
      description: `Ticket passé de ${anciennePriorite} à ${priority}`,
      userId: id,
      ticketId: ticket.id,
    });
  }

  return ticket;
};

// DELETE
const deleteTicketService = async ({ ticketId, id, role }) => {
  const whereCondition =
    role === "administrateur"
      ? { id: ticketId }
      : {
          id: ticketId,
          userId: id,
        };

  const supprimer = await Ticket.destroy({
    where: whereCondition,
  });

  return supprimer;
};

// STATS
const statsTicketService = async (id) => {
  const total = await Ticket.count({
    where: {
      userId: id,
    },
  });

  const remis = await Ticket.count({
    where: {
      userId: id,
      status: "remis",
    },
  });

  const ouvert = await Ticket.count({
    where: {
      userId: id,
      status: "ouvert",
    },
  });

  const enCours = await Ticket.count({
    where: {
      userId: id,
      status: "en cours",
    },
  });

  const resolu = await Ticket.count({
    where: {
      userId: id,
      status: "résolu",
    },
  });

  return {
    total,
    remis,
    ouvert,
    enCours,
    resolu,
  };
};

const adminStatsService = async () => {
  const total = await Ticket.count();
  const utilisateurs = await User.count();
  // STATUS
  const remis = await Ticket.count({
    where: {
      status: "remis",
    },
  });

  const enCours = await Ticket.count({
    where: {
      status: "en cours",
    },
  });

  const resolu = await Ticket.count({
    where: {
      status: "résolu",
    },
  });
  //PRIORIT2
  const faible = await Ticket.count({
    where: {
      priority: "faible",
    },
  });
  const moyenne = await Ticket.count({
    where: {
      priority: "moyenne",
    },
  });
  const haute = await Ticket.count({
    where: {
      priority: "haute",
    },
  });
  const urgente = await Ticket.count({
    where: {
      priority: "urgente",
    },
  });
  return {
    total,

    status: {
      remis,
      enCours,
      resolu,
      utilisateurs,
    },
    priority: {
      faible,
      moyenne,
      haute,
      urgente,
    },
  };
};

const adminStatsEvolutionService = async () => {
  const dateLimite = new Date();
  dateLimite.setDate(dateLimite.getDate() - 7);

  const tickets = await Ticket.findAll({
    where: {
      createdAt: {
        [Op.gte]: dateLimite,
      },
    },
  });
  const groupes = {};
  tickets.forEach((ticket) => {
    const date = new Date(ticket.createdAt).toLocaleDateString();

    if (date in groupes) {
      groupes[date]++;
    } else {
      groupes[date] = 1;
    }
  });
  const evolutionData = Object.entries(groupes).map(([date, tickets]) => ({
    date,
    tickets,
  }));
  return evolutionData;
};

module.exports = {
  seeTicketService,
  createTicketService,
  updateTicketService,
  deleteTicketService,
  seeAllService,
  seeTheTicketService,
  statsTicketService,
  adminStatsService,
  adminStatsEvolutionService,
};
