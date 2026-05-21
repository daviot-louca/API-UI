const express = require('express');
const router = express.Router();
const {createTicket,seeTicket,updateTicket,deleteTicket,seeAll,seeTheTicket,statsTickets,adminStats} = require("../controllers/ticket.controller")
const TicketMiddleware = require("../middlewares/ticket.middlewares")
const authJwt =require("../middlewares/JWT.middlewares")
const MiddlewarePermissions = require("../middlewares/permissions.middlewares")

router.get("/admin/tickets",authJwt,MiddlewarePermissions,seeAll)
router.get("/tickets",authJwt,seeTicket)
router.get("/tickets/stats",authJwt,statsTickets)
router.get("/tickets/:id",seeTheTicket)
router.post("/tickets",authJwt,TicketMiddleware,createTicket)
router.put("/tickets/:id",authJwt,updateTicket)
router.delete("/tickets/:id",authJwt,deleteTicket)
router.get("/tickets/admin/stats",authJwt,MiddlewarePermissions,adminStats);

module.exports = router;