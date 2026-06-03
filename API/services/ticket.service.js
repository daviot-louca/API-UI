const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");
const Category = require("../models/categories.model");
const activites = require("../models/activite.model");
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
  categoryId,
  title,
  description,
  status,
  priority,
}) => {
  const category = await Category.findByPk(categoryId);

  if (!category) {
    throw new Error("catégorie introuvable");
  }

  const envoie = await Ticket.create({
    userId: id,

    categoryId,

    type: category.name,

    title,

    description,

    status,

    priority,
  });
  await activites.create({
    action: "ticket créé",
    description: `création du ticket ${title}`,
    userId: id,
    ticketId: envoie.id,
  });

  return envoie;
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

  // STATUS
  const remis = await Ticket.count({
    where: {
      status: "remis",
    },
  });

  const ouvert = await Ticket.count({
    where: {
      status: "ouvert",
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

  // TYPES
  const posteTravail = await Ticket.count({
    where: {
      type: "Poste de travail",
    },
  });

  const telephonie = await Ticket.count({
    where: {
      type: "Téléphonie",
    },
  });

  const compteAcces = await Ticket.count({
    where: {
      type: "Compte d'accès",
    },
  });

  const messagerie = await Ticket.count({
    where: {
      type: "Messagerie",
    },
  });

  const autres = await Ticket.count({
    where: {
      type: "Autres",
    },
  });

  return {
    total,

    status: {
      remis,
      ouvert,
      enCours,
      resolu,
    },

    types: {
      posteTravail,
      telephonie,
      compteAcces,
      messagerie,
      autres,
    },
  };
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
};
