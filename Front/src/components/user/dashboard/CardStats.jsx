import { Ticket, Clock3, CheckCircle2, Hourglass } from "lucide-react";
export default function CardStats({stats}){
    return(
    <div className="flex">
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
      {/*CARDS 1 */}
      <div className="bg-white flex items-center justify-between p-4 py-3 rounded-xl shadow-sm">
        {/* Infos */}
        <div className="flex flex-col">
          <p className="text-gray-500 text-sm font-medium">Mes tickets</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {stats.total}
          </h2>
        </div>
        {/* Icon */}
        <div className="bg-red-100 p-3 rounded-2xl">
          <Ticket className="text-red-600" size={24} />
        </div>
      </div>

      {/*CARDS 2 */}
      <div className="bg-white flex items-center justify-between p-4 py-3 rounded-xl shadow-sm">
        {/* Infos */}
        <div className="flex flex-col">
          <p className="text-gray-500 text-sm font-medium">Remis</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {stats.remis}
          </h2>
        </div>
        {/* Icon */}
        <div className="bg-indigo-100 p-3 rounded-2xl">
          <Clock3 className="text-indigo-600" size={24} />
        </div>
      </div>

      {/*CARDS 3 */}
      <div className="bg-white flex items-center justify-between p-4 py-3 rounded-xl shadow-sm">
        {/* Infos */}
        <div className="flex flex-col">
          <p className="text-gray-500 text-sm font-medium">En cours</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {stats.enCours}
          </h2>
        </div>
        {/* Icon */}
        <div className="bg-amber-100 p-3 rounded-2xl">
          <Hourglass className="text-amber-500" size={24} />
        </div>
      </div>

      {/*CARDS 4 */}
      <div className="bg-white flex items-center justify-between p-4 py-3 rounded-xl shadow-sm">
        {/* Infos */}
        <div className="flex flex-col">
          <p className="text-gray-500 text-sm font-medium">Résolu</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {stats.resolu}
          </h2>
        </div>
        {/* Icon */}
        <div className="bg-emerald-100 p-3 rounded-2xl">
          <CheckCircle2 className="text-emerald-600" size={24} />
        </div>
      </div>
    </div>
  </div>
)}
