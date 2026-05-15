import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Sidebar() {
    const { handleLogout } = useContext(AuthContext);
    return (

        <aside className="w-15/100 min-h-screen bg-indigo-950 text-white p-4">

            <h2 className="text-2xl font-bold mb-8">
                Tickets Admin
            </h2>

            <nav>

                <ul className="flex flex-col gap-4">

                    <li>
                        <Link to="/admin">
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link to="/users">
                            Gérer les utilisateurs
                        </Link>
                    </li>

                    <li>
                        <button onClick={handleLogout}>
                            Se déconnecter
                        </button>
                    </li>

                </ul>

            </nav>

        </aside>
    );
}

export default Sidebar;