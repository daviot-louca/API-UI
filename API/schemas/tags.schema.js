const {z} = require("zod");

const tagsPostSchema = z.object({
    nom: z.string().trim().min(2),
    categoryId:z.number()
})

module.exports = tagsPostSchema