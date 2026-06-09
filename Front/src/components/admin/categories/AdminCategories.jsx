import { useAdminCategories } from "../../../hooks/category/useAdminCategories";
import DashboardLayout from "../layout/DashboardLayout";
import CategoryStats from "./CategoryStats";
import CategoryTable from "./CategoryTable";

export default function AdminCategories() {
  const {
    categoryList,
    deletingCategoryId,
    handleDelete,
    openEditModal,
  } = useAdminCategories();
  return (
    <DashboardLayout>
      <section className="w-full bg-[#F5F7FB] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">


          <CategoryStats categories={categoryList} />

          <CategoryTable
            categories={categoryList}
            deletingCategoryId={deletingCategoryId}
            onDelete={handleDelete}
            onEdit={openEditModal}
          />
        </div>
      </section>
    </DashboardLayout>
  );
}
