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
          <div className="flex justify-between px-4 mb-3 items-center">
            <div>
              <h2 className="font-bold text-2xl">
                Détail du ticket #{selectedTicket.id}
              </h2>
            </div>
            <div
              onClick={() => setIsShowTicketOpen(false)}
              className="cursor-pointer"
            >
              <p className="text-2xl rounded-full bg-[#303030] w-10 h-10 flex items-center justify-center text-white pb-1 my-3">
                x
              </p>
            </div>
          </div>
          <hr />
          {/**logo + titre + status etc... */}
          <div className="flex gap-3 my-3">
            {/**logo type */}
            <div className="flex items-center">
              <TicketTypeIcon
                type={categoryName}
                category={selectedTicket?.category}
                size={30}
              />
            </div>
            {/**titre, status etc... */}
            <div>
              <div>
                <h3 className="text-lg font-bold">{selectedTicket.title}</h3>
                <p className="text-lg font-semibold">{categoryName}</p>
              </div>
              <div className="flex gap-5 my-2">
                  <div className="flex gap-4">
                    <PriorityBadge priority={selectedTicket.priority} />
                    <StatusBadge status={selectedTicket.status} />
                  </div>
                <button className="p-2 border rounded-xl bg-gray-200">
                  Crée le :
                  {new Date(selectedTicket.createdAt).toLocaleDateString()} à
                  {new Date(selectedTicket.createdAt).toLocaleTimeString(
                    "fr-FR",
                    { hour: "2-digit", minute: "numeric" },
                  )}
                </button>
              </div>
            </div>
          </div>
          <hr className="h-2" />
          {/**description */}
          <div className="my-3">
            <h3 className="text-lg font-bold">Description</h3>
            <p className="break-all">{selectedTicket.description}</p>
          </div>
          <hr />
          {/**informations */}
          <div>
            <h3 className="text-lg font-bold my-1">Informations</h3>
            <div className="my-2">
              <span></span>
              <div>
                <h4 className="text-lg font-semibold">Demandeur</h4>
                <p>
                  {selectedTicket.user.username} ({selectedTicket.user.email})
                </p>
              </div>
            </div>
            <div className="my-2">
              <span></span>
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Dernière mise à jour
                  </h3>
                  <p>
                    {new Date(selectedTicket.updatedAt).toLocaleDateString()} à
                    {new Date(selectedTicket.updatedAt).toLocaleTimeString(
                      "fr-FR",
                      { hour: "2-digit", minute: "2-digit" },
                    )}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-[#00AA] hover:bg-[#0000DD] text-white px-4 py-2 rounded-[5px] font-medium transition"
                    onClick={() => {
                      if(role==="administrateur"){
                        navigate(`/admin/messagerie/${selectedTicket.id}`);
                      }else{
                        navigate(`/user/message/${selectedTicket.id}`);
                      }
                    }}
                  >
                    messagerie
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/**button */}
        </div>
      </div>
    </div>
  );
}
