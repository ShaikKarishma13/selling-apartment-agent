import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import FollowUps from "./pages/FollowUps";
import Settings from "./pages/Settings";

function App() {
  const [leads, setLeads] = useState([]);
  const [activities, setActivities] = useState([]);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Auth />} />

        <Route
          path="/dashboard"
          element={<Dashboard leads={leads} activities={activities} />}
        />

        <Route
          path="/leads"
          element={
            <Leads
              leads={leads}
              setLeads={setLeads}
              setActivities={setActivities}
            />
          }
        />

        <Route
          path="/follow-ups"
          element={<FollowUps leads={leads} />}
        />

        {/* ✅ ADD THIS */}
        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;