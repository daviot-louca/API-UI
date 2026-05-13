const express = require('express');
const router = express.Router();
const AuthValidation = require("../middlewares/validation.middleware")
const { loginController, createAuth, allUsers,deleteAll } = require('../controllers/auth.controller');
const MiddlewarePermissions = require('../middlewares/permissions.middlewares');
const authJwt = require('../middlewares/JWT.middlewares');

router.post("/register",AuthValidation,createAuth)
router.post("/login",loginController)
router.get("/admin/users",authJwt,MiddlewarePermissions,allUsers)
router.delete("/delete/users",authJwt,MiddlewarePermissions,deleteAll)
module.exports = router;