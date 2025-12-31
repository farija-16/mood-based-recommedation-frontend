import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import API_BASE_URL from "./config/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration Failed");
        return;
      }

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
        console.error("Server Loading",err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <>
      {/* blurred global collage background */}
      <div className="bg-blur-overlay"></div>

      <div className="container signup">
        
        {/* LEFT SIDE — Animation */}
        <div className="animation-section signup-animation">

          {/* Pouring Light Beams */}
          <div className="pouring-stars">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="falling-star"></div>
            ))}
          </div>

          <div className="signup-text">
            <h2>Step Into Your Aura ✨</h2>
            <p>Begin your journey through stories and moods.</p>
          </div>
        </div>

        {/* RIGHT SIDE — Signup Form */}
        <div className="login-section">
          <h1 className="logo">Auraverse ✨</h1>

          <div className="login-box">
            <h2>Sign Up</h2>
            <p>Create your Auraverse Account</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Sign Up</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <p style={{ marginTop: "15px" }}>
              Already have an account?
              <span
                style={{ color: "#667eea", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                {" "}Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
