// LoginForm.jsx

import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

function LoginForm() {

    const {
        email,
        password,
        setEmail,
        setPassword,
        handleSubmit
    } = useContext(AuthContext);

    return (

        <form
            onSubmit={handleSubmit}
            className="w-[450px] flex flex-col"
        >

            {/* HEADER */}
            <div className="mb-14">

                <h2 className="text-5xl font-bold text-gray-800">

                    Connexion

                </h2>

                <p className="text-gray-500 text-xl mt-4">

                    Connectez-vous à votre espace.

                </p>

            </div>

            {/* EMAIL */}
            <label className="text-gray-700 font-semibold text-lg mb-3">

                Email

            </label>

            <input
                type="text"
                placeholder="test.exemple@gmail.com"
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                value={email}
                className="bg-white border border-gray-200 rounded-2xl px-6 py-5 text-lg outline-none focus:ring-2 focus:ring-indigo-500 transition mb-8"
            />

            {/* PASSWORD */}
            <label className="text-gray-700 font-semibold text-lg mb-3">

                Mot de passe

            </label>

            <input
                type="password"
                placeholder="*************"
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                value={password}
                className="bg-white border border-gray-200 rounded-2xl px-6 py-5 text-lg outline-none focus:ring-2 focus:ring-indigo-500 transition mb-10"
            />

            {/* ACTIONS */}
            <div className="flex flex-col gap-5">

                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl text-xl font-semibold transition shadow-md"
                >
                    Se connecter
                </button>

                <Link
                    to="/register"
                    className="text-center bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 py-5 rounded-2xl text-xl font-semibold transition"
                >
                    Créer un compte
                </Link>

            </div>

        </form>
    );
}

export default LoginForm;