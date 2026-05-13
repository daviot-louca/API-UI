function UserDashboard({ tickets, supprimerTicket, modifierTickets, role, titre, setTitre, description, setDescription, ajoutTicket,handleLogout }) {
    return <div>
        <button onClick={handleLogout}>Se déconnecter</button>
        <TicketList
            tickets={tickets}
            supprimerTicket={supprimerTicket}
            modifierTickets={modifierTickets}
        />

        <CreateTicketForm
            titre={titre}
            setTitre={setTitre}
            description={description}
            setDescription={setDescription}
            ajoutTicket={ajoutTicket}
        />
    </div>
}

export default UserDashboard