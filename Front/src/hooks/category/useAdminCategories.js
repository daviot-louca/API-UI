import { useEffect, useState } from "react";

import { useCategory } from "./useCategory";
import {
  buildCategoryPayload,
  getCategoryFormValues,
  getCategoryId,
  INITIAL_CATEGORY_FORM,
  validateCategoryPayload,
} from "../../components/admin/categories/categoryAdmin.helpers";

export const useAdminCategories = () => {
  const {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState(INITIAL_CATEGORY_FORM);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);

  const categoryList = Array.isArray(categories) ? categories : [];

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const resetModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFormData(INITIAL_CATEGORY_FORM);
    setFormError("");
  };

  const openCreateModal = () => {
    setSelectedCategory(null);
    setFormData(INITIAL_CATEGORY_FORM);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData(getCategoryFormValues(category));
    setFormError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (!isSubmitting) {
      resetModal();
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = buildCategoryPayload(formData);
    const validationError = validateCategoryPayload(payload);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      if (selectedCategory) {
        await updateCategory(
          getCategoryId(selectedCategory),
          payload.name,
          payload.description,
          payload.icon,
          payload.color,
        );
      } else {
        await createCategory(
          payload.name,
          payload.description,
          payload.icon,
          payload.color,
        );
      }

      await fetchCategories();
      resetModal();
    } catch {
      setFormError("Impossible d'enregistrer cette catégorie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (category) => {
    const categoryId = getCategoryId(category);
    const shouldDelete = window.confirm(
      `Supprimer la catégorie "${category.name}" ?`,
    );

    if (!shouldDelete) {
      return;
    }

    setDeletingCategoryId(categoryId);

    try {
      await deleteCategory(categoryId);
      await fetchCategories();
    } catch {
      window.alert("Impossible de supprimer cette catégorie.");
    } finally {
      setDeletingCategoryId(null);
    }
  };

  return {
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
  };
};
