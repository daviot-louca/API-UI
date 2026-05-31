import {
  Bell,
  Boxes,
  Bug,
  Cable,
  CircleHelp,
  Code2,
  Cpu,
  CreditCard,
  Database,
  FileText,
  Globe,
  HardDrive,
  Headphones,
  KeyRound,
  Landmark,
  Laptop,
  Lock,
  Mail,
  MessageCircle,
  Monitor,
  MonitorCog,
  Network,
  Package,
  Phone,
  Printer,
  Receipt,
  Router,
  Server,
  Settings,
  Shield,
  Smartphone,
  Tag,
  User,
  Users,
  Wifi,
  Wrench,
} from "lucide-react";

const DEFAULT_COLOR = "#64748b";
const DEFAULT_ICON = Tag;
const hexColorRegex = /^#[0-9a-f]{6}$/i;

const ICONS = {
  Bell,
  Boxes,
  Bug,
  Cable,
  CircleHelp,
  Code2,
  Cpu,
  CreditCard,
  Database,
  FileText,
  Globe,
  HardDrive,
  Headphones,
  KeyRound,
  Landmark,
  Laptop,
  Lock,
  Mail,
  MessageCircle,
  Monitor,
  MonitorCog,
  Network,
  Package,
  Phone,
  Printer,
  Receipt,
  Router,
  Server,
  Settings,
  Shield,
  Smartphone,
  Tag,
  User,
  Users,
  Wifi,
  Wrench,
};

const ICON_ALIASES = {
  aide: "CircleHelp",
  autre: "CircleHelp",
  autres: "CircleHelp",
  bug: "Bug",
  cable: "Cable",
  compte: "KeyRound",
  email: "Mail",
  facturation: "Receipt",
  fichier: "FileText",
  logiciel: "Code2",
  mail: "Mail",
  materiel: "Cpu",
  matériel: "Cpu",
  message: "Mail",
  ordinateur: "Laptop",
  paiement: "CreditCard",
  reseau: "Wifi",
  réseau: "Wifi",
  serveur: "Server",
  smartphone: "Smartphone",
  telephone: "Phone",
  téléphonie: "Phone",
  telephonie: "Phone",
  wifi: "Wifi",
};

const normalizeIconName = (icon) =>
  icon
    ?.trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, character) => character.toUpperCase())
    .replace(/^[a-z]/, (character) => character.toUpperCase());

const getIconComponent = (icon) => {
  const trimmedIcon = icon?.trim();

  if (!trimmedIcon) {
    return DEFAULT_ICON;
  }

  const alias = ICON_ALIASES[trimmedIcon.toLocaleLowerCase("fr-FR")];
  const iconName = alias ?? normalizeIconName(trimmedIcon);

  return ICONS[iconName] ?? null;
};

const getReadableTextColor = (color) => {
  if (!hexColorRegex.test(color ?? "")) {
    return "#ffffff";
  }

  const red = parseInt(color.slice(1, 3), 16);
  const green = parseInt(color.slice(3, 5), 16);
  const blue = parseInt(color.slice(5, 7), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminance > 150 ? "#1f2937" : "#ffffff";
};

const getFallbackIconText = (icon, label) => {
  const source = icon?.trim() || label || "Catégorie";

  if (source.length <= 3) {
    return source;
  }

  return source.slice(0, 2).toLocaleUpperCase("fr-FR");
};

export const getTicketTypeOption = (type, category) => {
  const label = category?.name ?? type ?? "Catégorie";
  const color = hexColorRegex.test(category?.color ?? "")
    ? category.color
    : DEFAULT_COLOR;
  const Icon = getIconComponent(category?.icon);
  const textColor = getReadableTextColor(color);

  return {
    Icon: Icon ?? null,
    color,
    fallbackIconText: Icon ? "" : getFallbackIconText(category?.icon, label),
    label,
    style: {
      backgroundColor: color,
      borderColor: color,
      color: textColor,
    },
  };
};
