import { useEffect, useContext, useState } from "react";

import TicketList from "./TicketListAdmin";

import { TicketContext } from "../../../context/ticket/TicketContext";

import DashboardLayout from "../layout/DashboardLayout";

import { AdminContext } from "../../../context/admin/AdminContext";

import { AuthContext } from "../../../context/auth/AuthContext";
//composents

import TicketDetailModal from "../../shared/modals/TicketDetailModal";
import BarreFiltresFunction from "../../shared/BarreFiltresTickets";
export default function AdminTickets() {
  const {
    voirToutTicket,
    currentPage,
    selectedStatus,
    voirAdminStatistiques,
    modifierTickets,
    supprimerTicket,
    categoryFilter,
    priorityFilter,
    statusFilter,
    search,
    sortFilter,
  } = useContext(TicketContext);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const { voirToutUser } = useContext(AdminContext);

  useEffect(() => {
    voirToutTicket(
      currentPage,
      statusFilter,
      categoryFilter,
      priorityFilter,
      sortFilter,
      search,
    );

    voirAdminStatistiques();

    voirToutUser();
  }, [
    currentPage,
    selectedStatus,
    voirAdminStatistiques,
    voirToutTicket,
    voirToutUser,
    categoryFilter,
    priorityFilter,
    sortFilter,
    search,
    statusFilter,
  ]);

  const [isShowTicketOpen, setIsShowTicketOpen] = useState(false);
  return (
    <DashboardLayout>
      {/* TICKETS */}
      {isShowTicketOpen && (
        <TicketDetailModal
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          setIsShowTicketOpen={setIsShowTicketOpen}
          modifierTickets={modifierTickets}
          supprimerTicket={supprimerTicket}
        />
      )}
      <BarreFiltresFunction />
      <div>
        <TicketList
          setIsShowTicketOpen={setIsShowTicketOpen}
          setSelectedTicket={setSelectedTicket}
        />
      </div>
      {/*modal PROFIL */}
    </DashboardLayout>
  );
}
