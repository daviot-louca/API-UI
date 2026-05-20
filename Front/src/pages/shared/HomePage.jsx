import { Link } from "react-router-dom";
import LoginForm from "../../components/shared/LoginForm";
export default function HomePage() {

    return (

        <div className="w-full h-screen bg-slate-100 flex items-center justify-center overflow-hidden">

            <div className="w-250 h-150 bg-white rounded-2xl shadow-2xl overflow-hidden flex">
                {/*coté gauche insription*/}
                <div className="w-1/2 bg-slate-800 flex flex-col items-center">
                    <p className="text-white text-2xl font-bold mt-10">Commencez maintenant</p>
                    <p className="text-white mt-80">Pas encore de compte ?</p>
                    <div className="mt-8 flex justify-center">
                        <Link to="/register" className="inline-block bg-slate-100 p-3 rounded-xl">s'inscrire</Link>
                    </div>
                </div>
                {/*côté droit connexion */}
                <div className="w-1/2 flex flex-col items-center">
                    <h1 className="text-slate-800 text-2xl mt-10 font-bold">Accédez à votre compte</h1>
                    <LoginForm/>
                </div>
            </div>

        </div>
    );
}