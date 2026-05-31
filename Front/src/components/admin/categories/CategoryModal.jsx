import { X } from "lucide-react";

export default function CategoryModal({
  formData,
  formError,
  isEditing,
  isSubmitting,
  onChange,
  onClose,
  onSubmit,
}) {


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6" onClick={()=>onClose()}>
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-[#303030]">
              {isEditing ? "Modifier la catégorie" : "Ajouter une catégorie"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? "Mettez à jour les informations de cette catégorie."
                : "Créez une nouvelle catégorie de ticket."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Fermer la modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-5 px-6 py-6">
          {formError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {formError}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="category-name"
                className="text-sm font-semibold text-slate-700"
              >
                Nom
              </label>
              <input
                id="category-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={onChange}
                minLength="2"
                maxLength="50"
                required
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm text-[#303030] outline-none transition focus:border-[#266fdb] focus:ring-2 focus:ring-blue-100"
                placeholder="Messagerie"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="category-icon"
                className="text-sm font-semibold text-slate-700"
              >
                Icône
              </label>
              <input
                id="category-icon"
                name="icon"
                type="text"
                value={formData.icon}
                onChange={onChange}
                minLength="2"
                maxLength="30"
                required
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm text-[#303030] outline-none transition focus:border-[#266fdb] focus:ring-2 focus:ring-blue-100"
                placeholder="Mail"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="category-description"
              className="text-sm font-semibold text-slate-700"
            >
              Description
            </label>
            <textarea
              id="category-description"
              name="description"
              value={formData.description}
              onChange={onChange}
              maxLength="300"
              rows="4"
              className="resize-none rounded-lg border border-slate-300 px-3 py-3 text-sm leading-6 text-[#303030] outline-none transition focus:border-[#266fdb] focus:ring-2 focus:ring-blue-100"
              placeholder="Demandes liées aux boîtes mail, listes de diffusion et signatures."
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="category-color"
                className="text-sm font-semibold text-slate-700"
              >
                Couleur
              </label>
              <input
                id="category-color"
                name="color"
                type="color"
                value={formData.color}
                onChange={onChange}
                required
                className="h-11 w-full cursor-pointer rounded-lg border border-slate-300 bg-white p-1 outline-none transition focus:border-[#266fdb] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-end">
              <div className="flex min-h-11 w-full items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3">
                <span
                  className="h-6 w-6 rounded-full border border-slate-200 shadow-sm"
                  style={{ backgroundColor: formData.color }}
                />
                <span className="text-sm font-semibold text-slate-700">
                  {formData.color}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#303030] px-4 text-sm font-semibold text-white transition hover:bg-[#505050] focus:outline-none focus:ring-2 focus:ring-[#303030] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Enregistrement..."
                : isEditing
                  ? "Modifier"
                  : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
