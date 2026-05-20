import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

function Sidebar() {

    const { handleLogout } =
        useContext(AuthContext);

    return (

        <aside className="w-260px min-h-screen bg-slate-800 text-slate-400 flex flex-col justify-between p-10">

            {/* TOP */}
            <div>

                {/* LOGO */}
                <div className="mb-12">

                    <h1 className="text-3xl font-bold">
                        Gestionnaire
                    </h1>

                    <p className="text-indigo-300 text-sm mt-1">
                        Tickets user
                    </p>

                </div>

                {/* NAVIGATION */}
                <nav>

                    <ul className="flex flex-col gap-3">

                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        isActive
                                            ? "bg-indigo-600 text-white shadow-lg"
                                            : "text-slate-400 hover:bg-indigo-900"
                                    }`
                                }
                            >

                                <span>🎫</span>

                                <span>
                                    Mes tickets
                                </span>

                            </NavLink>

                        </li>

                    </ul>

                </nav>

            </div>
        </aside>
    );
}

export default Sidebar;