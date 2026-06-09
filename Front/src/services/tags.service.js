import axios from "axios";

const url = "http://localhost:3030";

export const ajouterTagsService = async ({ token, nom, categoryId }) => {
  const reponse = await axios.post(
    `${url}/tags`,
    { nom, categoryId },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return reponse.data;
};

export const modifierTagsService = async ({ id, token, nom }) => {
  const reponse = await axios.put(`${url}/tags/${id}`, {nom}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return reponse.data;
};

export const supprimerTagsService = async ({ id, token }) => {
  const reponse = await axios.delete(`${url}/tags/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return reponse.data
};

