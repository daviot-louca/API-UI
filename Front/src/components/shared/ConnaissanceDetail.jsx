import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ConnaissancesContext } from "../../context/baseConnaisssance/ConnaissancesContext";
import { AuthContext } from "../../context/auth/AuthContext";
function ConnaissanceDetail() {
  const { connaissance, voirUneConnaissance, supprimerConnaissances } =
    useContext(ConnaissancesContext);
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const { connaissanceId } = useParams();

  useEffect(() => {
    voirUneConnaissance(connaissanceId);
  }, [connaissanceId]);
  const basePath =
    role === "administrateur" ? "/admin/connaissances" : "/user/connaissances";

  return (
    <div className=" flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(basePath)}
            className="text-sm font-medium text-gray-500 hover:text-[#333370] transition"
          >
            ← Retour à la base de connaissances
          </button>

          <h1 className="text-4xl font-bold text-[#303030] mt-2">
            {connaissance?.title}
          </h1>
        </div>
        {role === "administrateur" && (
          <div className="flex gap-3">
            <button
              className="px-5 py-3 rounded-2xl bg-[#303030] text-white font-medium hover:scale-105 transition"
              onClick={() =>
                navigate(`/admin/connaissances/edit/${connaissance?.id}`)
              }
            >
              Modifier
            </button>

            <button
              className="px-5 py-3 rounded-2xl bg-red-500 text-white font-medium hover:scale-105 transition"
              onClick={async () => (supprimerConnaissances(connaissanceId),navigate("/admin/connaissances"))}
            >
              Supprimer
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl shadow-xl p-5">
          <p className="text-sm text-gray-500 mb-2">Catégorie</p>
          <p className="font-bold text-lg">{connaissance?.category?.name}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-5">
          <p className="text-sm text-gray-500 mb-2">Ticket source</p>
          <p className="font-bold text-lg">#{connaissance?.ticketId}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-5">
          <p className="text-sm text-gray-500 mb-2">Créé le</p>
          <p className="font-bold">
            {new Date(connaissance?.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-5">
          <p className="text-sm text-gray-500 mb-2">Dernière modification</p>
          <p className="font-bold">
            {new Date(connaissance?.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Solution détaillée</h2>

            <p className="text-gray-500">
              Documentation issue d'un ticket résolu
            </p>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-lg leading-8 text-[#303030] whitespace-pre-wrap">
            {connaissance?.content}
          </p>
        </div>
      </div>
      {connaissance?.ticket?.id && (
        <div className="bg-[#303030] rounded-3xl p-6 text-white">
          <h3 className="font-bold text-xl mb-2">Ticket d'origine</h3>

          <p className="opacity-90 mb-4">
            Cet article a été créé à partir du ticket #
            {connaissance?.ticket?.id}
          </p>

          <button
            className="bg-white text-[#333370] px-5 py-3 rounded-2xl font-semibold hover:scale-105 transition"
            onClick={() =>
              navigate(`/admin/messagerie/${connaissance?.ticket?.id}`)
            }
          >
            Voir le ticket
          </button>
        </div>
      )}
    </div>
  );
}
export default ConnaissanceDetail;
