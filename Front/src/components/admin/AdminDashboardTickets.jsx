import { useEffect, useContext,useState } from "react";
import { useParams } from "react-router-dom";
import TicketList from "./TicketListAdmin";
import { TicketContext } from "../../context//TicketContext"
import DashboardLayout from "./DashboardLayout";
import StatusBadge from "../shared/StatusBadge"
import { AdminContext } from "../../context/AdminContext";
import { AuthContext } from "../../context/AuthContext";

function AdminDashboard() {
    const { VoirUnTicketContext, ticket } = useContext(TicketContext)
    const { id } = useParams()
    const { voirToutTicket, tickets, currentPage, setCurrentPage } =
        useContext(TicketContext);

    const { voirToutUser, users } =
        useContext(AdminContext);

    const { handleLogout, username } =
        useContext(AuthContext);

    useEffect(() => {

        voirToutTicket(currentPage);
        voirToutUser();

    }, [currentPage]);

    const [isShowTicketDetail,setIsShowTicketDetail] =useState(false)

    return (

        <DashboardLayout>

            <div className="flex flex-col gap-3 p-5 w-full bg-[#F5F7FB] min-h-screen">

                {/* HEADER */}
                <div className="flex items-start justify-between">

                    {/* LEFT */}
                    <h1 className="text-slate-800 mt-2 text-xl">
                        Bienvenue {username}. Voici un aperçu des tickets.
                    </h1>

                    {/* RIGHT */}
                    <div className="flex items-center gap-5">


                        {/* PROFILE */}
                        <div className="relative group">

                            <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm hover:bg-gray-50 transition">

                                {/* AVATAR */}
                                <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg">

                                    {username.slice(0, 2)}

                                </div>

                                {/* INFOS */}
                                <div className="text-left">

                                    <p className="font-semibold text-gray-800">
                                        {username}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Administrateur
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

                {/* STATS */}
                <div className="grid grid-cols-2 gap-5">

                    {/* CARD 1 */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-3xl">
                            🎫
                        </div>

                        <div>

                            <h2 className="text-4xl font-bold text-gray-800">
                                {tickets?.length}
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Tickets
                            </p>

                        </div>

                    </div>

                    {/* CARD 2 */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
                            👥
                        </div>

                        <div>

                            <h2 className="text-4xl font-bold text-gray-800">
                                {users?.length}
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Utilisateurs
                            </p>

                        </div>

                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="">

                    {/* LEFT */}
                    <div className="bg-white rounded-3xl shadow-sm p-3">

                        <div className="flex items-center justify-between mb-8">

                            <div>

                                <h2 className="text-2xl font-bold text-gray-800">
                                    Tickets récents
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Derniers tickets utilisateurs
                                </p>

                            </div>
                        </div>

                        <TicketList />

                    </div>
                </div>

            </div>
            <div className="fixed inset-0 bg-black/50">
                {/*Cards */}
                <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-slate-100 rounded-3xl p-8 w-150 h-200">
                        {/*Headers */}
                        <div className="flex justify-end">
                            <p className="bg-slate-800 rounded-full p-3 px-4 text-slate-100 font-bold">
                                {ticket?.id} 11
                            </p>
                        </div>
                        {/*BODY */}
                        {/*titre du ticket*/}
                        <div className="my-5">
                            <h2 className="text-xl font-semibold">Titre du ticket</h2>
                            <div className="text-3xl font-bold">
                                {ticket?.title}hhhg
                            </div>
                            <div className="flex">
                                <div className="mr-5">
                                    <StatusBadge status={ticket?.status} />
                                </div>
                                <div>
                                    {new Date(ticket?.createdAt)
                                        .toLocaleDateString()}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </DashboardLayout>
    );
}

export default AdminDashboard;