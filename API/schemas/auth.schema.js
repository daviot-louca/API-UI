const {z} = require("zod");

const authSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, { message: "Votre nom d'utilisateur doit contenir au minimum 3 caractères" })
        .max(12, { message: "Votre nom d'utilisateur ne peut pas dépasser 12 caractères" }),

    email: z
        .string()
        .email({ message: "Veuillez entrer une adresse email valide" }),

    password: z
        .string()
        .trim()
        .min(12, { message: "Votre mot de passe doit contenir au minimum 12 caractères" })
        .max(30, { message: "Votre mot de passe doit être inférieur à 30 caractères" })
});

module.exports = authSchema;