import AdminListeMessages from "./AdminListeMessages";

export default function AdminMessagerieVide() {
  return (
    <AdminListeMessages>
      <div className="h-[calc(100vh-100px)] bg-white rounded-2xl shadow-sm flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Sélectionnez un ticket
          </h2>

          <p className="text-slate-500 mt-2">
            Choisissez un ticket dans la liste de gauche pour consulter vos échanges.
          </p>
        </div>
      </div>
    </AdminListeMessages>
  );
}