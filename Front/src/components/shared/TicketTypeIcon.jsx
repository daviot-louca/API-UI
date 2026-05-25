import { getTicketTypeOption } from "./ticketTypeOptions";

function TicketTypeIcon({ type, showLabel = false, className = "" }) {
  const { Icon, label, className: colorClassName } =
    getTicketTypeOption(type);

  return (
    <span
      aria-label={label}
      title={label}
      className={`${colorClassName} ${className} inline-flex items-center gap-2 rounded-xl px-3 py-2 font-medium`}
    >
      <Icon size={18} strokeWidth={2.2} />
      {showLabel && <span>{label}</span>}
    </span>
  );
}

export default TicketTypeIcon;
