import { useCallback, useMemo, useState } from "react";

import { TicketContext } from "./TicketContext";
import {
  voirTickets,
  voirUnTicket,
  ajoutTickets,
  supprimerTickets,
  modifierTicket,
  voirStatsTickets,
} from "../../services/ticket.service";
import {
  voirToutTickets,
  voirAdminStats,
  voirAdminStatsEvolutionService,
} from "../../services/admin.service";
import {
  voirTicketsMessagerie,
  voirToutTicketsMessagerie,
} from "../../services/messages.service";


import { toast } from "sonner";
const INITIAL_STATS = {
  total: 0,
  remis: 0,
  enCours: 0,
  resolu: 0,
};

export function TicketProvider({ children }) {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [adminStats, setAdminStats] = useState(null);
  const [adminEvolution, setAdminEvolution] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [ticket, setTicket] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [search, setSearch] = useState("");
  const [ticketsMessagerie, setTicketsMessagerie] = useState([]);
  const [toutTicketsMessagerie, setToutTicketsMessagerie] = useState([]);

  // USER TICKETS
  const voirTicket = useCallback(
    async (page, status, categoryId, priority, sort, search) => {
      try {
        const token = localStorage.getItem("token");

        const data = await voirTickets(
          token,

          page,

          status,

          categoryId,

          priority,

          sort,
          search,
        );

        setTickets(data.rows);

        setTotalTickets(data.count);
      } catch (error) {
        console.log(error);
      }
    },

    [],
  );

  // ADMIN TICKETS
  const voirToutTicket = useCallback(
    async (page, status = "all", categoryId, priority, sort, search) => {
      try {
        const token = localStorage.getItem("token");

        const data = await voirToutTickets(
          token,
          page,
          status,
          categoryId,
          priority,
          sort,
          search,
        );

        setTickets(data.rows);
        setTotalTickets(data.count);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  // VOIR UN TICKET
  const voirUnTicketContext = useCallback(async (id) => {
    try {
      const token = localStorage.getItem("token");

      const data = await voirUnTicket(id, token);

      setTicket(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // STATS USER
  const voirStatsTicket = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await voirStatsTickets(token);

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // ADMIN STATS
  const voirAdminStatistiques = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await voirAdminStats(token);
      setAdminStats(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const voirAdminStatsEvolution = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await voirAdminStatsEvolutionService(token);
      setAdminEvolution(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // AJOUT
  const ajoutTicket = useCallback(
    async ({ categoryId, titre, description, priority = "faible" }) => {
      try {
        const token = localStorage.getItem("token");

        toast.success("Ticket ajouté")
        await ajoutTickets({
          categoryId,
          titre,
          description,
          priority,
          token,
        });

        await voirTicket(
          currentPage,
          statusFilter,
          categoryFilter,
          priorityFilter,
          sortFilter,
          search,
        );

        await voirStatsTicket();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [
      categoryFilter,
      currentPage,
      priorityFilter,
      search,
      sortFilter,
      statusFilter,
      voirStatsTicket,
      voirTicket,
    ],
  );

  // DELETE
  const supprimerTicketAdmin = useCallback(
    async (id) => {
      try {
        const token = localStorage.getItem("token");

        await supprimerTickets(id, token);

        await voirToutTicket(currentPage, selectedStatus);

        await voirAdminStatistiques();
        await voirStatsTicket();
        toast.success("ticket supprimé")
 
      } catch (error) {
        console.log(error);
      }
    },
    [currentPage, selectedStatus, voirAdminStatistiques, voirToutTicket],
  );
  const supprimerTicket = useCallback(
    async (id) => {
      try {
        const token = localStorage.getItem("token");

        await supprimerTickets(id, token);

        await voirTicket(currentPage, selectedStatus);

        await voirAdminStatistiques();
        await voirStatsTicket();

        toast.success("Ticket supprimé")
      } catch (error) {
        console.log(error);
      }
    },
    [currentPage, selectedStatus, voirStatsTicket, voirTicket],
  );

  const voirTicketsMessagerieContext = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await voirTicketsMessagerie(token);

      setTicketsMessagerie(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const voirToutTicketsMessagerieContext = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await voirToutTicketsMessagerie(token);
      setToutTicketsMessagerie(data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  // UPDATE
  const modifierTickets = useCallback(
    async (id, updates) => {
      try {
        const token = localStorage.getItem("token");
        const updatedTicket = await modifierTicket(id, token, updates);

        setTicket(updatedTicket);
        // reset pagination
        setCurrentPage(1);
        // USER REFRESH
        await voirTicket(
          1,
          statusFilter,
          categoryFilter,
          priorityFilter,
          sortFilter,
          search,
        );

        // ADMIN REFRESH
        await voirToutTicket(
          1,
          statusFilter,
          categoryFilter,
          priorityFilter,
          sortFilter,
          search,
        );
        await voirStatsTicket();
        await voirAdminStatistiques();

        toast.success("Ticket modifié")
      } catch (error) {
        console.log(error);
      }
    },

    [
      voirAdminStatistiques,
      voirStatsTicket,
      voirToutTicket,
      voirTicket,
      statusFilter,
      categoryFilter,
      priorityFilter,
      sortFilter,
      search,
    ],
  );

  const value = useMemo(
    () => ({
      tickets,
      ticket,
      totalTickets,
      stats,
      adminStats,
      adminEvolution,
      voirAdminStatsEvolution,
      currentPage,
      setCurrentPage,
      selectedStatus,
      setSelectedStatus,
      voirTicket,
      voirToutTicket,
      VoirUnTicketContext: voirUnTicketContext,
      voirUnTicketContext,
      voirStatsTicket,
      voirAdminStatistiques,
      ajoutTicket,
      supprimerTicket,
      supprimerTicketAdmin,
      modifierTickets,
      setStatusFilter,
      statusFilter,
      priorityFilter,
      categoryFilter,
      setCategoryFilter,
      setPriorityFilter,
      sortFilter,
      setSortFilter,
      search,
      setSearch,
      ticketsMessagerie,
      voirTicketsMessagerieContext,
      toutTicketsMessagerie,
      voirToutTicketsMessagerieContext,
    }),
    [
      adminStats,
      adminEvolution,
      voirAdminStatsEvolution,
      ajoutTicket,
      currentPage,
      modifierTickets,
      selectedStatus,
      stats,
      supprimerTicket,
      supprimerTicketAdmin,
      ticket,
      tickets,
      totalTickets,
      voirAdminStatistiques,
      voirStatsTicket,
      voirTicket,
      voirToutTicket,
      voirUnTicketContext,
      setStatusFilter,
      statusFilter,
      setCategoryFilter,
      setPriorityFilter,
      priorityFilter,
      categoryFilter,
      setSortFilter,
      sortFilter,
      search,
      setSearch,
      ticketsMessagerie,
      voirTicketsMessagerieContext,
      toutTicketsMessagerie,
      voirToutTicketsMessagerieContext,
    ],
  );

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
}
