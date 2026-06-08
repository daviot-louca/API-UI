import { Zap, Lock, Gauge } from "lucide-react";
export default function Header() {
  return (
    <div className="grid grid-cols-2 items-center min-h-[80vh] gap-16">
      <div>
        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
          Gestion de tickets simplifiée
        </span>

        <h1 className="mt-6 text-7xl font-bold leading-tight">
          Gérez vos tickets
          <br />
          en toute <span className="text-[#2f5ea5]">simplicité</span>
        </h1>

        <p className="mt-8 text-xl text-gray-600 leading-8 max-w-xl">
          NovaDesk centralise vos demandes informatiques, facilite la
          communication avec vos équipes et vous offre une visibilité complète
          sur vos performances.
        </p>

        {/** Avantages */}
        <div className="flex gap-10 mt-12">
          <div className="flex items-center gap-3 bg-white py-2 px-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Zap className="w-6 h-6 text-yellow-500 mt-1" />
            <div>
              <h3 className="font-semibold">Rapide</h3>
              <p className="text-sm text-gray-500">
                Création en quelques secondes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white py-2 px-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Lock className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold">Sécurisé</h3>
              <p className="text-sm text-gray-500">
                Vos données sont protégées
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white py-2 px-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Gauge className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold">Performant</h3>
              <p className="text-sm text-gray-500">Suivi en temps réel</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src="../../../dashboardAdmin.png"
          alt="Dashboard NovaDesk"
          className="rounded-3xl shadow-2xl scale-100 hover:scale-102 hover:-translate-y-2 transition-all duration-300"
        />
      </div>
    </div>
  );
}
