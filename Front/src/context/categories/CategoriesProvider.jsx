import { useCallback, useMemo, useState } from "react";

import { CategoriesContext } from "./CategoriesContext";
import { toast } from "sonner";
import {
  getCategories,
  ajoutCategories,
  modifierCategories,
  supprimerCategories,
} from "../../services/categories.service";

import {
  ajouterTagsService,
  modifierTagsService,
  supprimerTagsService,
} from "../../services/tags.service";

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await getCategories(token);

      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createCategory = useCallback(
    async (name, description, icon, color) => {
      try {
        const token = localStorage.getItem("token");

        await ajoutCategories(token, name, description, icon, color);
        toast.success("Catégorie ajoutée");
        await fetchCategories();
      } catch (error) {
        console.log(error);
      }
    },
    [fetchCategories],
  );

  const updateCategory = useCallback(
    async (id, name, description, icon, color) => {
      try {
        const token = localStorage.getItem("token");

        await modifierCategories(token, id, name, description, icon, color);

        await fetchCategories();
      } catch (error) {
        console.log(error);
      }
    },
    [fetchCategories],
  );

  const deleteCategory = useCallback(
    async (id) => {
      try {
        const token = localStorage.getItem("token");

        await supprimerCategories(token, id);

        await fetchCategories();
        toast.success("Catégorie supprimée");
      } catch (error) {
        console.log(error);
        toast.error(
          "Tous les tickets en rapport avec cette catégories doivent être supprimés",
        );
      }
    },
    [fetchCategories],
  );

  const ajoutTags = useCallback(async (nom,categoryId) => {
    try {
      const token = localStorage.getItem("token");
      await ajouterTagsService({token,nom,categoryId});
      await fetchCategories();
      toast.success("Tags ajouté");
    } catch (error) {
      console.log(error);
    }
  },[fetchCategories]);

  const modifierTags = useCallback(async (id,nom) => {
    try {
      const token = localStorage.getItem("token");
      await modifierTagsService({id, token,nom});
      await fetchCategories()
      toast.success("Tags modifié")
    } catch (error) {
      console.log(error);
    }
  },[fetchCategories]);

  const supprimerTags = useCallback(async (id) => {
    try {
      const token = localStorage.getItem("token");
      await supprimerTagsService({id, token});
      await fetchCategories()
      toast.success("Tags supprimé")
    } catch (error) {
      console.log(error);
    }
  },[fetchCategories]);
  const value = useMemo(
    () => ({
      categories,
      fetchCategories,
      createCategory,
      updateCategory,
      deleteCategory,
      ajoutTags,
      modifierTags,
      supprimerTags,
    }),
    [
      categories,
      fetchCategories,
      createCategory,
      updateCategory,
      deleteCategory,
      ajoutTags,
      modifierTags,
      supprimerTags,
    ],
  );

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
