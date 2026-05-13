import { useState } from "react";

import {
    voirTickets,
    ajoutTickets,
    voirToutTickets,
    supprimerTickets,
    modifierTicket
} from "../services/ticket.service";

export function useTickets() {

    const [tickets, setTickets] = useState([]);

    // VOIR SES TICKETS
    const voirTicket = async () => {

        try {

            const token = localStorage.getItem("token");

            const data = await voirTickets(token);

            setTickets(data);

        } catch (error) {

            console.log(error);
        }
    };

    // AJOUTER TICKET
    const ajoutTicket = async (titre, description) => {

        try {

            const token = localStorage.getItem("token");

            if (titre.trim().length === 0) {

                alert("veuillez mettre un titre");
                return;
            }

            if (description.trim().length < 10) {

                alert("Veuillez mettre une description d'un minima de 10 caractères");
                return;
            }

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

    // VOIR TOUS LES TICKETS
    const voirToutTicket = async () => {

        try {

            const token = localStorage.getItem("token");

            const data = await voirToutTickets(token);

            setTickets(data);

        } catch (error) {

            console.log(error);
        }
    };

    // SUPPRIMER TICKET
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

    // MODIFIER TICKET
    const modifierTickets = async (id, newstatus) => {

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

    return {

        tickets,
        setTickets,

        voirTicket,
        ajoutTicket,
        voirToutTicket,
        supprimerTicket,
        modifierTickets
    }
}