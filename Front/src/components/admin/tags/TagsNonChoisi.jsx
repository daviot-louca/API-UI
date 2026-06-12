import TagsComponents from "./TagsComponents"
function TagsNonChoisi() {
  return (
    <TagsComponents>
        <div className="h-[calc(100vh-100px)] bg-white rounded-2xl shadow-sm flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Sélectionnez une catégorie
          </h2>

          <p className="text-slate-500 mt-2">
            Choisissez une catégorie afin de modifier, supprimer ou d'ajouter des tags.
          </p>
        </div>
      </div>
    </TagsComponents>
  )
}

export default TagsNonChoisi