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

                    <div className="px-8 py-3 grid grid-cols-[40px_250px_250px_200px_200px_200px]">

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
                    <div>
                    <div className="p-6 grid grid-cols-[40px_180px_600px_180px_190px]">
                        <div>
                            {ticket?.id}
                        </div>
                        <div>
                            {ticket?.title}
                        </div>
                        <div className="truncate">
                            {ticket?.description}
                        </div>
                        <div className=" w-30">
                            <StatusBadge status={ticket.status}/>
                        </div>
                        <div>
                                                            {
                                    new Date(ticket.createdAt)
                                        .toLocaleDateString()
                                }
                        </div>
                    </div>
                    <hr className="w-295" />
                    </div>
                    
                )
            }

        </div>
    );
}

export default TicketItem;