import { useCallback, useMemo, useState } from "react";

import { AdminContext } from "./AdminContext";
import {
    voirToutUsers,
    supprimerUserService,
    deleteAllService,
    modifierRoleUser,
    rechercheUser
} from "../../services/admin.service";

export function AdminProvider({ children }) {
    const [users, setUsers] = useState([]);

    // VOIR USERS
    const voirToutUser = useCallback(
        async () => {
            try {
                const token =
                    localStorage.getItem("token");

                const data =
                    await voirToutUsers(token);

                setUsers(data);
            } catch (error) {
                console.log(error);
            }
        },
        []
    );

    // DELETE USER
    const supprimerUser = useCallback(
        async (id) => {
            try {
                const token =
                    localStorage.getItem("token");

                await supprimerUserService(
                    id,
                    token
                );

                await voirToutUser();
            } catch (error) {
                console.log(error);
            }
        },
        [voirToutUser]
    );

    // RESET USERS
    const deleteAll = useCallback(
        async () => {
            try {
                const token =
                    localStorage.getItem("token");

                await deleteAllService(token);
                await voirToutUser();
            } catch (error) {
                console.log(error);
            }
        },
        [voirToutUser]
    );

    const modifierRole = useCallback(
        async (id, currentRole) => {
            try {
                const token =
                    localStorage.getItem("token");
                const newRole =
                    currentRole === "admin"
                        ? "user"
                        : "admin";

                await modifierRoleUser(
                    id,
                    newRole,
                    token
                );

                await voirToutUser();
            } catch (error) {
                console.log(error);
            }
        },
        [voirToutUser]
    );

    const rechercheUserContext = useCallback(
        async (recherche) => {
            try {
                const token =
                    localStorage.getItem("token");
                const data =
                    await rechercheUser(
                        token,
                        recherche
                    );

                setUsers(data);
            } catch (error) {
                console.log(error);
            }
        },
        []
    );

    const value = useMemo(
        () => ({
            users,
            voirToutUser,
            supprimerUser,
            deleteAll,
            modifierRole,
            rechercheUserContext
        }),
        [
            deleteAll,
            modifierRole,
            rechercheUserContext,
            supprimerUser,
            users,
            voirToutUser
        ]
    );

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
}
