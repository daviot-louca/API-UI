const PRIORITY_CLASSES = {
  faible: "bg-slate-100 text-slate-700",
  moyenne: "bg-blue-100 text-blue-700",
  haute: "bg-orange-100 text-orange-700",
  urgente: "bg-red-100 text-red-700"
};

function PriorityBadge({ priority = "faible" }) {
  return (
    <span
      className={`${PRIORITY_CLASSES[priority] ?? PRIORITY_CLASSES.faible} px-4 py-2 rounded-xl font-medium text-center`}
    >
      {priority}
    </span>
  );
}

export default PriorityBadge;
