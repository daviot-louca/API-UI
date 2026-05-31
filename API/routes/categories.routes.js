const express = require('express');
const authJwt = require("../middlewares/JWT.middlewares");
const categoriesMiddlewares = require("../middlewares/validation/categories.middlewares");
const MiddlewarePermissions = require("../middlewares/permissions.middlewares");
const {allCategories,ajoutCategories,modifierCategories,supprimerCategories} = require("../controllers/categories.controller")
const router = express.Router();

router.get("/",authJwt,allCategories);
router.post("/",authJwt,MiddlewarePermissions,categoriesMiddlewares,ajoutCategories);
router.put("/:id",authJwt,MiddlewarePermissions,modifierCategories);
router.delete("/:id",authJwt,MiddlewarePermissions,supprimerCategories);

module.exports = router;