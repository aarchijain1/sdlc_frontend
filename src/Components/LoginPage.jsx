import { useState } from "react";
import "../styles/LoginPage.css";
import { EyeOpen, EyeClosed, BoltIcon } from "./Icons";
import { DUMMY_USERS } from "./data";

export default function LoginPage({ onLogin }) {
  const [form,    setForm]    = useState({ username: "", password: "" });
  const [showPw,  setShowPw]  = useState(false);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError("");
    if (!form.username || !form.password) {
      setError("Please enter your credentials.");
      return;
    }
    const user = DUMMY_USERS.find(
      u => u.username === form.username && u.password === form.password
    );
    if (!user) {
      setError("Invalid credentials. Try: demo / demo123");
      return;
    }
    setLoading(true);
    setTimeout(() => onLogin(user), 1300);
  };

  const onKey = e => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div className="login-root">
      {/* Background blobs */}
      <div className="login-blob login-blob--1" />
      <div className="login-blob login-blob--2" />
      <div className="login-blob login-blob--3" />

      {/* Nav */}
      <nav className="login-nav">
        <div className="logo-mark login-nav__mark" style={{ borderRadius: 12 }}>
          <BoltIcon size={18} />
        </div>
        <div>
          <div className="login-nav__name">TCS</div>
          <div className="login-nav__sub">Agentic AI · Software Engineering</div>
        </div>
      </nav>

      {/* Main */}
      <div className="login-main">
        {/* Left panel */}
        <div className="login-left">
          <div className="badge-pill" style={{ marginBottom: 24 }}>
            <span className="status-dot status-dot--green" />
            SDLC Pipeline · All Systems Operational
          </div>
          <h1 className="login-left__heading-black">Welcome to</h1>
          <h1 className="login-left__heading-grad">Agentic AI</h1>
          <p className="login-left__tagline">
            Empowering Software Engineering with AI-driven innovation — your
            unified intelligence layer across the full SDLC.
          </p>
          <div className="login-left__stats">
            {[{ n: "9+", l: "AI Agents" }, { n: "4", l: "Integrations" }, { n: "99.9%", l: "Uptime" }].map(({ n, l }) => (
              <div key={l}>
                <div className="login-left__stat-num">{n}</div>
                <div className="login-left__stat-label">{l}</div>
              </div>
            ))}
          </div>
          <div className="login-left__integrations">
            {["Jira", "GitLab", "Confluence", "ServiceNow"].map(name => (
              <div key={name} className="login-left__integ-badge">{name}</div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="login-card">
          <div className="login-card__header">
            <div className="logo-mark login-card__avatar" style={{ borderRadius: 13 }}>
              <BoltIcon size={22} />
            </div>
            <div>
              <div className="login-card__title">Sign in</div>
              <div className="login-card__sub">Access your Agentic AI workspace</div>
            </div>
          </div>

          {error && (
            <div className="login-error">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Username */}
          <div className="login-field">
            <label className="login-label">Username</label>
            <input
              className="login-input"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              onKeyDown={onKey}
              placeholder="e.g. demo"
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div className="login-field">
            <label className="login-label">Password</label>
            <div className="login-input-wrap">
              <input
                className="login-input login-input--pw"
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                onKeyDown={onKey}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button className="login-eye-btn" onClick={() => setShowPw(!showPw)} type="button">
                {showPw ? <EyeClosed /> : <EyeOpen />}
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="login-link-row">
            <button className="login-link-btn" type="button">Forgot password?</button>
            <button className="login-link-btn" type="button">Sign up</button>
          </div>

          {/* Submit */}
          <button
            className="login-submit"
            onClick={handleSubmit}
            disabled={loading}
            type="button"
          >
            {loading ? (
              <>
                <span className="spinner spinner--sm spinner--light" />
                Authenticating…
              </>
            ) : "Sign in"}
          </button>

          {/* Divider */}
          <div className="login-divider">
            <div className="login-divider__line" />
            <span className="login-divider__text">secured by</span>
            <div className="login-divider__line" />
          </div>
          <p className="login-secure">TCS Identity · Google Cloud · Vertex AI</p>
        </div>
      </div>

      <footer className="login-footer">
        © 2024 Agentic AI for Software Engineering · TCS
      </footer>
    </div>
  );
}