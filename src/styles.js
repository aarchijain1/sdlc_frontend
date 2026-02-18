export const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; }
body { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; background: #f0f2fa; }

:root {
  --brand-primary: #3B5BDB;
  --brand-secondary: #6741D9;
  --brand-gradient: linear-gradient(135deg, #3B5BDB 0%, #6741D9 100%);
  --brand-glow: rgba(59, 91, 219, 0.25);
  --surface-0: #f0f2fa;
  --surface-1: #ffffff;
  --surface-2: #f7f8fd;
  --surface-3: #eef1fb;
  --border-subtle: #e4e9f7;
  --border-strong: #c8d2f0;
  --text-primary: #111827;
  --text-secondary: #4B5563;
  --text-muted: #9CA3AF;
  --text-inverse: #ffffff;
  --success: #059669;
  --warning: #D97706;
  --danger: #DC2626;
  --sidebar-bg: #111827;
  --sidebar-text: #E5E7EB;
  --sidebar-muted: #6B7280;
  --sidebar-hover: rgba(255,255,255,0.07);
  --sidebar-active: rgba(59, 91, 219, 0.25);
  --thinking-bg: #fef9ec;
  --thinking-border: #fde68a;
  --thinking-text: #92400e;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06);
  --shadow-xl: 0 24px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08);
  --nav-height: 60px;
}

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; } to { opacity: 1; }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
}
@keyframes blink {
  0%, 100% { opacity: 1; } 50% { opacity: 0; }
}
@keyframes spin {
  from { transform: rotate(0deg); } to { transform: rotate(360deg); }
}
@keyframes thinkingExpand {
  from { max-height: 0; opacity: 0; }
  to   { max-height: 600px; opacity: 1; }
}
@keyframes streamText {
  from { opacity: 0; transform: translateY(3px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-6px); opacity: 1; }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-fade-up { animation: fadeUp 0.4s ease forwards; }
.animate-fade-in { animation: fadeIn 0.3s ease forwards; }
.animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
.animate-slide-left { animation: slideInLeft 0.35s ease forwards; }
.animate-slide-right { animation: slideInRight 0.35s ease forwards; }

button { cursor: pointer; font-family: inherit; }
input, textarea { font-family: inherit; }
`;