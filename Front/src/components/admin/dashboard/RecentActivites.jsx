import { activitesContext } from "../../../context/activites/activitesContext";
import { useContext, useEffect } from "react";
export default function RecentActivities() {
    const { activities, handleVoirActiviteAdmin } = useContext(activitesContext);
  useEffect(() => {
    handleVoirActiviteAdmin()
  }, [handleVoirActiviteAdmin]);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-[#303030] mb-6">
        Activités récentes
      </h2>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-500">
            Aucune activité récente.
          </p>
        ) : (
          activities.slice(0, 4).map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 border-b pb-3 last:border-b-0"
            >
              <div className="h-3 w-3 rounded-full bg-blue-500 mt-2"></div>

              <div>
                <p className="font-medium text-[#303030]">
                  {activity.description}
                </p>

                <p className="text-sm text-gray-500">
                  Ticket #{activity.ticketId}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}