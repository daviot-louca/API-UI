import DashboardLayout from "../layout/DashboardLayout";
import { useParams } from "react-router-dom";
import { useAdminCategories } from "../../../hooks/category/useAdminCategories";
import { useContext,useState } from "react";
import { CategoriesContext } from "../../../context/categories/CategoriesContext";
function TagsDetails() {
  const { categoryId } = useParams();
  const { categoryList } = useAdminCategories();
  const category = categoryList.find(
    (category) => category.id === Number(categoryId),
  );
  const {supprimerTags,ajoutTags} = useContext(CategoriesContext)
  const [nom,setNom] = useState("")
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        await ajoutTags(nom,category.id)
        setNom("")
    } catch (error) {
        console.log(error)
    }
  }
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
          <div className="flex gap-5 ">
            {category?.tags.map((tag) => {
              return (
                <div key={tag.id} className="flex">
                  <div className="flex gap-3 border py-2 px-3 rounded-2xl">
                    <p>{tag.nom}</p>
                    <button onClick={()=>supprimerTags(tag.id)}>X</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/**partie des détails */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col bg-white shadow-xl py-5 px-3 rounded-2xl gap-5">
            <div>
              <h2>Détail de la catégorie</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <h2>Nom</h2>
                <p>{category?.name}</p>
              </div>
              <div>
                <h2>icone</h2>
                <div className="flex  items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: category?.color }}
                  >
                    {category?.icon}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h2>Description</h2>
              <p>{category?.description || "aucune description"}</p>
            </div>
            <div>
              <p>
                {category?.name} a {category?.tags?.length} tags{" "}
              </p>
            </div>
          </div>
          <div className="bg-white shadow-xl py-5 px-3 rounded-2xl">
            <h2>Ajouter un ticket +</h2>
            <div>
                <form action="" onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=> setNom(e.target.value)} />
                <button type="submit">Ajouter</button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TagsDetails;
