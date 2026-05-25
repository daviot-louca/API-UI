import { useContext } from "react";

import TicketItem from "../../shared/TicketItem";

import { TicketContext } from "../../../context/ticket/TicketContext";

function TicketList() {

    const {
        tickets,

        currentPage,
        setCurrentPage,
    } = useContext(TicketContext);

    return (

        <div className="mt-5 bg-white rounded-xl">

            {/* FILTERS */}
            <div className=" px-6 grid grid-cols-[350px_200px_200px_200px_150px_220px] gap-3 items-center text-sm bg-[#F0F0F0] rounded-t-xl">
                <div className="mx-3 px-2">
                    <h2>Ticket</h2>
                </div>
                <div className="px-2">
                    <h2>Catégorie</h2>
                </div>
                <div className="px-2">
                    <h2>Priorité</h2>
                </div>
                <div className="px-2">
                    <h2>Statut</h2>
                </div>
                <div>
                    <h2>Dernière mise à jour</h2>
                </div>
                <div className="px-2">
                    <h2>Actions</h2>
                </div>
            </div>
            <hr className="text-slate-300"/>

            {/* LIST */}
            {tickets?.map((ticket) => (

                <TicketItem
                    key={ticket.id}
                    ticket={ticket}
                />

            ))}

            {/* PAGINATION */}
            <div className="flex items-center justify-center gap-4 mt-10">

                {/* PREVIOUS */}
                <button
                    onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className="bg-white border border-gray-200 px-5 py-3 rounded-2xl font-medium hover:bg-gray-100 transition disabled:opacity-50"
                >
                    Précédent
                </button>

                {/* CURRENT PAGE */}
                <div className="bg-[#303030] text-white px-5 py-3 rounded-2xl font-semibold">

                    {currentPage}

                </div>

                {/* NEXT */}
                <button
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                    className="bg-[#303030] hover:bg-[#505050] text-white px-5 py-3 rounded-2xl font-medium transition"
                >
                    Suivant
                </button>

            </div>

        </div>
    );
}

export default TicketList;
