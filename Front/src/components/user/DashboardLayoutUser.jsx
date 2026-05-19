import SidebarUser from "./SidebarUser";

function DashboardLayoutUser({ children }) {

    return (

        <div className="flex">

            <SidebarUser />

            <main className="w-85/100">

                {children}

            </main>

        </div>
    );
}

export default DashboardLayoutUser;