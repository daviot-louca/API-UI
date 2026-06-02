import axios from "axios";
const url = "http://localhost:3030";

export const voirToutTickets = async (
  token,
  page,
  status,
  categoryId,
  priority,
  sort,
  search
) => {
  const reponse = await axios.get(`${url}/tickets/admin/tickets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      status,
      categoryId,
      priority,
      sort,
      search
    },
  });
  return reponse.data;
};

export const voirToutUsers = async (token) => {
  const reponse = await axios.get(`${url}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return reponse.data;
};

export const supprimerUserService = async (id, token) => {
  const reponse = await axios.delete(`${url}/admin/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return reponse.data;
};
export const deleteAllService = async (token) => {
  const reponse = await axios.delete(`${url}/delete/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return reponse.data;
};
export const voirAdminStats = async (token) => {
  const reponse = await axios.get(`${url}/tickets/admin/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return reponse.data;
};

export const modifierRoleUser = async (id, role, token) => {
  const reponse = await axios.patch(
    `${url}/users/${id}`,

    {
      role,
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return reponse.data;
};

export const rechercheUser = async (token, recherche) => {
  const params = new URLSearchParams({
    recherche,
  });

  const reponse = await axios.get(`${url}/users?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return reponse.data;
};
