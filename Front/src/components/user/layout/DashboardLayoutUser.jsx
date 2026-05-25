import SidebarUser from "./SidebarUser";
import Navbar from "./Navbar";

function DashboardLayoutUser({
  children,
  username,
  handleLogout,
  role,
  avatar,
  email,
  setUsername,
  setEmail,
  setIsProfileModalOpen,
}) {

  return (

    <div className="flex min-h-screen bg-slate-100 overflow-x-hidden">

      {/* SIDEBAR */}
      <div className="w-64 shrink-0">
        <SidebarUser />
      </div>

      {/* CONTENT */}
      <main className="flex-1 min-w-0 px-6 pt-6">

        <Navbar
          username={username}
          handleLogout={handleLogout}
          role={role}
          avatar={avatar}
          email={email}
          setUsername={setUsername}
          setEmail={setEmail}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />

        <div className="mt-6 min-w-0">
          {children}
        </div>

      </main>

    </div>

  );
}

export default DashboardLayoutUser;
