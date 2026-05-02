import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      
      <h2 className="logo">🏢 AI Agent</h2>

      <ul className="menu">
        <li><Link to="/dashboard">🏠 Dashboard</Link></li>
        <li><Link to="/leads">👥 Leads</Link></li>
        <li><Link to="/calls">📞 Calls</Link></li>
        <li><Link to="/analytics">📊 Analytics</Link></li>
        <li><Link to="/followups">📅 Follow-ups</Link></li>
        <li><Link to="/settings">⚙️ Settings</Link></li>
      </ul>

      <div className="logout">
        Logout
      </div>

    </div>
  );
}

export default Sidebar;
