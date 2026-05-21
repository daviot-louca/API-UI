import {
    useEffect,
    useContext,
    useState
} from "react";

import TicketList
    from "./TicketListAdmin";

import {
    TicketContext
} from "../../context/TicketContext";

import DashboardLayout
    from "./DashboardLayout";

import {
    AdminContext
} from "../../context/AdminContext";

import {
    AuthContext
} from "../../context/AuthContext";

function AdminDashboard() {

    const {
        voirToutTicket,
        currentPage,
        selectedStatus,
        voirAdminStatistiques,
        adminStats,
        modifierTickets,
        supprimerTicket
    } = useContext(TicketContext);

    const [selectedTicket,
        setSelectedTicket] =
        useState(null);
    const {
        voirToutUser,
        users
    } = useContext(AdminContext);

    const {
        handleLogout,
        username
    } = useContext(AuthContext);

    useEffect(() => {

        voirToutTicket(
            currentPage,
            selectedStatus
        );

        voirAdminStatistiques();

        voirToutUser();

    }, [currentPage, selectedStatus]);

    const [isShowTicketOpen, setIsShowTicketOpen] = useState(false)
    return (

        <DashboardLayout>

            <div className="flex flex-col gap-6 p-6 w-full bg-[#F5F7FB] min-h-screen">

                {/* HEADER */}
                <div className="flex items-start justify-between">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-800">

                            Dashboard

                        </h1>

                        <p className="text-slate-500 mt-2 text-lg">

                            Bienvenue {username}. Voici un aperçu global des tickets.

                        </p>

                    </div>

                    {/* PROFILE */}
                    <div className="relative group">

                        <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm hover:bg-gray-50 transition">

                            {/* AVATAR */}
                            <div className="w-12 h-12 rounded-full bg-[#303030] text-white flex items-center justify-center font-bold text-lg">

                                {username?.slice(0, 2)}

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

                        {/* DROPDOWN */}
                        <div className="absolute right-0 top-18 w-56 bg-white rounded-2xl shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-500 transition"
                            >
                                Se déconnecter
                            </button>
                            <button

                                className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 transition"
                            >
                                Modifier le profil
                            </button>

                        </div>

                    </div>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-4 gap-5">

                    {/* TOTAL */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    Total tickets

                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-slate-800">

                                    {adminStats?.total}

                                </h2>

                            </div>

                        </div>

                    </div>

                    {/* REMIS */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    nombre de Tickets à faire

                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-slate-800">

                                    {
                                        adminStats?.status
                                            ?.remis
                                    }

                                </h2>

                            </div>

                        </div>

                    </div>

                    {/* UTILISATEURS */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    Tickets en cours

                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-slate-800">

                                    {adminStats?.status?.enCours}

                                </h2>

                            </div>

                        </div>

                    </div>

                    {/* OUVERT */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    Tickets résolu

                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-slate-800">

                                    {
                                        adminStats?.status
                                            ?.resolu
                                    }

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* TICKETS */}
                <div className="bg-white rounded-3xl shadow-sm p-6">
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Tickets récents
                            </h2>
                        </div>

                    </div>

                    {/* LIST */}
                    <TicketList
                        setSelectedTicket={setSelectedTicket}
                        setIsShowTicketOpen={setIsShowTicketOpen}
                    />
                    {isShowTicketOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 z-50"
                            onClick={() =>
                                setIsShowTicketOpen(false)
                            }
                        >

                            <div className="flex items-center justify-center min-h-screen">

                                <div
                                    className="bg-white rounded-3xl p-3 w-175"
                                    onClick={(e) =>
                                        e.stopPropagation()
                                    }
                                >
                                    <div className="flex justify-end">
                                        <button onClick={() => setIsShowTicketOpen(false)} className="mb-3 bg-[#303030] text-white rounded-full px-2 py-[2px]">X</button>
                                    </div>
                                    <div className="flex justify-between px-3">
                                        <h2 className="text-xl font-bold text-[#303030] mb-10">
                                            Détail du ticket numéro {selectedTicket?.id}
                                        </h2>
                                        <div>
                                            <p>
                                                Date de création : <span className="font-bold">{
                                                    new Date(selectedTicket.createdAt)
                                                        .toLocaleDateString()
                                                }</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mr-20 my-3">
                                            <div>

                                                <p className="">
                                                    Type du problème : <span className="font-bold">{selectedTicket?.type}</span>
                                                </p>
                                            </div>
                                            <div>

                                                <select
                                                    className="bg-slate-100 text-[#303030] rounded-xl px-4 py-2 outline-none border-none"
                                                    value={selectedTicket?.status}
                                                    onChange={(e) => {

                                                        modifierTickets(
                                                            selectedTicket.id,
                                                            e.target.value
                                                        );

                                                        setSelectedTicket({
                                                            ...selectedTicket,
                                                            status: e.target.value
                                                        });
                                                    }}
                                                >

                                                    <option value="remis">
                                                        remis
                                                    </option>

                                                    <option value="ouvert">
                                                        ouvert
                                                    </option>

                                                    <option value="en cours">
                                                        en cours
                                                    </option>

                                                    <option value="résolu">
                                                        résolu
                                                    </option>

                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="my-3">
                                                Titre: <span className="font-bold">{selectedTicket?.title}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                Description: <span className="font-bold">{selectedTicket?.description}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                Utilisateur : <span className="font-bold">{selectedTicket?.user?.username}</span>
                                            </p>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => {
                                                    supprimerTicket(
                                                        selectedTicket.id
                                                    );
                                                    setIsShowTicketOpen(false);
                                                    setSelectedTicket(null);
                                                }}
                                                className="text-slate-100 bg-red-500 p-1 mr-3 mb-3 rounded-[5px]"
                                            >
                                                Supprimer le ticket
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>

            </div>

        </DashboardLayout >
    );
}

export default AdminDashboard;