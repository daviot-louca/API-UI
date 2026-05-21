import {
    createContext,
    useState
} from "react";

import {
    voirTickets,
    voirUnTicket,
    ajoutTickets,
    supprimerTickets,
    modifierTicket,
    voirStatsTickets
} from "../services/ticket.service";

import {
    voirToutTickets,
    voirAdminStats
} from "../services/admin.service";

// CONTEXT
export const TicketContext =
    createContext();

// PROVIDER
export function TicketProvider({
    children
}) {

    // STATS
    const [stats, setStats] = useState({
        total: 0,
        remis: 0,
        ouvert: 0,
        enCours: 0,
        resolu: 0
    });
    const [adminStats, setAdminStats] =
        useState(null);

    // TICKETS
    const [tickets, setTickets] =
        useState([]);

    // TOTAL
    const [totalTickets, setTotalTickets] =
        useState(0);

    // ONE TICKET
    const [ticket, setTicket] =
        useState();

    // PAGINATION
    const [currentPage, setCurrentPage] =
        useState(1);

    // FILTER
    const [selectedStatus, setSelectedStatus] =
        useState("all");

    // USER TICKETS
    const voirTicket = async (
        page,
        status = "all"
    ) => {

        try {

            const token =
                localStorage.getItem("token");

            const data =
                await voirTickets(
                    token,
                    page,
                    status
                );

            setTickets(data.rows);

            setTotalTickets(data.count);

        } catch (error) {

            console.log(error);
        }
    };

    // ADMIN TICKETS
    const voirToutTicket = async (
        page,
        status = "all"
    ) => {

        try {

            const token =
                localStorage.getItem("token");

            const data =
                await voirToutTickets(
                    token,
                    page,
                    status
                );

            setTickets(data.rows);

            setTotalTickets(data.count);

        } catch (error) {

            console.log(error);
        }
    };

    // VOIR UN TICKET
    const VoirUnTicketContext =
        async (id) => {

            try {

                const token =
                    localStorage.getItem("token");

                const data =
                    await voirUnTicket(
                        id,
                        token
                    );

                setTicket(data);

            } catch (error) {

                console.log(error);
            }
        };

    // AJOUT
    const ajoutTicket = async (
        type,
        titre,
        description
    ) => {

        try {

            const token =
                localStorage.getItem("token");

            await ajoutTickets(
                type,
                titre,
                description,
                token
            );

            voirTicket(
                currentPage,
                selectedStatus
            );

            voirStatsTicket();

        } catch (error) {

            console.log(error);
        }
    };

    // DELETE
    const supprimerTicket =
        async (id) => {

            try {

                const token =
                    localStorage.getItem("token");

                await supprimerTickets(
                    id,
                    token
                );

                voirToutTicket(
                    currentPage,
                    selectedStatus
                );

                voirStatsTicket();

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

            const token =
                localStorage.getItem("token");

            await modifierTicket(
                id,
                token,
                newstatus
            );

            voirToutTicket(
                currentPage,
                selectedStatus
            );

            voirAdminStatistiques();
            voirStatsTicket();

        } catch (error) {

            console.log(error);
        }
    };

    // STATS
    const voirStatsTicket =
        async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const data =
                    await voirStatsTickets(token);

                setStats(data);

            } catch (error) {

                console.log(error);
            }
        };

    // ADMIN STATS
    const voirAdminStatistiques =
        async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const data =
                    await voirAdminStats(token);

                setAdminStats(data);

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
                totalTickets,
                stats,
                adminStats,
                voirAdminStatistiques,

                // PAGINATION
                currentPage,
                setCurrentPage,

                // FILTER
                selectedStatus,
                setSelectedStatus,

                // ACTIONS
                voirTicket,
                voirToutTicket,
                VoirUnTicketContext,
                voirStatsTicket,
                voirAdminStatistiques,
                ajoutTicket,
                supprimerTicket,
                modifierTickets

            }}
        >

            {children}

        </TicketContext.Provider>
    );
}