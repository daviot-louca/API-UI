import { useContext, useEffect } from "react";

import {
    TicketContext
} from "../../../context/ticket/TicketContext";

import DashboardLayout
    from "../layout/DashboardLayout";

export default function AdminDashboard() {

    const {
        tickets,
        adminStats,
        voirAdminStatistiques,
    } = useContext(TicketContext);

    useEffect(() => {

        voirAdminStatistiques();

    }, [voirAdminStatistiques]);

    return (
        <DashboardLayout>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <p className="text-slate-500">
                        Total tickets
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {adminStats.totalTickets}
                    </h2>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <p className="text-slate-500">
                        Tickets ouverts
                    </p>

                    <h2 className="text-4xl font-bold mt-2 text-blue-600">
                        {adminStats?.ticketsOuverts || 0}
                    </h2>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <p className="text-slate-500">
                        Tickets résolus
                    </p>

                    <h2 className="text-4xl font-bold mt-2 text-green-600">
                        {adminStats?.ticketsResolus || 0}
                    </h2>
                </div>

            </div>

            <div className="mt-10">

                <h2 className="text-3xl font-bold text-slate-800 mb-6">
                    Derniers tickets
                </h2>

                <div className="space-y-4">

                    {tickets?.slice(0, 5).map((ticket) => (

                        <div
                            key={ticket.id}
                            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <h3 className="text-xl font-bold text-slate-800">
                                        {ticket.title}
                                    </h3>

                                    <p className="text-slate-500 mt-1">
                                        {ticket.User?.username}
                                    </p>

                                </div>

                                <div
                                    className={`
                                        px-4 py-2 rounded-full font-semibold
                                        ${
                                            ticket.status === "ouvert"
                                                ? "bg-blue-100 text-blue-700"
                                                : ticket.status === "resolu"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-orange-100 text-orange-700"
                                        }
                                    `}
                                >
                                    {ticket.status}
                                </div>

                            </div>

                            <div className="flex items-center justify-between mt-5">

                                <p className="text-slate-400">
                                    #{ticket.id}
                                </p>

                                <p className="text-slate-400">
                                    {new Date(
                                        ticket.createdAt
                                    ).toLocaleDateString()}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </DashboardLayout>
    );
}