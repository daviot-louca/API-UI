import {
    useEffect,
    useContext,
    useState
} from "react";

import TicketList
    from "./TicketListAdmin";

import {
    TicketContext
} from "../../context/TicketContext";

import DashboardLayout
    from "./DashboardLayout";

import {
    AdminContext
} from "../../context/AdminContext";

import {
    AuthContext
} from "../../context/AuthContext";
//composents
import StatsDashboard from "./StatsDashboard";
import Profile from "../shared/Profile";
import ProfilModal from "../modals/ProfilModal";
function AdminDashboard() {

    const {
        voirToutTicket,
        currentPage,
        selectedStatus,
        voirAdminStatistiques,
        adminStats,
        modifierTickets,
        supprimerTicket
    } = useContext(TicketContext);

    const [selectedTicket,
        setSelectedTicket] =
        useState(null);
    const {
        voirToutUser,
        users
    } = useContext(AdminContext);

    const {
        handleLogout,
        username,
        role,
        avatar,
        email,
        setEmail,
        setUsername
    } = useContext(AuthContext);

    useEffect(() => {

        voirToutTicket(
            currentPage,
            selectedStatus
        );

        voirAdminStatistiques();

        voirToutUser();

    }, [currentPage, selectedStatus]);

    const [isShowTicketOpen, setIsShowTicketOpen] = useState(false)
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
    return (

        <DashboardLayout>

            <div className="flex flex-col gap-6 p-6 w-full bg-[#F5F7FB] min-h-screen">

                {/* HEADER */}
                <div className="flex items-start justify-between">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-800">

                            Dashboard

                        </h1>

                        <p className="text-slate-500 mt-2 text-lg">

                            Bienvenue {username}. Voici un aperçu global des tickets.

                        </p>

                    </div>

                    {/* PROFILE */}
                    <Profile
                        username={username}
                        handleLogout={handleLogout}
                        role={role}
                        avatar={avatar}
                        setIsProfileModalOpen={setIsProfileModalOpen}
                    />

                </div>

                {/* STATS */}
                <StatsDashboard
                    adminStats={adminStats}
                />

                {/* TICKETS */}
                <div className="bg-white rounded-3xl shadow-sm p-6">
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Tickets récents
                            </h2>
                        </div>

                    </div>

                    {/* LIST */}
                    <TicketList
                        setSelectedTicket={setSelectedTicket}
                        setIsShowTicketOpen={setIsShowTicketOpen}
                    />
                    {isShowTicketOpen && (
                        <TicketDetailModal
                            selectedTicket={selectedTicket}
                            setSelectedTicket={setSelectedTicket}
                            setIsShowTicketOpen={setIsShowTicketOpen}
                            modifierTickets={modifierTickets}
                            supprimerTicket={supprimerTicket}
                        />
                    )}
                </div>
                {/*modal PROFIL */}
                {isProfileModalOpen && 
                <ProfilModal
                    avatar={avatar}
                    username={username}
                    email={email}
                    setUsername={setUsername}
                    setEmail={setEmail}
                    setIsProfileModalOpen={
                        setIsProfileModalOpen
                    }

                />}
            </div>

        </DashboardLayout >
    );
}

export default AdminDashboard;