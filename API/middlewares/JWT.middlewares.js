/* middleware d'authentification JWT
   récupère le token Bearer
   vérifie sa validité
   ajoute l'utilisateur décodé dans req.user*/
// protège les routes privées en vérifiant le JWT utilisateur
const jwt = require("jsonwebtoken")
require("dotenv").config()
const authJwt = (req,res,next) => {
    const tokenBearer = req.headers.authorization
    if(!tokenBearer){
        return res.status(401).json("pas de token")
    }
    const arrayToken = tokenBearer.split(" ");
    const token = arrayToken[1]
    try{
      const decode =jwt.verify(token,process.env.JWT_SECRET)  
      req.user =decode
      next()
    }catch(error){
        return res.status(401).json("token invalide")
    };
};

module.exports = authJwt;