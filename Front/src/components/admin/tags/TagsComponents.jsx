import DashboardLayout from "../layout/DashboardLayout";
import { useAdminCategories } from "../../../hooks/category/useAdminCategories";
import { useNavigate } from "react-router-dom";
function TagsComponents({ children }) {
  const navigate = useNavigate();
  const { categoryList } = useAdminCategories();
  console.log(categoryList);
  return (
    <DashboardLayout>
      <div className="flex gap-5">
        <div className="w-1/5 flex flex-col h-[calc(100vh-105px)] flex-1 overflow-y-auto hide-scrollbar">
          {categoryList
          .filter((category)=>category.name!=="Autres")
          .map((category) => {
            return (
              <button
                key={category.id}
                className="bg-white p-3 rounded-2xl w-full mb-4 shadow-sm hover:bg-gray-100 flex px-10 items-center justify-between"
                onClick={() => navigate(`/admin/tags/${category.id}`)}
              >
                <div className="flex gap-3">
                  <p className="font-bold">{category.name}</p>
                  <p>({category?.tags.length})</p>
                </div>
                <div>
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: category?.color }}
                  >
                    {category?.icon}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </DashboardLayout>
  );
}

export default TagsComponents;
