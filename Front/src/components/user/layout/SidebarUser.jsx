import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { TicketContext } from "../../../context/ticket/TicketContext";
import {
  LayoutDashboard,
  Ticket,
  CircleHelp,
  MessageSquare,
} from "lucide-react";
function Sidebar() {
  const { setSelectedStatus, stats } = useContext(TicketContext);
  return (
    <aside className="min-h-screen bg-[#303030] text-[#F0F0F0] flex flex-col justify-between p-6">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Gestionnaire</h1>

          <p className="text-[#F0F0F0] text-sm mt-1">Tickets user</p>
        </div>

        {/* NAVIGATION */}
        <nav>
          <ul className="flex flex-col gap-3">
            <li>
              <NavLink
                to="/user/dashboard"
                onClick={() => setSelectedStatus("all")}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-[#266fdb] text-white"
                      : "text-slate-400 hover:bg-indigo-900"
                  }`
                }
              >
                <span>
                  <LayoutDashboard size={20} />
                </span>
                <span>tableau de bord</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/tickets"
                onClick={() => setSelectedStatus("all")}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-[#266fdb] text-white"
                      : "text-slate-400 hover:bg-indigo-900"
                  }`
                }
              >
                <span>
                  <Ticket size={20} />
                </span>
                <span className="flex">Mes tickets</span>
                <div className="rounded-full text-white bg-red-500 w-7 h-7 flex items-center justify-center">
                    {stats.total}
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/message"
                onClick={() => setSelectedStatus("all")}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-[#266fdb] text-white"
                      : "text-slate-400 hover:bg-indigo-900"
                  }`
                }
              >
                <span>
                  <MessageSquare />
                </span>
                <span>Messagerie</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/faq"
                onClick={() => setSelectedStatus("all")}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-[#266fdb] text-white"
                      : "text-slate-400 hover:bg-indigo-900"
                  }`
                }
              >
                <span>
                  <CircleHelp />
                </span>
                <span>FAQ / Aide</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
