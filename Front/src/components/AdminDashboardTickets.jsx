import { useEffect, useContext } from "react";

import TicketList from "./TicketList";
import { TicketContext } from "../context/TicketContext";
import { AdminContext } from "../context/AdminContext";
import DashboardLayout from "./DashboardLayout";

function AdminDashboard() {

    const { voirToutTicket } = useContext(TicketContext);

    const { voirToutUser } = useContext(AdminContext);

    useEffect(() => {

        voirToutTicket();
        voirToutUser();

    }, []);

    return (

        <DashboardLayout>
            <div className="flex flex-col gap-x-8 pl-6">
              <h1 className="mt-4 font-bold text-2xl text-indigo-950">Dashboard Admin Tickets</h1>

            <TicketList/>
            </div>
            

        </DashboardLayout>
    );
}

export default AdminDashboard;