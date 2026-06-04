import { useContext, useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { AuthContext } from "../../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { TicketContext } from "../../../context/ticket/TicketContext";
import PriorityBadge from "../../shared/PriorityBadge";
export default function AdminListeMessages({ children }) {
  const { handleLogout, username, role, avatar, email, setUsername, setEmail,id } =
    useContext(AuthContext);
  const {
    toutTicketsMessagerie,
    voirToutTicketsMessagerieContext,
    voirStatsTicket,
  } = useContext(TicketContext);

  useEffect(() => {
    const charger = async () => {
      await voirToutTicketsMessagerieContext();
      voirStatsTicket();
    };

    charger();
  }, []);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filteredTickets = toutTicketsMessagerie
    .sort((a, b) => {
      const lastA = a.messages.at(-1)?.updatedAt;
      const lastB = b.messages.at(-1)?.updatedAt;

      return new Date(lastB) - new Date(lastA);
    })
    .filter(
      (ticket) =>
        ticket.description.toLowerCase().includes(search.toLowerCase()) ||
        ticket.title.toLowerCase().includes(search.toLowerCase()) ||
        ticket.user.username.toLowerCase().includes(search.toLowerCase()),
    );

  const tempsEcoule = (date) => {
    const dateNow = new Date();
    const ecart = dateNow - new Date(date);
    const secondes = ecart / 1000;
    const minutes = secondes / 60;
    const heures = minutes / 60;
    const jours = heures / 24;
    const duree =
      jours >= 1
        ? Math.floor(jours) + " j"
        : heures >= 1
          ? Math.floor(heures) + " h"
          : minutes >= 1
            ? Math.floor(minutes) + " min"
            : Math.floor(secondes) + " s";
    return duree;
  };
  const statusConversation = (ticket) => {
    if (ticket.userId === Number(id)) {
      if (ticket.isRead === true) {
        return "ouvert ";
      } else {
        return "remis ";
      }
    } else {
      if (ticket.isRead === true) {
        return "reçu ";
      } else {
        return "nouveau message ";
      }
    }
  };
  return (
    <div>
      <DashboardLayout
        username={username}
        handleLogout={handleLogout}
        role={role}
        avatar={avatar}
        email={email}
        setUsername={setUsername}
        setEmail={setEmail}
        setIsProfileModalOpen={setIsProfileModalOpen}
      >
        <div className="flex gap-10">
          <div className="w-1/5 flex flex-col h-[calc(100vh-105px)]">
            <div className="flex-1 overflow-y-auto h-[calc(80vh)] hide-scrollbar">
              {filteredTickets.map((ticket) => (
                <button
                  className="bg-white p-3 rounded-2xl w-full mb-4 shadow-sm hover:bg-gray-100 "
                  key={ticket.id}
                  onClick={() => navigate(`/admin/messagerie/${ticket.id}`)}
                >
                  <div className="flex flex-col text-lg">
                    <div className="flex font-semibold mb-2">
                      {ticket?.user?.username} - {ticket?.title}
                    </div>
                    <div className="flex font-bold text-lg items-center gap-2">
                      <PriorityBadge priority={ticket?.priority} /> {"• "}
                      {statusConversation(ticket.messages.at(-1))}
                      {tempsEcoule(ticket.messages.at(-1).updatedAt)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <input
              type="text"
              className="bg-white p-3 my-2 rounded-2xl shadow-sm w-full"
              placeholder="Rechercher un ticket ou un utilisateur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-4/5">{children}</div>
        </div>
      </DashboardLayout>
    </div>
  );
}
