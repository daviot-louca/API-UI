import { useContext } from "react";
import { CategoriesContext } from "../../context/categories/CategoriesContext";

export const useCategory = () => {
    return useContext(CategoriesContext);
};