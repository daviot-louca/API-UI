import {
  HelpCircle,
  KeyRound,
  Laptop,
  Mail,
  Phone
} from "lucide-react";

export const TICKET_TYPE_OPTIONS = [
  {
    value: "Poste de travail",
    label: "Poste de travail",
    Icon: Laptop,
    className: "bg-sky-100 text-sky-700"
  },
  {
    value: "Téléphonie",
    label: "Téléphonie",
    Icon: Phone,
    className: "bg-emerald-100 text-emerald-700"
  },
  {
    value: "Compte d'accès",
    label: "Compte d'accès",
    Icon: KeyRound,
    className: "bg-violet-100 text-violet-700"
  },
  {
    value: "Messagerie",
    label: "Messagerie",
    Icon: Mail,
    className: "bg-amber-100 text-amber-700"
  },
  {
    value: "Autres",
    label: "Autres",
    Icon: HelpCircle,
    className: "bg-slate-100 text-slate-700"
  }
];

const DEFAULT_TYPE = TICKET_TYPE_OPTIONS.at(-1);

export const getTicketTypeOption = (type) =>
  TICKET_TYPE_OPTIONS.find(
    (option) =>
      option.value.toLocaleLowerCase("fr-FR") ===
      type?.toLocaleLowerCase("fr-FR")
  ) ?? DEFAULT_TYPE;
