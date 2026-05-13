import AdminDashboard from "../components/AdminDashboard"
export default function AdminPage({tickets,supprimerTicket,modifierTickets,role,users,deleteAll,handleLogout,supprimerUser}){
    return <div>
        <AdminDashboard
        tickets={tickets}
        supprimerTicket={supprimerTicket}
        modifierTickets={modifierTickets}
        role={role}
        users={users}
        deleteAll={deleteAll}
        handleLogout={handleLogout}
        supprimerUser={supprimerUser}
        />
    </div>
}