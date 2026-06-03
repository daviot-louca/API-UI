import axios from "axios";

const url = "http://localhost:3030";

export const register = async (username, email, password) => {
  const reponse = await axios.post(`${url}/register`, {
    username,
    email,
    password,
  });
  return reponse.data;
};

export const login = async (email, password) => {
  const reponse = await axios.post(`${url}/login`, {
    email,
    password,
  });
  return reponse.data;
};

export const modifierProfil = async (id, token, email, username) => {
  const reponse = await axios.patch(
    `${url}/me/${id}`,
    {
      email,
      username,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return reponse.data;
};

export const modifierMotDePasse = async (
  token,
  oldPassword,
  newPassword,
  confirmNewPassword,
) => {
  const reponse = await axios.patch(
    `${url}/password`,
    {
      oldPassword,
      newPassword,
      confirmNewPassword,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return reponse.data;
};
