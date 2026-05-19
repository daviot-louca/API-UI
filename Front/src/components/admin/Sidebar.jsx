import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

function Sidebar() {

    const { handleLogout } =
        useContext(AuthContext);

    return (

        <aside className="w-260px min-h-screen bg-indigo-950 text-white flex flex-col justify-between p-6">

            {/* TOP */}
            <div>

                {/* LOGO */}
                <div className="mb-12">

                    <h1 className="text-3xl font-bold">
                        Gestionnaire
                    </h1>

                    <p className="text-indigo-300 text-sm mt-1">
                        Tickets
                    </p>

                </div>

                {/* NAVIGATION */}
                <nav>

                    <ul className="flex flex-col gap-3">

                        <li>
                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        isActive
                                            ? "bg-indigo-600 text-white shadow-lg"
                                            : "text-gray-300 hover:bg-indigo-900"
                                    }`
                                }
                            >

                                <span>🎫</span>

                                <span>
                                    Tickets
                                </span>

                            </NavLink>

                        </li>

                        <li>

                            <NavLink
                                to="/users"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        isActive
                                            ? "bg-indigo-600 text-white shadow-lg"
                                            : "text-gray-300 hover:bg-indigo-900"
                                    }`
                                }
                            >

                                <span>👥</span>

                                <span>
                                    Utilisateurs
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