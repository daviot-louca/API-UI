const auth = require("../models/user.model");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorMonitor } = require("node:events");
require("dotenv").config();
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

const authService = async ({ username, email, password }) => {
  const userExist = await auth.findOne({
    where: { email },
  });

  // si email déjà utilisé
  if (userExist) {
    return "email déjà utilisé";
  }
  const passwordcrypt = await hash(password, 10);
  const avatar = username.toUpperCase().slice(0, 2);
  const envoie = await auth.create({
    username,
    email,
    password: passwordcrypt,
    avatar,
  });
  return envoie;
};

const loginService = async ({ email, password }) => {
  console.log("je passe dans le login");
  const user = await auth.findOne({
    where: { email },
  });

  if (!user) {
    console.log("problème avec le user");

    return "utilisateur introuvable";
  }

  const passwordDB = user.password;
  const result = await compare(password, passwordDB);
  if (result === true) {
    await user.update({ lastLoginAt: Sequelize.literal("NOW()") });
    console.log("mot de passe correct");
    const updatedUser = await auth.findByPk(user.id);
    return {
      token: jwt.sign(
        {
          id: updatedUser.id,
          email: updatedUser.email,
          role: updatedUser.role,
          avatar: updatedUser.avatar,
          lastLoginAt: updatedUser.lastLoginAt,
        },
        process.env.JWT_SECRET,
      ),
      id: updatedUser.id,
      role: updatedUser.role,
      email: updatedUser.email,
      username: updatedUser.username,
      avatar: updatedUser.avatar,
      lastLoginAt: updatedUser.lastLoginAt,
    };
  } else {
    console.log("mdp incorrect");

    return "identifiants incorrects";
  }
};

const AllUserService = async ({ pageNumber = 1, limitNumber = 5 }) => {
  const limit = limitNumber || 5;
  const offset = (pageNumber - 1) * limit;
  const data = await auth.findAll({
    limit,
    offset,
  });
  return data;
};

const deleteAllService = async () => {
  const supprimer = await auth.destroy({ where: { role: "user" } });
  return supprimer;
};

const deleteUserService = async (id) => {
  const supprimer = await auth.destroy({ where: { role: "user", id } });
  return supprimer;
};

const updateUserService = async ({ userId, role }) => {
  const user = await auth.findByPk(userId);
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
      username: {
        [Op.like]: `%${recherche}%`,
      },
    },
  });
  return search;
};

const modifierUsersService = async ({ id, email, username }) => {
  const user = await auth.findByPk(id);
  if (!user) {
    console.log("user introuvable");
    return "user introuvable";
  }
  console.log(id);
  user.email = email;
  user.username = username;
  user.avatar = username.slice(0, 2).toUpperCase();
  await user.save();
  return user;
};

const modifierMotDePasseService = async ({oldPassword,newPassword,id})=>{
  const user = await auth.findByPk(id)
  if(!user){
    throw new Error("utilisateur introuvable")
  }
  const result = await compare(oldPassword,user.password) 
  if(result !==true){
    throw new Error("ancien mot de passe incorrect")
  }else{
    const newPasswordcrypt = await hash(newPassword, 10);
    user.password = newPasswordcrypt
    await user.save();
    return user
  }
}

module.exports = {
  authService,
  loginService,
  AllUserService,
  deleteAllService,
  deleteUserService,
  updateUserService,
  rechercheUsersService,
  modifierUsersService,
  modifierMotDePasseService
};
