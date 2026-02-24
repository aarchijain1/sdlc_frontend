import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import {
  BoltIcon, SearchIcon, BellIcon, SettingsIcon, ChatIcon, LogoutIcon,
  CodeIcon, ShieldIcon, GitMergeIcon, BarChartIcon
} from "./Icons";
import {
  STAT_DATA, CAPABILITIES, RECENT_ACTIVITY
} from "./data";

const CAP_ICONS = { 
  code: <CodeIcon />, 
  shield: <ShieldIcon />, 
  git: <GitMergeIcon />, 
  chart: <BarChartIcon />, 
  search: <SearchIcon />, 
  bell: <BellIcon /> 
};

/* ── Sub-components ── */
function StatCard({ label, value, delta, positive, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon" style={{ background: `${color}18` }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: color, opacity: 0.85 }} />
      </div>
      <div>
        <div className="stat-card__label">{label}</div>
        <div className="stat-card__value">{value}</div>
        <div className={`stat-card__delta ${positive ? "stat-card__delta--pos" : "stat-card__delta--neg"}`}>
          {positive ? "▲" : "▼"} {delta} this week
        </div>
      </div>
    </div>
  );
}

function CapCard({ keyName, title, desc, color, onClick }) {
  return (
    <div className="cap-card" onClick={onClick} style={{ "--hc": color }}>
      <div className="cap-card__icon" style={{ background: `${color}14`, color }}>
        {CAP_ICONS[keyName]}
      </div>
      <div className="cap-card__title">{title}</div>
      <div className="cap-card__desc">{desc}</div>
    </div>
  );
}

function ActivityRow({ keyName, title, desc, time, color }) {
  return (
    <div className="act-row">
      <div className="act-row__icon" style={{ background: `${color}12`, color }}>
        {CAP_ICONS[keyName]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="act-row__title">{title}</div>
        <div className="act-row__desc">{desc}</div>
      </div>
      <div className="act-row__time">{time}</div>
    </div>
  );
}

/* ── Main component ── */
export default function Dashboard({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleOpenChat = () => {
    navigate('/chatbot');
  };

  return (
    <div className="dash-root">
      {/* ── Top Nav ── */}
      <nav className="dash-nav">
        <div className="dash-nav__brand">
          <div className="logo-mark dash-nav__mark">
            <BoltIcon size={16} />
          </div>
          <div>
            <div className="dash-nav__name">TCS Agentic AI</div>
            <div className="dash-nav__sub">Software Engineering</div>
          </div>
        </div>

        <div className="dash-nav__search">
          <SearchIcon />
          <input
            className="dash-nav__search-input"
            placeholder="Search capabilities, docs…"
          />
        </div>

        <div className="dash-nav__actions">
          <button className="dash-nav__icon-btn" aria-label="Notifications">
            <BellIcon />
            <span className="dash-nav__notif-dot" />
          </button>
          <button className="dash-nav__icon-btn" aria-label="Settings">
            <SettingsIcon />
          </button>
          <div className="dash-nav__user">
            <div className="dash-nav__user-avatar">{user.initials}</div>
            <div>
              <div className="dash-nav__user-name">{user.name}</div>
              <div className="dash-nav__user-role">{user.role}</div>
            </div>
          </div>
          <button className="dash-nav__logout" onClick={handleLogout}>
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="dash-main">
        {/* Hero */}
        <div className="dash-hero">
          <div className="dash-hero__blob-1" />
          <div className="dash-hero__blob-2" />
          <div className="dash-hero__content">
            <div className="dash-hero__badge">
              <span className="status-dot status-dot--green" />
              All 9 agents operational
            </div>
            <h1 className="dash-hero__title">
              Good morning, {user.name.split(" ")[0]}! 👋
            </h1>
            <p className="dash-hero__sub">
              Your SDLC pipeline is healthy — 12 sprints active, 97% test pass rate.
            </p>
          </div>
          <button className="dash-hero__cta" onClick={handleOpenChat}>
            <ChatIcon />
            <div>
              <div className="dash-hero__cta-title">Ask Agentic AI</div>
              <div className="dash-hero__cta-sub">Your SDLC co-pilot</div>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="dash-stats">
          {STAT_DATA.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Two-column */}
        <div className="dash-grid">
          {/* Capabilities */}
          <div className="dash-panel">
            <div className="dash-panel__header">
              <div>
                <div className="dash-panel__title">AI Capabilities</div>
                <div className="dash-panel__sub">One assistant. Full pipeline intelligence.</div>
              </div>
              <button className="dash-panel__link" onClick={handleOpenChat}>Ask AI →</button>
            </div>
            <div className="cap-grid">
              {CAPABILITIES.map(c => (
                <CapCard key={c.icon} keyName={c.icon} title={c.title} desc={c.desc} color={c.color} onClick={handleOpenChat} />
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="dash-panel">
            <div className="dash-panel__header">
              <div>
                <div className="dash-panel__title">Recent Activity</div>
                <div className="dash-panel__sub">Real-time pipeline events</div>
              </div>
              <button className="dash-panel__link">View all →</button>
            </div>
            {RECENT_ACTIVITY.map((a, i) => (
              <ActivityRow key={i} keyName={a.icon} title={a.title} desc={a.desc} time={a.time} color={a.color} />
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="dash-integ">
          <div>
            <div className="dash-integ__label">Connected Integrations</div>
            <div className="dash-integ__sub">All integrations healthy · Last sync 2 min ago</div>
          </div>
          <div className="dash-integ__chips">
            {["Jira", "GitLab", "Confluence", "ServiceNow", "Harness", "BigQuery"].map(name => (
              <div key={name} className="integ-chip">
                <span className="integ-chip__dot" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}