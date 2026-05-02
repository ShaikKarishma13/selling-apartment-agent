import React, { useState } from "react";
import "./styles.css";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

function App() {
  const [leads, setLeads] = useState([]);

  const addLead = (lead) => {
    setLeads([...leads, lead]);
  };

  return (

  <div>
    <div className="navbar">
      🏢 Apartment Sales AI Agent
    </div>

    <div className="container">
      <h1>Dashboard</h1>

      <LeadForm onAddLead={addLead} />

      <LeadList leads={leads} />
    </div>
  </div>
);
  
    
}

export default App;



