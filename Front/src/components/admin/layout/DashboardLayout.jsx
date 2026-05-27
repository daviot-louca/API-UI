import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100 overflow-x-hidden">
      <div className="w-64 shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 min-w-0 px-6">{children}</main>
    </div>
  );
}

export default DashboardLayout;
