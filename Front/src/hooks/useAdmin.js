import { useState } from "react"
import {
    voirToutUsers,
    deleteAllService,
    supprimerUserService
} from "../services/admin.service";
export function useAdmin() {
    const [users, setUsers] = useState([]);
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
    const deleteAll = async () => {

        try {

            const token = localStorage.getItem("token");

            await deleteAllService(token);

            voirToutUser();

        } catch (error) {

            console.log(error);
        }
    };
    const voirToutUser = async () => {

        try {

            const token = localStorage.getItem("token");

            const data = await voirToutUsers(token);

            setUsers(data);

        } catch (error) {

            console.log(error);
        }
    };
    return { users, supprimerUser, deleteAll, voirToutUser }
}
