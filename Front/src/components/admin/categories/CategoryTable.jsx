import { Pencil, Trash2, Plus } from "lucide-react";
import TicketTypeIcon from "../../shared/TicketTypeIcon";
import { getCategoryId, INITIAL_CATEGORY_FORM } from "./categoryAdmin.helpers";
import { useAdminCategories } from "../../../hooks/category/useAdminCategories";
import CategoryModal from "./CategoryModal";
export default function CategoryTable({ categories, onDelete, onEdit }) {
  const {
    closeModal,
    formData,
    formError,
    handleDelete,
    handleFormChange,
    handleSubmit,
    isModalOpen,
    isSubmitting,
    openEditModal,
    selectedCategory,deletingCategoryId, openCreateModal } = useAdminCategories();
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex justify-between gap-1 border-b border-slate-200 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-xl font-bold text-[#303030]">
            Liste des categories
          </h2>
          <p className="text-sm text-slate-500">
            {categories.length} catégorie{categories.length > 1 ? "s" : ""}{" "}
            enregistrée{categories.length > 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-[#303030] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#505050] focus:outline-none focus:ring-2 focus:ring-[#266fdb] focus:ring-offset-2"
        >
          <Plus size={18} />
          Ajouter une catégorie
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Nom
              </th>
              <th className="min-w-70 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Description
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Icône
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Couleur
              </th>
              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-5 py-12 text-center text-sm text-slate-500"
                >
                  Aucune catégorie enregistrée.
                </td>
              </tr>
            ) : (
              categories.map((category) => {
                const categoryId = getCategoryId(category);
                const isDeleting = deletingCategoryId === categoryId;
                const color = category.color || INITIAL_CATEGORY_FORM.color;

                return (
                  <tr key={categoryId} className="transition hover:bg-slate-50">
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                          style={{ backgroundColor: color }}
                        >
                          {category.name?.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="font-semibold text-[#303030]">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    <td className="max-w-xl px-5 py-4 text-sm leading-6 text-slate-600">
                      {category.description || "Sans description"}
                    </td>

                    <td className="px-5 py-4">
                      <TicketTypeIcon
                        type={category.name}
                        category={category}
                        showLabel
                      />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="h-6 w-6 rounded-full border border-slate-200 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm font-medium text-slate-600">
                          {category.color}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(category)}
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        >
                          <Pencil size={16} />
                          Modifier
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(category)}
                          disabled={isDeleting}
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-red-500 px-3 text-sm font-semibold text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 size={16} />
                          {isDeleting ? "Suppression..." : "Supprimer"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <CategoryModal
          formData={formData}
          formError={formError}
          isEditing={Boolean(selectedCategory)}
          isSubmitting={isSubmitting}
          onChange={handleFormChange}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
