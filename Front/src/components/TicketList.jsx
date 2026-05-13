function TicketList({
  tickets,
  supprimerTicket,
  modifierTickets,
  role
}) {

  return (
    <div>

      <h1>Mes Tickets</h1>

      <div>
        <div>
          <h2>ID</h2>
        </div>

        <div>
          <h2>Titre</h2>
        </div>

        <div>
          <h2>Description</h2>
        </div>

        <div>
          <h2>Status</h2>
        </div>

        <div>
          <h2>Date de création</h2>
        </div>
      </div>

      <div>

        {tickets.map((ticket) => (

          <TicketItem
            key={ticket.id}
            ticket={ticket}
            supprimerTicket={supprimerTicket}
            modifierTickets={modifierTickets}
          />

        ))}

      </div>

    </div>
  )
}

export default TicketList;