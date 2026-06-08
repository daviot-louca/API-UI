import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/auth/AuthContext";

export default function ProtectedRoute({
    children,
    allowedRole
}) {

    const { role } = useContext(AuthContext);

if (role !== allowedRole) {
    console.log("Navigate login");
    return <Navigate to="/home" />;
}

    return children;
}
