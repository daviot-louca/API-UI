import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { login, register, modifierProfil } from "../services/auth.service";

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
    const emailStorage =
        localStorage.getItem("email");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(
        localStorage.getItem("avatar") || ""
    );
    const [id, setId] = useState(
        localStorage.getItem("id") || ""
    )
    useEffect(() => {

        const roleStorage =
            localStorage.getItem("role");
        const idStorage =
            localStorage.getItem("id");

        const usernameStorage =
            localStorage.getItem("username");
        const avatarStorage =
            localStorage.getItem("avatar")
        if (roleStorage) {

            setRole(roleStorage);
        }
        if (idStorage) {

            setId(idStorage);
        }
        if (emailStorage) {
            setEmail(emailStorage)
        }

        if (usernameStorage) {

            setUsername(usernameStorage);
        }
        if (avatarStorage) {
            setAvatar(avatarStorage)
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
                "email",
                reponse.email
            )
            localStorage.setItem(
                "role",
                reponse.role
            );
            localStorage.setItem(
                "id",
                reponse.id
            )

            localStorage.setItem(
                "username",
                reponse.username
            );
            localStorage.setItem(
                "avatar",
                reponse.avatar
            )
            setAvatar(reponse.avatar)
            setRole(reponse.role);
            setEmail(reponse.email)
            setId(reponse.id)
            setUsername(
                reponse.username
            );

            if (reponse.role === "admin") {

                navigate("/admin");

            } else {

                navigate("/dashboard");
            }

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
                "email",
                reponse.email
            )
            localStorage.setItem(
                "role",
                reponse.role
            );
            localStorage.setItem(
                "id",
                reponse.id
            )
            localStorage.setItem(
                "username",
                reponse.username
            );
            localStorage.setItem(
                "avatar",
                reponse.avatar
            )

            setRole(reponse.role);
            setEmail(reponse.email)
            setUsername(
                reponse.username
            );
            setId(reponse.id)
            setAvatar(reponse.avatar)

            if (reponse.role === "admin") {

                navigate("/admin");

            } else {

                navigate("/dashboard");
            }
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
        localStorage.removeItem("avatar");
        localStorage.removeItem("email");
        localStorage.removeItem("id");

        setEmail("");
        setId("");

        setAvatar("");

        setRole("");
        setUsername("");

        navigate("/");
    };

    const handleModifierProfil = async (
        id,
        email,
        username
    ) => {

        try {

            const token =
                localStorage.getItem("token");
            const reponse =
                await modifierProfil(
                    id,
                    token,
                    email,
                    username
                );
            setUsername(reponse.username)
            setEmail(reponse.email)
            setAvatar(reponse.avatar)
            localStorage.setItem(
                "username",
                reponse.username
            )
            localStorage.setItem(
                "email",
                reponse.email
            )
            localStorage.setItem(
                "avatar",
                reponse.avatar
            )
        } catch (error) {

            console.log(error);
        }
    };

    return (

        <AuthContext.Provider
            value={{
                //id
                id,
                setId,
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

                avatar,
                setAvatar,

                // ACTIONS
                handleSubmit,
                handleRegister,
                handleLogout,
                handleModifierProfil,
            }}
        >

            {children}

        </AuthContext.Provider>
    )
}