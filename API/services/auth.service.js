const auth = require("../models/user.model")
const { hash, compare } = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const authService = async ({ username, email, password }) => {
        const userExist = await auth.findOne({
        where: { email }
    });

    // si email déjà utilisé
    if (userExist) {
        return "email déjà utilisé";
    }
    const passwordcrypt = await hash(password, 10)
    const envoie = await auth.create({
        username,
        email,
        password: passwordcrypt,
    })
    return envoie
}

const loginService = async ({ email, password }) => {
    const user = await auth.findOne({
        where: { email }
    });
    if (!user) {
        return "utilisateur introuvable"
    }
    const passwordDB = user.password;
    const result = await compare(password, passwordDB);
    if (result === true) {
        console.log("mot de passe correct")
        return {
            token:jwt.sign({ id: user.id, email: user.email,role:user.role },process.env.JWT_SECRET/*{expiresIn:"7d"} si je veux que el client doit se reconnecter chaque semaine*/),
            role:user.role
    }
    } else {   
        return "identifiants incorrects"
    }
}

const AllUserService = async({pageNumber = 1 ,limitNumber=5}) =>{
    const limit = limitNumber
    const offset = ((pageNumber-1)*limitNumber)
    const data = await auth.findAll({
        limit,
        offset
    })
    return data
}

const deleteAllService = async() => {
    const supprimer = await auth.destroy({where:{role:"user"}})
    return supprimer
}
module.exports = { authService, loginService,AllUserService,deleteAllService };