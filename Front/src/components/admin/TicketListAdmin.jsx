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
    <div className="mt-5 ml-5">

      <h2>Tickets des utilisateurs</h2>

      <div className="flex mt-2">
        <div className="w-1/6">
          <h3>ID</h3>
        </div>

        <div className="w-1/6">
          <h3>Titre</h3>
        </div>

        <div className="w-1/6">
          <h3>Utilisateur</h3>
        </div>

        <div className="w-1/6">
          <h3>Status</h3>
        </div>

        <div className="w-1/6">
          <h3>Date de création</h3>
        </div>
        <div className="w-1/6">
          <h3>gestion du tickets</h3>
        </div>
      </div>

      <div>

        {tickets?.map((ticket) => (

          <TicketItem
   key={ticket.id}
   ticket={ticket}
/>

        ))}

      </div>
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
                <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl font-semibold">

                    {currentPage}

                </div>

                {/* NEXT */}
                <button
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl font-medium transition"
                >
                    Suivant
                </button>

            </div>
    </div>
  )
}

export default TicketList;