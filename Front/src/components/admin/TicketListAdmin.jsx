import { useContext } from "react";

import TicketItem from "../shared/TicketItem";

import { TicketContext } from "../../context/TicketContext";

function TicketList({setSelectedTicket,setIsShowTicketOpen}) {
  
    const {
        tickets,
        currentPage,
        setCurrentPage
    } = useContext(TicketContext);


  return (
    <div className=" ml-5">

      <div className="px-8 py-3 grid grid-cols-[40px_150px_250px_220px_200px_200px_200px]">
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