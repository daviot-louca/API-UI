import { useEffect, useContext, useState } from "react";
import { Users2, Shield, User } from "lucide-react";
import UserList from "./UserList";

import { AdminContext } from "../../../context/admin/AdminContext";
import { AuthContext } from "../../../context/auth/AuthContext";
import DashboardLayout from "../layout/DashboardLayout";
import ProfilModal from "../../shared/modals/ProfilModal";
import Profile from "../../shared/Profile";
function AdminDashboard() {
  const { voirToutUser, deleteAll, users, rechercheUserContext } =
    useContext(AdminContext);
  const { handleLogout, username, role, avatar,setUsername,email,setEmail } = useContext(AuthContext);
  const [recherche, setRecherche] = useState("");
  useEffect(() => {
    if (recherche === "") {
      voirToutUser();
    } else {
      rechercheUserContext(recherche);
    }
  }, [recherche, rechercheUserContext, voirToutUser]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-8 w-full bg-[#F5F7FB]" >
        {/* STATS */}
        <div className="grid grid-cols-3 gap-6">
          {/* CARD 1 */}
          <div className="bg-white flex justify-between p-3 gap-6 rounded-2xl shadow-sm">
            <div>
              <p className="text-gray-500 mt-1">Utilisateurs</p>
              <h2 className="text-4xl font-bold text-gray-800">
                {users?.length}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#307030] text-white flex items-center justify-center text-3xl">
              <Users2 />
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white flex justify-between p-3 gap-6 rounded-2xl shadow-sm">
            <div>
              <p className="text-gray-500 mt-1">Administrateurs</p>
              <h2 className="text-4xl font-bold text-gray-800">
                {users?.filter((user) => user.role === "administrateur").length}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#703030] text-white flex items-center justify-center text-3xl">
              <Shield />
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white flex justify-between p-3 gap-6 rounded-2xl shadow-sm">
            <div>
              <p className="text-gray-500 mt-1">Utilisateurs simples</p>
              <h2 className="text-4xl font-bold text-gray-800">
                {users?.filter((user) => user.role === "utilisateur").length}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#303070] text-white flex items-center justify-center text-3xl">
              <User />
            </div>
          </div>
        </div>

        {/* USER LIST */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Liste des utilisateurs
              </h2>

              <p className="text-gray-500 mt-1">
                Gestion et suppression des comptes
              </p>
            </div>
            <div className="mr-10">
              <button
                onClick={deleteAll}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl font-medium shadow-sm transition mr-2"
              >
                Réinitialiser les utilisateurs
              </button>
              <input
                type="search"
                name="search"
                id="sear"
                placeholder="Rechercher l'utilisateur..."
                className="bg-slate-100 border-2 border-[#909090] w-80 rounded-xl p-2 focus:border-[#303030] text-[#303030]"
                onChange={(e) => setRecherche(e.target.value)}
              />
            </div>
          </div>
          <UserList />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
