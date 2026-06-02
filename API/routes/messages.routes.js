const express = require("express");
const router = express.Router();
const {voirMessages,envoyerMessages,voirTicketsMessageries,voirToutTicketsMessageries,marquerMessagesLus} = require("../controllers/messages.controller");
const messagesMiddlewares = require("../middlewares/validation/messages.middlewares");
const authJWT = require("../middlewares/JWT.middlewares");
const MiddlewarePermissions = require("../middlewares/permissions.middlewares");

router.get("/tickets",authJWT,voirTicketsMessageries)
router.get("/admin/tickets",authJWT,MiddlewarePermissions,voirToutTicketsMessageries)
router.get("/:ticketId",authJWT,voirMessages)
router.post("/:ticketId",authJWT,messagesMiddlewares,envoyerMessages)
router.patch("/:ticketId/read",authJWT,marquerMessagesLus)
module.exports = router;