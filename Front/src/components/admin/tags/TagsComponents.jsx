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
        <div className="w-1/5 flex flex-col h-[calc(100vh-105px)]">
          <div className="flex-1 overflow-y-auto h-[calc(80vh)] hide-scrollbar">
            {categoryList.map((category) => {
              return (
                <button
                  key={category.id}
                  className="bg-white p-3 rounded-2xl w-full mb-4 shadow-sm hover:bg-gray-100 flex px-10 items-center justify-between"
                  onClick={() => navigate(`/admin/tags/${category.id}`)}
                >
                  <div>{category.name}</div>
                  <div>
                    <div className="">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                        style={{ backgroundColor: category?.color }}
                      >
                        {category?.icon}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </DashboardLayout>
  );
}

export default TagsComponents;
