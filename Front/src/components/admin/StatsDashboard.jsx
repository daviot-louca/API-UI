export default function ({adminStats}){
    return (
        <div className="grid grid-cols-4 gap-5">

                    {/* TOTAL */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    Total tickets

                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-slate-800">

                                    {adminStats?.total}

                                </h2>

                            </div>

                        </div>

                    </div>

                    {/* REMIS */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    nombre de Tickets à faire

                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-slate-800">

                                    {
                                        adminStats?.status
                                            ?.remis
                                    }

                                </h2>

                            </div>

                        </div>

                    </div>

                    {/* UTILISATEURS */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    Tickets en cours

                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-slate-800">

                                    {adminStats?.status?.enCours}

                                </h2>

                            </div>

                        </div>

                    </div>

                    {/* OUVERT */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    Tickets résolu

                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-slate-800">

                                    {
                                        adminStats?.status
                                            ?.resolu
                                    }

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>
    )
}