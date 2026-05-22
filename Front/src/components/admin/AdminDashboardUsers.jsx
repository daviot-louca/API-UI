import { useEffect, useContext, useState } from "react";

import UserList from "./UserList";

import { AdminContext } from "../../context/AdminContext";
import { AuthContext } from "../../context/AuthContext";
import DashboardLayout from "./DashboardLayout";

function AdminDashboard() {

    const {
        voirToutUser,
        deleteAll,
        users,
        rechercheUserContext
    } = useContext(AdminContext);
    const { handleLogout, username } =
        useContext(AuthContext);
    const [recherche, setRecherche] = useState("")
    useEffect(() => {
        if (recherche === "") {
            voirToutUser();
        } else {
            rechercheUserContext(recherche)
        }

    }, [recherche]);

    return (

        <DashboardLayout>

            <div className="flex flex-col gap-8 p-8 w-full bg-[#F5F7FB] min-h-screen">

                {/* HEADER */}
                <div className="flex items-center justify-between">

                    {/* LEFT */}
                    <div>

                        <h1 className="text-4xl font-bold text-gray-800">
                            Gestion des utilisateurs
                        </h1>

                        <p className="text-gray-500 mt-2 text-lg">
                            Administration complète des comptes utilisateurs
                        </p>

                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-4">

                        <button
                            onClick={deleteAll}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-2xl font-medium shadow-sm transition"
                        >
                            Réinitialiser les utilisateurs
                        </button>

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
                <div className="grid grid-cols-3 gap-6">

                    {/* CARD 1 */}
                    <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl">

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

                    {/* CARD 2 */}
                    <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl">

                            🛡️

                        </div>

                        <div>

                            <h2 className="text-4xl font-bold text-gray-800">

                                {
                                    users?.filter(
                                        (user) =>
                                            user.role === "admin"
                                    ).length
                                }

                            </h2>

                            <p className="text-gray-500 mt-1">
                                Administrateurs
                            </p>

                        </div>

                    </div>

                    {/* CARD 3 */}
                    <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl">

                            <p className="font-bold">U</p>

                        </div>

                        <div>

                            <h2 className="text-4xl font-bold text-gray-800">

                                {
                                    users?.filter(
                                        (user) =>
                                            user.role === "user"
                                    ).length
                                }

                            </h2>

                            <p className="text-gray-500 mt-1">
                                Utilisateurs simples
                            </p>

                        </div>

                    </div>

                </div>

                {/* USER LIST */}
                <div className="bg-white rounded-3xl shadow-sm p-6">

                    <div className="flex items-center justify-between mb-8">

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Liste des utilisateurs
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Gestion et suppression des comptes
                            </p>
                        </div>
                        <div className="mr-10">
                            <input type="search" name="search" id="sear"
                                placeholder="Rechercher l'utilisateur..."
                                className="bg-slate-100 border-2 border-[#909090] w-80 rounded-xl p-2 focus:border-[#303030] text-[#303030]"
                                onChange={(e) => setRecherche(e.target.value)} />
                        </div>
                    </div>

                    <UserList />

                </div>

            </div>

        </DashboardLayout>
    );
}

export default AdminDashboard;