import axios from "axios";

const url = "http://localhost:3030/connaissances";

export const getAllService = async (token) => {
  const reponse = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return reponse.data;
};

export const getOneService = async (id, token) => {
  const reponse = await axios.get(`${url}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return reponse.data;
};

export const ajoutConnaissancesService = async (
  token,
  title,
  content,
  categoryId,
  ticketId,
) => {
  const reponse = await axios.post(
    url,
    { title, content, categoryId, ticketId },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return reponse.data;
};

export const modifierConnaissancesService = async (
  id,
  token,
  title,
  content,
  categoryId,
  ticketId,
) => {
  const reponse = await axios.put(
    `${url}/${id}`,
    { title, content, categoryId, ticketId },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return reponse.data;
};

export const supprimerConnaissancesService = async (id, token) => {
  const reponse = await axios.delete(`${url}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return reponse.data;
};

export const suggestionConnaissancesService = async (
  token,
  title,
  description,
) => {
  const reponse = await axios.post(
    `${url}/suggestions`,
    { title, description },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return reponse.data;
};
