// LoginForm.jsx

import { useContext } from "react";

import { AuthContext } from "../../context/auth/AuthContext";

function RegisterForm() {

    const {
        email,
        password,
        setEmail,
        setPassword,
        handleRegister,
        username,
        setUsername
    } = useContext(AuthContext);

    return (

        <form
            onSubmit={handleRegister}
            className="w-112.5 flex flex-col"
        >

            <label className="text-[#303030] font-semibold text-lg mb-1">

                Pseudo

            </label>

            <input
                type="text"
                placeholder="Marie"
                onChange={(e) =>
                    setUsername(e.target.value)
                }
                value={username}
                className="bg-slate-100 rounded-2xl px-6 py-3 text-lg outline-none focus:ring-2 focus:ring-[#303030] transition mb-8"
            />
            {/* EMAIL */}
            <label className="text-[#303030] font-semibold text-lg mb-2">

                Email

            </label>

            <input
                type="text"
                placeholder="test.exemple@gmail.com"
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                value={email}
                className="bg-slate-100 rounded-2xl px-6 py-3 text-lg outline-none focus:ring-2 focus:ring-[#303030] transition mb-8"
            />

            {/* PASSWORD */}
            <label className="text-[#303030] font-semibold text-lg mb-2">

                Mot de passe

            </label>

            <input
                type="password"
                placeholder="*************"
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                value={password}
                className="bg-slate-100 rounded-2xl px-6 py-3 text-lg outline-none focus:ring-2 focus:ring-[#303030] transition mb-8"
            />

            {/* ACTIONS */}
            <div className="flex justify-end">

                <button
                    type="submit"
                    className="inline-block bg-[#303030] p-3 rounded-xl text-slate-100 mt-5"
                >
                    Créer un compte
                </button>

            </div>

        </form>
    );
}

export default RegisterForm;
