import { useContext, useEffect, useState } from "react";
import { TicketContext } from "../../context/ticket/TicketContext";
import { AuthContext } from "../../context/auth/AuthContext";
import { useCategory } from "../../hooks/category/useCategory";
import ModalNouveauTicket from "../shared/modals/ModalNouveauTicket";

export default function BarreFiltresFunction() {
  const {
    ajoutTicket,
    categoryFilter,
    priorityFilter,
    statusFilter,
    search,
    sortFilter,
    setSearch,
    setCategoryFilter,
    setPriorityFilter,
    setStatusFilter,
    setSortFilter,
  } = useContext(TicketContext);
  const { role } = useContext(AuthContext);
  const { categories, fetchCategories } = useCategory();
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const handleAjoutTicket = async (ticketData) => {
    await ajoutTicket(ticketData);
  };

  const categoryList = Array.isArray(categories) ? categories : [];

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="flex flex-wrap bg-white p-4 rounded-xl justify-between items-center gap-4 shadow-sm">
      <div className="flex flex-wrap gap-4">
        <select
          className="h-11 rounded-xl bg-white border border-slate-200 px-4 font-semibold"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Toutes les categories</option>
          {categoryList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          className="h-11 rounded-xl bg-white border border-slate-200 px-4 font-semibold"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">Tous les priorités</option>
          <option value="faible">Faible</option>
          <option value="moyenne">Moyenne</option>
          <option value="haute">Haute</option>
          <option value="urgente">Urgente</option>
        </select>
        <select
          className="h-11 rounded-xl bg-white border border-slate-200 px-4 font-semibold"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="remis">Remis</option>
          <option value="en cours">en cours</option>
          <option value="résolu">Résolus</option>
        </select>
        <button
          onClick={() => {
            (setStatusFilter(""),
              setSortFilter("recent"),
              setCategoryFilter(""),
              setPriorityFilter(""));
            setSearch("");
          }}
          className="h-11 rounded-xl bg-white border border-slate-200 px-4 font-semibold"
        >
          Réinitialiser les filtres
        </button>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-150 bg-white px-4 border rounded-xl"
          placeholder="Rechercher un ticket ou un utilisateur..."
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <select
          className="h-11 rounded-xl bg-white border border-slate-200 px-4 font-semibold"
          value={sortFilter}
          onChange={(e) => setSortFilter(e.target.value)}
        >
          <option value="recent">Plus récent</option>
          <option value="oldest">Plus ancien</option>
          <option value="az">A à Z</option>
          <option value="za">Z à A</option>
        </select>

          <button
            className="bg-[#303030] p-2.5 rounded-xl text-slate-100 hover:bg-[#505050]"
            onClick={() => setIsTicketModalOpen(true)}
          >
            + Ajouter un Ticket
          </button>

      </div>
      {isTicketModalOpen && (
        <ModalNouveauTicket
          setIsTicketModalOpen={setIsTicketModalOpen}
          handleAjoutTicket={handleAjoutTicket}
        />
      )}
    </div>
  );
}
