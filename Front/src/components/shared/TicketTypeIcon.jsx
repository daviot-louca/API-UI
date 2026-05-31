import { getTicketTypeOption } from "./ticketTypeOptions";

function TicketTypeIcon({
  type,
  category,
  size,
  showLabel = false,
  className = "",
}) {
  const { Icon, fallbackIconText, label, style } =
    getTicketTypeOption(type, category);

  return (
    <span
      aria-label={label}
      title={label}
      className={`${className} inline-flex items-center gap-2 rounded-xl border px-3 py-2 font-medium shadow-sm`}
      style={style}
    >
      {Icon ? (
        <Icon size={size || 20} strokeWidth={2.2} />
      ) : (
        <span className="text-sm font-bold leading-none">
          {fallbackIconText}
        </span>
      )}
      {showLabel && <span>{label}</span>}
    </span>
  );
}

export default TicketTypeIcon;
