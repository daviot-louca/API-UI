const express = require("express");
const router = express.Router();
const {voirMessages,envoyerMessages} = require("../controllers/messages.controller");
const messagesMiddlewares = require("../middlewares/validation/messages.middlewares");
const authJWT = require("../middlewares/JWT.middlewares")

router.get("/:tickedId",authJWT,voirMessages)
router.post("/:ticketId",authJWT,messagesMiddlewares,envoyerMessages)

module.exports = router;