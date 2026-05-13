import TicketList from "./TicketList"
import UserList from "./UserList"

function AdminDashboard({ tickets, supprimerTicket, modifierTickets, role, users, deleteAll,handleLogout,supprimerUser }) {
    return <div>
        <h1>Dashboard Admin</h1>    
        <button onClick={handleLogout}>Se déconnecter</button>

        <TicketList
            tickets={tickets}
            supprimerTicket={supprimerTicket}
            modifierTickets={modifierTickets}
        />

        <UserList
            users={users}
            deleteAll={deleteAll}
            supprimerUser={supprimerUser}
        />
    </div>
}

export default AdminDashboard;