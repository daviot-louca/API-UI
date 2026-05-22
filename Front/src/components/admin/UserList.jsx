import { useContext } from "react";

import { AdminContext } from "../../context/AdminContext";

function UserList() {

    const {
        users,
        supprimerUser,
        modifierRole
    } = useContext(AdminContext);

    return (

        <div className="flex flex-col gap-4">

            {/* HEADER */}
            <div className="grid grid-cols-5 text-white rounded-2xl px-6 py-4 font-semibold shadow-sm">

                <div>
                    ID
                </div>

                <div>
                    Utilisateur
                </div>

                <div>
                    Email
                </div>

                <div>
                    Role
                </div>

                <div>
                    Actions
                </div>

            </div>

            {/* USERS */}
            {
                users?.map((user) => (

                    <div
                        key={user.id}
                        className="grid grid-cols-5 items-center bg-white rounded-2xl shadow-sm px-6 py-5 hover:shadow-md transition"
                    >

                        {/* ID */}
                        <div>

                            <p className="font-semibold text-gray-800">
                                {user.id}
                            </p>

                        </div>

                        {/* USERNAME */}
                        <div className="flex items-center gap-3">

                            {/* AVATAR */}
                            <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">

                                {user.username.slice(0, 2)}

                            </div>

                            <div>

                                <p className="font-medium text-gray-800">

                                    {user.username}

                                </p>

                            </div>

                        </div>

                        {/* EMAIL */}
                        <div>

                            <p className="text-gray-500">

                                {user.email}

                            </p>

                        </div>

                        {/* ROLE */}
                        <div>

                            <span
                                className={`
                                    px-4 py-2 rounded-xl text-sm font-medium

                                    ${user.role === "admin"
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "bg-gray-100 text-gray-700"
                                    }
                                `}
                            >

                                {user.role}

                            </span>

                        </div>

                        {/* ACTIONS */}
                        <div>

                        <button onClick={() => modifierRole(user.id,user.role)}>
                                        {
                                            user.role === "admin"

                                                ? "Passer user"

                                                : "Passer admin"
                                        }
                                    </button>
                        {
                            user.role === "user" && (

                                <div>

                                    
                                    <button
                                        onClick={() =>
                                            supprimerUser(user.id)
                                        }
                                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium transition"
                                    >
                                        Supprimer
                                    </button>

                                </div>
                            )
                        }
                        </div>

                    </div>
                ))
            }

        </div>
    );
}

export default UserList;