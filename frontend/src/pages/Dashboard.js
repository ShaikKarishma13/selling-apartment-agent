import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";
import ChartSection from "../components/ChartSection";

function Dashboard({ leads }) {
  console.log("Dashboard loaded");
  console.log("Leads data:", leads); // ✅ DEBUG LINE

  const totalLeads = leads.length;

  const hotLeads = leads.filter((l) => l.status === "Hot").length;
  const warmLeads = leads.filter((l) => l.status === "Warm").length;
  const coldLeads = leads.filter((l) => l.status === "Cold").length;

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <h1>Dashboard Overview 🚀</h1>

        <div className="cards">
          <div className="card">
            <h3>Total Leads</h3>
            <p>{totalLeads}</p>
          </div>

          <div className="card">
            <h3>Hot Leads 🔥</h3>
            <p>{hotLeads}</p>
          </div>

          <div className="card">
            <h3>Warm Leads 🌤️</h3>
            <p>{warmLeads}</p>
          </div>

          <div className="card">
            <h3>Cold Leads ❄️</h3>
            <p>{coldLeads}</p>
          </div>
        </div>

        <div style={{ color: "white", marginTop: "20px" }}>
          TEST COMPONENT
        </div>

        <ChartSection leads={leads} />
      </div>
    </div>
  );
}

export default Dashboard;
