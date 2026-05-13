import axios from "axios";

const url = "http://localhost:3030";

export const voirTickets = async (token) => {
    const reponse = await axios.get(`${url}/tickets`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return reponse.data
}

export const ajoutTickets = async (titre,description,token) => {
    const reponse = await axios.post(`${url}/tickets`,
        {
            title: titre,
            description
        }, {
        headers:
        {
            Authorization: `Bearer ${token}`
        }
    });
    return reponse.data
}

export const supprimerTickets = async (id,token) => {
    const reponse = await axios.delete(`${url}/tickets/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return reponse.data
}

export const modifierTicket = async (id,token, newstatus)=>{
    const reponse = await axios.put(`${url}/tickets/${id}`, {
        status: newstatus
    }, { headers: { Authorization: `Bearer ${token}` } });
    return reponse.data
}