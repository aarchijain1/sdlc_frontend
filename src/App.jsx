import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/Dashboard";
import Chatbot   from "./Components/Chatbot";
import "./styles/global.css";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            user ? 
            <Navigate to="/dashboard" replace /> : 
            <LoginPage onLogin={(u) => setUser(u)} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            user ? 
            <Dashboard 
              user={user} 
              onLogout={() => setUser(null)} 
            /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/chatbot" 
          element={
            user ? 
            <Chatbot user={user} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/" 
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
        />
      </Routes>
    </Router>
  );
}