import axios from "axios";
const url = "http://localhost:3030";

export const voirToutTickets = async (token) => {
          const reponse = await axios.get(`${url}/admin/tickets`, {
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