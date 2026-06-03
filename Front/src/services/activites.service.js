import axios from "axios";
const url = "http://localhost:3030/activites";

export const voirActivitesAdmin = async (token) => {
  const reponse = await axios.get(`${url}/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return reponse.data;
};

export const voirActivitesUser = async (token) => {
  const reponse = await axios.get(`${url}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return reponse.data;
};
