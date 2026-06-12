const express = require("express")
const router  = express.Router()
const MiddlewarePermissions = require("../middlewares/permissions.middlewares")
const authJwt = require ("../middlewares/JWT.middlewares")
const {getAll,ajouterConnaissances,getOne,modifierConnaisssances,supprimerConnaissances,suggestionConnaissances} = require("../controllers/baseConnaissance.controller")

router.get("/",authJwt,getAll)
router.post("/",authJwt,MiddlewarePermissions,ajouterConnaissances)
router.post("/suggestions",authJwt,suggestionConnaissances)
router.get("/:id",authJwt,getOne)
router.put("/:id",authJwt,MiddlewarePermissions,modifierConnaisssances)
router.delete("/:id",authJwt,MiddlewarePermissions,supprimerConnaissances)

module.exports=router;