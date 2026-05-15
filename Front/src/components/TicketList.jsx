import { useContext } from "react";

import TicketItem from "./TicketItem";

import { TicketContext } from "../context/TicketContext";

function TicketList() {
  
    const {
        tickets
    } = useContext(TicketContext);


  return (
    <div className="mt-5">

      <h2>Tickets des utilisateurs</h2>

      <div className="flex justify-around mt-2">
        <div>
          <h3>ID</h3>
        </div>

        <div>
          <h3>Titre</h3>
        </div>

        <div>
          <h3>Description</h3>
        </div>

        <div>
          <h3>Status</h3>
        </div>

        <div>
          <h3>Date de création</h3>
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