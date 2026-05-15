import { useState, useContext } from "react";

import { TicketContext } from "../context/TicketContext";

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

        <div>

            <div>

                <form onSubmit={handleAjoutTicket}>

                    <label htmlFor="titre">
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
                    />

                    <label htmlFor="description">
                        Veuillez préciser le problème
                    </label>

                    <input
                        id="description"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <button type="submit">
                        Envoyer
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateTicketForm;