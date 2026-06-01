import TicketTypeIcon from "../TicketTypeIcon";
import { TICKET_TYPE_OPTIONS } from "../ticketTypeOptions";

export default function ModalNouveauTypeTicket({setIsTypeModalOpen,handleSelectType}) {
    return (
        <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() =>
                setIsTypeModalOpen(false)
            }
        >
            <div className="flex items-center justify-center >

                <div
                    className="bg-white rounded-3xl p-6 w-full max-w-2xl"
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                >
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold text-[#303030] mb-6">
                            Choisissez un type de problème
                        </h1>
                        <button onClick={() => setIsTypeModalOpen(false)} className="mb-6 bg-[#303030] text-white rounded-full px-3">X</button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        {TICKET_TYPE_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                onClick={() =>
                                    handleSelectType(option.value)
                                }
                                className={`${option.value === "Autres" ? "col-span-2" : ""} bg-slate-100 hover:bg-slate-200 rounded-2xl p-5 text-lg font-semibold transition`}
                            >
                                <TicketTypeIcon
                                    type={option.value}
                                    showLabel
                                    className="justify-center"
                                />
                            </button>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}
