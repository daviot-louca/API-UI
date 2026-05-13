const authSchema = require("../schemas/auth.schema");
// vérifie si les données sont ok
const AuthValidation = (req,res,next) => {
    const verification = authSchema.safeParse(req.body)
    console.log("Auth passe bien par le middleware")
    if(!verification.success){
        res.status(400).json("données invalides")
    }else{
        next()
    }
};

module.exports= AuthValidation;