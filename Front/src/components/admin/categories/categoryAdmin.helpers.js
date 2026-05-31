export const INITIAL_CATEGORY_FORM = {
  name: "",
  description: "",
  icon: "",
  color: "#266fdb",
};

const hexColorRegex = /^#[0-9a-f]{6}$/i;

export const getCategoryId = (category) => category?.id ?? category?._id;

export const getCategoryColor = (color) =>
  hexColorRegex.test(color ?? "") ? color : INITIAL_CATEGORY_FORM.color;

export const getCategoryFormValues = (category) => ({
  name: category?.name ?? "",
  description: category?.description ?? "",
  icon: category?.icon ?? "",
  color: getCategoryColor(category?.color),
});

export const buildCategoryPayload = (formData) => ({
  name: formData.name.trim(),
  description: formData.description.trim(),
  icon: formData.icon.trim(),
  color: formData.color.trim(),
});

export const validateCategoryPayload = (payload) => {
  if (payload.name.length < 2) {
    return "Le nom doit contenir au moins 2 caractères.";
  }

  if (payload.icon.length < 2) {
    return "L'icône doit contenir au moins 2 caractères.";
  }

  if (payload.color.length < 2) {
    return "La couleur est obligatoire.";
  }

  return "";
};
