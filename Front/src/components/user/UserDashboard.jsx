import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import TicketListUser from "./TicketListUser";
import { TicketContext } from "../../context/TicketContext";
import DashboardLayoutUser from "../user/DashboardLayoutUser";
import { AuthContext } from "../../context/AuthContext";

function UserDashboard() {

    const { voirTicket } = useContext(TicketContext);
    const { handleLogout, username } = useContext(AuthContext)
    useEffect(() => {

        voirTicket();

    }, []);

    return (

        <DashboardLayoutUser>
            <div className="flex flex-col gap-8 p-8 w-full bg-[#F5F7FB] min-h-screen">
                <div className="flex items-start justify-between">

                    {/* LEFT */}
                    <div>

                        <h1 className="text-4xl font-bold text-gray-800">
                            Dashboard
                        </h1>

                        <p className="text-gray-500 mt-2 text-lg">
                            Bienvenue {username}. Voici vos Tickets.
                        </p>

                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-5">


                        {/* PROFILE */}
                        <div className="relative group">

                            <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm hover:bg-gray-50 transition">

                                {/* AVATAR */}
                                <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg">

                                    A

                                </div>

                                {/* INFOS */}
                                <div className="text-left">

                                    <p className="font-semibold text-gray-800">
                                        {username}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        utilisateur
                                    </p>

                                </div>
                            </button>

                            {/* gestion de l'utilisateur */}
                            <div className="absolute right-0 top-18 w-56 bg-white rounded-2xl shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-500 transition"
                                >
                                    Se déconnecter
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
                <div className="flex flex-col gap-x-8 pl-6">
                    <div className="flex">
                        <h1 className=" mt-4 font-bold text-2xl text-gray-800 w-8/10">Mes Tickets</h1>
                        <Link to="/Dashboard/create/Tickets" className="mt-3 bg-gray-800 text-white p-2 font-bold">+ Nouveau ticket</Link>
                    </div>


                    <TicketListUser />
                </div>

            </div>
        </DashboardLayoutUser>
    );
}

export default UserDashboard;