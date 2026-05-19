import { useEffect, useContext } from "react";
import { TicketContext } from "../../context//TicketContext"
import { useParams } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { Link } from "react-router-dom";
import StatusBadge from "../shared/StatusBadge"
export default function VoirUnTicketComponent() {
    const { VoirUnTicketContext, ticket } = useContext(TicketContext)
    const { id } = useParams()
    useEffect(() => {
        const data = async () => {
            await VoirUnTicketContext(id)
        }
        data()
    }, [])
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 p-8 w-full bg-[#F5F7FB] min-h-screen">
                {/*Cards */}
                <div className="">
                    {/*Headers */}
                    <div className="flex p-6 justify-around bg-indigo-600 rounded-3xl">

                        <h1 className="text-2xl font-bold text-white">
                            Ticket numéro {ticket?.id}
                        </h1>

                    </div>
                    {/*BODY */}
                    {/*titre du ticket*/}
                    <div className="">
                        <div>
                            <div className="my-5">
                                <h2 className="text-xl font-semibold">Titre du ticket</h2>
                                <div className="text-3xl font-bold">
                                    {ticket?.title}
                                </div>
                                <div className="flex">
                                    <div className="mr-5">
                                         <StatusBadge status={ticket?.status} />
                                    </div>
                                    <div>
                                        {new Date(ticket?.createdAt)
                                            .toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            {/*description + informations utilisateurs*/}
                            <div className="grid grid-cols-2">
                                {/*description*/}
                                <div>
                                    <h2 className="font-bold">Description du projet</h2>
                                </div>
                                {/*info user*/}
                                <div>
                                    <h2>
                                        Informations utilisateurs
                                    </h2>
                                </div>
                            </div>
                            {/*informations du ticket + historique*/}
                            <div className="grid grid-cols-2">
                                {/*infos ticket*/}
                                <div>
                                    <h2>informations du ticket</h2>
                                </div>
                                {/*historique*/}
                                <div>
                                    <h2>historique</h2>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </DashboardLayout>


    )
}