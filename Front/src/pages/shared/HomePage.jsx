import { Link } from "react-router-dom";

export default function HomePage() {

    return (

        <div className="w-full h-screen bg-[#EEF2FF] flex items-center justify-center overflow-hidden">

            <div className="w-[1400px] h-[800px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex">

                {/* LEFT */}
                <div className="w-1/2 bg-indigo-600 flex flex-col justify-between p-20 text-white">

                    <div>

                        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center text-5xl mb-14">

                            🎫

                        </div>

                        <h1 className="text-7xl font-bold leading-tight">

                            Dashboard

                        </h1>

                        <p className="text-indigo-100 text-2xl mt-10 leading-relaxed max-w-lg">

                            Gérez vos tickets, utilisateurs et demandes de support.

                        </p>

                    </div>

                    <div>

                        <p className="text-indigo-200 text-xl">

                            Dashboard Tickets

                        </p>

                    </div>

                </div>

                {/* RIGHT */}
                <div className="w-1/2 bg-[#F8FAFC] flex items-center justify-center">

                    <div className="w-[500px] flex flex-col">

                        <h2 className="text-6xl font-bold text-gray-800 leading-tight">

                            Bienvenue

                        </h2>

                        <p className="text-gray-500 text-2xl mt-6 leading-relaxed">

                            Connectez-vous ou créez un compte pour accéder à votre dashboard support.

                        </p>

                        <div className="flex flex-col gap-6 mt-16">

                            <Link
                                to="/login"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-2xl text-2xl font-semibold transition shadow-md text-center"
                            >
                                Se connecter
                            </Link>

                            <Link
                                to="/register"
                                className="bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 py-6 rounded-2xl text-2xl font-semibold transition text-center"
                            >
                                Créer un compte
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}