import { Link } from "react-router-dom";
import LoginForm from "../../components/shared/LoginForm";

export default function LoginPage() {
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

        <Link
          to="/home"
          className="text-3xl font-bold text-[#303030]"
        >
          NovaDesk
        </Link>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="flex h-150 w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Partie gauche */}
          <div className="flex w-1/2 flex-col bg-[#303030] p-12">
            <h2 className="text-3xl font-bold text-white">
              Commencez maintenant
            </h2>

            <p className="mt-8 leading-8 text-gray-300">
              Rejoignez NovaDesk et centralisez toutes les demandes de vos
              collaborateurs sur une seule plateforme.
            </p>

            <div className="mt-10 rounded-2xl bg-white/10 p-6">
              <p className="font-semibold text-white">
                Un suivi clair et efficace
              </p>

              <p className="mt-3 text-gray-300">
                Gérez vos tickets, échangez avec vos équipes et améliorez la
                réactivité de votre entreprise grâce à un suivi structuré.
              </p>
            </div>

            <div className="mt-auto text-center">
              <p className="mb-5 text-white">
                Pas encore de compte ?
              </p>

              <Link
                to="/register"
                className="inline-block rounded-xl bg-white px-6 py-3 font-medium text-[#303030] transition-all duration-300 hover:-translate-y-1"
              >
                S'inscrire
              </Link>
            </div>
          </div>

          {/* Partie droite */}
          <div className="flex w-1/2 flex-col items-center">
            <h1 className="mt-10 text-3xl font-bold text-[#303030]">
              Accédez à votre compte
            </h1>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}