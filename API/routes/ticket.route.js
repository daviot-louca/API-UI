const express = require('express');
const router = express.Router();
const {createTicket,seeTicket,updateTicket,deleteTicket,seeAll,seeTheTicket,statsTickets,adminStats} = require("../controllers/ticket.controller")
const TicketMiddleware = require("../middlewares/validation/ticket.middlewares")
const authJwt =require("../middlewares/JWT.middlewares")
const MiddlewarePermissions = require("../middlewares/permissions.middlewares")

router.get("/admin/tickets",authJwt,MiddlewarePermissions,seeAll)
router.get("/",authJwt,seeTicket)
router.get("/stats",authJwt,statsTickets)
router.get("/:id",authJwt,seeTheTicket)
router.post("/",authJwt,TicketMiddleware,createTicket)
router.put("/:id",authJwt,MiddlewarePermissions,updateTicket)
router.delete("/:id",authJwt,deleteTicket)
router.get("/admin/stats",authJwt,MiddlewarePermissions,adminStats);

module.exports = router;