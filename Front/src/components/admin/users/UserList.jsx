import { useContext } from "react";

import { AdminContext } from "../../../context/admin/AdminContext";

function UserList() {
  const { users, supprimerUser, modifierRole } = useContext(AdminContext);
  return (
    <div className="flex flex-col gap-4">
      {/* HEADER */}
      <div className="grid grid-cols-[150px_300px_300px_300px_300px] items-center rounded-2xl px-6 py-4 font-semibold">
        <div>Nom</div>

        <div>Email</div>

        <div>Rôle</div>

        <div>Dernière connexion</div>
        <div>Actions</div>
      </div>

      {/* USERS */}
      {users?.map((user) => (
        <div
          key={user.id}
          className="grid grid-cols-[150px_300px_300px_300px_300px] items-center px-6 py-5"
        >
          {/* USERNAME */}
          <div className="flex items-center gap-3">
            {/* AVATAR */}
            <div className="w-11 h-11 rounded-full bg-[#303030] text-slate-100 flex items-center justify-center font-bold">
              {user.username.slice(0, 2)}
            </div>

            <div>
              <p className="font-medium text-[#303030]">{user.username}</p>
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <p className="text-lg">{user.email}</p>
          </div>

          {/* ROLE */}
          <div>
            <span
              className={`
                                    font-semibold text-lg
                                `}
            >
              {user.role}
            </span>
          </div>
          <div>
            <span className="font-semibold">
              {new Date(user.lastLoginAt).toLocaleDateString("fr-FR")} à{" "}
              {new Date(user.lastLoginAt).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">
            <button
              onClick={() => modifierRole(user.id, user.role)}
              className="bg-[#303030] font-semibold p-2 rounded-xl text-white"
            >
              {user.role === "administrateur"
                ? "Passer utilisateur"
                : "Passer administrateur"}
            </button>
            {user.role === "utilisateur" && (
              <div>
                <button
                  onClick={() => supprimerUser(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium transition"
                >
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
