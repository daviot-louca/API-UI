import { useContext, useEffect } from "react";

import TicketItem from "../../shared/TicketItem";

import { TicketContext } from "../../../context/ticket/TicketContext";

function TicketList({ setIsShowTicketOpen,setSelectedTicket }) {
  const { currentPage, setCurrentPage, tickets, stats, totalTickets } =
    useContext(TicketContext);

  return (
    <div className="mt-5 bg-white rounded-xl">
      {/* FILTERS */}
      <div className=" px-6 py-2 grid grid-cols-[350px_200px_200px_200px_150px_220px] gap-3 items-center text-sm bg-[#F0F0F0] rounded-t-xl">
        <div className="mx-3 px-2">
          <h2 className="text-lg">Ticket</h2>
        </div>
        <div className="px-2">
          <h2 className="text-lg">Catégorie</h2>
        </div>
        <div className="px-2">
          <h2 className="text-lg">Priorité</h2>
        </div>
        <div className="px-2">
          <h2 className="text-lg">Statut</h2>
        </div>
        <div>
          <h2 className="text-lg">Dernière mise à jour</h2>
        </div>
        <div className="px-2">
          <h2 className="text-lg">Actions</h2>
        </div>
      </div>
      <hr className="text-slate-300" />
      {/* LIST */}
      {tickets.length == 0 ? (
        <div className="bg-white rounded-b-xl">
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-bold text-slate-700">
              Aucun ticket trouvé
            </h2>

            <p className="text-slate-500 mt-2">
              Vous n’avez encore créé aucun ticket.
            </p>
          </div>
        </div>
      ) : (
        tickets?.map((ticket) => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            setIsShowTicketOpen={setIsShowTicketOpen}
            setSelectedTicket={setSelectedTicket}
          />
        ))
      )}
      {totalTickets > 10 && (
        <div className="p-2">
          {/* PAGINATION */}
          <div className="flex items-center justify-center gap-4 mt-10">
            {/* PREVIOUS */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-100 border border-gray-900 px-5 py-3 rounded-2xl font-medium hover:bg-gray-300 transition disabled:opacity-50"
            >
              Précédent
            </button>

            {/* CURRENT PAGE */}
            <div className="bg-[#303030] text-white px-5 py-3 rounded-2xl font-semibold">
              {currentPage}
            </div>

            {/* NEXT */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-[#303030] hover:bg-[#505050] text-white px-5 py-3 rounded-2xl font-medium transition"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketList;
