import {
    createContext,
    useState
} from "react";

import {
    voirToutUsers,
    supprimerUserService,
    deleteAllService,
    updateRole
} from "../services/admin.service";

export const AdminContext = createContext();

export function AdminProvider({ children }) {

    const [users, setUsers] = useState([]);

    // VOIR USERS
    const voirToutUser = async () => {

        try {

            const token = localStorage.getItem("token");

            const data = await voirToutUsers(token);

            setUsers(data);

        } catch (error) {

            console.log(error);
        }
    };

    // DELETE USER
    const supprimerUser = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await supprimerUserService(
                id,
                token
            );

            voirToutUser();

        } catch (error) {

            console.log(error);
        }
    };

    // RESET USERS
    const deleteAll = async () => {

        try {

            const token = localStorage.getItem("token");

            await deleteAllService(token);

            voirToutUser();

        } catch (error) {

            console.log(error);
        }
    };

    const updateUser = async (id) => {
        try{
            const token = localStorage.getItem("token");
            await updateRole(token,id)
            voirToutUser()
        }catch{
            console.log(error)
        }
    }

    return (

        <AdminContext.Provider
            value={{

                users,
                voirToutUser,

                supprimerUser,

                deleteAll,
                updateUser
            }}
        >

            {children}

        </AdminContext.Provider>
    );
}