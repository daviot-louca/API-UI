export default function ModalNouveauTicket({ setIsTicketModalOpen,
    setIsTypeModalOpen,
    type,
    titre,
    setTitre,
    description,
    setDescription,
    priority,
    setPriority,
    handleAjoutTicket }) {
    return (
        <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() =>
                setIsTicketModalOpen(false)
            }
        >

            <div className="flex items-center justify-center min-h-screen">

                <div
                    className="bg-slate-100 rounded-3xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                >

                    <h1 className="text-2xl font-bold text-[#303030]">

                        Nouveau ticket

                    </h1>

                    <p className="text-[#505050] mt-2 text-lg">

                        Type sélectionné :

                        <span className="font-bold ml-2">

                            {type}

                        </span>

                    </p>

                    <form
                        onSubmit={handleAjoutTicket}
                        className="flex flex-col"
                    >

                        {/* TITRE */}
                        <div className="flex flex-col">

                            <label
                                htmlFor="titre"
                                className="text-lg mt-6 text-[#303030] font-bold"
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
                                className="bg-white p-3 rounded-xl my-3"
                            />

                        </div>

                        {/* DESCRIPTION */}
                        <div className="flex flex-col">

                            <label
                                htmlFor="description"
                                className="text-lg mt-4 text-[#303030] font-bold"
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
                                className="bg-white p-3 rounded-xl my-3 h-36"
                            />

                        </div>

                        {/* PRIORITY */}
                        <div className="flex flex-col">

                            <label
                                htmlFor="priority"
                                className="text-lg mt-4 text-[#303030] font-bold"
                            >
                                Priorité
                            </label>

                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) =>
                                    setPriority(e.target.value)
                                }
                                className="bg-white p-3 rounded-xl my-3"
                            >
                                <option value="faible">
                                    faible
                                </option>

                                <option value="moyenne">
                                    moyenne
                                </option>

                                <option value="haute">
                                    haute
                                </option>

                                <option value="urgente">
                                    urgente
                                </option>
                            </select>

                        </div>

                        {/* BUTTONS */}
                        <div className="flex justify-between mt-4">

                            <button
                                type="button"
                                onClick={() => {

                                    setIsTicketModalOpen(false);

                                    setIsTypeModalOpen(true);
                                }}
                                className="bg-slate-600 text-white rounded-xl px-5 py-3"
                            >
                                Retour
                            </button>

                            <button
                                type="submit"
                                className="bg-[#303030] text-white rounded-xl px-5 py-3"
                            >
                                Envoyer
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}
