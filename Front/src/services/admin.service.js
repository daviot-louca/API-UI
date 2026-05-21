import axios from "axios";
const url = "http://localhost:3030";

export const voirToutTickets = async (token,page) => {
          const reponse = await axios.get(`${url}/admin/tickets?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return reponse.data
}

export const voirToutUsers = async (token)=> {
          const reponse = await axios.get(`${url}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return reponse.data
}

export const supprimerUserService = async (id,token) => {
    const reponse = await axios.delete(`${url}/admin/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return reponse.data
}
export const deleteAllService = async (token) =>{
          const reponse = await axios.delete(`${url}/delete/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return reponse.data
}
export const voirAdminStats = async (
    token
) => {

    const reponse = await axios.get(
        `${url}/tickets/admin/stats`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return reponse.data;
};

export const updateRole = async (token,id) => {
  const reponse = await axios.patch(`${url}/admin/user/${id}`,{
    header:{Authorization:`Bearer:${token}`}
  });
  return reponse.data;
}