import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";
import ChartSection from "../components/ChartSection";

function Dashboard({ leads = [] }) {
  console.log("Dashboard loaded");
  console.log("Leads data:", leads);

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

        {/* ================= CARDS ================= */}
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

        {/* ================= CHARTS ================= */}
        <div className="charts-section">
          <ChartSection leads={leads} />
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="bottom-section">

          {/* LEFT → LEADS TABLE */}
          <div className="leads-table">
            <h2>Recent Leads 📋</h2>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan="3">No leads yet</td>
                  </tr>
                ) : (
                  leads.slice(-5).reverse().map((lead) => (
                    <tr key={lead.phone}>
                      <td>{lead.name}</td>
                      <td>{lead.phone}</td>
                      <td>
                        <span className={`status ${lead.status.toLowerCase()}`}>
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* RIGHT → ACTIVITY FEED */}
          <div className="activity-feed">
            <h2>Activity Feed 🔔</h2>

            {leads.length === 0 ? (
              <p>No activity yet</p>
            ) : (
              leads.slice(-5).reverse().map((lead) => (
                <div key={lead.phone} className="activity-item">
                  New lead added: <b>{lead.name}</b> ({lead.status})
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;