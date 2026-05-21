import { useContext,useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { TicketContext } from "../../context/TicketContext";

import StatusBadge from "./StatusBadge"

function TicketItem({ ticket,setIsShowTicketOpen,setSelectedTicket }) {

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

                    <div className="px-8 py-3 grid grid-cols-[40px_150px_250px_220px_200px_200px_200px]">

                        {/* ID */}
                        <div>

                            <p className="font-semibold text-[#303030]">
                                #{ticket.id}
                            </p>

                        </div>
                        <div>
                            <p>
                                {ticket?.type}
                            </p>
                        </div>

                        {/* TITLE */}
                        <div>

                            <p className="font-semibold text-[#303030]">
                                {ticket.title}
                            </p>

                        </div>

                        {/* USER */}
                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-[#303030] text-slate-100 flex items-center justify-center font-bold">

                                {ticket.user.username.slice(0, 2)}

                            </div>

                            <div>

                                <p className="font-medium text-[#303030]">
                                    {ticket.user.username}
                                </p>

                            </div>

                        </div>

                        {/* STATUS */}
                        <div className="">

                            <select
                                className="bg-slate-100 text-[#303030] rounded-xl px-4 py-2 outline-none border-none"
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

                            <p className="text-[#303030] font-medium">

                                {
                                    new Date(ticket.createdAt)
                                        .toLocaleDateString()
                                }

                            </p>

                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-3">

                            {/* VOIR */}
                            <button
                                onClick={() => { setSelectedTicket(ticket); setIsShowTicketOpen(true); }}
                                className="bg-[#303030] hover:bg-[#505050] text-slate-100 px-4 py-2 rounded-[5px] font-medium transition">
                                Voir
                            </button>

                            {/* DELETE */}
                            <button
                                onClick={() =>
                                    supprimerTicket(ticket.id)
                                }
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-[5px] font-medium transition"
                            >
                                Supprimer
                            </button>

                        </div>

                    </div>

                ) : (
                    <div>
                        <div className="p-3 grid grid-cols-[40px_140px_150px_500px_180px_190px]">
                            <div className=" mx-3">
                                {ticket?.id}
                            </div>
                            <div className=" mx-3">
                                {ticket?.type}
                            </div>
                            <div className="truncate mx-3">
                                {ticket?.title}
                            </div>
                            <div className="truncate mx-3">
                                {ticket?.description}
                            </div>
                            <div className=" w-30 mx-3">
                                <StatusBadge status={ticket.status} />
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