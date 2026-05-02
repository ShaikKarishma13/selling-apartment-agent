import { useState } from "react";

function LeadForm({ onAddLead }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    onAddLead({ name, phone });

    setName("");
    setPhone("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add New Lead</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br /><br />

        <button type="submit">Add Lead</button>
      </form>
    </div>
  );
}

export default LeadForm;


