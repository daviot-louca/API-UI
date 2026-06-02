import { useContext, useEffect, useState } from "react";
import DashboardLayoutUser from "../layout/DashboardLayoutUser";
import { AuthContext } from "../../../context/auth/AuthContext";
import { TicketContext } from "../../../context/ticket/TicketContext";
import ProfilModal from "../../shared/modals/ProfilModal";
import TicketList from "./TicketListUser";
import TicketDetailModal from "../../shared/modals/TicketDetailModal";
import BarreFiltresFunction from "../../shared/BarreFiltresTickets";
export default function TicketComponents() {
  const { handleLogout, username, role, avatar, email, setUsername, setEmail } =
    useContext(AuthContext);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const {
    currentPage,
    voirTicket,
    statusFilter,
    priorityFilter,
    modifierTickets,
    supprimerTicket,
    categoryFilter,
    sortFilter,
    search,
    voirStatsTicket
  } = useContext(TicketContext);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isShowTicketOpen, setIsShowTicketOpen] = useState(false);

  useEffect(() => {
    voirTicket(
      currentPage,
      statusFilter,
      categoryFilter,
      priorityFilter,
      sortFilter,
      search,
    );
    voirStatsTicket();
  }, [
    currentPage,
    statusFilter,
    categoryFilter,
    priorityFilter,
    sortFilter,
    voirTicket,
    search
  ]);

  return (
    <DashboardLayoutUser
      username={username}
      handleLogout={handleLogout}
      role={role}
      avatar={avatar}
      email={email}
      setUsername={setUsername}
      setEmail={setEmail}
      setIsProfileModalOpen={setIsProfileModalOpen}
    >
      <div>
        <BarreFiltresFunction/>
        <TicketList
          setIsShowTicketOpen={setIsShowTicketOpen}
          setSelectedTicket={setSelectedTicket}
        />
      </div>
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
      {isShowTicketOpen && (
        <TicketDetailModal
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          setIsShowTicketOpen={setIsShowTicketOpen}
          modifierTickets={modifierTickets}
          supprimerTicket={supprimerTicket}
        />
      )}
    </DashboardLayoutUser>
  );
}
