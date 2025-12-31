import React from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css"; 

function Profile() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "User";
  const email = localStorage.getItem("email");

  // Extra safety (ProtectedRoute already handles this, but this is clean)
  if (!token) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="profile-container">
  <div className="profile-card">
    <h1>My Profile</h1>

    <div className="profile-info">
      <p><span>Username:</span> {username}</p>
      <p><span>Email:</span> {email}</p>
      <p><span>Status:</span> Logged In</p>
    </div>

    <div className="profile-actions">
      <button onClick={() => navigate("/")}>Back to Home</button>
      <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
    </div>
  </div>
</div>

  );
}

export default Profile;
