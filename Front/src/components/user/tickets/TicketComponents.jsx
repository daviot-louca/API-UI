import { useContext, useEffect, useState } from "react";
import DashboardLayoutUser from "../layout/DashboardLayoutUser";
import { AuthContext } from "../../../context/auth/AuthContext";
import { TicketContext } from "../../../context/ticket/TicketContext";
import ProfilModal from "../../shared/modals/ProfilModal";
import ModalNouveauTypeTicket from "../../shared/modals/ModalNouveauTypeTicket";
import ModalNouveauTicket from "../../shared/modals/ModalNouveauTicket";
import TicketList from "./TicketListUser";
export default function TicketComponents() {
  const { handleLogout, username, role, avatar, email, setUsername, setEmail } =
    useContext(AuthContext);
  const {
    ajoutTicket,
    currentPage,
    selectedStatus,
    voirStatsTicket,
    voirTicket,
  } = useContext(TicketContext);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("faible");

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
    voirTicket(currentPage, selectedStatus);

    voirStatsTicket();
  }, [currentPage, selectedStatus, voirStatsTicket, voirTicket]);

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
              name=""
              id=""
            >
              <option value="">Tous les statuts</option>
              <option value="">Remis</option>
              <option value="">en cours</option>
              <option value="">Résolus</option>
            </select>
            <select className="h-11 rounded-xl bg-white border border-slate-200 px-4" name="" id="">
              <option value="">Toutes les catégories</option>
              <option value="">Poste de travail</option>
              <option value="">Télephonie</option>
              <option value="">Compte d'accès</option>
              <option value="">Messagerie</option>
              <option value="">Autres</option>
            </select>
            <select className="h-11 rounded-xl bg-white border border-slate-200 px-4" name="" id="">
              <option value="">Tous les priorités</option>
              <option value="">Faible</option>
              <option value="">Moyenne</option>
              <option value="">Forte</option>
              <option value="">Urgente</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-4">
            <select className="h-11 rounded-xl bg-white border border-slate-200 px-4" name="" id="">
              <option value="">Plus récent</option>
              <option value="">Plus ancien</option>
              <option value="">A à Z</option>
              <option value="">Z à A</option>
            </select>
            <button
              className="bg-[#303030] p-2.5 rounded-xl text-slate-100 hover:bg-[#505050]"
              onClick={() => setIsTypeModalOpen(true)}
            >
              + Ajouter un Ticket
            </button>
          </div>
        </div>
        <TicketList />
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
    </DashboardLayoutUser>
  );
}
