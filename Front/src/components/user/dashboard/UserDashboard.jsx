import { useEffect, useContext, useState } from "react";

import { TicketContext } from "../../../context/ticket/TicketContext";
import { AuthContext } from "../../../context/auth/AuthContext";
import DashboardLayoutUser from "../layout/DashboardLayoutUser";

//composants
import CardStats from "./CardStats";
import RecentTicketTable from "./RecentTicketTable";
//icons
import DonutChartsStatus from "../../charts/DonutChartsStatus";
import RecentActivity from "./RecentActivity";
import ProfilModal from "../../shared/modals/ProfilModal";
//function
function UserDashboard() {
  const { voirTicket, currentPage, selectedStatus, voirStatsTicket, stats,voirTicketsMessagerieContext } =
    useContext(TicketContext);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const data =
    stats.total === 0
      ? [{ name: "Aucun ticket", value: 100 }]
      : [
          { name: "remis", value: stats.remis },
          { name: "en cours", value: stats.enCours },
          { name: "resolu", value: stats.resolu },
        ];
  const { username, avatar, email, role, handleLogout, setEmail, setUsername } =
    useContext(AuthContext);

  useEffect(() => {
    voirTicket(currentPage, selectedStatus);
    voirTicketsMessagerieContext();
    voirStatsTicket();
  }, [currentPage, selectedStatus, voirStatsTicket, voirTicket]);
  return (
    <DashboardLayoutUser
      username={username}
      handleLogout={handleLogout}
      role={role}
      avatar={avatar}
      email={email}
      setUsername={setUsername}
      setEmail={setEmail}
      setIsProfileModalOpen={setIsProfileModalOpen}
    >
      <div className="flex flex-col gap-10 bg-slate-100">
        {/* TOP */}
        {/*DÉBUT DU TABLEAU DE BORD */}
        <CardStats stats={stats} />
        {/*TICKETS RECENTS + STATUS + ACTIVITé */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/*TICKETS RECENTS */}
          <div className="bg-white p-4 rounded-xl shadow-sm xl:col-span-2 min-w-0">
            <RecentTicketTable />
          </div>
          {/*STATUS + ACTIVITE*/}
          <div className="flex flex-col gap-4 min-w-0">
            {/*STATUS*/}
            <DonutChartsStatus data={data} total={stats.total} />
            {/*ACTIVITE*/}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
      {isProfileModalOpen && (
        <ProfilModal
          avatar={avatar}
          username={username}
          email={email}
          setUsername={setUsername}
          setEmail={setEmail}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />
      )}
    </DashboardLayoutUser>
  );
}

export default UserDashboard;
