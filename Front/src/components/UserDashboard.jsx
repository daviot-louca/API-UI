import { useContext } from "react";
import TicketList from "./TicketList";
import { AuthContext } from "../context/AuthContext";
import DashboardLayoutUser from "./DashboardLayoutUser";
function UserDashboard() {

    const { handleLogout } = useContext(AuthContext);

    return (

        <DashboardLayoutUser>

            <button onClick={handleLogout}>
                Se déconnecter
            </button>

            <TicketList />

        </DashboardLayoutUser>
    );
}
export default UserDashboard;