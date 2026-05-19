import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { TicketContext } from "../../context/TicketContext";

import StatusBadge from "./StatusBadge"

function TicketItem({ ticket }) {

    const { role } =
        useContext(AuthContext);

    const {
        supprimerTicket,
        modifierTickets,
    } = useContext(TicketContext);

    return (

        <div>

            {
                role === "admin" ? (

                    <div className="grid grid-cols-6 items-center bg-white rounded-2xl shadow-sm px-6 py-5 mb-4 hover:shadow-md transition">

                        {/* ID */}
                        <div>

                            <p className="font-semibold text-gray-800">
                                #{ticket.id}
                            </p>

                        </div>

                        {/* TITLE */}
                        <div>

                            <p className="font-semibold text-gray-800">
                                {ticket.title}
                            </p>

                        </div>

                        {/* USER */}
                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">

                                {ticket.user.username.slice(0,2)}

                            </div>

                            <div>

                                <p className="font-medium text-gray-800">
                                    {ticket.user.username}
                                </p>

                            </div>

                        </div>

                        {/* STATUS */}
                        <div>

                            <select
                                className="bg-gray-100 rounded-xl px-4 py-2 outline-none border-none"
                                value={ticket.status}
                                onChange={(e) =>
                                    modifierTickets(
                                        ticket.id,
                                        e.target.value
                                    )
                                }
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

                        {/* DATE */}
                        <div>

                            <p className="text-gray-500 font-medium">

                                {
                                    new Date(ticket.createdAt)
                                        .toLocaleDateString()
                                }

                            </p>

                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-3">

                            {/* VOIR */}
                            <Link
                                to={`/admin/tickets/${ticket.id}`}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium transition"
                            >
                                Voir
                            </Link>

                            {/* DELETE */}
                            <button
                                onClick={() =>
                                    supprimerTicket(ticket.id)
                                }
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition"
                            >
                                Supprimer
                            </button>

                        </div>

                    </div>

                ) : (

                    <div className="bg-white rounded-3xl shadow-sm p-6 flex items-start justify-between hover:shadow-md transition mb-5">

                        {/* LEFT */}
                        <div className="flex flex-col gap-3 mr-">

                            <h2 className="text-2xl font-bold text-gray-800">

                                {ticket.title}

                            </h2>

                            <p className="text-gray-500 leading-relaxed">

                                {ticket.description}

                            </p>

                        </div>

                        {/* RIGHT */}
                        <div className="flex items-end gap-2">

                            {/* STATUS */}
                            <div>
                                <StatusBadge status={ticket.status} />
                            </div>
                        </div>
                        {/* DATE */}
                        <p className="text-gray-400 text-sm mr-50">

                            {
                                new Date(ticket.createdAt)
                                    .toLocaleDateString()
                            }

                        </p>



                    </div>
                )
            }

        </div>
    );
}

export default TicketItem;