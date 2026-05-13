const MiddlewarePermissions = (req,res,next)=>{
    role = req.user.role
    if(role === "admin"){
        next()
    }else{
        res.status(403).json("accès non autorisé")
    }
}

module.exports = MiddlewarePermissions;