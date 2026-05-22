const auth = require("../models/user.model")
const { hash, compare } = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { Op } = require("sequelize")

const authService = async ({ username, email, password }) => {
    const userExist = await auth.findOne({
        where: { email }
    });

    // si email déjà utilisé
    if (userExist) {
        return "email déjà utilisé";
    }
    const passwordcrypt = await hash(password, 10)
    const avatar = username.toUpperCase().slice(0, 2)
    const envoie = await auth.create({
        username,
        email,
        password: passwordcrypt,
        avatar
    })
    return envoie
}

const loginService = async ({ email, password }) => {

    console.log("je passe dans le login")
    const user = await auth.findOne({
        where: { email }
    });

    if (!user) {

        console.log("problème avec le user")

        return "utilisateur introuvable"
    }

    const passwordDB = user.password;
    const result =
        await compare(password, passwordDB);

    if (result === true) {

        console.log("mot de passe correct")

        return {

            token: jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
                process.env.JWT_SECRET
            ),
            id:user.id,
            role: user.role,
            email: user.email,
            username: user.username,
            avatar: user.avatar
        }

    } else {

        console.log("mdp incorrect")

        return "identifiants incorrects"
    }
}

const AllUserService = async ({ pageNumber = 1, limitNumber = 5 }) => {
    const limit = limitNumber || 5
    const offset = (pageNumber - 1) * limit
    const data = await auth.findAll({
        limit,
        offset
    })
    return data
}

const deleteAllService = async () => {
    const supprimer = await auth.destroy({ where: { role: "user" } })
    return supprimer
}

const deleteUserService = async (id) => {
    const supprimer = await auth.destroy({ where: { role: "user", id } })
    return supprimer
}

const updateUserService = async ({ userId, role }) => {
    const user =
        await auth.findByPk(userId);
    if (!user) {
        return "utilisateur introuvable";
    }
    user.role = role;
    await user.save();
    return user;
};

const rechercheUsersService = async ({ recherche }) => {
    const search = await auth.findAll({
        where: {
            username
                : {
                [Op.like]
                    : `%${recherche}%`
            }
        }
    })
    return search
}

const modifierUsersService = async ({id, email, username }) => {
    const user = await auth.findByPk(id)
    if(!user){
        console.log("user introuvable")
    }
    console.log(id)
    user.email = email
    user.username = username
    user.avatar = username.slice(0,2).toUpperCase()
    await user.save()
    return user
}


module.exports = { authService, loginService, AllUserService, deleteAllService, deleteUserService, updateUserService, rechercheUsersService, modifierUsersService };