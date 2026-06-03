import { useContext } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
export default function NouveauMotDePasse({ setIsPassword }) {
  const {
    handleModifierMotDePasse,
    setConfirmNewPassword,
    setNewPassword,
    setOldPassword,
    oldPassword,
    newPassword,
    confirmNewPassword,
  } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleModifierMotDePasse(oldPassword, newPassword, confirmNewPassword);
  };
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm px-4 py-6"
      onClick={() => setIsPassword(false)}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          className="w-full max-w-xl rounded-[1.75rem] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.25)]"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="font-bold flex justify-center text-2xl mb-5">
            Changer le mot de passe
          </h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="oldPassword"
                className="mb-2 block font-semibold text-[#303030]"
              >
                Ancien mot de passe
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full rounded-xl border border-[#A0A0A0] px-4 py-3 outline-none focus:border[#303030] focus:ring-4 focus:ring-gray-100"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor=""
                className="mb-2 block font-semibold text-[#303030]"
              >
                Nouveau mot de passe
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border border-[#A0A0A0] px-4 py-3 outline-none focus:border[#303030] focus:ring-4 focus:ring-gray-100"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor=""
                className="mb-2 block font-semibold text-[#303030]"
              >
                Confirmer votre nouveau mot de passe
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full rounded-xl border border-[#A0A0A0] px-4 py-3 outline-none focus:border[#303030] focus:ring-4 focus:ring-gray-100"
              />
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => setIsPassword(false)} className="rounded-wl border border-[#A0A0A0] px-6 py-3 font-semibold hover:bg-slate-50 rounded-xl">
                Annuler
              </button>
              <button type="submit" className="bg-[#303030] px-6 py-3 rounded-xl text-gray-50 hover:bg-[#505050]">Valider</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
