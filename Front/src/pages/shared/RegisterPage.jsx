
import RegisterForm from "../../components/shared/RegisterForm";

export default function RegisterPage() {

    return (

        <div className="w-full h-screen bg-[#EEF2FF] flex items-center justify-center overflow-hidden">

            <div className="w-[1400px] h-[800px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex">

                {/* LEFT SIDE */}
                <div className="w-1/2 bg-indigo-600 flex flex-col justify-between p-20 text-white">

                    <div>

                        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center text-5xl mb-14">

                            🎫

                        </div>

                        <h1 className="text-7xl font-bold leading-tight">

                            Dashboard

                        </h1>

                        <p className="text-indigo-100 text-2xl mt-10 leading-relaxed max-w-lg">

                            Gérez vos tickets, utilisateurs et demandes de support

                        </p>

                    </div>

                    <div>

                        <p className="text-indigo-200 text-xl">

                            Dashboard Ticket

                        </p>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="w-1/2 bg-[#F8FAFC] flex items-center justify-center">

                    <RegisterForm />

                </div>

            </div>

        </div>
    );
}