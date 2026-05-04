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

function ChartSection({ leads }) {

  // ✅ GROUP LEADS BY DAY
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const data = days.map((day, index) => {
    const count = leads.filter((lead) => {
      const d = new Date(lead.createdAt);
      return d.getDay() === index;
    }).length;

    return {
      name: day,
      leads: count,
    };
  });

  return (
    <div>

      {/* 🔵 LINE CHART */}
      <div className="chart-container">
        <h2>Leads This Week 📈</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="leads"
              stroke="#00f5ff"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🟠 BAR CHART */}
      <div className="chart-container">
        <h2>Weekly Performance 📊</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />

            <Bar dataKey="leads" fill="#ff7f50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ChartSection;