const express = require("express")
const router = express.Router()
const authJWT = require("../middlewares/JWT.middlewares");
const MiddlewarePermissions = require("../middlewares/permissions.middlewares");
const {ajouterTags,modifierTags,deleteTags} = require("../controllers/tags.controller");
const TagsMiddleware = require("../middlewares/validation/tagsPost.middlewares");
const TagsPutMiddleware = require("../middlewares/validation/tagsPut.middlewares");

router.post("/",TagsMiddleware,authJWT,MiddlewarePermissions,ajouterTags);
router.put("/:id",TagsPutMiddleware,authJWT,MiddlewarePermissions,modifierTags);
router.delete("/:id",authJWT,MiddlewarePermissions,deleteTags);


module.exports =router