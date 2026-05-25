function TicketTypeBadge({ type }) {

    const styles = {
      'Poste de travail': "bg-sky-100 text-sky-700",
      'Messagerie': "bg-amber-100 text-amber-700",
      "Compte d'accès": "bg-violet-100 text-violet-700",
      "Téléphonie": "bg-emerald-100 text-emerald-700",
      "Autres": "bg-slate-100 text-slate-700",
    };
  
    return (
  
      <span
        className={`px-4 py-2 rounded-xl font-medium text-center
          ${styles[type] || "bg-gray-100 text-gray-700"}
        `}
      >
        {type}
      </span>
  
    );
  }
  
  export default TicketTypeBadge;
