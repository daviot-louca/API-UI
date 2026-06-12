import Profile from "../../shared/Profile";
import ProfilModal from "../../shared/modals/ProfilModal";
import NouveauMotDePasse from "../../shared/modals/NouveauMotDePasse";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
export default function Navbar({}) {
  const { handleLogout, username, role, avatar, email, setEmail, setUsername } =
    useContext(AuthContext);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const description =
    location.pathname === "/user/dashboard"
      ? "Voici un aperçu de vos tickets en cours et de leur statut."
      : location.pathname === "/user/tickets"
        ? "Consultez et gérez tous vos tickets."
        : location.pathname === "/user/faq"
          ? "Trouvez rapidement des réponses à vos questions"
          : location.pathname.startsWith("/user/message")
            ? "Consultez vos échanges liés aux tickets."
            : location.pathname.startsWith("/user/connaissances")
              ? "Base de connaissance"
                : "";
  const titre =
    location.pathname === "/user/dashboard"
      ? `Bonjour, ${username.slice(0, 1).toUpperCase()}${username.slice(1)}`
      : location.pathname === "/user/tickets"
        ? "Mes tickets"
        : location.pathname === "/user/faq"
          ? "Aide & FAQ"
          : location.pathname === "/user/message"
            ? "Messagerie"
            : location.pathname.startsWith("/user/message/")
              ? "Conversation"
              : location.pathname.startsWith("/user/connaissances")
                ? "Base de connaissance"
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
      {isPassword && <NouveauMotDePasse setIsPassword={setIsPassword} />}
    </div>
  );
}
