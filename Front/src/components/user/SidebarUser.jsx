import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { TicketContext } from "../../context/TicketContext";
function Sidebar() {
    const { voirToutTicket, tickets, currentPage, setCurrentPage, selectedStatus,
        setSelectedStatus, TotalTickets,stats } =
        useContext(TicketContext);
    return (

        <aside className="w-260px min-h-screen bg-[#303030] text-[#F0F0F0] flex flex-col justify-between p-10">

            {/* TOP */}
            <div>

                {/* LOGO */}
                <div className="mb-12">

                    <h1 className="text-3xl font-bold">
                        Gestionnaire
                    </h1>

                    <p className="text-[#F0F0F0] text-sm mt-1">
                        Tickets user
                    </p>

                </div>

                {/* NAVIGATION */}
                <nav>

                    <ul className="flex flex-col gap-3">

                        <li>
                            <NavLink
                                to="/dashboard"
                                onClick={() =>
                                    setSelectedStatus("all")
                                }
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-200 ${isActive
                                        ? "bg-[#266fdb] text-white"
                                        : "text-slate-400 hover:bg-indigo-900"
                                    }`
                                }
                            >

                                <span>
                                    Mes tickets
                                </span>
                                <span>
                                    ({stats.total})
                                </span>

                            </NavLink>
                            <div className="flex flex-col mx-6 rounded-xl">
                                <button
                                    onClick={() =>
                                        setSelectedStatus("all")
                                    }
                                    className={`py-1 font-medium transition ${selectedStatus === "all"
                                        ? "text-white"
                                        : "text-slate-400 hover:text-white"
                                        }`}
                                >
                                    Tout ({stats.total})
                                </button>
                                <button
                                    onClick={() =>
                                        setSelectedStatus("remis")
                                    }
                                    className={`py-1 font-medium transition ${selectedStatus === "remis"
                                        ? "text-white"
                                        : "text-slate-400 hover:text-white"
                                        }`}
                                >
                                    Remis ({stats.remis})
                                </button>
                                <button
                                    onClick={() =>
                                        setSelectedStatus("en cours")
                                    }
                                    className={`py-1 font-medium transition ${selectedStatus === "en cours"
                                        ? "text-white"
                                        : "text-slate-400 hover:text-white"
                                        }`}
                                >
                                    En cours ({stats.enCours})
                                </button>
                                <button
                                    onClick={() =>
                                        setSelectedStatus("ouvert")
                                    }
                                    className={`py-1 font-medium transition ${selectedStatus === "ouvert"
                                        ? "text-white"
                                        : "text-slate-400 hover:text-white"
                                        }`}
                                >
                                    Ouvert ({stats.ouvert})
                                </button>



                                <button
                                    onClick={() =>
                                        setSelectedStatus("résolu")
                                    }
                                    className={`py-1 font-medium transition ${selectedStatus === "résolu"
                                        ? "text-white"
                                        : "text-slate-400 hover:text-white"
                                        }`}
                                >
                                    Résolu ({stats.resolu})
                                </button>

                            </div>
                        </li>

                    </ul>

                </nav>

            </div>
        </aside>
    );
}

export default Sidebar;