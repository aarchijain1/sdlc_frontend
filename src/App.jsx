import { useState } from "react";
import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/Dashboard";
import Chatbot   from "./Components/Chatbot";
import "./styles/global.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("dashboard"); // "dashboard" | "chat"

  if (!user) {
    return <LoginPage onLogin={(u) => { setUser(u); setView("dashboard"); }} />;
  }

  if (view === "chat") {
    return <Chatbot user={user} onGoHome={() => setView("dashboard")} />;
  }

  return (
    <Dashboard
      user={user}
      onOpenChat={() => setView("chat")}
      onLogout={() => { setUser(null); setView("dashboard"); }}
    />
  );
}