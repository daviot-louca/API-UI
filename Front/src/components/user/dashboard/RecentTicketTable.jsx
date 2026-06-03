import { Link } from "react-router-dom";
import TicketTypeIcon from "../../shared/TicketTypeIcon";
import { useEffect, useContext } from "react";
import { TicketContext } from "../../../context/ticket/TicketContext";
import StatusBadge from "../../shared/StatusBadge";
import PriorityBadge from "../../shared/PriorityBadge";

export default function RecentTicketTable() {
  const { voirTicket, tickets } = useContext(TicketContext);

  useEffect(() => {
    voirTicket();
  }, [voirTicket]);
  return (
    <div>
      {/*header */}
      <div className="flex justify-between p-3">
        <h2 className="text-2xl font-bold">Vos tickets récents</h2>
        <Link to={"/user/tickets"} className="text-[#303030] underline text-lg">
          Voir tous →
        </Link>
      </div>
      <hr className="text-[#E5E7EB]" />
      {/*table */}
      {tickets.slice(0, 10).map((ticket) => {
        const categoryName = ticket?.category?.name ?? ticket.type;

        return (
          <div
            key={ticket.id}
            className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 p-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0">
                <TicketTypeIcon
                  type={categoryName}
                  category={ticket?.category}
                />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-lg truncate">{ticket.title}</p>
                <div className="flex flex-wrap text-gray-500 gap-x-2 text-sm">
                  <p>ticket #{ticket.id} •</p>
                  <p>
                    crée le {new Date(ticket.createdAt).toLocaleDateString()} à{" "}
                    {new Date(ticket.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <PriorityBadge priority={ticket.priority} />
            </div>
            <div className="w-28">
              <StatusBadge status={ticket.status} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
