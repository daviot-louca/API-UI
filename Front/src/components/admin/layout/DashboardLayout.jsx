import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import { useContext,useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
function DashboardLayout({ children, handleLogout }) {
  const { username, role, avatar, email, setEmail, setUsername } =
    useContext(AuthContext);
  return (
    <div className="flex min-h-screen bg-slate-100 overflow-x-hidden">
      {/* SIDEBAR */}
      <div className="w-64 shrink-0">
        <Sidebar />
      </div>

      {/* CONTENT */}
      <main className="flex-1 min-w-0 px-6 pt-6">
        <AdminNavbar/>

        <div className="mt-6 min-w-0">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
