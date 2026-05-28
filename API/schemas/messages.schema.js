const z = require("zod");

const messageSchema = z.object({

   message: z
      .string({

         required_error:
            "message obligatoire"
      })

      .min(
         1,
         "message vide impossible"
      )

      .max(
         1000,
         "message trop long"
      )

      .trim()
});

module.exports = messageSchema;