import React, { useState } from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

function App() {
  const [leads, setLeads] = useState([]);

  const addLead = (lead) => {
    setLeads([...leads, lead]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏢 Apartment Sales Agent Dashboard</h1>

      <LeadForm onAddLead={addLead} />

      <LeadList leads={leads} />
    </div>
  );
}

export default App;
