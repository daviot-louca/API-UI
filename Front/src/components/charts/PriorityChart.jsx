import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#00aaff", "#22c55e", "#f59e0b","#ef4444",];

export default function PriorityChart({ data }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-120">
      <h2 className="text-xl font-bold text-[#303030] mb-6">
        Répartition des priorités
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="priority"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.priority}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-6 mt-2 text-sm flex-wrap">
  {data.map((item, index) => (
    <div
      key={item.priority}
      className="flex items-center gap-2"
    >
      <div
        className="w-3 h-3 rounded-sm"
        style={{
          backgroundColor: COLORS[index % COLORS.length],
        }}
      />

      <span>
        {item.priority}: {item.value}
      </span>
    </div>
  ))}
</div>
    </div>
  );
}