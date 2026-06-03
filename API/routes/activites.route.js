const express = require('express');
const router = express.Router();
const authJwt = require('../middlewares/JWT.middlewares');
const MiddlewarePermissions = require ("../middlewares/permissions.middlewares");
const {voirmesActivitesRecentes,voirToutesActivites} = require("../controllers/activite.controller")

router.get("/admin",authJwt,MiddlewarePermissions,voirToutesActivites);
router.get("/user",authJwt,voirmesActivitesRecentes);

module.exports = router;