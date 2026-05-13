const {z} = require("zod");

const TicketSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3,{message:"Veuillez écrire un titre de plus de 3 caractères"})
        .max(30,{message:"votre titre est trop long : 30 caractères max"}),
    description: z
        .string()
        .trim()
        .min(10,{message:"Veuilez précisez votre problème : 10 caractères minimum"})
        .max(120,{message:"Votre description est trop longue, Veuillez résumez, 120 caractères maximum"}),
    status: z
  .enum([
    "remis",
    "ouvert",
    "en cours",
    "résolu"
  ])
  .default("remis")
})

module.exports = TicketSchema;