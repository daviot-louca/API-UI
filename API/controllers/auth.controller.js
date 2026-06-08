const {
  authService,
  loginService,
  AllUserService,
  deleteAllService,
  deleteUserService,
  updateUserService,
  rechercheUsersService,
  modifierUsersService,
  modifierMotDePasseService,
} = require("../services/auth.service");

const createAuth = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const info = await authService({ username, email, password });
    res.json(info);
    console.log(info);
  } catch (error) {
    res.status(500).json("données bloquées au niveau du controller");
  }
};

//problème dans le log
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const info = await loginService({ email, password });
    res.json(info);
  } catch (error) {
    console.log(error);
    res.status(500).json("données bloqués au niveau du controller login");
  }
};

const allUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = Number(page) || 1;

    const limitNumber = Number(limit) || 5;

    const informations = await AllUserService({
      pageNumber,
      limitNumber,
    });

    res.json(informations);
  } catch (error) {
    console.log(error);

    res.status(500).json("erreur avec le AllUsers");
  }
};

const deleteAll = async (req, res) => {
  try {
    const info = await deleteAllService();
    res.json(info);
  } catch (error) {
    res.status(500).json("erreur avec la réinitialisation des users");
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const info = await deleteUserService(id);
    res.json(info);
  } catch (error) {
    res.status(500).json("problème pour supprimer un seul user");
  }
};
const updateUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;
    console.log(userId);
    const info = await updateUserService({ userId, role });
    res.json(info);
  } catch (error) {
    console.log(error);
    res.status(500).json("problème modification user");
  }
};

const rechercheUsers = async (req, res) => {
  try {
    const { recherche } = req.query;
    const infos = await rechercheUsersService({ recherche });
    res.json(infos);
  } catch (error) {
    console.log("erreur dans le service");
    res.status(500).json("problème recherche User");
  }
};

const modifierUsers = async (req, res) => {
  try {
    console.log("je passe dans le controller");
    const { id } = req.params;
    const { email, username } = req.body;
    console.log("je passe dans les req");
    const infos = await modifierUsersService({ id, email, username });
    res.json(infos);
  } catch (error) {
    console.log("problème back modifier user");
    res.status(500).json("problème modifier User");
  }
};

const modifierMotDePasse = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;
    const infos = await modifierMotDePasseService({
      oldPassword,
      newPassword,
      id,
    });
    res.json(infos);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};



module.exports = {
  createAuth,
  loginController,
  allUsers,
  deleteAll,
  deleteUser,
  updateUsers,
  rechercheUsers,
  modifierUsers,
  modifierMotDePasse,
};
