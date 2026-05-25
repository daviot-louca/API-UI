import { useContext } from "react";

import { AuthContext } from "../../context/auth/AuthContext";
import { TicketContext } from "../../context/ticket/TicketContext";

import TicketTypeBadge from "./TicketTypeBadge";
import TicketTypeIcon from "./TicketTypeIcon";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

function TicketItem({ ticket, setIsShowTicketOpen, setSelectedTicket }) {
  const { role } = useContext(AuthContext);

  const { supprimerTicket, modifierTickets } = useContext(TicketContext);

  return (
    <div>
      {role === "admin" ? (
        <div className="px-4 py-3 grid grid-cols-[2.5rem_minmax(8rem,1fr)_minmax(11rem,1.4fr)_minmax(9rem,1fr)_8rem_9rem_8rem_10rem] gap-3 items-center text-sm">
          {/* ID */}
          <div>
            <p className="font-semibold text-[#303030]">#{ticket.id}</p>
          </div>
          <div>
            <TicketTypeIcon type={ticket?.type} showLabel />
          </div>

          {/* TITLE */}
          <div>
            <p className="font-semibold text-[#303030]">{ticket.title}</p>
          </div>

          {/* USER */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#303030] text-slate-100 flex items-center justify-center font-bold">
              {ticket.user.username.slice(0, 2)}
            </div>

            <div>
              <p className="font-medium text-[#303030]">
                {ticket.user.username}
              </p>
            </div>
          </div>

          {/* STATUS */}
          <div className="">
            <select
              className="bg-slate-100 text-[#303030] rounded-xl px-4 py-2 outline-none border-none"
              value={ticket.status}
              onChange={(e) => modifierTickets(ticket.id, e.target.value)}
            >
              <option value="remis">remis</option>

              <option value="en cours">en cours</option>

              <option value="résolu">résolu</option>
            </select>
          </div>

          {/* PRIORITY */}
          <div>
            <select
              className="bg-slate-100 text-[#303030] rounded-xl px-4 py-2 outline-none border-none"
              value={ticket.priority ?? "faible"}
              onChange={(e) =>
                modifierTickets(ticket.id, { priority: e.target.value })
              }
            >
              <option value="faible">faible</option>
              <option value="moyenne">moyenne</option>
              <option value="haute">haute</option>
              <option value="urgente">urgente</option>
            </select>
          </div>

          {/* DATE */}
          <div>
            <p className="text-[#303030] font-medium">
              {new Date(ticket.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            {/* VOIR */}
            <button
              onClick={() => {
                setSelectedTicket(ticket);
                setIsShowTicketOpen(true);
              }}
              className="bg-[#303030] hover:bg-[#505050] text-slate-100 px-4 py-2 rounded-[5px] font-medium transition"
            >
              Voir
            </button>

            {/* DELETE */}
            <button
              onClick={() => supprimerTicket(ticket.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-[5px] font-medium transition"
            >
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="p-4 grid grid-cols-[100px_250px_200px_200px_200px_150px_220px] gap-3 items-center text-sm hover:bg-slate-50">
            <div className="mx-8">
              <TicketTypeIcon type={ticket?.type} />
            </div>
            <div>
              <h2 className="font-bold text-lg">{ticket.title}</h2>
              <p>ticket #{ticket.id}</p>
            </div>
            <div>
              <TicketTypeBadge type={ticket?.type} />
            </div>
            <div>
              <PriorityBadge priority={ticket?.priority} />
            </div>
            <div className="w-30">
              <StatusBadge status={ticket?.status} />
            </div>
            <div>
              <div>
                <p>{new Date(ticket?.updatedAt).toLocaleDateString("fr-FR",{day:"2-digit",month:"long",year:"numeric"})}</p>
              </div>
              <div>
                <p>{new Date(ticket?.updatedAt).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</p>
              </div>
            </div>
            <div>
              <button className="bg-[#303030] p-3 text-slate-100 rounded-xl">Voir →</button>
            </div>
          </div>
          <hr className="w-full text-slate-300" />
        </div>
      )}
    </div>
  );
}

export default TicketItem;
