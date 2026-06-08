import { useContext, useEffect } from "react";

import { TicketContext } from "../../../context/ticket/TicketContext";

import DashboardLayout from "../layout/DashboardLayout";
import StatCard from "./StatCard";
import TicketEvolutionChart from "../../charts/TicketEvolutionChart";
import RecentActivities from "./RecentActivites";
import PriorityChart from "../../charts/PriorityChart";
import RecentTickets from "./RecentTickets";
export default function AdminDashboard() {
  const {
    tickets,
    adminStats,
    voirAdminStatistiques,
    adminEvolution,
    voirAdminStatsEvolution,
  } = useContext(TicketContext);
  useEffect(() => {
    voirAdminStatistiques();
    voirAdminStatsEvolution();
  }, [voirAdminStatistiques, voirAdminStatsEvolution]);
  const priorityData = [
    {
      priority: "faible",
      value: adminStats?.priority?.faible,
    },
    {
      priority: "moyenne",
      value: adminStats?.priority?.moyenne,
    },
    {
      priority: "haute",
      value: adminStats?.priority?.haute,
    },
    {
      priority: "urgente",
      value: adminStats?.priority?.urgente,
    },
  ];
  return (
    <DashboardLayout>
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard title="Total tickets" value={adminStats?.total || 0} />
        <StatCard
          title="Tickets remis"
          value={adminStats?.status?.remis || 0}
        />
        <StatCard
          title="Tickets en cours"
          value={adminStats?.status?.enCours || 0}
        />
        <StatCard
          title="Tickets résolus"
          value={adminStats?.status?.resolu || 0}
        />
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="grid col-span-2 gap-5">
          <div className="">
            <TicketEvolutionChart data={adminEvolution} />
          </div>
          <div className="">
            <RecentTickets />
          </div>
        </div>

        <div className="grid col-span-1 gap-10">
          <div>
            <PriorityChart data={priorityData} />
          </div>

          <div>
            <RecentActivities />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
