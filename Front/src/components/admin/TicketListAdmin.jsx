import { useContext } from "react";

import TicketItem from "../shared/TicketItem";

import { TicketContext } from "../../context/TicketContext";

function TicketList() {
  
    const {
        tickets
    } = useContext(TicketContext);


  return (
    <div className="mt-5 ml-5">

      <h2>Tickets des utilisateurs</h2>

      <div className="flex mt-2">
        <div className="w-1/6">
          <h3>ID</h3>
        </div>

        <div className="w-1/6">
          <h3>Titre</h3>
        </div>

        <div className="w-1/6">
          <h3>Utilisateur</h3>
        </div>

        <div className="w-1/6">
          <h3>Status</h3>
        </div>

        <div className="w-1/6">
          <h3>Date de création</h3>
        </div>
        <div className="w-1/6">
          <h3>gestion du tickets</h3>
        </div>
      </div>

      <div>

        {tickets?.map((ticket) => (

          <TicketItem
   key={ticket.id}
   ticket={ticket}
/>

        ))}

      </div>

    </div>
  )
}

export default TicketList;