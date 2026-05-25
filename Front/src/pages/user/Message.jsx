import { useContext, useState } from "react";

import DashboardLayoutUser from "../../components/user/layout/DashboardLayoutUser";
import ProfilModal from "../../components/shared/modals/ProfilModal";
import { AuthContext } from "../../context/auth/AuthContext";

export default function Message() {
  const {
    handleLogout,
    username,
    role,
    avatar,
    email,
    setUsername,
    setEmail
  } = useContext(AuthContext);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <DashboardLayoutUser
      username={username}
      handleLogout={handleLogout}
      role={role}
      avatar={avatar}
      email={email}
      setUsername={setUsername}
      setEmail={setEmail}
      setIsProfileModalOpen={setIsProfileModalOpen}
    >
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-[#303030]">
          Messagerie
        </h2>
        <p className="text-slate-500 mt-2">
          Aucun message pour le moment.
        </p>
      </div>

      {isProfileModalOpen && (
        <ProfilModal
          avatar={avatar}
          username={username}
          email={email}
          setUsername={setUsername}
          setEmail={setEmail}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />
      )}
    </DashboardLayoutUser>
  );
}
