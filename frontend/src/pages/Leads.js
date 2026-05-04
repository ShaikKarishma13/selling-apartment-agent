import { useState } from "react";
import PieChartSection from "../components/PieChartSection";

function Leads({ leads, setLeads }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Hot");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // ✅ ADD LEAD
  const handleAdd = () => {
    if (!name.trim() || !phone.trim()) {
      alert("All fields required");
      return;
    }

    if (!/^[a-zA-Z ]+$/.test(name)) {
      alert("Name should contain only letters");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Phone must be exactly 10 digits");
      return;
    }

    if (leads.some((lead) => lead.phone === phone)) {
      alert("Duplicate phone number not allowed");
      return;
    }

    const newLead = { name, phone, status, createdAt: new Date(), };
    setLeads([...leads, newLead]);

    setName("");
    setPhone("");
    setStatus("Hot");
  };

  // ✅ DELETE
  const handleDelete = (phone) => {
    setLeads(leads.filter((lead) => lead.phone !== phone));
  };

  // ✅ FILTER + SEARCH
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);

    const matchesFilter =
      filter === "All" || lead.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="main-content">

      <h1>Leads Management 📋</h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by name or number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* 🔽 FILTER */}
      <div style={{ marginBottom: "15px" }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Leads</option>
          <option value="Hot">🔥 Hot</option>
          <option value="Warm">🌤️ Warm</option>
          <option value="Cold">❄️ Cold</option>
        </select>
      </div>

      {/* 🔥 MAIN 2-COLUMN LAYOUT */}
      <div className="leads-container">

        {/* LEFT SIDE */}
        <div className="leads-left">

          {/* FORM */}
          <div className="lead-form">
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter Phone"
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value)}
            />

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Hot">🔥 Hot</option>
              <option value="Warm">🌤️ Warm</option>
              <option value="Cold">❄️ Cold</option>
            </select>

            <button onClick={handleAdd}>Add Lead</button>
          </div>

          {/* LIST */}
          {filteredLeads.map((lead) => (
            <div key={lead.phone} className="lead-item">
              <span>
                {lead.name} ({lead.phone})
                <span className={`status ${lead.status.toLowerCase()}`}>
                  {" "}{lead.status}
                </span>
              </span>

              <button onClick={() => handleDelete(lead.phone)}>❌</button>
            </div>
          ))}

        </div>

        {/* RIGHT SIDE → PIE CHART */}
        <div className="leads-right">
          <PieChartSection leads={leads} setFilter={setFilter}/>
        </div>

      </div>
    </div>
  );
}

export default Leads;