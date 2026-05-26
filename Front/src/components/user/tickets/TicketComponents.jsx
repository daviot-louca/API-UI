import { useContext, useEffect, useState } from "react";
import DashboardLayoutUser from "../layout/DashboardLayoutUser";
import { AuthContext } from "../../../context/auth/AuthContext";
import { TicketContext } from "../../../context/ticket/TicketContext";
import ProfilModal from "../../shared/modals/ProfilModal";
import ModalNouveauTypeTicket from "../../shared/modals/ModalNouveauTypeTicket";
import ModalNouveauTicket from "../../shared/modals/ModalNouveauTicket";
import TicketList from "./TicketListUser";
import TicketDetailModal from "../../shared/modals/TicketDetailModal";
export default function TicketComponents() {
  const { handleLogout, username, role, avatar, email, setUsername, setEmail } =
    useContext(AuthContext);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const {
    ajoutTicket,
    currentPage,
    voirTicket,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    modifierTickets,
    supprimerTicket,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    sortFilter,
    setSortFilter,
  } = useContext(TicketContext);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("faible");
  const [isShowTicketOpen, setIsShowTicketOpen] = useState(false);
  const [search,setSearch] =useState("");
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
    );
  }, [
    currentPage,
    statusFilter,
    categoryFilter,
    priorityFilter,
    sortFilter,
    voirTicket,
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
        <div className="flex flex-wrap bg-white p-4 rounded-xl justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4">
            <select
              className="h-11 rounded-xl bg-white border border-slate-200 px-4"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {console.log(categoryFilter)}
              <option value="">Toutes les catégories</option>
              <option value="Poste de travail">Poste de travail</option>
              <option value="Téléphonie">Téléphonie</option>
              <option value="Compte d'accès">Compte d'accès</option>
              <option value="Messagerie">Messagerie</option>
              <option value="Autres">Autres</option>
            </select>
            <select
              className="h-11 rounded-xl bg-white border border-slate-200 px-4"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">Tous les priorités</option>
              <option value="faible">Faible</option>
              <option value="moyenne">Moyenne</option>
              <option value="haute">Haute</option>
              <option value="urgente">Urgente</option>
            </select>
            <select
              className="h-11 rounded-xl bg-white border border-slate-200 px-4"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="remis">Remis</option>
              <option value="en cours">en cours</option>
              <option value="résolu">Résolus</option>
            </select>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-150 bg-white px-4 border rounded-xl"
              placeholder="Rechercher un ticket..."
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <select
              className="h-11 rounded-xl bg-white border border-slate-200 px-4"
              value={sortFilter}
              onChange={(e) => setSortFilter(e.target.value)}
            >
              <option value="recent">Plus récent</option>
              <option value="oldest">Plus ancien</option>
              <option value="az">A à Z</option>
              <option value="za">Z à A</option>
            </select>
            <button
              className="bg-[#303030] p-2.5 rounded-xl text-slate-100 hover:bg-[#505050]"
              onClick={() => setIsTypeModalOpen(true)}
            >
              + Ajouter un Ticket
            </button>
          </div>
        </div>
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
