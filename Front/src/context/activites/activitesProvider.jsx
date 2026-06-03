import { useMemo, useState, useCallback } from "react";
import { activitesContext } from "./activitesContext";
import {
  voirActivitesAdmin,
  voirActivitesUser,
} from "../../services/activites.service";

export function ActivitesProvider({ children }) {
  const [activities, setActivities] = useState([]);

  const handleVoirActiviteUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await voirActivitesUser(token);
      setActivities(data);
    } catch (error) {
      console.log(error);
    }
  });
  const handleVoirActiviteAdmin = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await voirActivitesAdmin(token);
      setActivities(data);
    } catch (error) {
      console.log(error);
    }
  });

  const value = useMemo(
    () => ({
      activities,
      setActivities,
      handleVoirActiviteAdmin,
      handleVoirActiviteUser,
    }),
    [activities, handleVoirActiviteAdmin, handleVoirActiviteUser],
  );

  return (
    <activitesContext.Provider value={value}>
      {children}
    </activitesContext.Provider>
  );
}
