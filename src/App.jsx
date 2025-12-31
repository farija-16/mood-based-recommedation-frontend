import React from "react";
import { Routes,Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import RecommendationPage from "./RecommendationPage";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./profile";


function App(){
  return(
    
      <Routes>
        {/* Login & Register */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signin" element={<Login/>} />

        <Route path="/register" element={<Register/>}/>
        <Route path="/signup" element={<Register/>}/>
        {/* Home */}
        <Route path="/home" element={<Home/>}> </Route>

        <Route path="/recommend" element={ <ProtectedRoute> <RecommendationPage /> </ProtectedRoute> } />
        <Route path="/profile" element= { <ProtectedRoute> <Profile /></ProtectedRoute> }/>
      </Routes>
   
  );
}

export default App;