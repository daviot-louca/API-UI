import { useContext } from "react";
import {
  ChevronRight,
  Lock,
  Mail,
  User,
  X
} from "lucide-react";

import { AuthContext } from "../../../context/auth/AuthContext";

export default function ProfilModal({
  username,
  email,
  setIsProfileModalOpen,
  setUsername,
  setEmail,
}) {
  const { handleModifierProfil, id} = useContext(AuthContext);
  const initials = (username).slice(0, 2).toUpperCase();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleModifierProfil(id, email ?? "", username ?? "");
    setIsProfileModalOpen(false);
  };

  return (
    <div
      onClick={() => setIsProfileModalOpen(false)}
      className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm px-4 py-6"
    >
      <div className="flex min-h-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl rounded-[1.75rem] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.25)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Modifier le profil
              </h2>
              <p className="mt-1 text-slate-500">
                Mettez à jour vos informations personnelles
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              aria-label="Fermer le modal profil"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mt-7">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#303030] text-3xl font-bold text-white shadow-lg">
                  {initials}
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="profile-username"
                  className="mb-2 block font-semibold text-slate-950"
                >
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={20}
                  />
                  <input
                    id="profile-username"
                    type="text"
                    value={username ?? ""}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 font-semibold text-slate-950 outline-none transition focus:border-[#303030] focus:ring-4 focus:ring-gray-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-2 block font-semibold text-slate-950"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={20}
                  />
                  <input
                    id="profile-email"
                    type="email"
                    value={email ?? ""}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 font-semibold text-slate-950 outline-none transition focus:border-[#303030] focus:ring-4 focus:ring-gray-100"
                  />
                </div>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-4 text-left transition hover:border-gray-200 hover:bg-gray-100"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#303030] shadow-sm">
                    <Lock size={22} />
                  </span>
                  <span>
                    <span className="block font-bold text-indigo-950">
                      Changer le mot de passe
                    </span>
                    <span className="mt-1 block text-sm text-slate-500">
                      Assurez la sécurité de votre compte
                    </span>
                  </span>
                </span>
                <ChevronRight className="text-[#303030]" size={22} />
              </button>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#303030] px-6 py-3 font-semibold text-white shadow-lg shadow-gray-200 transition hover:bg-[#505050]"
              >
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
