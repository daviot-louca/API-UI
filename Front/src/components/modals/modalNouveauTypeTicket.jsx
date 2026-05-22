export default function modalNouveauTypeTicket({setIsTypeModalOpen,handleSelectType}) {
    return (
        <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() =>
                setIsTypeModalOpen(false)
            }
        >
            <div className="flex items-center justify-center min-h-screen">

                <div
                    className="bg-white rounded-3xl p-10 w-175"
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                >
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold text-[#303030] mb-10">
                            Choisissez un type de problème
                        </h1>
                        <button onClick={() => setIsTypeModalOpen(false)} className="mb-10 bg-[#303030] text-white rounded-full px-3">X</button>
                    </div>

                    <div className="grid grid-cols-2 gap-5">

                        <button
                            onClick={() =>
                                handleSelectType("Poste de travail")
                            }
                            className="bg-slate-100 hover:bg-slate-200 rounded-2xl p-8 text-xl font-semibold transition"
                        >
                            Poste de travail
                        </button>

                        <button
                            onClick={() =>
                                handleSelectType("téléphonie")
                            }
                            className="bg-slate-100 hover:bg-slate-200 rounded-2xl p-8 text-xl font-semibold transition"
                        >
                            Téléphonie
                        </button>

                        <button
                            onClick={() =>
                                handleSelectType("compte d'accès")
                            }
                            className="bg-slate-100 hover:bg-slate-200 rounded-2xl p-8 text-xl font-semibold transition"
                        >
                            Compte d'accès
                        </button>

                        <button
                            onClick={() =>
                                handleSelectType("messagerie")
                            }
                            className="bg-slate-100 hover:bg-slate-200 rounded-2xl p-8 text-xl font-semibold transition"
                        >
                            Messagerie
                        </button>

                        <button
                            onClick={() =>
                                handleSelectType("autres")
                            }
                            className="col-span-2 bg-slate-100 hover:bg-slate-200 rounded-2xl p-8 text-xl font-semibold transition"
                        >
                            Autres
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}