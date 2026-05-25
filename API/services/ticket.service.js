const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");

// SEE ALL ADMIN
const seeAllService = async ({
    pageNumber = 1,
    limitNumber = 10,
    status = "all",
    type = "all"
}) => {

    const limit = limitNumber || 10;

    const offset =
        (pageNumber - 1) * limit;

    // FILTER
    const whereCondition = {};

    // STATUS FILTER
    if (
        status &&
        status !== "all"
    ) {

        whereCondition.status = status;
    }

    // TYPE FILTER
    if (
        type &&
        type !== "all"
    ) {

        whereCondition.type = type;
    }

    const data = await Ticket.findAndCountAll({

        where: whereCondition,

        order: [["updatedAt", "DESC"]],

        limit,

        offset,

        include: User
    });

    return data;
};

// SEE USER TICKETS
const seeTicketService = async ({
    id,
    pageNumber = 1,
    limitNumber = 10,
    status = "all",
    type = "all"
}) => {

    const limit = limitNumber || 10;

    const offset =
        (pageNumber - 1) * limit;

    // FILTER
    const whereCondition = {
        userId: id
    };

    // STATUS FILTER
    if (
        status &&
        status !== "all"
    ) {

        whereCondition.status = status;
    }

    // TYPE FILTER
    if (
        type &&
        type !== "all"
    ) {

        whereCondition.type = type;
    }

    const data = await Ticket.findAndCountAll({

        where: whereCondition,
        order: [["updatedAt", "DESC"]],

        limit,

        offset,

        include: User
    });

    return data;
};

// SEE ONE
const seeTheTicketService = async (id) => {

    const data = await Ticket.findByPk(id, {
        include: [User]
    });

    return data;
};

// CREATE
const createTicketService = async ({
    id,
    type,
    title,
    description,
    status,
    priority
}) => {

    const envoie = await Ticket.create({

        userId: id,

        type,

        title,

        description,

        status,

        priority
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
    priority
}) => {

    const ticket =
        await Ticket.findByPk(ticketId);

    if (!ticket) {

        return "ticket introuvable";
    }

    if (
        role !== "admin" &&
        ticket.userId !== id
    ) {

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

    return ticket;
};

// DELETE
const deleteTicketService = async ({
    ticketId,
    id,
    role
}) => {

    const whereCondition =

        role === "admin"

            ? { id: ticketId }

            : {
                id: ticketId,
                userId: id
            };

    const supprimer = await Ticket.destroy({
        where: whereCondition
    });

    return supprimer;
};

// STATS
const statsTicketService = async (id) => {

    const total = await Ticket.count({
        where: {
            userId: id
        }
    });

    const remis = await Ticket.count({
        where: {
            userId: id,
            status: "remis"
        }
    });

    const ouvert = await Ticket.count({
        where: {
            userId: id,
            status: "ouvert"
        }
    });

    const enCours = await Ticket.count({
        where: {
            userId: id,
            status: "en cours"
        }
    });

    const resolu = await Ticket.count({
        where: {
            userId: id,
            status: "résolu"
        }
    });

    return {
        total,
        remis,
        ouvert,
        enCours,
        resolu
    };
};

const adminStatsService = async () => {

    const total =
        await Ticket.count();

    // STATUS
    const remis =
        await Ticket.count({
            where: {
                status: "remis"
            }
        });

    const ouvert =
        await Ticket.count({
            where: {
                status: "ouvert"
            }
        });

    const enCours =
        await Ticket.count({
            where: {
                status: "en cours"
            }
        });

    const resolu =
        await Ticket.count({
            where: {
                status: "résolu"
            }
        });

    // TYPES
    const posteTravail =
        await Ticket.count({
            where: {
                type: "Poste de travail"
            }
        });

    const telephonie =
        await Ticket.count({
            where: {
                type: "Téléphonie"
            }
        });

    const compteAcces =
        await Ticket.count({
            where: {
                type: "Compte d'accès"
            }
        });

    const messagerie =
        await Ticket.count({
            where: {
                type: "Messagerie"
            }
        });

    const autres =
        await Ticket.count({
            where: {
                type: "Autres"
            }
        });

    return {

        total,

        status: {
            remis,
            ouvert,
            enCours,
            resolu
        },

        types: {
            posteTravail,
            telephonie,
            compteAcces,
            messagerie,
            autres
        }
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
    adminStatsService
};
