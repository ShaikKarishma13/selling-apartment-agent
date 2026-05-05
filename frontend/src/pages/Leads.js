import { useState } from "react";
import PieChartSection from "../components/PieChartSection";

function Leads({ leads, setLeads, setActivities }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Hot");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editLead, setEditLead] = useState(null);

  const [followUpDate, setFollowUpDate] = useState("");

  // ✅ START EDIT
  const startEdit = (lead) => {
    setEditLead(lead);
    setName(lead.name);
    setPhone(lead.phone);
    setStatus(lead.status);
    setFollowUpDate(lead.followUpDate || "");
  };

  // ✅ ADD / EDIT
  const handleSave = () => {
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

    // ===== EDIT MODE =====
    if (editLead) {
      const updatedLeads = leads.map((l) =>
        l.phone === editLead.phone
          ? {
              ...l,
              name,
              phone,
              status,
              followUpDate: followUpDate || null,
            }
          : l
      );

      setLeads(updatedLeads);

      setActivities((prev) => [
        {
          text: `Edited lead: ${editLead.name} → ${status}`,
          time: new Date(),
        },
        ...prev,
      ]);

      if (followUpDate) {
        setActivities((prev) => [
          {
            text: `Follow-up set for ${name} on ${followUpDate}`,
            time: new Date(),
          },
          ...prev,
        ]);
      }

      setEditLead(null);
    }

    // ===== ADD MODE =====
    else {
      if (leads.some((lead) => lead.phone === phone)) {
        alert("Duplicate phone number not allowed");
        return;
      }

      const newLead = {
        name,
        phone,
        status,
        createdAt: new Date(),
        followUpDate: followUpDate || null,
      };

      setLeads([...leads, newLead]);

      setActivities((prev) => [
        {
          text: `Added lead: ${name} (${status})`,
          time: new Date(),
        },
        ...prev,
      ]);

      if (followUpDate) {
        setActivities((prev) => [
          {
            text: `Follow-up set for ${name} on ${followUpDate}`,
            time: new Date(),
          },
          ...prev,
        ]);
      }
    }

    // RESET
    setName("");
    setPhone("");
    setStatus("Hot");
    setFollowUpDate("");
  };

  // ✅ DELETE
  const handleDelete = (phone) => {
    const leadToDelete = leads.find((l) => l.phone === phone);

    setLeads(leads.filter((lead) => lead.phone !== phone));

    setActivities((prev) => [
      {
        text: `Deleted lead: ${leadToDelete.name}`,
        time: new Date(),
      },
      ...prev,
    ]);
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

  // 🔥 STEP 1 — SMART FOLLOW-UP LOGIC
  const getFollowUpStatus = (date) => {
    if (!date) return "none";

    const today = new Date();
    const d = new Date(date);

    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);

    if (d < today) return "overdue";     // 🔴
    if (d.getTime() === today.getTime()) return "today"; // 🟡
    return "upcoming"; // 🟢
  };

  return (
    <div className="main-content">
      <h1>Leads Management 📋</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name or number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* FILTER */}
      <div style={{ marginBottom: "15px" }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Leads</option>
          <option value="Hot">🔥 Hot</option>
          <option value="Warm">🌤️ Warm</option>
          <option value="Cold">❄️ Cold</option>
        </select>
      </div>

      {/* MAIN LAYOUT */}
      <div className="leads-container">

        {/* LEFT */}
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

            <input
              type="date"
              value={followUpDate || ""}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />

            <button onClick={handleSave}>
              {editLead ? "Update Lead" : "Add Lead"}
            </button>
          </div>

          {/* LIST */}
          {filteredLeads.map((lead) => (
            <div key={lead.phone} className="lead-item">
              <span>
                {lead.name} ({lead.phone})
                <span className={`status ${lead.status.toLowerCase()}`}>
                  {" "}{lead.status}
                </span>

                {/* 🔥 STEP 2 — SMART FOLLOW-UP UI */}
                {lead.followUpDate && (
                  <span className={`follow-tag ${getFollowUpStatus(lead.followUpDate)}`}>
                    📅 {lead.followUpDate}
                  </span>
                )}
              </span>

              <div>
                <button onClick={() => startEdit(lead)}>✏️</button>
                <button onClick={() => handleDelete(lead.phone)}>❌</button>
              </div>
            </div>
          ))}

        </div>

        {/* RIGHT */}
        <div className="leads-right">
          <PieChartSection leads={leads} setFilter={setFilter} />
        </div>

      </div>
    </div>
  );
}

export default Leads;