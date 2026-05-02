function LeadList({ leads }) {
  return (
    <div>
      <h2>Leads List</h2>

      {leads.length === 0 ? (
        <p>No leads yet</p>
      ) : (
        <ul>
          {leads.map((lead, index) => (
            <li key={index}>
              {lead.name} - {lead.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LeadList;


