const {z} = require("zod");

const tagsPutSchema = z.object({
    nom: z.string().trim().min(2),
})

module.exports = tagsPutSchema