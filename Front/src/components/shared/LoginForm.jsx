// LoginForm.jsx

import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

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
            className="w-112.5 flex flex-col"
        >

            {/* EMAIL */}
            <label className="text-[#303030] font-semibold text-lg mb-3 mt-13">

                Entrez votre e-mail

            </label>

            <input
                type="text"
                placeholder="test.exemple@gmail.com"
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                value={email}
                className="bg-slate-100 rounded-2xl px-6 py-5 text-lg outline-none focus:ring-2 focus:ring-[#303030] transition mb-8"
            />

            {/* PASSWORD */}
            <label className="text-[#303030] font-semibold text-lg mb-3">

                Mot de passe

            </label>

            <input
                type="password"
                placeholder="*************"
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                value={password}
                className="bg-slate-100 rounded-2xl px-6 py-5 text-lg outline-none focus:ring-2 focus:ring-[#303030] transition mb-10"
            />

            {/* ACTIONS */}
            <div className="flex items-end justify-end">

                <button
                    type="submit"
                    className="inline-block bg-[#303030] p-3 rounded-xl text-slate-100 mt-9"
                >
                    Se connecter
                </button>

            </div>

        </form>
    );
}

export default LoginForm;
