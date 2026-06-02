const z = require("zod");

const messageSchema = z.object({

   message: z
      .string({

         required_error:
            "message obligatoire"
      })
      .trim()

      .min(
         1,
         "message vide impossible"
      )

      .max(
         1000,
         "message trop long"
      )

});

module.exports = messageSchema;