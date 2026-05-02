import "./styles.css";
import React, { useState } from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

function App() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔥 NEW

  const addLead = (lead) => {
    const isDuplicate = leads.some(
      (item) => item.phone === lead.phone
    );

    if (isDuplicate) {
      return { error: "Phone number already exists!" };
    }

    setLeads([...leads, lead]);
    return { success: true };
  };

  const deleteLead = (index) => {
    const newLeads = leads.filter((_, i) => i !== index);
    setLeads(newLeads);
  };

  // 🔥 FILTER LOGIC
  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm)
  );

  return (
    <div>
      <div className="navbar">
        🏢 Apartment Sales AI Agent
      </div>

      <div className="main">
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          
          <div className="container">
            <h1>Dashboard</h1>

            <LeadForm onAddLead={addLead} />

            {/* 🔥 SEARCH INPUT */}
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: "15px" }}
            />

            {/*🔥 FILTERED LEADS */}
            <LeadList leads={filteredLeads} onDelete={deleteLead} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
