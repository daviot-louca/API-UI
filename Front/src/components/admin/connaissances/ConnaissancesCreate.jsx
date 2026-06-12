import DashboardLayout from "../layout/DashboardLayout";
import { useState,useContext } from "react";
import { useAdminCategories } from "../../../hooks/category/useAdminCategories";
import { useNavigate } from "react-router-dom";
import { ConnaissancesContext } from "../../../context/baseConnaisssance/ConnaissancesContext";
function ConnaissancesCreate() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const {AjouterConnaissance} = useContext(ConnaissancesContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    await AjouterConnaissance(title,content,categoryId)
    navigate("/admin/connaissances")
  };
  const { categoryList } = useAdminCategories();
  const navigate = useNavigate()
  return (
    <DashboardLayout>
          <button
            onClick={() => navigate("/admin/connaissances")}
            className="text-gray-500 hover:text-[#333370] font-medium transition"
          >
            ← Retour à la base de connaissances
          </button>
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}

        {/* Formulaire */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Titre */}
            <div>
              <label className="block font-semibold mb-3">
                Titre de l'article
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex : Impossible de se connecter au VPN"
                className="w-full bg-slate-100 rounded-2xl px-5 py-4 outline-none border border-transparent focus:border-[#333370]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-3">Catégorie</label>

              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-slate-100 rounded-2xl px-5 py-4 outline-none border border-transparent focus:border-[#333370]"
              >
                <option value="">Sélectionner une catégorie</option>

                {categoryList.map((category) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-3">
                Solution détaillée
              </label>

              <textarea
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Décrivez ici la solution étape par étape..."
                className="w-full bg-slate-100 rounded-2xl px-5 py-4 outline-none resize-none border border-transparent focus:border-[#333370]"
              />
            </div>

            {/* Aperçu */}
            <div className="bg-slate-50 border rounded-3xl p-6">
              <h3 className="font-bold text-lg mb-4">Aperçu</h3>

              <h2 className="text-2xl font-bold">
                {title || "Titre de l'article"}
              </h2>

              <p className="text-gray-500 mt-2">
                {
                  categoryList.find((cat) => cat.id === Number(categoryId))
                    ?.name
                }
              </p>

              <div className="mt-5 whitespace-pre-wrap">
                {content || "Le contenu de l'article apparaîtra ici..."}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/connaissances")}
                className="px-6 py-3 rounded-2xl bg-slate-200 font-medium hover:bg-slate-300 transition"
              >
                Annuler
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-[#333370] text-white font-medium hover:scale-105 transition"
              >
                Créer l'article
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ConnaissancesCreate;
