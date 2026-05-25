import { useContext } from "react";

import TicketItem from "../../shared/TicketItem";

import { TicketContext } from "../../../context/ticket/TicketContext";

function TicketList({setSelectedTicket,setIsShowTicketOpen}) {
  
    const {
        tickets,
        currentPage,
        setCurrentPage
    } = useContext(TicketContext);


  return (
    <div className="ml-0 overflow-x-auto">

      <div className="px-4 py-3 grid grid-cols-[2.5rem_minmax(8rem,1fr)_minmax(11rem,1.4fr)_minmax(9rem,1fr)_8rem_9rem_8rem_10rem] gap-3 text-sm">
        <div className="">
          <h3>ID</h3>
        </div>
        <div>
          <h3>type</h3>
        </div>

        <div className="">
          <h3>Titre</h3>
        </div>

        <div className="">
          <h3>Utilisateur</h3>
        </div>

        <div className="">
          <h3>Status</h3>
        </div>

        <div className="">
          <h3>Priorité</h3>
        </div>

        <div className="">
          <h3>Date de création</h3>
        </div>
        <div className="">
          <h3>gestion du tickets</h3>
        </div>
      </div>

      <div>

        {tickets?.map((ticket) => (

          <TicketItem
   key={ticket.id}
   ticket={ticket}
   setIsShowTicketOpen={setIsShowTicketOpen}
   setSelectedTicket={setSelectedTicket}
/>

        ))}

      </div>
<div className="flex items-center justify-center gap-4 mt-5">

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
                    className="bg-[#303030] hover:bg-[#505050] text-slate-100 px-5 py-3 rounded-2xl font-medium transition"
                >
                    Suivant
                </button>

            </div>
    </div>
  )
}

export default TicketList;
