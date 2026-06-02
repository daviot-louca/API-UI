import { useContext, useMemo, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Archive,
  ChevronDown,
  ChevronUp,
  Eye,
  Headset,
  Lightbulb,
  Mail,
  MessageSquare,
  Paperclip,
  Search,
  ShieldCheck,
  Ticket,
  UserRound
} from "lucide-react";

import DashboardLayoutUser from "../layout/DashboardLayoutUser";
import { AuthContext } from "../../../context/auth/AuthContext";
import ProfilModal from "../../shared/modals/ProfilModal";
import { TicketContext } from "../../../context/ticket/TicketContext";

const faqItems = [
  {
    question: "Comment créer un nouveau ticket ?",
    answer:
      "Pour créer un nouveau ticket, cliquez sur le bouton Ajouter un Ticket dans votre espace, remplissez le formulaire avec les détails de votre demande, puis validez. Vous recevrez un accusé de réception par email.",
    Icon: Ticket,
    iconClassName: "bg-violet-100 text-[#303030]"
  },
  {
    question: "Comment suivre l'avancement de mon ticket ?",
    answer:
      "Depuis la page Mes tickets, consultez le statut de chaque demande. Les tickets les plus récemment modifiés apparaissent en premier.",
    Icon: Eye,
    iconClassName: "bg-emerald-100 text-emerald-700"
  },
  {
    question: "Comment répondre à un message du support ?",
    answer:
      "Rendez-vous dans la messagerie, ouvrez la conversation liée au ticket, puis envoyez votre réponse avec les informations demandées.",
    Icon: MessageSquare,
    iconClassName: "bg-blue-100 text-blue-700"
  },
  {
    question: "Puis-je joindre des fichiers à mon ticket ?",
    answer:
      "Oui, vous pouvez ajouter des captures d'écran ou documents utiles lorsque le formulaire de ticket le propose. Cela aide le support à traiter la demande plus vite.",
    Icon: Paperclip,
    iconClassName: "bg-amber-100 text-amber-700"
  },
  {
    question: "Que faire si je ne reçois pas de réponse ?",
    answer:
      "Vérifiez d'abord votre messagerie et vos emails. Si le ticket n'a pas évolué, contactez le support avec le numéro du ticket.",
    Icon: Mail,
    iconClassName: "bg-red-100 text-red-700"
  },
  {
    question: "Comment modifier mes informations personnelles ?",
    answer:
      "Cliquez sur votre profil en haut à droite, ouvrez les paramètres du profil, puis modifiez votre nom d'utilisateur ou votre email.",
    Icon: UserRound,
    iconClassName: "bg-indigo-100 text-indigo-700"
  }
];

const quickTips = [
  {
    title: "Soyez précis",
    description: "Décrivez votre problème avec le plus de détails possible.",
    Icon: Archive,
    iconClassName: "bg-red-100 text-red-600"
  },
  {
    title: "Vérifiez d'abord",
    description: "Consultez les questions fréquentes, votre réponse s'y trouve peut-être déjà.",
    Icon: ShieldCheck,
    iconClassName: "bg-emerald-100 text-emerald-600"
  },
  {
    title: "Suivi facile",
    description: "Vous serez notifié par email à chaque mise à jour.",
    Icon: Ticket,
    iconClassName: "bg-teal-100 text-teal-600"
  }
];

export default function FaqComponents() {
  const {
    handleLogout,
    username,
    role,
    avatar,
    email,
    setUsername,
    setEmail
  } = useContext(AuthContext);
  const{voirStatsTicket} = useContext(TicketContext)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [search, setSearch] = useState("");

  const filteredFaqItems = useMemo(
    () =>
      faqItems.filter((item) =>
        item.question
          .toLocaleLowerCase("fr-FR")
          .includes(search.toLocaleLowerCase("fr-FR"))
      ),
    [search]
  );
  useEffect (()=>{
    voirStatsTicket();
  },[])
  return (
    <DashboardLayoutUser
      username={username}
      handleLogout={handleLogout}
      role={role}
      avatar={avatar}
      email={email}
      setUsername={setUsername}
      setEmail={setEmail}
      setIsProfileModalOpen={setIsProfileModalOpen}
    >
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_27rem] gap-6">
        <div className="flex flex-col gap-6 min-w-0">
          {/* Recherche */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full text-[#303030] flex items-center justify-center">
                <Search size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Une question ?
                </h2>
                <p className="text-slate-500 mt-1">
                  Recherchez dans les questions fréquentes
                </p>
              </div>
            </div>

            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="search"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
              />
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-xl font-bold text-slate-900 mb-5">
              Questions fréquentes
            </h2>

            <div className="rounded-xl border border-slate-100 overflow-hidden">
              {filteredFaqItems.map((item) => {
                const isOpen =
                  faqItems.indexOf(item) === activeQuestion;
                const Icon = item.Icon;

                return (
                  <button
                    key={item.question}
                    type="button"
                    onClick={() =>
                      setActiveQuestion(
                        isOpen
                          ? null
                          : faqItems.indexOf(item)
                      )
                    }
                    className={`${isOpen ? "bg-[#F0F0F0]" : "bg-white"} w-full text-left p-4 border-b border-slate-100 last:border-b-0 transition`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`${item.iconClassName} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}
                      >
                        <Icon size={20} />
                      </span>

                      <span className="flex-1 min-w-0">
                        <span className="flex items-center justify-between gap-4">
                          <span className="font-semibold text-slate-900">
                            {item.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp
                              className="text-[#303030] shrink-0"
                              size={18}
                            />
                          ) : (
                            <ChevronDown
                              className="text-slate-600 shrink-0"
                              size={18}
                            />
                          )}
                        </span>

                        {isOpen && (
                          <span className="block text-slate-600 leading-relaxed mt-3 max-w-3xl">
                            {item.answer}
                          </span>
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}

              {filteredFaqItems.length === 0 && (
                <div className="p-6 text-slate-500">
                  Aucune question ne correspond à votre recherche.
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-6 min-w-0">
          {/* Besoin d'aide */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#E0E0E0] text-[#303030] flex items-center justify-center">
                <Headset size={34} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Besoin d'aide supplémentaire ?
                </h2>
                <p className="text-slate-600 mt-1">
                  Notre équipe de support est là pour vous aider.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <Link
                to="/user/tickets"
                className="bg-[#303030] hover:bg-[#505050] text-white rounded-xl py-3 px-4 font-semibold flex items-center justify-center gap-3 transition"
              >
                <Ticket size={18} />
                Créer un ticket
              </Link>

              <Link
                to="/user/message"
                className="bg-white hover:bg-slate-50 text-slate-700 rounded-xl py-3 px-4 font-semibold flex items-center justify-center gap-3 border border-slate-200 transition"
              >
                <Mail size={18} />
                Contacter le support
              </Link>
            </div>
          </section>

          {/* Conseils rapides */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Lightbulb size={22} />
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Conseils rapides
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              {quickTips.map((tip) => {
                const Icon = tip.Icon;

                return (
                  <div
                    key={tip.title}
                    className="flex items-start gap-4"
                  >
                    <span
                      className={`${tip.iconClassName} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}
                    >
                      <Icon size={18} />
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {tip.title}
                      </h3>
                      <p className="text-slate-600 mt-1">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </aside>
      </div>


      {isProfileModalOpen && (
        <ProfilModal
          avatar={avatar}
          username={username}
          email={email}
          setUsername={setUsername}
          setEmail={setEmail}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />
      )}
    </DashboardLayoutUser>
  );
}
