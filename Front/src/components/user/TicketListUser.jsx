import { useContext } from "react";

import TicketItem from "../shared/TicketItem";

import { TicketContext } from "../../context/TicketContext";

function TicketList() {

    const {
        tickets
    } = useContext(TicketContext);


    return (
        <div className="mt-5">


                {tickets?.map((ticket) => (

                    <TicketItem
                        key={ticket.id}
                        ticket={ticket}
                    />

                ))}

        </div>
    )
}

export default TicketList;