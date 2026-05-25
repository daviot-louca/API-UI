import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext";
import { login, register, modifierProfil } from "../../services/auth.service";

const AUTH_STORAGE_KEYS = [
    "token",
    "role",
    "username",
    "avatar",
    "email",
    "id"
];

const getStoredValue = (key) =>
    localStorage.getItem(key) || "";

const persistAuthSession = (reponse) => {
    localStorage.setItem("token", reponse.token ?? "");
    localStorage.setItem("email", reponse.email ?? "");
    localStorage.setItem("role", reponse.role ?? "");
    localStorage.setItem("id", reponse.id ?? "");
    localStorage.setItem("username", reponse.username ?? "");
    localStorage.setItem("avatar", reponse.avatar ?? "");
};

export function AuthProvider({ children }) {
    const navigate = useNavigate();

    const [role, setRole] = useState(() =>
        getStoredValue("role")
    );
    const [username, setUsername] = useState(() =>
        getStoredValue("username")
    );
    const [email, setEmail] = useState(() =>
        getStoredValue("email")
    );
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(() =>
        getStoredValue("avatar")
    );
    const [id, setId] = useState(() =>
        getStoredValue("id")
    );

    const applyAuthSession = useCallback((reponse) => {
        persistAuthSession(reponse);

        setAvatar(reponse.avatar ?? "");
        setRole(reponse.role ?? "");
        setEmail(reponse.email ?? "");
        setId(reponse.id ?? "");
        setUsername(reponse.username ?? "");
    }, []);

    // LOGIN
    const handleSubmit = useCallback(
        async (e) => {
            try {
                e.preventDefault();

                const reponse = await login(
                    email,
                    password
                );

                applyAuthSession(reponse);

                if (reponse.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/user/dashboard");
                }

                setPassword("");
            } catch (error) {
                console.log(error);
            }
        },
        [applyAuthSession, email, navigate, password]
    );

    // REGISTER
    const handleRegister = useCallback(
        async (e) => {
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

                applyAuthSession(reponse);

                if (reponse.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }

                setPassword("");
            } catch (error) {
                console.log(error);
            }
        },
        [
            applyAuthSession,
            email,
            navigate,
            password,
            username
        ]
    );

    // LOGOUT
    const handleLogout = useCallback(() => {
        AUTH_STORAGE_KEYS.forEach((key) => {
            localStorage.removeItem(key);
        });

        setEmail("");
        setId("");
        setAvatar("");
        setRole("");
        setUsername("");

        navigate("/");
    }, [navigate]);

    const handleModifierProfil = useCallback(
        async (id, email, username) => {
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

                setUsername(reponse.username ?? "");
                setEmail(reponse.email ?? "");
                setAvatar(reponse.avatar ?? "");

                localStorage.setItem(
                    "username",
                    reponse.username ?? ""
                );
                localStorage.setItem(
                    "email",
                    reponse.email ?? ""
                );
                localStorage.setItem(
                    "avatar",
                    reponse.avatar ?? ""
                );
            } catch (error) {
                console.log(error);
            }
        },
        []
    );

    const value = useMemo(
        () => ({
            id,
            setId,
            role,
            setRole,
            username,
            setUsername,
            email,
            setEmail,
            password,
            setPassword,
            avatar,
            setAvatar,
            handleSubmit,
            handleRegister,
            handleLogout,
            handleModifierProfil
        }),
        [
            avatar,
            email,
            handleLogout,
            handleModifierProfil,
            handleRegister,
            handleSubmit,
            id,
            password,
            role,
            username
        ]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
