import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function RegisterForm() {

    const {
        handleRegister,

        username,
        setUsername,

        email,
        setEmail,

        password,
        setPassword

    } = useContext(AuthContext);

    return (

        <div>

            <form onSubmit={handleRegister}>

                <h2>Inscription</h2>

                <label>

                    Username

                    <input
                        type="text"
                        placeholder="test"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                </label>

                <label>

                    Email

                    <input
                        type="text"
                        placeholder="test.exemple@gmail.com"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </label>

                <label>

                    Password

                    <input
                        type="password"
                        placeholder="*************"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                </label>

                <button type="submit">
                    S'inscrire
                </button>

            </form>

        </div>
    );
}

export default RegisterForm;