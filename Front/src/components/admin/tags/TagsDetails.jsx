import DashboardLayout from "../layout/DashboardLayout";
import { useParams } from "react-router-dom";
import { useAdminCategories } from "../../../hooks/category/useAdminCategories";
import { useContext, useState } from "react";
import { CategoriesContext } from "../../../context/categories/CategoriesContext";
function TagsDetails() {
  const { categoryId } = useParams();
  const { categoryList } = useAdminCategories();
  const category = categoryList.find(
    (category) => category.id === Number(categoryId),
  );
  const { supprimerTags, ajoutTags } = useContext(CategoriesContext);
  const [nom, setNom] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ajoutTags(nom, category.id);
      setNom("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DashboardLayout>
      <div className="grid grid-cols-[75%_25%] gap-10 mr-15 ml-5">
        {/*partie des tags*/}
        <div className="bg-white shadow-xl rounded-2xl px-6">
          {/**partie recherche */}
          <div className="py-5 flex justify-center">
            <input
              type="text"
              className=" w-[calc(90%-2.5rem)] rounded-2xl bg-slate-100 border border-slate-400 py-3 px-6 placeholder-[#303030]"
              /**style={{ boxShadow: `1px 3px 10px 1px ${category?.color}` }}*/
              placeholder="Rechercher un tag..."
            />
          </div>
          {/**partie total tags */}
          <div className="flex flex-wrap gap-3">
            {category?.tags.map((tag) => {
              return (
                <div
                  key={tag.id}
                  className="group flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm transition-all duration-300 hover:shadow-lg"
                  style={{
                    borderColor: `${category?.color}40`,
                    backgroundColor: `${category?.color}10`,
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: category?.color }}
                  />

                  <span className="text-sm font-medium">{tag.nom}</span>

                  <button
                    onClick={() => supprimerTags(tag.id)}
                    className="ml-1 text-xs opacity-50 transition hover:opacity-100 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {/**partie des détails */}
        <div className="flex flex-col gap-8">
          {/* Détail catégorie */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">
                Détail de la catégorie
              </h2>

              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold shadow-md"
                style={{ backgroundColor: category?.color }}
              >
                {category?.icon}
              </span>
            </div>

            <div className="space-y-5">
              <div className=" rounded-xl p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                  Nom
                </p>
                <p className="font-medium text-slate-800">{category?.name}</p>
              </div>

              <div className=" rounded-xl p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                  Description
                </p>
                <p className="text-slate-700">
                  {category?.description || "Aucune description"}
                </p>
              </div>

              <div className="rounded-xl p-4 text-[#303030]">
                <p className="text-sm opacity-90 text-slate-500">
                  Nombre de tags
                </p>
                <p className="text-3xl font-bold">
                  {category?.tags?.length || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Ajout tags */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Ajouter des tags
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="iphone, samsung, carte graphique..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400"
              />

              <p className="text-xs text-slate-500">
                Sépare plusieurs tags avec une virgule.
              </p>

              <button
                type="submit"
                className="rounded-xl py-3 font-medium text-white transition hover:opacity-90"
                style={{ backgroundColor: category?.color }}
              >
                Ajouter les tags
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TagsDetails;
