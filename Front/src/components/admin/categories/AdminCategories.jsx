import { Plus } from "lucide-react";
import { useAdminCategories } from "../../../hooks/category/useAdminCategories";
import DashboardLayout from "../layout/DashboardLayout";
import CategoryModal from "./CategoryModal";
import CategoryStats from "./CategoryStats";
import CategoryTable from "./CategoryTable";

export default function AdminCategories() {
  const {
    categoryList,
    closeModal,
    deletingCategoryId,
    formData,
    formError,
    handleDelete,
    handleFormChange,
    handleSubmit,
    isModalOpen,
    isSubmitting,
    openCreateModal,
    openEditModal,
    selectedCategory,
  } = useAdminCategories();

  return (
    <DashboardLayout>
      <section className="min-h-screen w-full bg-[#F5F7FB] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#303030] sm:text-4xl">
                Gestion des categories
              </h1>
              <p className="mt-2 text-base text-slate-500 sm:text-lg">
                Organisez les types de tickets disponibles pour les
                utilisateurs.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-[#266fdb] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f5ebd] focus:outline-none focus:ring-2 focus:ring-[#266fdb] focus:ring-offset-2"
            >
              <Plus size={18} />
              Ajouter une catégorie
            </button>
          </header>

          <CategoryStats categories={categoryList} />

          <CategoryTable
            categories={categoryList}
            deletingCategoryId={deletingCategoryId}
            onDelete={handleDelete}
            onEdit={openEditModal}
          />
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
      </section>
    </DashboardLayout>
  );
}
