const Ticket = require("../models/ticket.model")
const User = require("../models/user.model")

const seeAllService = async ({ pageNumber = 1, limitNumber = 5 }) => {
    const limit = limitNumber || 5
    const offset = (pageNumber - 1) * limit
    const data = await Ticket.findAll({
        limit,
        offset,
        include: User
    })
    return data
}

const seeTicketService = async ({ id, pageNumber = 1, limitNumber = 5 }) => {
    const limit = limitNumber || 5
    const offset = (pageNumber - 1) * limit
    const data = await Ticket.findAll({
        where: { userId: id },
        limit,
        offset,
        include: User
    })
    return data
}

const seeTheTicketService = async (id) => {
    const data = await Ticket.findByPk(id,{
        include: [User]
    })
    return data
}

const createTicketService = async ({ id, title, description, status }) => {
    const envoie = await Ticket.create({
        userId: id,
        title,
        description,
        status
    });
    return envoie
}

const updateTicketService = async ({
    id,
    role,
    ticketId,
    title,
    description,
    status
}) => {

    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
        return "ticket introuvable";
    }

    if (
        role !== "admin" &&
        ticket.userId !== id
    ) {
        return "accès interdit";
    }

    if (title !== undefined) {
        ticket.title = title;
    }

    if (description !== undefined) {
        ticket.description = description;
    }

    if (status !== undefined) {
        ticket.status = status;
    }

    await ticket.save();

    return ticket;
};

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

module.exports = { seeTicketService, createTicketService, updateTicketService, deleteTicketService, seeAllService, seeTheTicketService };    