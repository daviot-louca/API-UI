import { Link } from "react-router-dom";
import TicketTypeIcon from "../../shared/TicketTypeIcon";
import { useEffect, useContext } from "react";
import { TicketContext } from "../../../context/ticket/TicketContext";
import StatusBadge from "../../shared/StatusBadge";
import PriorityBadge from "../../shared/PriorityBadge";
export default function RecentTickets() {
  const { voirToutTicket, tickets } = useContext(TicketContext);

  useEffect(() => {
    voirToutTicket();
  }, [voirToutTicket]);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-[#303030] mb-6">
          Tickets récents
        </h2>
        <Link to={"/admin/ticket"} className="text-[#303030] underline text-lg">
          Voir tous →
        </Link>
      </div>

      <div className="space-y-4">
        {tickets.length === 0 ? (
          <p className="text-gray-500">Aucun ticket récent.</p>
        ) : (
          tickets.slice(0, 5).map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between border-b pb-4 last:border-b-0"
            >
              <div>
                <p className="font-semibold text-[#303030]">
                  #{ticket.id} • {ticket.title}
                </p>

                <p className="text-sm text-gray-500">{ticket.user?.username}</p>
              </div>

              <PriorityBadge priority={ticket.priority} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
