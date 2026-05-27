import { useEffect, useContext, useState } from "react";

import TicketList from "./TicketListAdmin";

import { TicketContext } from "../../../context/ticket/TicketContext";

import DashboardLayout from "../layout/DashboardLayout";

import { AdminContext } from "../../../context/admin/AdminContext";

import { AuthContext } from "../../../context/auth/AuthContext";
//composents
import Profile from "../../shared/Profile";
import ProfilModal from "../../shared/modals/ProfilModal";
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

  const { handleLogout, username, role, avatar, email, setEmail, setUsername } =
    useContext(AuthContext);

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
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 w-full bg-[#F5F7FB] min-h-screen">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">Dashboard</h1>

            <p className="text-slate-500 mt-2 text-lg">
              Bienvenue {username}. Voici un aperçu global des tickets.
            </p>
          </div>

          {/* PROFILE */}
          <Profile
            username={username}
            handleLogout={handleLogout}
            role={role}
            avatar={avatar}
            setIsProfileModalOpen={setIsProfileModalOpen}
          />
        </div>
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
        <BarreFiltresFunction/>
        <div>
          <TicketList
            setIsShowTicketOpen={setIsShowTicketOpen}
            setSelectedTicket={setSelectedTicket}
          />
        </div>
        {/*modal PROFIL */}
        {isProfileModalOpen && (
          <ProfilModal
            avatar={avatar}
            username={username}
            email={email}
            setUsername={setUsername}
            setEmail={setEmail}
            setIsProfileModalOpen={setIsProfileModalOpen}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
