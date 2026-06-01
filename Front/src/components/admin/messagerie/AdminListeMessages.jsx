import DashboardLayout from "../layout/DashboardLayout";
import { useContext } from "react";
import { TicketContext } from "../../../context/ticket/TicketContext";
import {useNavigate } from "react-router-dom";
export default function AdminListeMessages({ children }) {
  const {tickets} = useContext(TicketContext)
  const navigate = useNavigate(); 
  return (
    <DashboardLayout>
      <div className="flex">
        <div className="w-1/4">
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => navigate(`/admin/messagerie/${ticket.id}`)}
            >
              Ticket #{ticket.id}
            </button>
          ))}
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </DashboardLayout>
  );
}
