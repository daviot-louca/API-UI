import { Search } from "lucide-react";

import Profile from "../../shared/Profile";

export default function DashboardNavbar({
  username,
  handleLogout,
  role,
  avatar,
  email,
  setUsername,
  setEmail,
  setIsProfileModalOpen,
}) {
  const description =
  location.pathname === "/user/dashboard"
    ? "Voici un aperçu de vos tickets en cours et de leur statut."

    : location.pathname === "/user/tickets"
    ? "Consultez et gérez tous vos tickets."

    : location.pathname === "/user/faq"
    ? "Trouvez rapidement des réponses à vos questions"

    : location.pathname === "/user/message"
    ? "Consultez vos échanges liés aux tickets."

    : "";
  const titre =
  location.pathname === "/user/dashboard"
    ? `Bonjour, ${username}`

    : location.pathname === "/user/tickets"
    ? "Mes tickets"

    : location.pathname === "/user/faq"
    ? "Aide & FAQ"

    : location.pathname === "/user/message"
    ? "Messagerie"

    : "";
  return (

    <div className="flex flex-wrap items-start justify-between gap-5 pt-2">

      {/* LEFT */}
      <div>

        <h1 className="text-3xl font-bold text-[#303030]">
          {titre}
        </h1>

        <p className="text-[#303030] mt-2 text-base">
          {description}
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="relative">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 "
            size={18}
          />

          <input
            type="text"
            placeholder="Rechercher un ticket..."
            className="
              bg-white
              border
              border-gray-200
              rounded-xl
              pl-10
              pr-4
              py-2.5
              w-64
              outline-none
              focus:ring-2
              focus:ring-[#303030]
              shadow-sm
            "
          />

        </div>

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

    </div>

  );
}
