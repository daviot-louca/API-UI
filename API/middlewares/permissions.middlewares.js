

const MiddlewarePermissions = (req,res,next)=>{
    const role = req.user.role
    if(role === "administrateur"){
        next()
        console.log("ça passe dans les permissions")
    }else{
        res.status(403).json("accès non autorisé")
        console.log("ça passe pas dans les permissions")
    }
}

module.exports = MiddlewarePermissions;