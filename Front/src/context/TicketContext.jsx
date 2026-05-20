import {
    createContext,
    useState
} from "react";

import {
    voirTickets,
    voirUnTicket,
    ajoutTickets,
    supprimerTickets,
    modifierTicket
} from "../services/ticket.service";

import {
    voirToutTickets
} from "../services/admin.service";

export const TicketContext = createContext();

export function TicketProvider({ children }) {

    const [tickets, setTickets] = useState([]);

    const [ticket, setTicket] = useState();

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);

    // USER TICKETS
    const voirTicket = async (page) => {

        try {

            const token = localStorage.getItem("token");

            const data = await voirTickets(
                token,
                page
            );

            // IMPORTANT
            setTickets(data);

            console.log(data);

        } catch (error) {

            console.log(error);
        }
    };

    // ADMIN TICKETS
    const voirToutTicket = async (currentPage) => {

        try {

            const token = localStorage.getItem("token");

            const data = await voirToutTickets(
                token,
                currentPage
            );

            // IMPORTANT
            setTickets(data);

        } catch (error) {

            console.log(error);
        }
    };

    // VOIR UN TICKET
    const VoirUnTicketContext = async (id) => {

        try {

            const token =
                localStorage.getItem("token");

            const data =
                await voirUnTicket(id, token);

            setTicket(data);

        } catch (error) {

            console.log(error);
        }
    };

    // AJOUT
    const ajoutTicket = async (
        titre,
        description
    ) => {

        try {

            const token = localStorage.getItem("token");

            await ajoutTickets(
                titre,
                description,
                token
            );

            voirTicket(currentPage);

        } catch (error) {

            console.log(error);
        }
    };

    // DELETE
    const supprimerTicket = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await supprimerTickets(
                id,
                token
            );

            voirToutTicket(currentPage);

        } catch (error) {

            console.log(error);
        }
    };

    // UPDATE
    const modifierTickets = async (
        id,
        newstatus
    ) => {

        try {

            const token = localStorage.getItem("token");

            await modifierTicket(
                id,
                token,
                newstatus
            );

            voirToutTicket(currentPage);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <TicketContext.Provider
            value={{

                // STATES
                tickets,
                ticket,

                // PAGINATION
                currentPage,
                setCurrentPage,

                // ACTIONS
                voirTicket,
                voirToutTicket,
                VoirUnTicketContext,

                ajoutTicket,
                supprimerTicket,
                modifierTickets
            }}
        >

            {children}

        </TicketContext.Provider>
    );
}