import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import show1 from "./show1.jpg";
//import show2 from "./show2.jpg";
/* import show3 from "./assets/show3.jpg"; */
import "./App.css";
import API_BASE_URL from "./config/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("userId",data.id);

      
      navigate("/home");
    } catch (err) {
      console.error("Server loading",err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-blur-overlay"></div>

      <div className="container">
        <div className="login-section">
          <h1 className="logo">Auraverse ✨</h1>

          <div className="login-box">
            <h2>Welcome Back</h2>
            <p>Please login to continue</p>

            <form onSubmit={handleSubmit}>
              <input type="email" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)} required/>

              <input type="password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)} required/>

              <button type="submit">{loading ? "Logging in..." : "Login"}</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <p style={{ marginTop: "12px" }}>
              Don’t have an account?{" "}
              <span style={{ color: "#667eea", cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >Sign Up</span>
            </p>
          </div>
        </div>

        {/* Animation */}
        <div className="animation-section">
         <div className="book">
         <div className="page front">
            <img src="/show1.jpg" alt="Front" />
         </div>

         <div className="page back">
          <img src="/show2.jpg"alt="Back" />
       </div>
      </div>

        </div>
      </div>
    </>
  );
}

export default Login;
