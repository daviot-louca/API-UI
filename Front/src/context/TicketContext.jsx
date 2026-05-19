import {
    createContext,
    useState,
    useEffect
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

    // USER TICKETS
    const voirTicket = async () => {

        try {

            const token = localStorage.getItem("token");

            const data = await voirTickets(token);

            setTickets(data);
            console.log(data)
        } catch (error) {

            console.log(error);
        }
    };

    // ADMIN TICKETS
    const voirToutTicket = async () => {

        try {

            const token = localStorage.getItem("token");

            const data = await voirToutTickets(token);

            setTickets(data);

        } catch (error) {

            console.log(error);
        }
    };
        const [ticket, setTicket] = useState();

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

            voirTicket();

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

            voirToutTicket();

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

            voirToutTicket();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <TicketContext.Provider
            value={{

                ticket,
                tickets,

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
    )
}