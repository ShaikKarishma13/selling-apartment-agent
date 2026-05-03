import Sidebar from "../layout/Sidebar";

function Dashboard() {
  return (
    <div className="dashboard">
      
      <Sidebar />

      <div className="main-content">
        
        <div className="topbar">
          <input type="text" placeholder="Search..." />
          <div>🔔 👤</div>
        </div>

        <h1>Dashboard Overview 🚀</h1>

        <div className="cards">
          <div className="card">
            <h3>Total Leads</h3>
            <p>124</p>
          </div>

          <div className="card">
            <h3>Calls Today</h3>
            <p>32</p>
          </div>

          <div className="card">
            <h3>Hot Leads 🔥</h3>
            <p>18</p>
          </div>

          <div className="card">
            <h3>Conversion Rate</h3>
            <p>24%</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
