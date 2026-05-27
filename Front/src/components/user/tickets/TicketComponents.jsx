import { useContext, useEffect, useState } from "react";
import DashboardLayoutUser from "../layout/DashboardLayoutUser";
import { AuthContext } from "../../../context/auth/AuthContext";
import { TicketContext } from "../../../context/ticket/TicketContext";
import ProfilModal from "../../shared/modals/ProfilModal";
import ModalNouveauTypeTicket from "../../shared/modals/ModalNouveauTypeTicket";
import ModalNouveauTicket from "../../shared/modals/ModalNouveauTicket";
import TicketList from "./TicketListUser";
import TicketDetailModal from "../../shared/modals/TicketDetailModal";
import BarreFiltresFunction from "../../shared/BarreFiltresTickets";
export default function TicketComponents() {
  const { handleLogout, username, role, avatar, email, setUsername, setEmail } =
    useContext(AuthContext);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const {
    ajoutTicket,
    currentPage,
    voirTicket,
    statusFilter,
    priorityFilter,
    modifierTickets,
    supprimerTicket,
    categoryFilter,
    sortFilter,
    search,
  } = useContext(TicketContext);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("faible");
  const [isShowTicketOpen, setIsShowTicketOpen] = useState(false);
  const handleSelectType = (selectedType) => {
    setType(selectedType);
    setIsTypeModalOpen(false);
    setIsTicketModalOpen(true);
  };

  const handleAjoutTicket = async (e) => {
    e.preventDefault();

    await ajoutTicket(type, titre, description, priority);

    setType("");
    setTitre("");
    setDescription("");
    setPriority("faible");
    setIsTicketModalOpen(false);
  };

  useEffect(() => {
    voirTicket(
      currentPage,
      statusFilter,
      categoryFilter,
      priorityFilter,
      sortFilter,
      search
    );
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
      {isTypeModalOpen && (
        <ModalNouveauTypeTicket
          setIsTypeModalOpen={setIsTypeModalOpen}
          handleSelectType={handleSelectType}
        />
      )}
      {isTicketModalOpen && (
        <ModalNouveauTicket
          setIsTicketModalOpen={setIsTicketModalOpen}
          setIsTypeModalOpen={setIsTypeModalOpen}
          type={type}
          titre={titre}
          setTitre={setTitre}
          description={description}
          setDescription={setDescription}
          priority={priority}
          setPriority={setPriority}
          handleAjoutTicket={handleAjoutTicket}
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
