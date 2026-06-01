import {useContext, useState } from "react";
import DashboardLayoutUser from "../layout/DashboardLayoutUser";
import { AuthContext } from "../../../context/auth/AuthContext";
export default function ListeMessageComponents({children}) {
  const { handleLogout, username, role, avatar, email, setUsername, setEmail } =
    useContext(AuthContext);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  return (
    <div>
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
        <div className="flex">
          <div className="w-20/100">sidebar</div>
          <div className="w-80/100">{children}</div>
        </div>
      </DashboardLayoutUser>
    </div>
  );
}
