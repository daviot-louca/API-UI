import { useContext } from "react";

import TicketItem from "../shared/TicketItem";

import { TicketContext } from "../../context/TicketContext";

function TicketList() {

    const {
        tickets,
        currentPage,
        setCurrentPage
    } = useContext(TicketContext);


    return (
        <div className="mt-5">


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
                <div className="bg-slate-800 text-white px-5 py-3 rounded-2xl font-semibold">

                    {currentPage}

                </div>

                {/* NEXT */}
                <button
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                    className="bg-slate-800 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl font-medium transition"
                >
                    Suivant
                </button>

            </div>

        </div>
    )
}

export default TicketList;