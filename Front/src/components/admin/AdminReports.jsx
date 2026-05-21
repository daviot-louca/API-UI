import { useContext, useEffect } from "react";

import {
    TicketContext
} from "../../context/TicketContext";

import DashboardLayout
    from "./DashboardLayout";

function AdminReports() {

    const {
        adminStats,
        voirAdminStatistiques
    } = useContext(TicketContext);

    useEffect(() => {

        voirAdminStatistiques();

    }, []);

    return (

        <DashboardLayout>

            <div className="bg-[#F5F7FB] min-h-screen p-8">

                {/* HEADER */}
                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-slate-800">

                        Rapports & Statistiques

                    </h1>

                    <p className="text-slate-500 mt-2 text-lg">

                        Vue globale des tickets utilisateurs

                    </p>

                </div>

                {/* TOP STATS */}
                <div className="grid grid-cols-4 gap-6">

                    {/* TOTAL */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    Total tickets

                                </p>

                                <h1 className="text-5xl font-bold text-slate-800 mt-3">

                                    {adminStats?.total}

                                </h1>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-3xl">

                                🎫

                            </div>

                        </div>

                    </div>

                    {/* REMIS */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    Remis

                                </p>

                                <h1 className="text-5xl font-bold text-slate-800 mt-3">

                                    {
                                        adminStats?.status
                                            ?.remis
                                    }

                                </h1>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl">

                                📥

                            </div>

                        </div>

                    </div>

                    {/* OUVERT */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    Ouverts

                                </p>

                                <h1 className="text-5xl font-bold text-slate-800 mt-3">

                                    {
                                        adminStats?.status
                                            ?.ouvert
                                    }

                                </h1>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">

                                📂

                            </div>

                        </div>

                    </div>

                    {/* RESOLU */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    Résolus

                                </p>

                                <h1 className="text-5xl font-bold text-slate-800 mt-3">

                                    {
                                        adminStats?.status
                                            ?.resolu
                                    }

                                </h1>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">

                                ✅

                            </div>

                        </div>

                    </div>

                </div>

                {/* TYPES */}
                <div className="mt-10">

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-3xl font-bold text-slate-800">

                            Répartition des types

                        </h2>

                    </div>

                    <div className="grid grid-cols-2 gap-6">

                        {/* POSTE */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-slate-500 text-lg">

                                        Poste de travail

                                    </p>

                                    <h1 className="text-6xl font-bold mt-5 text-slate-800">

                                        {
                                            adminStats?.types
                                                ?.posteTravail
                                        }

                                    </h1>

                                </div>

                                <div className="text-7xl">

                                    💻

                                </div>

                            </div>

                        </div>

                        {/* TELEPHONIE */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-slate-500 text-lg">

                                        Téléphonie

                                    </p>

                                    <h1 className="text-6xl font-bold mt-5 text-slate-800">

                                        {
                                            adminStats?.types
                                                ?.telephonie
                                        }

                                    </h1>

                                </div>

                                <div className="text-7xl">

                                    📞

                                </div>

                            </div>

                        </div>

                        {/* MESSAGERIE */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-slate-500 text-lg">

                                        Messagerie

                                    </p>

                                    <h1 className="text-6xl font-bold mt-5 text-slate-800">

                                        {
                                            adminStats?.types
                                                ?.messagerie
                                        }

                                    </h1>

                                </div>

                                <div className="text-7xl">

                                    ✉️

                                </div>

                            </div>

                        </div>

                        {/* COMPTE */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-slate-500 text-lg">

                                        Comptes d'accès

                                    </p>

                                    <h1 className="text-6xl font-bold mt-5 text-slate-800">

                                        {
                                            adminStats?.types
                                                ?.compteAcces
                                        }

                                    </h1>

                                </div>

                                <div className="text-7xl">

                                    🔐

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* STATUS DETAIL */}
                <div className="mt-10 bg-white rounded-3xl p-8 shadow-sm">

                    <h2 className="text-3xl font-bold text-slate-800 mb-8">

                        Répartition des statuts

                    </h2>

                    <div className="space-y-6">

                        {/* REMIS */}
                        <div>

                            <div className="flex justify-between mb-2">

                                <p className="font-semibold text-slate-700">

                                    Remis

                                </p>

                                <p className="font-bold">

                                    {
                                        adminStats?.status
                                            ?.remis
                                    }

                                </p>

                            </div>

                            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">

                                <div
                                    className="h-full bg-orange-400 rounded-full"
                                    style={{
                                        width: `${(adminStats?.status?.remis / adminStats?.total) * 100 || 0}%`
                                    }}
                                />

                            </div>

                        </div>

                        {/* OUVERT */}
                        <div>

                            <div className="flex justify-between mb-2">

                                <p className="font-semibold text-slate-700">

                                    Ouverts

                                </p>

                                <p className="font-bold">

                                    {
                                        adminStats?.status
                                            ?.ouvert
                                    }

                                </p>

                            </div>

                            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">

                                <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{
                                        width: `${(adminStats?.status?.ouvert / adminStats?.total) * 100 || 0}%`
                                    }}
                                />

                            </div>

                        </div>

                        {/* RESOLU */}
                        <div>

                            <div className="flex justify-between mb-2">

                                <p className="font-semibold text-slate-700">

                                    Résolus

                                </p>

                                <p className="font-bold">

                                    {
                                        adminStats?.status
                                            ?.resolu
                                    }

                                </p>

                            </div>

                            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">

                                <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{
                                        width: `${(adminStats?.status?.resolu / adminStats?.total) * 100 || 0}%`
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default AdminReports;