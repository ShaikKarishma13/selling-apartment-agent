import "./styles.css";
import React, { useState } from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

function App() {
  const [leads, setLeads] = useState([]);

  // ➕ Add Lead
  const addLead = (lead) => {
    setLeads([...leads, lead]);
  };

  // ❌ Delete Lead
  const deleteLead = (index) => {
    const newLeads = leads.filter((_, i) => i !== index);
    setLeads(newLeads);
  };

  return (
    <div>
      <div className="navbar">
        🏢 Apartment Sales AI Agent
      </div>

      <div className="container">
        <h1>Dashboard</h1>

        <LeadForm onAddLead={addLead} />

        {/* 👇 THIS IS IMPORTANT CHANGE */}
        <LeadList leads={leads} onDelete={deleteLead} />
      </div>
    </div>
  );
}

export default App;
