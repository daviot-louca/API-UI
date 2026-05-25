import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
  } from "recharts";
  
  export default function DonutChartsStatus({
    data,
    total,
  }) {
  
    const couleurs =
      total === 0
        ? ["#E5E7EB"]
        : ["#4F46E5","#F59E0B", "#059669" ];
  
    return (
  
      <div className="bg-white p-4 rounded-xl shadow-sm">
  
        <h2 className="text-xl font-semibold mb-4">
          Statut de mes tickets
        </h2>
  
        <div className="flex items-center justify-between gap-4">
  
          {/* CHART */}
          <div className="h-52 w-52">
  
            <ResponsiveContainer width="100%" height="100%">
  
              <PieChart>
  
                <Pie
                  data={data}
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
  
                  {data.map((entry, index) => (
  
                    <Cell
                      key={index}
                      fill={couleurs[index]}
                    />
  
                  ))}
  
                </Pie>
  
                {/* CENTER TEXT */}
                <text
                  x="50%"
                  y="45%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-800 text-xl font-bold"
                >
                  {total}
                </text>
  
                <text
                  x="50%"
                  y="58%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-400 text-sm"
                >
                  tickets
                </text>
  
              </PieChart>
  
            </ResponsiveContainer>
  
          </div>
  
          {/* LEGEND */}
          {total > 0 && (
  
            <div className="flex flex-col gap-3 w-[42%]">
  
              {data.map((item, index) => (
  
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
  
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
  
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: couleurs[index],
                      }}
                    />
  
                    <p className="text-sm text-gray-600 capitalize">
                      {item.name}
                    </p>
  
                  </div>
  
                  {/* RIGHT */}
                  <span className="font-semibold text-gray-800">
                    {item.value}
                  </span>
  
                </div>
  
              ))}
  
            </div>
  
          )}
  
        </div>
  
      </div>
  
    );
  }
