import { useContext } from "react";
import { TicketContext } from "../../context/ticket/TicketContext";
export default function BarreFiltresFunction(){
      const {
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
    return(
              <div className="flex flex-wrap bg-white p-4 rounded-xl justify-between items-center gap-4 shadow-sm">
            <div className="flex flex-wrap gap-4">
              <select
                className="h-11 rounded-xl bg-white border border-slate-200 px-4 font-semibold"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Toutes les catégories</option>
                <option value="Poste de travail">Poste de travail</option>
                <option value="Téléphonie">Téléphonie</option>
                <option value="Compte d'accès">Compte d'accès</option>
                <option value="Messagerie">Messagerie</option>
                <option value="Autres">Autres</option>
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
                onClick={(e) => {
                  (setStatusFilter(""),
                    setSortFilter("recent"),
                    setCategoryFilter(""),
                    setPriorityFilter(""));
                    setSearch("")
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
                placeholder="Rechercher un ticket..."
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
                onClick={() => setIsTypeModalOpen(true)}
              >
                + Ajouter un Ticket
              </button>
            </div>
          </div>)
}
