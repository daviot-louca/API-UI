import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
    children,
    allowedRole
}) {

    const { role } = useContext(AuthContext);

    if (role !== allowedRole) {

        return <Navigate to="/login" />;
    }

    return children;
}