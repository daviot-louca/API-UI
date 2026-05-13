function TicketItem({
  ticket,
  supprimerTicket,
  modifierTickets,
  role
}) {

  return (

    <div>

      <div>
        <p>{ticket.id}</p>
      </div>

      <div>
        <p>{ticket.title}</p>
      </div>

      <div>
        <p>{ticket.description}</p>
      </div>

      <div>

        {role === "admin" ? (

          <select
            value={ticket.status}
            onChange={(e) =>
              modifierTickets(ticket.id, e.target.value)
            }
          >

            <option value="remis">remis</option>

            <option value="ouvert">
              ouvert
            </option>

            <option value="en cours">
              en cours
            </option>

            <option value="résolu">
              résolu
            </option>

          </select>

        ) : (

          <button>
            {ticket.status}
          </button>

        )}

      </div>

      <div>
        <p>
          {new Date(ticket.createdAt)
            .toLocaleDateString()}
        </p>
      </div>

      {role === "admin" && (

        <div>

          <button
            onClick={() =>
              supprimerTicket(ticket.id)
            }
          >
            supprimer
          </button>

        </div>

      )}

    </div>

  )
}

export default TicketItem;