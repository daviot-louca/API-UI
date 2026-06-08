import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import { TicketContext } from "../../context/ticket/TicketContext";

import TicketTypeBadge from "./TicketTypeBadge";
import TicketTypeIcon from "./TicketTypeIcon";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

function TicketItem({ ticket, setIsShowTicketOpen, setSelectedTicket }) {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate()
  const { supprimerTicketAdmin } = useContext(TicketContext);
  const categoryName = ticket?.category?.name ?? ticket?.type;

  return (
    <div className="hover:bg-gray-100">
      <hr className="text-gray-400" />
      {role === "administrateur" ? (
        <div className="px-6 py-4 grid grid-cols-[50px_150px_230px_150px_150px_200px_150px_150px] gap-3 items-center">
          {/* ID */}
          <div>
            <p className="font-semibold text-[#303030]">#{ticket.id}</p>
          </div>
          {/* TITLE */}
          <div>
            <p className="font-bold text-[#303030]">{ticket.title}</p>
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
          <div>
            <TicketTypeIcon
              type={categoryName}
              category={ticket?.category}
              showLabel
            />
          </div>
          {/* PRIORITY */}
          <div>
            <PriorityBadge priority={ticket?.priority} />
          </div>
          {/* STATUS */}
          <div className="w-28">
            <StatusBadge status={ticket?.status} />
          </div>

          {/* DATE */}
          <div>
            <p className="text-[#303030] font-medium">
              {new Date(ticket.updatedAt).toLocaleDateString()} à{" "}
              {new Date(ticket.updatedAt).toLocaleTimeString("fr-FR", {
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-10">
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
              onClick={() => supprimerTicketAdmin(ticket.id)}
              className="bg-[#AA0000] hover:bg-[#DD0000] text-white px-4 py-2 rounded-[5px] font-medium transition"
            >
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="p-4 grid grid-cols-[100px_250px_200px_200px_200px_150px_220px] gap-3 items-center text-sm hover:bg-slate-50">
            <div className="mx-8">
              <TicketTypeIcon type={categoryName} category={ticket?.category} />
            </div>
            <div>
              <h2 className="font-bold text-lg">{ticket.title}</h2>
              <p>ticket #{ticket.id}</p>
            </div>
            <div>
              <TicketTypeBadge
                type={categoryName}
                category={ticket?.category}
              />
            </div>
            <div>
              <PriorityBadge priority={ticket?.priority} />
            </div>
            <div className="w-30">
              <StatusBadge status={ticket?.status} />
            </div>
            <div>
              <div>
                <p>
                  {new Date(ticket?.updatedAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p>
                  {new Date(ticket?.updatedAt).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedTicket(ticket);
                  setIsShowTicketOpen(true);
                }}
                className="bg-[#303030] hover:bg-[#505050] text-slate-100 px-4 py-2 rounded-[5px] font-medium transition"
              >
                Voir
              </button>
            </div>
          </div>
          <hr className="w-full text-slate-300" />
        </div>
      )}
    </div>
  );
}

export default TicketItem;
