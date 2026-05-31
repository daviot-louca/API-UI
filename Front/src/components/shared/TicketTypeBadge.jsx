import { getTicketTypeOption } from "./ticketTypeOptions";

function TicketTypeBadge({ type, category }) {
  const { label, style } = getTicketTypeOption(type, category);

  return (
    <span
      className="rounded-xl border px-4 py-2 text-center font-medium shadow-sm"
      style={style}
    >
      {label}
    </span>
  );
}

export default TicketTypeBadge;
