import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  User2,
  MessageCircle,
  Layers,
} from "lucide-react";
function Sidebar() {
  return (
    <aside className="w-260px min-h-screen bg-[#303030] text-white flex flex-col justify-between p-6">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="mb-12">
          <img src="../../../../logoClair.png" alt="" className="w-30 m-2 pb-3"/>

          <h1 className="text-indigo-300 text-sm mt-1">Gestionnaire de Tickets</h1>
        </div>

        {/* NAVIGATION */}
        <nav>
          <ul className="flex flex-col gap-3">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200  hover:px-5 ${
                    isActive
                      ? "bg-[#266fdb] text-white px-5"
                      : "text-slate-400 hover:bg-indigo-900"
                  }`
                }
              >
                <span>
                  <LayoutDashboard size={18} />
                </span>
                <span>Tableau de bord</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/ticket"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200  hover:px-5 ${
                    isActive
                      ? "bg-[#266fdb] text-white px-5"
                      : "text-slate-400 hover:bg-indigo-900"
                  }`
                }
              >
                <span>
                  <Ticket size={18} />
                </span>
                <span>Gestion des tickets</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200  hover:px-5 ${
                    isActive
                      ? "bg-[#266fdb] text-white px-5"
                      : "text-slate-400 hover:bg-indigo-900"
                  }`
                }
              >
                <span>
                  <User2 size={18} />
                </span>
                <span>Gestion des utilisateurs</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/messagerie"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200  hover:px-5 ${
                    isActive
                      ? "bg-[#266fdb] text-white px-5"
                      : "text-slate-400 hover:bg-indigo-900"
                  }`
                }
              >
                <span>
                  <MessageCircle size={18} />
                </span>
                <span>Messagerie</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/categories"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200  hover:px-5 ${
                    isActive
                      ? "bg-[#266fdb] text-white px-5"
                      : "text-slate-400 hover:bg-indigo-900"
                  }`
                }
              >
                <span>
                  <Layers size={18} />
                </span>
                <span>Gestion des categories</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
