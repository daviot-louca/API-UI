import { Link } from "react-router-dom";
import RegisterForm from "../../components/shared/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-10 py-6">
        <Link
          to="/home"
          className="font-medium text-gray-500 transition-colors hover:text-[#2f5ea5]"
        >
          ← Retour à l'accueil
        </Link>
        <Link to="/home" className="text-3xl font-bold text-[#303030]">
          NovaDesk
        </Link>
      </div>

      {/* Card */}
      <div className="flex-1 flex justify-center items-center px-4">
        <div className="flex h-150 w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Partie gauche */}
          <div className="flex w-1/2 flex-col bg-[#303030] p-12">
            <h2 className="text-3xl font-bold text-white">
              Bienvenue sur NovaDesk
            </h2>

            <p className="mt-8 leading-8 text-gray-300">
              Centralisez les demandes de vos collaborateurs, échangez
              facilement avec les équipes concernées et assurez un suivi clair
              de chaque ticket.
            </p>

            <div className="mt-10 rounded-2xl bg-white/10 p-6">
              <p className="font-semibold text-white">
                Une plateforme simple et efficace
              </p>

              <p className="mt-3 text-gray-300">
                Gérez vos tickets, échangez avec vos équipes et gardez une vue
                d'ensemble sur toutes les demandes de votre entreprise.
              </p>
            </div>

            <div className="mt-auto text-center">
              <p className="mb-5 text-white">Déjà inscrit ?</p>

              <Link
                to="/login"
                className="inline-block rounded-xl bg-white px-6 py-3 font-medium text-[#303030] transition-all duration-300 hover:-translate-y-1"
              >
                Se connecter
              </Link>
            </div>
          </div>

          {/* Partie droite */}
          <div className="flex w-1/2 flex-col items-center">
            <h1 className="mt-10 text-3xl font-bold text-[#303030]">
              Commencez maintenant
            </h1>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
