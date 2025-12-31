import React, { useState } from "react";
import "./home.css";
import FilmStrip from "./FilmStrip";
import "./flimstrip.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  //Auth
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username")  || "User";
  const isLoggedin = !!token;
  
  //UI State
  //const [openSettings, setOpenSettings] = useState(false);
  const [showMood, setShowMood] = useState(false);
  const [showAesthetic, setShowAesthetic] = useState(false);

  const [message, setMessage] = useState("");

  //Selection State
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedAesthetic, setSelectedAesthetic] = useState("");

  
 

  //Mood List
  const moods = [
    { label: "Happy", icon: "😊" },
    { label: "Sad", icon: "😢" },
    { label: "In Love", icon: "😍" },
    { label: "Mood Swings", icon: "🌪️" },
    { label: "Not Sure", icon: "🤔" },
    { label: "Heartbroken", icon: "💔" },
    { label: "Zoned Out", icon: "😶‍🌫️" },
  ];

  //Aesthetic List
  const aesthetics = [
    { label: "Cozy", icon: "🧸" },
    { label: "Romcom", icon: "🎬" },
    { label: "Vintage", icon: "📼" },
    { label: "Dark", icon: "🌑" },
    { label: "Sports", icon: "⚽" },
    { label: "Horror", icon: "👻" },
    { label: "Psychological Thriller", icon: "🧠" },
  ];

  //Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  //Render UI

  return (
    <div className="home-container">
      {/*  Star Background */}
      <div className="stars">
        {Array.from ({ length : 80}).map((_,i) => (
          <div key={i} className="star" style={{
            top : Math.random() * 100 + "vh",
            left : Math.random() * 100 + "vw",
            animationDelay : Math.random() * 5 + "s",
          }}
          ></div>
        ))}
      </div>

      {/* Floating Film Strips */}
      <div className="filmstrip-wrapper">
        <FilmStrip posters={[
        "/posters/img1.jpeg",
        "/posters/img2.jpg",
        "/posters/img3.jpg",
        "/posters/img4.jpg",
        "/posters/img5.jpg",
        "/posters/img6.jpg",
      ] } speed="20s" />

        <FilmStrip posters={[
        "/posters/img7.jpg",
        "/posters/img8.jpg",
        "/posters/img9.jpg",
        "/posters/img10.jpg",
        "/posters/img11.jpeg",
        "/posters/img12.jpeg",
      ] } speed="18s" />

        <FilmStrip posters={[
        "/posters/img13.jpg",
        "/posters/img14.jpeg",
        "/posters/img15.jpg",
        "/posters/img16.jpg",
        "/posters/img17.jpeg",
        "/posters/img18.jpeg",
      ] }  speed="22s" />

      </div>

      {/* Header */}
      <header className="home-header">
       
        <h1 className="logo">Auraverse ✨</h1>
        <div className="header-buttons">
          {!isLoggedin ? (
    // NOT LOGGED IN → show sign in + sign up
    <>
        <button className="btn-header" onClick={() => navigate("/login")}>
            Sign In
        </button>
        <button className="btn-header" onClick={() => navigate("/register")}>
            Sign Up
        </button>
    </>
) : (
    // LOGGED IN → show profile + sign out
    <>
        <button className="btn-header" onClick={() => navigate("/profile")}>
            My Profile
        </button>
        <button className="btn-header"
            onClick={handleLogout}>
            Sign Out
        </button>
    </>
          )}

        </div>
      </header>
      

      {/* Content */}
      <div className="home-content">

        <h1 className="welcome-title"> Welcome to Auraverse ✨ </h1>
        <p className="subtitle">Discover Moods & Aesthetic Realms</p>
        <p className="hello-text">
          {isLoggedin ? `Hello, ${username} 👋` : "Sign in to personalize your experience"}
        </p>


        {/* BUTTONS */}
        <div className="button-row">
          <button 
            className ="choose-btn"
            disabled  = {!isLoggedin}
            onClick={() => {
              if(!isLoggedin) {
                setMessage("Please sign in to choose a mood.");
                setTimeout(() =>  setMessage(""),2000);
                return;
                }
              setShowMood(!showMood);
              setShowAesthetic(false);
            }}> Choose Mood
          </button>

          <button 
            className ="choose-btn" 
            disabled  = {!isLoggedin}
            onClick={() => {
              if(!isLoggedin) { 
                setMessage("Please sign in to choose aesthetic.");
                setTimeout (() => setMessage(""),2000 );
                return; 
              }
              setShowAesthetic(!showAesthetic);
              setShowMood(false);
            }}>Choose Aesthetic
          </button>
        </div>
         
        {/* MOOD DROPDOWN */}
        {showMood && (
          <div className="dropdown-list fade-in">
            {moods.map((mood) => (
              <div key={mood.label} className="dropdown-item" onClick={() => {
                setSelectedMood(mood.label);
                setShowMood(false);
              }}>
                <span className="item-icon">{mood.icon}</span>
                {mood.label}
              </div>
            ))}
          </div>
        )}

        {/* AESTHETIC DROPDOWN */}
        {showAesthetic && (
          <div className="dropdown-list fade-in">
            {aesthetics.map((aesthetic) => (
              <div key={aesthetic.label} className="dropdown-item" onClick={() => {
                setSelectedAesthetic(aesthetic.label);
                setShowAesthetic(false);

              }}>
                <span className="item-icon">{aesthetic.icon}</span>
                {aesthetic.label}
              </div>
            ))}
          </div>
        )}
      
        {/* Recommendation */}

        {isLoggedin && (
          <button className="recommend-btn"
          disabled = {!selectedMood || ! selectedAesthetic}
          onClick={ () =>  {
          console.log("Sending:", selectedMood, selectedAesthetic);
            navigate(
  `/recommend?mood=${encodeURIComponent(selectedMood)}&aesthetic=${encodeURIComponent(selectedAesthetic)}`
);
          }}>  Recommend </button>
        )}
         {message && <div className="login-alert"> {message} </div>}
      </div>
    </div>
  );
}

export default Home;
