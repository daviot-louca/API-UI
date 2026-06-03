const MotDePasseSchema = require("../../schemas/motDePasse.schema");
const MotDePasseMiddleware = (req,res,next)=>{
    const verification = MotDePasseSchema.safeParse(req.body)
    if(!verification.success){
        res.status(400).json("données invalides")
        console.log("ça passe pas dans le schema mot de passe")
    }else{
        console.log("ça passe le schema mot de passe")
        next()
    }
}

module.exports= MotDePasseMiddleware;