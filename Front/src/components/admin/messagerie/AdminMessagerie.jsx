// espace réponse au ticket des utilisateurs
import { useContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../../context/auth/AuthContext";
import { getMessages } from "../../../services/messages.service";
import { useParams } from "react-router-dom";
import { TicketContext } from "../../../context/ticket/TicketContext";
const socket = io("http://localhost:3030");
import AdminListeMessages from "./AdminListeMessages";
export default function AdminMessagerie() {
  const { ticket, voirUnTicketContext, supprimerTicket } =
    useContext(TicketContext);
  const messageEndRef = useRef(null);
  const { id } = useContext(AuthContext);
  const { ticketId } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    //emit sert à envoyer
    socket.emit("join_ticket", ticketId);
    //on sert à recevoir
    socket.on("receive_message", (data) => {
      console.log(data);
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
  }, [ticketId, token]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("send_message", ticketId, message, id);
    setMessage("");
    if (!message.trim()) return;

    envoyerMessage();
    setMessage("");
  };

  useEffect(() => {
    voirUnTicketContext(ticketId);
  }, [ticketId, voirUnTicketContext]);

  return (
    <AdminListeMessages>
      <div className="flex h-[calc(100vh-100px)] flex-col rounded-2xl bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Ticket #{ticketId} - {ticket?.title}
            </h2>
          </div>

          <button
            className="rounded-lg border px-4 py-2 text-sm font-medium bg-[#303030] text-gray-50 hover:bg-[#505050]"
            onClick={() => supprimerTicket}
          >
            Supprimer
          </button>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 hide-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id}>
              {console.log(msg)}
              {msg.userId == id && (
                <div className="flex items-end justify-end">
                  <div>
                    <div className="flex text-xs px-3">
                      <p>
                        Vous •{" "}
                        {new Date(msg.createdAt).toLocaleTimeString("fr-FR", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="px-3 py-1 mb-5 bg-blue-300 min-w-1 max-w-170 rounded-xl">
                      {msg.message}
                    </div>
                    <div ref={messageEndRef}></div>
                  </div>
                </div>
              )}
              {msg.userId != id && (
                <div className="flex mt-1">
                  <div>
                    <div className="flex text-xs px-3">
                      <p>
                        {msg?.user?.username.slice(0, 1).toUpperCase()}
                        {msg?.user?.username.slice(1)} •{" "}
                        {new Date(msg.createdAt).toLocaleTimeString("fr-FR", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="px-3 pt-1 mb-3 bg-gray-300 min-w-1 max-w-170 rounded-xl">
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
    </AdminListeMessages>
  );
}
