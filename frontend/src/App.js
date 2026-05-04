import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";

function App() {
  const [leads, setLeads] = useState([]);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Auth />} />

        <Route
          path="/dashboard"
          element={<Dashboard leads={leads} />}
        />

        <Route
          path="/leads"
          element={<Leads leads={leads} setLeads={setLeads} />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
