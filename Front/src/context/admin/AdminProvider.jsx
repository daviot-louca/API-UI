import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminContext } from "./AdminContext";
import {
  voirToutUsers,
  supprimerUserService,
  deleteAllService,
  modifierRoleUser,
  rechercheUser,
} from "../../services/admin.service";

export function AdminProvider({ children }) {
  const [users, setUsers] = useState([]);

  // VOIR USERS
  const voirToutUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await voirToutUsers(token);

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // DELETE USER
  const supprimerUser = useCallback(
    async (id) => {
      try {
        const token = localStorage.getItem("token");
        const confirmation = confirm("Voulez-vous vraiment supprimer cet utilisateur ?")
        if(!confirmation){
          return
        }
        await supprimerUserService(id, token);
        toast.success("utilisateur supprimé")
        await voirToutUser();
      } catch (error) {
        console.log(error);
      }
    },
    [voirToutUser],
  );

  // RESET USERS
  const deleteAll = useCallback(async () => {
    try {
      const confirmation = confirm("Voulez-vous réellement réinitialiser tous les utilisateurs ?")
      if(!confirmation){
        return
      }
      toast.success("Tous les utilisateurs sont supprimés")
      const token = localStorage.getItem("token");

      await deleteAllService(token);
      await voirToutUser();
    } catch (error) {
      console.log(error);
    }
  }, [voirToutUser]);

  const modifierRole = useCallback(
    async (id, currentRole) => {
      try {
        const nbAdmins = users.filter(
          (user) => user.role === "administrateur",
        ).length;

        // Bloquer uniquement si on retire le dernier admin
        if (currentRole === "administrateur" && nbAdmins <= 1) {
          toast.error("Il doit y avoir au moins un administrateur");;
          return;
        }

        const token = localStorage.getItem("token");

        const newRole =
          currentRole === "administrateur" ? "utilisateur" :"administrateur" ;

        await modifierRoleUser(id, newRole, token);

        await voirToutUser();
      } catch (error) {
        console.log(error);
      }
    },
    [users, voirToutUser],
  );

  const rechercheUserContext = useCallback(async (recherche) => {
    try {
      const token = localStorage.getItem("token");
      const data = await rechercheUser(token, recherche);

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const value = useMemo(
    () => ({
      users,
      voirToutUser,
      supprimerUser,
      deleteAll,
      modifierRole,
      rechercheUserContext,
    }),
    [
      deleteAll,
      modifierRole,
      rechercheUserContext,
      supprimerUser,
      users,
      voirToutUser,
    ],
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
