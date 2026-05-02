import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleEnter = () => {
    if (!email) {
      alert("Email is required");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div>
      <div className="navbar">
        🏢 Apartment Sales AI Agent
      </div>

      <div className="main">
        <div className="container">
          <h1>Welcome</h1>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />

          <input
            type="text"
            placeholder="Enter Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br /><br />

          <button onClick={handleEnter}>
            Enter Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
