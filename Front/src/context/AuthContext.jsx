import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { login, register } from "../services/auth.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const navigate = useNavigate();

    // AUTH STATES
    const [role, setRole] = useState(
        localStorage.getItem("role") || ""
    );

    const [username, setUsername] = useState(
        localStorage.getItem("username") || ""
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {

        const roleStorage =
            localStorage.getItem("role");

        const usernameStorage =
            localStorage.getItem("username");

        if (roleStorage) {

            setRole(roleStorage);
        }

        if (usernameStorage) {

            setUsername(usernameStorage);
        }

    }, []);

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

            localStorage.setItem(
                "username",
                reponse.username
            );

            setRole(reponse.role);

            setUsername(
                reponse.username
            );

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

            localStorage.setItem(
                "username",
                reponse.username
            );

            setRole(reponse.role);

            setUsername(
                reponse.username
            );

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

    // LOGOUT
    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");

        setRole("");
        setUsername("");

        navigate("/");
    };

    return (

        <AuthContext.Provider
            value={{

                // ROLE
                role,
                setRole,

                // USERNAME
                username,
                setUsername,

                // LOGIN
                email,
                setEmail,

                password,
                setPassword,

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