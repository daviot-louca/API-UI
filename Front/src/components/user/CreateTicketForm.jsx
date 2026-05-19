import { useState, useContext } from "react";

import { TicketContext } from "../../context/TicketContext";
import DashboardLayoutUser from "./DashboardLayoutUser";

function CreateTicketForm() {

    const { ajoutTicket } = useContext(TicketContext);

    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");

    const handleAjoutTicket = async (e) => {

        e.preventDefault();

        await ajoutTicket(
            titre,
            description
        );

        setTitre("");
        setDescription("");
    };

    return (
<DashboardLayoutUser>

    <div className="p-8">

        <h1
            className="
                text-3xl
                font-bold
                text-gray-800
                mb-8
            "
        >
            Créer un nouveau ticket
        </h1>

        <div>

            <form
                onSubmit={handleAjoutTicket}
                className="
                    flex
                    flex-col
                    gap-6
                "
            >

                <div className="flex flex-col">

                    <label
                        htmlFor="titre"
                        className="
                            mb-2
                            font-medium
                        "
                    >
                        Définissez le problème
                    </label>

                    <input
                        id="titre"
                        type="text"
                        placeholder="Titre"
                        value={titre}
                        onChange={(e) =>
                            setTitre(e.target.value)
                        }
                        className="
                            border
                            p-3
                            focus:ring-gray-500
                        "
                    />

                </div>

                <div className="flex flex-col">

                    <label
                        htmlFor="description"
                        className="
                            mb-2
                            font-medium
                        "
                    >
                        Veuillez préciser le problème
                    </label>

                    <textarea
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        className="
                            border
                            p-3
                            focus:ring-gray-500
                        "
                    />

                </div>

                <button
                    type="submit"
                    className="
                        self-end
                        bg-gray-800
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        hover:bg-gray-500
                        transition
                    "
                >
                    Envoyer
                </button>

            </form>

        </div>

    </div>

</DashboardLayoutUser>
    );
}

export default CreateTicketForm;