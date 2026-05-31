import axios from "axios"
const url = "http://localhost:3030"

export const getCategories = async (token) => {
    const response = await axios.get(`${url}/categories`,
        {headers:{Authorization:`Bearer ${token}`}}
    );
    return response.data;
  };

export const ajoutCategories = async (token, name,description,icon, color) =>{
    const reponse = await axios.post(`${url}/categories`,{
        name,
        description,
        icon,
        color
    },{headers:{Authorization:`Bearer ${token}`}})
    return reponse.data;
}

export const modifierCategories = async (token, id, name,description,icon, color) =>{
    const reponse = await axios.put(`${url}/categories/${id}`,{
        name,
        description,
        icon,
        color
    },{headers:{Authorization:`Bearer ${token}`}})
    return reponse.data;
}

export const supprimerCategories = async (token, id) =>{
    const reponse = await axios.delete(`${url}/categories/${id}`,{headers:{Authorization:`Bearer ${token}`}})
    return reponse.data;
}