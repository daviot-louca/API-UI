import {
    createContext,
    useState
} from "react";

import {
    voirToutUsers,
    supprimerUserService,
    deleteAllService
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

    return (

        <AdminContext.Provider
            value={{

                users,

                voirToutUser,

                supprimerUser,

                deleteAll
            }}
        >

            {children}

        </AdminContext.Provider>
    );
}