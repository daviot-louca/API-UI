import axios from "axios";

const url = "http://localhost:3030";

export const register = async (
  username,
  email,
  password
) => {

  const reponse = await axios.post(
    `${url}/register`,
    {
      username,
      email,
      password
    }
  );

  return reponse.data;
};

export const login = async (email,password) => {
        const reponse = await axios.post(`${url}/login`, {
        email,
        password
      });
      return reponse.data
}