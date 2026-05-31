import axios from "axios";

const url = "http://localhost:3030";

// VOIR TICKETS USER
export const voirTickets = async (
    token,
    page,
    status,
    categoryId,
    priority,
    sort,
    search
) => {

    const reponse = await axios.get(

        `${url}/tickets`,

        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            },

            params: {
                page,
                status,
                categoryId,
                priority,
                sort,
                search
            }
        }
    );

    return reponse.data;
};

// VOIR UN TICKET
export const voirUnTicket = async (
    id,
    token
) => {

    const reponse = await axios.get(
        `${url}/tickets/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return reponse.data;
};

// AJOUT
export const ajoutTickets = async (
    {
        categoryId,
        titre,
        description,
        priority = "faible",
        token
    }
) => {
    const reponse = await axios.post(
        `${url}/tickets`,
        {
            categoryId,
            title: titre,
            description,
            priority
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return reponse.data;
};

// DELETE
export const supprimerTickets = async (
    id,
    token
) => {

    const reponse = await axios.delete(
        `${url}/tickets/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return reponse.data;
};

// UPDATE
export const modifierTicket = async (
    id,
    token,
    updates
) => {
    const payload =
        typeof updates === "string"
            ? { status: updates }
            : updates;

    const reponse = await axios.put(
        `${url}/tickets/${id}`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return reponse.data;
};

// STATS
export const voirStatsTickets = async (
    token
) => {

    const reponse = await axios.get(
        `${url}/tickets/stats`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return reponse.data;
};
