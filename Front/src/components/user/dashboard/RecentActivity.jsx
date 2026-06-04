import { activitesContext } from "../../../context/activites/activitesContext";
import { useContext, useEffect } from "react";
export default function RecentActivity() {
  const { activities, handleVoirActiviteUser } = useContext(activitesContext);
  useEffect(() => {
    handleVoirActiviteUser();
  }, [handleVoirActiviteUser]);
  console.log(activities);
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-[#303030] mb-4">
        Activités récentes
      </h2>
      {/* Exemple d'activité récente */}

      {activities.length > 0 ? (
        <div>
          {activities.map((activite) => {
            return (
              <div key={activite.id}>
                <div className="font-bold text-lg text-[#303030]">{activite.description.slice(0,1).toUpperCase()}{activite.description.slice(1)}</div>
                <div className="font-medium text-[#303030]">
                  Ticket #{activite.id} • modifié le{" "}
                  {new Date(activite?.updatedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  à{" "}
                  {new Date(activite?.updatedAt).toLocaleTimeString("fr-FR", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-[#303030]">Aucune activité récente à afficher.</p>
      )}
    </div>
  );
}
