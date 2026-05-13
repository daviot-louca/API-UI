import UserDashboard from "../components/UserDashboard";

export default function UserPage({tickets,supprimerTicket,modifierTickets,role,titre,setTitre,description,setDescription,ajoutTicket,handleLogout}){
    return <div>
        <UserDashboard
        tickets={tickets}
        supprimerTicket={supprimerTicket}
        modifierTickets={modifierTickets}
        role={role}
        titre={titre}
        setTitre={setTitre}
        description={description}
        setDescription={setDescription}
        ajoutTicket={ajoutTicket}
        handleLogout={handleLogout}
        />
    </div>

}