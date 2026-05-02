function LeadList({ leads }) {
  return (
    <div>
      <h2>Leads List</h2>
      {leads.map((lead, index) => (
        <div key={index} className="lead-item">
          <span>{lead.name}</span>
          <span>{lead.phone}</span>
        </div>
      ))}
    </div>
  );
}


export default LeadList;



