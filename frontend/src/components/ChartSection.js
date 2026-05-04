import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const data = [
  { name: "Mon", leads: 20 },
  { name: "Tue", leads: 35 },
  { name: "Wed", leads: 25 },
  { name: "Thu", leads: 40 },
  { name: "Fri", leads: 30 },
  { name: "Sat", leads: 50 },
  { name: "Sun", leads: 45 },
];

function ChartSection() {
  return (
    <div className="chart-container">
      <h2>Leads This Week 📈</h2>

      {/* LINE CHART */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#aaa" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="leads"
            stroke="#00f2fe"   // ✅ fixed color (you had typo)
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* 🔥 BAR CHART */}
      <h2 style={{ marginTop: "40px" }}>Weekly Performance 📊</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#aaa" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />

          <Bar dataKey="leads" fill="#ff7e5f" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartSection;