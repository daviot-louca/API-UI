export default function StatCard({
  title,
  value,
  icon,
  evolution,
  positive = true,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-3xl font-bold text-[#303030] mt-2">
            {value}
          </h2>
        </div>

        <div className="bg-gray-100 p-3 rounded-xl">
          {icon}
        </div>
      </div>

      <p
        className={`text-sm font-medium ${
          positive ? "text-green-600" : "text-red-600"
        }`}
      >
        {evolution}
      </p>
    </div>
  );
}