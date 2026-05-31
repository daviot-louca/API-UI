import { useCallback, useMemo, useState } from "react";

import { CategoriesContext } from "./CategoriesContext";

import {
    getCategories,
    ajoutCategories,
    modifierCategories,
    supprimerCategories,
} from "../../services/categories.service";

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);

    const fetchCategories = useCallback(async () => {
        try {
            const token =
                localStorage.getItem("token");

            const response =
                await getCategories(token);

            setCategories(response);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const createCategory = useCallback(
        async (
            name,
            description,
            icon,
            color
        ) => {
            try {
                const token =
                    localStorage.getItem("token");

                await ajoutCategories(
                    token,
                    name,
                    description,
                    icon,
                    color
                );

                await fetchCategories();
            } catch (error) {
                console.log(error);
            }
        },
        [fetchCategories]
    );

    const updateCategory = useCallback(
        async (
            id,
            name,
            description,
            icon,
            color
        ) => {
            try {
                const token =
                    localStorage.getItem("token");

                await modifierCategories(
                    token,
                    id,
                    name,
                    description,
                    icon,
                    color
                );

                await fetchCategories();
            } catch (error) {
                console.log(error);
            }
        },
        [fetchCategories]
    );

    const deleteCategory = useCallback(
        async (id) => {
            try {
                const token =
                    localStorage.getItem("token");

                await supprimerCategories(
                    token,
                    id
                );

                await fetchCategories();
            } catch (error) {
                console.log(error);
            }
        },
        [fetchCategories]
    );

    const value = useMemo(
        () => ({
            categories,
            fetchCategories,
            createCategory,
            updateCategory,
            deleteCategory,
        }),
        [
            categories,
            fetchCategories,
            createCategory,
            updateCategory,
            deleteCategory,
        ]
    );

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}