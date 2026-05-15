import UserDashboard from "../components/UserDashboard";
import {useState} from 'react'
export default function UserPage({tickets,supprimerTicket,modifierTickets,role,ajoutTicket,handleLogout}){
    const [titre,setTitre] = useState("")
    const [description,setDescription] = useState("")
    const handleAjoutTicket = async (e) => {

    e.preventDefault();

    await ajoutTicket(
        titre,
        description
    );

    setTitre("");
    setDescription("");
}
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
        ajoutTicket={handleAjoutTicket}
        handleLogout={handleLogout}
        />
    </div>

}