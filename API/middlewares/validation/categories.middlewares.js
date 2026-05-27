const categoriesSchema = require("../../schemas/categories.schema");
//verifie les donnes du ticket pour savoir s'il est correct ou non
const TicketMiddleware = (req,res,next)=>{
    const verification = categoriesSchema.safeParse(req.body)
    if(!verification.success){
        res.status(400).json("données invalides")
        console.log("ça passe pas dans le schema categories")
    }else{
        next()
        console.log("ça passe le schema categories")
    }
}

module.exports=TicketMiddleware;