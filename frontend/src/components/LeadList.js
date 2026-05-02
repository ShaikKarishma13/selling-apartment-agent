function LeadList({ leads }) {
  return (
    <div>
      <h2>Leads List</h2>
      {leads.map((lead, index) => (
        <div key={index} className="lead-item">
          {lead.name} - {lead.phone}
        </div>
      ))}
    </div>
  );
}

export default LeadList;



