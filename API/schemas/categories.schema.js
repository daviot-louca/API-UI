const { z } = require("zod");
const categorySchema = z.object({
  name: z
    .string()
    .min(2, "minimum 2 caractères")
    .max(50, "maximum 50 caractères"),
  description: z.string().max(300, "maximum 300 caractères").optional(),
  icon: z.string().min(2).max(30),
  color: z.string().min(2).max(30),
});
