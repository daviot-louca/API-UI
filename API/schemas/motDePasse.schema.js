
const { z } = require("zod");

const MotDePasseSchema = z
  .object({
    oldPassword: z
      .string({ required_error: "ancien mot de passe obligatoire" })
      .trim()
      .min(12, "minimum de 12 caractères")
      .max(30, "maximum de 30 caractères"),

    newPassword: z
      .string({ required_error: "nouveau mot de passe obligatoire" })
      .trim()
      .min(12, "minimum de 12 caractères")
      .max(30, "maximum de 30 caractères"),

    confirmNewPassword: z
      .string({ required_error: "confirmation du mot de passe obligatoire" })
      .trim()
      .min(12, "minimum de 12 caractères")
      .max(30, "maximum de 30 caractères"),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmNewPassword;
    },
    {
      message:
        "le mot de passe de confirmation ne correspond pas a votre nouveau mot de passe",
    },
  );

module.exports = MotDePasseSchema;
