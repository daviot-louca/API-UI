import axios from "axios";

const url = "http://localhost:3030";

// VOIR TICKETS USER
export const voirTickets = async (
    token,
    page,
    status = "all",
    type = "all"
) => {

    const reponse = await axios.get(
        `${url}/tickets?page=${page}&status=${status}&type=${type}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
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
    type,
    titre,
    description,
    token
) => {

    const reponse = await axios.post(
        `${url}/tickets`,
        {
            type,
            title: titre,
            description
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
    newstatus
) => {

    const reponse = await axios.put(
        `${url}/tickets/${id}`,
        {
            status: newstatus
        },
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

