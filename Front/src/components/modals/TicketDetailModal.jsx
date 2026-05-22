
export default function TicketDetailModal({
   selectedTicket,
   setSelectedTicket,
   setIsShowTicketOpen,
   modifierTickets,
   supprimerTicket
}) {
    return <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() =>
            setIsShowTicketOpen(false)
        }
    >

        <div className="flex items-center justify-center min-h-screen">

            <div
                className="bg-white rounded-3xl p-3 w-175"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >
                <div className="flex justify-end">
                    <button onClick={() => setIsShowTicketOpen(false)} className="mb-3 bg-[#303030] text-white rounded-full px-2 py-0.5">X</button>
                </div>
                <div className="flex justify-between px-3">
                    <h2 className="text-xl font-bold text-[#303030] mb-10">
                        Détail du ticket numéro {selectedTicket?.id}
                    </h2>
                    <div>
                        <p>
                            Date de création : <span className="font-bold">{
                                new Date(selectedTicket.createdAt)
                                    .toLocaleDateString()
                            }</span>
                        </p>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mr-20 my-3">
                        <div>

                            <p className="">
                                Type du problème : <span className="font-bold">{selectedTicket?.type}</span>
                            </p>
                        </div>
                        <div>

                            <select
                                className="bg-slate-100 text-[#303030] rounded-xl px-4 py-2 outline-none border-none"
                                value={selectedTicket?.status}
                                onChange={(e) => {

                                    modifierTickets(
                                        selectedTicket.id,
                                        e.target.value
                                    );

                                    setSelectedTicket({
                                        ...selectedTicket,
                                        status: e.target.value
                                    });
                                }}
                            >

                                <option value="remis">
                                    remis
                                </option>

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
                        </div>
                    </div>
                    <div>
                        <p className="my-3">
                            Titre: <span className="font-bold">{selectedTicket?.title}</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            Description: <span className="font-bold">{selectedTicket?.description}</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            Utilisateur : <span className="font-bold">{selectedTicket?.user?.username}</span>
                        </p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => {
                                supprimerTicket(
                                    selectedTicket.id
                                );
                                setIsShowTicketOpen(false);
                                setSelectedTicket(null);
                            }}
                            className="text-slate-100 bg-red-500 p-1 mr-3 mb-3 rounded-[5px]"
                        >
                            Supprimer le ticket
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
}