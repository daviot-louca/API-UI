import { Link } from "react-router-dom";
import RegisterForm from "../../components/shared/RegisterForm";
export default function HomePage() {

    return (

        <div className="w-full h-screen bg-slate-100 flex items-center justify-center overflow-hidden">

            <div className="w-250 h-150 bg-white rounded-2xl shadow-2xl overflow-hidden flex">
                {/*coté gauche insription*/}
                <div className="w-1/2 bg-[#303030] flex flex-col items-center">
                    <p className="text-white text-2xl font-bold mt-10">Connectez-vous à votre compte</p>
                    <p className="text-white mt-80">Déjà connecté ?</p>
                    <div className="mt-8 flex justify-center">
                        <Link to="/login" className="inline-block bg-slate-100 p-3 rounded-xl">Se connecter</Link>
                    </div>
                </div>
                {/*côté droit connexion */}
                <div className="w-1/2 flex flex-col items-center">
                    <h1 className="text-[#303030] text-2xl mt-10 font-bold">Commencez maintenant</h1>
                    <RegisterForm/>
                </div>
            </div>

        </div>
    );
}