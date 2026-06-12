import TicketTypeIcon from "../TicketTypeIcon";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth/AuthContext";
import PriorityBadge from "../PriorityBadge";
import StatusBadge from "../StatusBadge";
export default function TicketDetailModal({
  selectedTicket,
  setIsShowTicketOpen,
}) {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const categoryName = selectedTicket?.category?.name ?? selectedTicket?.type;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center"
      onClick={() => setIsShowTicketOpen(false)}
    >
      <div className="flex items-center justify-center ">
        <div
          className="bg-white rounded-3xl px-8 py-4 w-175"
          onClick={(e) => e.stopPropagation()}
        >
          {/*header */}
          <div className="flex gap-5 py-5">
            <div className="flex h-16 w-16 items-center justify-center">
              <TicketTypeIcon
                type={categoryName}
                category={selectedTicket?.category}
                size={34}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {selectedTicket.title}
                  </h3>

                  <p className="text-slate-500 font-medium mt-1">
                    {categoryName}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs uppercase text-slate-400">Fiabilité</p>

                  <p
                    className={`text-2xl font-bold ${
                      selectedTicket?.scoreFiabilite >= 80
                        ? "text-green-600"
                        : selectedTicket?.scoreFiabilite >= 60
                          ? "text-orange-500"
                          : "text-red-500"
                    }`}
                  >
                    {selectedTicket?.scoreFiabilite}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <PriorityBadge priority={selectedTicket.priority} />
                <StatusBadge status={selectedTicket.status} />
              </div>
            </div>
          </div>
          <div className="my-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Description
            </h3>

            <div className="rounded-2xl p-5">
              <p className="leading-7 text-slate-700 whitespace-pre-wrap">
                {selectedTicket.description}
              </p>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Informations
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm">Demandeur</p>
                <p className="font-medium text-slate-700">
                  {selectedTicket.user.username}
                </p>
                <p className="text-slate-500">{selectedTicket.user.email}</p>
              </div>
              <div className="flex justify-between items-end">
                 <div>
                <div>
                  <p className="text-slate-400 text-sm">Création</p>
                  <p>
                    {new Date(selectedTicket.createdAt).toLocaleDateString()} à{" "}
                    {new Date(selectedTicket.createdAt).toLocaleTimeString(
                      "fr-FR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Dernière mise à jour</p>

                  <p>
                    {new Date(selectedTicket.updatedAt).toLocaleDateString()} à{" "}
                    {new Date(selectedTicket.updatedAt).toLocaleTimeString(
                      "fr-FR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </p>
                </div>
              </div>
              <div>
                <button onClick={()=>navigate(`/admin/messagerie/${selectedTicket?.id}`)}  className="py-3 px-4 rounded-2xl bg-[#333370] font-medium text-white">Messagerie</button>
              </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
