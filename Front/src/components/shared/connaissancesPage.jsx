import { useContext, useEffect, useState } from "react";
import { ConnaissancesContext } from "../../context/baseConnaisssance/ConnaissancesContext";
import { AuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
function ConnaissancesPage() {
  const { connaissances, voirToutesConnaissances } =
    useContext(ConnaissancesContext);
  useEffect(() => {
    voirToutesConnaissances();
  }, []);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const { role } = useContext(AuthContext);
  const connaissancesFiltrees = connaissances.filter(
    (connaissance) =>
      connaissance.title.toLowerCase().includes(search.toLowerCase()) ||
      connaissance.content.toLowerCase().includes(search.toLowerCase()),
  );

  const basePath =
    role === "administrateur" ? "/admin/connaissances" : "/user/connaissances";

  return (
    <div className="flex flex-col gap-8">
      {role === "administrateur" && (
        <div className="flex justify-between items-center">
          <button
            className="px-5 py-3 rounded-2xl bg-[#303030] text-white font-medium hover:scale-105 transition"
            onClick={() => navigate(`/admin/connaissances/create`)}
          >
            + Nouvel article
          </button>
        </div>
      )}
      <div className="bg-white rounded-3xl shadow-xl p-1">
        <input
          type="text"
          placeholder="Rechercher un article..."
          className="w-full bg-slate-100 rounded-2xl px-5 py-4 outline-none"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        {connaissancesFiltrees.map((connaissance) => (
          <div
            key={connaissance.id}
            className="bg-white rounded-3xl shadow-xl p-6 hover:-translate-y-1 hover:shadow-2xl transition"
          >
            <div className="flex justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#ab9dfd59] text-[#303070] text-sm">
                {connaissance.category?.name}
              </span>

              <span className="text-gray-400 text-sm">
                Ticket #{connaissance.ticketId}
              </span>
            </div>

            <h2 className="text-xl font-bold mb-3">{connaissance.title}</h2>

            <div className="flex justify-end mt-5">
              <button
                className="font-semibold text-[#41418f]"
                onClick={() => navigate(`/${basePath}/${connaissance.id}`)}
              >
                Voir →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConnaissancesPage;
