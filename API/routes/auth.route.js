const express = require('express');
const router = express.Router();
const AuthValidation = require("../middlewares/validation/validation.middleware")
const { loginController, createAuth, allUsers, deleteAll, deleteUser, updateUsers,rechercheUsers,modifierUsers } = require('../controllers/auth.controller');
const MiddlewarePermissions = require('../middlewares/permissions.middlewares');
const authJwt = require('../middlewares/JWT.middlewares');

router.post("/register", AuthValidation, createAuth);
router.post("/login", loginController);
router.get("/admin/users", authJwt, MiddlewarePermissions, allUsers);
router.delete("/delete/users", authJwt, MiddlewarePermissions, deleteAll);
router.delete("/admin/user/:id", authJwt, MiddlewarePermissions, deleteUser);
//user à admin
router.patch("/users/:id",authJwt,MiddlewarePermissions,updateUsers);
//recherche utilisateur
router.get("/users",authJwt,MiddlewarePermissions,rechercheUsers);
//modifier le profil utilisateur
router.patch("/me/:id",authJwt,modifierUsers);

module.exports = router;