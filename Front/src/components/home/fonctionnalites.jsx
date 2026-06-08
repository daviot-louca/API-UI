import {
  MonitorSmartphone,
  Users,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

export default function Fonctionnalites() {
  return (
    <section className="mt-32">
      <div className="text-center">
        <h2 className="text-[#2f5ea5] font-bold text-4xl tracking-wider">
          Fonctionnalités
        </h2>

        <h3 className="mt-4 text- font-medium">
          Tout ce qu'il vous faut pour un support efficace
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-8 mt-16">
        <div className="bg-white rounded-3xl p-8 shadow-sm hover:-translate-y-2 transition-all duration-300">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
            <MonitorSmartphone className="text-purple-600" />
          </div>

          <h4 className="font-bold text-xl mt-6">
            Gestion centralisée
          </h4>

          <p className="text-gray-500 mt-3 leading-7">
            Tous vos tickets regroupés en un seul endroit pour un suivi
            simplifié.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm hover:-translate-y-2 transition-all duration-300">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
            <Users className="text-green-600" />
          </div>

          <h4 className="font-bold text-xl mt-6">
            Collaboration d'équipe
          </h4>

          <p className="text-gray-500 mt-3 leading-7">
            Travaillez ensemble efficacement avec des outils collaboratifs
            intégrés.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm hover:-translate-y-2 transition-all duration-300">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
            <BarChart3 className="text-orange-500" />
          </div>

          <h4 className="font-bold text-xl mt-6">
            Analyses et rapports
          </h4>

          <p className="text-gray-500 mt-3 leading-7">
            Prenez des décisions éclairées grâce à des statistiques détaillées.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm hover:-translate-y-2 transition-all duration-300">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="text-blue-600" />
          </div>

          <h4 className="font-bold text-xl mt-6">
            Sécurité renforcée
          </h4>

          <p className="text-gray-500 mt-3 leading-7">
            Vos données sont protégées avec les meilleurs standards de
            sécurité.
          </p>
        </div>
      </div>
    </section>
  );
}