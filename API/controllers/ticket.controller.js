const {
    seeTicketService,
    createTicketService,
    updateTicketService,
    deleteTicketService,
    seeAllService,
    seeTheTicketService,
    statsTicketService,
    adminStatsService
} = require("../services/ticket.service");

// SEE ALL ADMIN
const seeAll = async (req, res) => {

    try {

        const {
            page,
            limit,
            status,
            type
        } = req.query;

        const pageNumber =
            Number(page) || 1;

        const limitNumber =
            Number(limit) || 5;

        const informations =
            await seeAllService({
                pageNumber,
                limitNumber,
                status,
                type
            });

        res.json(informations);

    } catch (error) {

        console.log(error);

        res.status(500).json(
            "erreur avec le seeAll"
        );
    }
};

// SEE USER TICKETS
const seeTicket = async (req, res) => {

    try {

        const id = req.user.id;

        const {
            page,
            limit,
            status,
            type
        } = req.query;

        const pageNumber =
            Number(page) || 1;

        const limitNumber =
            Number(limit) || 5;

        const informations =
            await seeTicketService({
                id,
                pageNumber,
                limitNumber,
                status,
                type
            });

        res.json(informations);

    } catch (error) {

        console.log(error);

        res.status(500).json(
            "erreur avec le seeTicket"
        );
    }
};

// SEE ONE TICKET
const seeTheTicket = async (req, res) => {

    try {

        const id = req.params.id;

        const informations =
            await seeTheTicketService(id);

        res.json(informations);

    } catch (error) {

        console.log(error);

        res.status(500).json(
            "erreur dans le seeTheTicket"
        );
    }
};

// CREATE
const createTicket = async (req, res) => {

    try {

        const id = req.user.id;

        const {
            type,
            title,
            description,
            status
        } = req.body;

        const informations =
            await createTicketService({
                id,
                type,
                title,
                description,
                status
            });

        res.json(informations);

    } catch (error) {

        console.log(error);

        res.status(500).json(
            "erreur dans le controller ou dans le service"
        );
    }
};

// UPDATE
const updateTicket = async (req, res) => {

    try {

        const ticketId = req.params.id;

        const id = req.user.id;

        const role = req.user.role;

        const {
            type,
            title,
            description,
            status
        } = req.body;

        const info =
            await updateTicketService({
                id,
                role,
                ticketId,
                type,
                title,
                description,
                status
            });

        res.json(info);

    } catch (error) {

        console.log(error);

        res.status(500).json(
            "erreur dans le controller ou dans le service"
        );
    }
};

// DELETE
const deleteTicket = async (req, res) => {

    try {

        const ticketId = req.params.id;

        const id = req.user.id;

        const role = req.user.role;

        const info =
            await deleteTicketService({
                ticketId,
                id,
                role
            });

        res.json(info);

    } catch (error) {

        console.log(error);

        res.status(500).json(
            "erreur dans le controller ou dans le service"
        );
    }
};

// STATS
const statsTickets = async (req, res) => {

    try {

        const id = req.user.id;

        const informations =
            await statsTicketService(id);

        res.json(informations);

    } catch (error) {

        console.log(error);

        res.status(500).json(
            "erreur stats tickets"
        );
    }
};

const adminStats = async (
    req,
    res
) => {

    try {

        const informations =
            await adminStatsService();

        res.json(informations);

    } catch (error) {

        console.log(error);

        res.status(500).json(
            "erreur admin stats"
        );
    }
};

module.exports = {
    seeTicket,
    createTicket,
    updateTicket,
    deleteTicket,
    seeAll,
    seeTheTicket,
    statsTickets,
    adminStats
};