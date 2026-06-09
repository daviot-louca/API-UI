const tagsPostSchema = require("../../schemas/tags.schema");
//verifie les donnes du ticket pour savoir s'il est correct ou non
const TagsMiddleware = (req,res,next)=>{
    const verification = tagsPostSchema.safeParse(req.body)
    console.log("la requête est bien passée dans le middleware tags")
    if(!verification.success){
        res.status(400).json("données invalides")
        console.log("ça passe pas dans le schema tags")
    }else{
        next()
        console.log("ça passe tags")
    }
}

module.exports=TagsMiddleware;