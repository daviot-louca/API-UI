import { Lightbulb } from "lucide-react";
export default function Apropos() {
  return (
    <div>
      {/**partie 1 */}
      <div className="grid grid-cols-2 mt-32 gap-10 items-center">
        <div>
          <div className="flex">
            <p className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
              A propos de NOVADESK
            </p>
          </div>
          <div>
            <h2 className="mt-6 text-5xl font-bold leading-tight">
              Un problème signalé ne <br /> devrait
              <span className="text-[#2f5ea5]"> jamais être oublié</span>
            </h2>
          </div>
          <div className="mt-8 text-xl text-gray-600 leading-8 max-w-3xl text-justify">
            <p>
              Dans de nombreuses entreprises, les collaborateurs rencontrent
              quotidiennement des problèmes qui ralentissent leur travail.{" "}
              <br /> Un ordinateur qui ne fonctionne plus, une demande RH en
              attente, un accès bloqué, un matériel défectueux ou simplement une
              question nécessitant une intervention rapide. <br /> Bien souvent,
              ces demandes sont envoyées par e-mail, sur des messageries
              instantanées ou transmises oralement. <br />
              <span className="font-bold">Résultat :</span> les informations se
              perdent, les délais s'allongent et le suivi devient compliqué.
            </p>
            <div className="flex items-center bg-blue-100 px-4 py-2 rounded-full gap-4 text-blue-700 font-medium my-10 max-w-2xl">
              <div>
                <Lightbulb />
              </div>
              <div className="max-w-xl">
                <p >
                  C'est pour répondre à cette problématique que NovaDesk a été
                  imaginé.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            src={`${import.meta.env.BASE_URL}DashboardMessagerie.png`}
            alt=""
            className="rounded-3xl shadow-2xl scale-100 hover:scale-102 hover:-translate-y-2 transition-all duration-300"
          />
        </div>
      </div>
      {/**partie 2 */}
      <div className="grid grid-cols-2 gap-10 mt-32 mr-5 items-center">
        <div>
          <img
            src={`${import.meta.env.BASE_URL}dashboardTicket.png`}
            alt=""
            className="rounded-3xl shadow-2xl scale-100 hover:scale-102 hover:-translate-y-2 transition-all duration-300"
          />
        </div>
        <div className="mt-8 ml-40 text-xl text-gray-600 leading-8 text-justify">
          <p>
            Grâce à NovaDesk, toutes les demandes sont centralisées dans un
            espace unique et facilement accessible. <br />
            Chaque ticket peut être créé, suivi et mis à jour en temps réel afin
            de garantir un traitement clair et efficace. <br />
            La messagerie intégrée permet aux collaborateurs et aux équipes
            concernées d'échanger directement sans perdre d'informations
            importantes. <br />
            <span className="font-bold">Résultat :</span> les délais de
            traitement sont réduits, la communication est simplifiée et chaque
            demande bénéficie d'un suivi complet jusqu'à sa résolution.
          </p>
        </div>
      </div>
    </div>
  );
}
