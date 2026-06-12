import { useContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../../context/auth/AuthContext";
import { TicketContext } from "../../../context/ticket/TicketContext";
import {
  getMessages,
  marquerMessagesLus,
} from "../../../services/messages.service";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
const socket = io("http://localhost:3030");
import StatusBadge from "../../shared/StatusBadge";
import PriorityBadge from "../../shared/PriorityBadge";
export default function MessageComponents() {
  const { role, id } = useContext(AuthContext);
  const messageEndRef = useRef(null);
  const { ticketId } = useParams();
  const token = localStorage.getItem("token");
  const {
    voirToutTicketsMessagerieContext,
    ticket,
    voirUnTicketContext,
    modifierTickets,
  } = useContext(TicketContext);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    //emit sert à envoyer
    socket.emit("join_ticket", ticketId);
    //on sert à recevoir
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [ticketId]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    console.log("chargement message");
    const ancienmessages = async () => {
      const reponse = await getMessages(ticketId, token);
      setMessages(reponse);
      return reponse;
    };
    ancienmessages();
    if (ticket) {
      setChecked(ticket.status === "résolu");
    }
  }, [ticketId, token, ticket]);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    socket.emit("send_message", ticketId, message, id);

    if (role === "administrateur") {
      await modifierTickets(ticketId, "en cours", token);
    }

    setMessage("");
    await voirUnTicketContext(ticketId);
  };
  useEffect(() => {
    const charger = async () => {
      await voirUnTicketContext(ticketId);

      if (!ticketId) return;

      await marquerMessagesLus(ticketId, token);
      await voirToutTicketsMessagerieContext();
    };
    charger();
  }, [ticketId]);
  const ticketResolu = async (isChecked) => {
    if (role === "administrateur") {
      await modifierTickets(ticketId, isChecked ? "résolu" : "en cours", token);

      await voirUnTicketContext(ticketId);
    }
  };
  return (
    <DashboardLayout>
      <div className="grid grid-cols-[70%_30%] gap-10 h-[calc(100vh-100px)] flex-col rounded-2xl mr-10">
        {/* Header */}
        <div className="h-full flex flex-col rounded-2xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div>
              <h2 className="text-xl font-bold text-[#303030]">
                {ticket?.user?.username}
              </h2>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 hide-scrollbar ">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.userId === Number(id) && (
                  <div className="flex items-end justify-end">
                    <div>
                      <div className="px-3 py-1 mb-5 bg-blue-300 min-w-0 max-w-170 rounded-xl">
                        {msg.message}
                      </div>
                      <div ref={messageEndRef}></div>
                    </div>
                  </div>
                )}
                {msg.userId !== Number(id) && (
                  <div className="flex my-1">
                    <div>
                      <div className="px-3 py-1 mt-3 bg-gray-300 min-w-0 max-w-150 rounded-xl">
                        {msg.message}
                      </div>
                      <div ref={messageEndRef}></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Formulaire */}
          <div className="border-t p-4">
            <form className="flex gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Écrire un message..."
                className="flex-1 rounded-xl border px-4 py-3 outline-none"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <button
                disabled={!message.trim()}
                type="submit"
                className="rounded-xl bg-[#303030] px-6 py-3 font-medium text-white"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between border-b border-slate-300 pb-6">
            <div>
              <p className="text-sm text-slate-500">Ticket</p>
              <h2 className="text-3xl font-bold text-slate-800">#{ticketId}</h2>
            </div>

            <div className="flex gap-3">
              <StatusBadge status={ticket?.status} />
              <PriorityBadge priority={ticket?.priority} />
            </div>
          </div>

          {/* Contenu */}
          <div className="space-y-6">
            <div className="rounded-2xl  p-5">
              <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">
                Titre
              </p>

              <p className="text-lg font-semibold text-slate-800">
                {ticket?.title}
              </p>
            </div>

            <div className="rounded-2xl  p-5">
              <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">
                Description
              </p>

              <p className="leading-relaxed text-slate-700">
                {ticket?.description}
              </p>
            </div>

            <div className="rounded-2xl  p-5">
              <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">
                Demandeur
              </p>

              <p className="font-medium text-slate-800">
                {ticket?.user?.email}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl  p-5">
                <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">
                  Créé le
                </p>

                <p className="font-medium text-slate-800">
                  {new Date(ticket?.createdAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p className="text-sm text-slate-500">
                  {new Date(ticket?.createdAt).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="rounded-2xl  p-5">
                <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">
                  Dernière modification
                </p>

                <p className="font-medium text-slate-800">
                  {new Date(ticket?.updatedAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p className="text-sm text-slate-500">
                  {new Date(ticket?.updatedAt).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-slate-300 pt-6">
            <label className="group flex cursor-pointer items-center gap-4">
              <input
                type="checkbox"
                checked={checked}
                onChange={async (e) => {
                  const value = e.target.checked;
                  setChecked(value);
                  await ticketResolu(value);
                }}
                className="hidden"
              />

              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                  checked
                    ? "bg-green-600 text-white shadow-lg"
                    : "border-2 border-slate-300"
                }`}
              >
                {checked && "✓"}
              </div>

              <div>
                <p className="font-semibold text-slate-800">Ticket résolu</p>
                <p className="text-sm text-slate-500">
                  Marquer ce ticket comme traité
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
