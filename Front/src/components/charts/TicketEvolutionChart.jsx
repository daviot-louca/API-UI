import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TicketEvolutionChart({ data }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-100">
      <h2 className="text-xl font-bold text-[#303030] mb-6">
        Évolution des tickets
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="tickets"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}