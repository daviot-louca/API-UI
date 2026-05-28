const categorieSchema = require("../../schemas/categories.schema");
//verifie les donnes du ticket pour savoir s'il est correct ou non
const categoriesMiddlewares = (req,res,next)=>{
    const verification = categorieSchema.safeParse(req.body)
    if(!verification.success){
        res.status(400).json("données invalides")
        console.log("ça passe pas dans le schema message")
    }else{
        next()
        console.log("ça passe le schema message")
    }
}

module.exports=categoriesMiddlewares;