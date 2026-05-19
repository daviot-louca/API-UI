import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {

    return (

        <div className="flex">

            <Sidebar />

            <main className="w-85/100">

                {children}

            </main>

        </div>
    );
}

export default DashboardLayout;