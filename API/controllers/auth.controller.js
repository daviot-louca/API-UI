const {authService,loginService,AllUserService,deleteAllService} = require("../services/auth.service");

const createAuth = async(req,res)=>{
    try {
        const {username,email,password} =req.body;
        const info = await authService({username,email,password});
        res.json(info) 
    } catch (error) {
        res.status(500).json("données bloquées au niveau du controller")
    }
}


//problème dans le log 
const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const info = await loginService({email,password})
        res.json(info)
    } catch (error) {
        console.log(error)
        res.status(500).json("données bloqués au niveau du controller login")
    }
}

const allUsers = async (req,res) => {
    try {
        const {page,limit}=req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit)
        const informations = await AllUserService({pageNumber,limitNumber})
        res.json(informations)
    } catch (error) {
        res.status(500).json("erreur avec le AllUsers")
    }
}

const deleteAll = async (req,res) => {
    try {
        const info = await deleteAllService()
        res.json(info)
    } catch (error) {
        res.status(500).json("erreur avec la réinitialisation des users")
    }
}
module.exports = {createAuth,loginController,allUsers,deleteAll};