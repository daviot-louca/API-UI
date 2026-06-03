import Profile from "../../shared/Profile";
import ProfilModal from "../../shared/modals/ProfilModal";
import NouveauMotDePasse from "../../shared/modals/NouveauMotDePasse";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
export default function AdminNavbar({}) {
  const { handleLogout, username, role, avatar, email, setEmail, setUsername } =
    useContext(AuthContext);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const titre =
    location.pathname === "/admin/dashboard"
      ? `Bonjour, ${username.slice(0, 1).toUpperCase()}${username.slice(1)}`
      : location.pathname === "/admin/ticket"
        ? "Gestion de tickets"
        : location.pathname === "/admin/users"
          ? "Gestion des utilisateurs"
          : location.pathname === "/admin/categories"
            ? "Gestion des catégories"
            : location.pathname === "/admin/messagerie"
              ? "Messagerie"
              : location.pathname.startsWith("/admin/messagerie/")
                ? "Conversation"
                : "";
  const description =
    location.pathname === "/admin/dashboard"
      ? "Visualisez les indicateurs clés, les tickets en cours et l'activité récente."
      : location.pathname === "/admin/ticket"
        ? "Gérez l'ensemble des tickets et suivez leur progression."
      : location.pathname === "/admin/users"
        ? "Consultez, modifiez et gérez les comptes utilisateurs de la plateforme."
        : location.pathname === "/admin/categories"
          ? "Créez, modifiez et organisez les catégories de tickets."
          : location.pathname === "/admin/messagerie"
            ? "Consultez et gérez les échanges entre les utilisateurs et le support."
            : location.pathname.startsWith("/admin/messagerie/")
              ? "Suivez une conversation liée à un ticket."
              : "";
  return (
    <div className="flex flex-wrap items-start justify-between gap-5 pt-2">
      {/* LEFT */}
      <div>
        <h1 className="text-3xl font-bold text-[#303030]">{titre}</h1>

        <p className="text-[#303030] mt-2 text-base">{description}</p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* PROFILE */}
        <Profile
          username={username}
          handleLogout={handleLogout}
          role={role}
          avatar={avatar}
          email={email}
          setUsername={setUsername}
          setEmail={setEmail}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />
      </div>
      {isProfileModalOpen && (
        <ProfilModal
          avatar={avatar}
          username={username}
          email={email}
          setUsername={setUsername}
          setEmail={setEmail}
          setIsProfileModalOpen={setIsProfileModalOpen}
          setIsPassword={setIsPassword}
        />
      )}
      {isPassword&&(
        <NouveauMotDePasse
        setIsPassword={setIsPassword}
        />
      )}
    </div>
  );
}
