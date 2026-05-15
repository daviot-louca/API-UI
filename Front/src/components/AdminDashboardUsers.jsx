import { useEffect, useContext } from "react";
import UserList from "./UserList";
import { AdminContext } from "../context/AdminContext";
import DashboardLayout from "./DashboardLayout";
function AdminDashboard() {

    const { voirToutUser,deleteAll } = useContext(AdminContext);

    useEffect(() => {
        voirToutUser();

    }, []);

    return (

        <DashboardLayout>
            <div className="flex flex-col gap-x-8 pl-6">
                <div className="flex justify-around">
                    <h1 className="mt-4 text-2xl text-indigo-950 font-bold mr-100">Dashboard Admin Users</h1>
                    <button onClick={deleteAll}>
                        Réinitialiser tout les utilisateurs
                    </button>
                </div>
                <UserList />
            </div>
        </DashboardLayout>
    );
}

export default AdminDashboard;