import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login, register } from "../services/auth.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const navigate = useNavigate();

    // AUTH STATES
    const [role, setRole] = useState(
        localStorage.getItem("role") || ""
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    // LOGIN
    const handleSubmit = async (e) => {

        try {

            e.preventDefault();

            const reponse = await login(
                email,
                password
            );

            localStorage.setItem(
                "token",
                reponse.token
            );

            localStorage.setItem(
                "role",
                reponse.role
            );

            setRole(reponse.role);

            if (reponse.role === "admin") {

                navigate("/admin");

            } else {

                navigate("/dashboard");
            }

            setEmail("");
            setPassword("");

        } catch (error) {

            console.log(error);
        }
    };

    // REGISTER
    const handleRegister = async (e) => {

        try {

            e.preventDefault();

            await register(
                username,
                email,
                password
            );

            const reponse = await login(
                email,
                password
            );

            localStorage.setItem(
                "token",
                reponse.token
            );

            localStorage.setItem(
                "role",
                reponse.role
            );

            setRole(reponse.role);

            if (reponse.role === "admin") {

                navigate("/admin");

            } else {

                navigate("/dashboard");
            }

            setUsername("");
            setEmail("");
            setPassword("");

        } catch (error) {

            console.log(error);
        }
    };

    // LOGOUT
    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        setRole("");

        navigate("/");
    };

    return (
        <AuthContext.Provider
            value={{

                // ROLE
                role,
                setRole,

                // LOGIN
                email,
                setEmail,

                password,
                setPassword,

                // REGISTER
                username,
                setUsername,

                // ACTIONS
                handleSubmit,
                handleRegister,
                handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
