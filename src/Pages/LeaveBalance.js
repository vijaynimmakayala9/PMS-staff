import React, { useState } from 'react';
import {
  FiCalendar, FiClock, FiPlus, FiMinus,
  FiTrendingUp, FiAward, FiRefreshCw, FiActivity
} from 'react-icons/fi';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');

  :root {
    --teal-50:#f0fdfa;--teal-100:#ccfbf1;--teal-200:#99f6e4;--teal-300:#5eead4;
    --teal-400:#2dd4bf;--teal-500:#14b8a6;--teal-600:#0d9488;--teal-700:#0f766e;
    --teal-800:#115e59;
    --slate-400:#94a3b8;--slate-500:#64748b;--slate-600:#475569;--slate-700:#334155;--slate-800:#1e293b;
    --surface:#ffffff;--surface-2:#f8fffe;
    --radius-sm:8px;--radius-md:14px;--radius-lg:20px;
    --shadow-sm:0 1px 3px rgba(13,148,136,0.08);
    --shadow-md:0 4px 16px rgba(13,148,136,0.10),0 2px 6px rgba(13,148,136,0.06);
    --shadow-lg:0 10px 40px rgba(13,148,136,0.14),0 4px 12px rgba(13,148,136,0.08);
  }
  *{box-sizing:border-box;}

  .lb-root{
    font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;
  }
  .lb-root::before{content:'';position:fixed;top:-180px;right:-180px;width:540px;height:540px;
    background:radial-gradient(circle,rgba(20,184,166,0.09) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .lb-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:460px;height:460px;
    background:radial-gradient(circle,rgba(13,148,166,0.07) 0%,transparent 70%);pointer-events:none;z-index:0;}

  .lb-inner{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:24px 16px 64px;}
  @media(min-width:640px){.lb-inner{padding:32px 24px 64px;}}
  @media(min-width:1024px){.lb-inner{padding:40px 40px 72px;}}

  /* Header */
  .lb-header{display:flex;flex-direction:column;gap:16px;margin-bottom:32px;}
  @media(min-width:640px){.lb-header{flex-direction:row;align-items:flex-start;justify-content:space-between;}}
  .lb-title{font-family:'Syne',sans-serif;font-size:clamp(22px,4vw,30px);font-weight:800;
    color:var(--teal-800);letter-spacing:-0.5px;display:flex;align-items:center;gap:12px;margin:0 0 5px;}
  .lb-title-icon{width:42px;height:42px;background:linear-gradient(135deg,var(--teal-400),var(--teal-600));
    border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;
    box-shadow:0 4px 14px rgba(13,148,136,0.3);}
  .lb-subtitle{font-size:14px;color:var(--slate-500);margin:0;}
  .btn-refresh{display:inline-flex;align-items:center;gap:7px;
    background:linear-gradient(135deg,var(--teal-500),var(--teal-600));color:#fff;
    border:none;border-radius:var(--radius-sm);padding:10px 20px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
    transition:all 0.2s;box-shadow:0 4px 14px rgba(13,148,136,0.28);align-self:flex-start;}
  .btn-refresh:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(13,148,136,0.38);}

  /* Summary grid */
  .summary-grid{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:24px;}
  @media(min-width:480px){.summary-grid{grid-template-columns:repeat(3,1fr);gap:16px;}}

  .summary-card{border-radius:var(--radius-lg);padding:20px;color:#fff;
    position:relative;overflow:hidden;box-shadow:var(--shadow-md);}
  .summary-card::before{content:'';position:absolute;top:-30px;right:-30px;
    width:100px;height:100px;background:rgba(255,255,255,0.08);border-radius:50%;}
  .sc-teal{background:linear-gradient(135deg,var(--teal-500),var(--teal-700));}
  .sc-emerald{background:linear-gradient(135deg,#059669,#047857);}
  .sc-cyan{background:linear-gradient(135deg,#0891b2,#0e7490);}
  .sc-label{font-size:12px;font-weight:500;opacity:0.85;margin:0 0 6px;}
  .sc-value{font-family:'Syne',sans-serif;font-size:clamp(24px,4vw,30px);font-weight:800;
    line-height:1;margin:0 0 3px;}
  .sc-sub{font-size:11px;opacity:0.8;margin:0;}
  .sc-icon{position:absolute;top:16px;right:16px;opacity:0.5;font-size:20px;}

  /* Leave cards grid */
  .leave-cards-grid{display:grid;grid-template-columns:1fr;gap:14px;margin-bottom:24px;}
  @media(min-width:640px){.leave-cards-grid{grid-template-columns:repeat(2,1fr);}}
  @media(min-width:1024px){.leave-cards-grid{grid-template-columns:repeat(3,1fr);}}

  /* Leave card */
  .leave-card{
    background:var(--surface);border-radius:var(--radius-lg);
    padding:20px;border:1px solid rgba(20,184,166,0.10);
    box-shadow:var(--shadow-md);
    border-left:4px solid var(--card-accent,var(--teal-400));
    transition:all 0.2s;position:relative;overflow:hidden;
  }
  .leave-card::before{content:'';position:absolute;top:-20px;right:-20px;
    width:80px;height:80px;background:var(--card-accent-light,rgba(20,184,166,0.06));border-radius:50%;}
  .leave-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg);}

  .lc-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;}
  .lc-icon{width:38px;height:38px;border-radius:10px;
    display:flex;align-items:center;justify-content:center;
    font-size:16px;flex-shrink:0;
    background:var(--card-accent-light,rgba(20,184,166,0.08));
    color:var(--card-accent,var(--teal-500));}
  .lc-name{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;
    color:var(--slate-800);text-transform:capitalize;margin-bottom:2px;}
  .lc-bal-label{font-size:11px;color:var(--slate-500);}
  .lc-right{text-align:right;}
  .lc-value{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;
    color:var(--card-accent,var(--teal-600));line-height:1;}
  .lc-of{font-size:11px;color:var(--slate-400);margin-top:2px;}

  .lc-bar-section{margin-bottom:14px;}
  .lc-bar-meta{display:flex;justify-content:space-between;font-size:11px;
    color:var(--slate-500);margin-bottom:6px;font-weight:500;}
  .lc-track{width:100%;height:7px;background:var(--slate-100);border-radius:4px;overflow:hidden;}
  .lc-fill{height:100%;border-radius:4px;transition:width 0.6s ease;
    background:var(--card-accent,var(--teal-500));}
  .lc-fill-warn{background:linear-gradient(90deg,#f59e0b,#d97706);}
  .lc-fill-danger{background:linear-gradient(90deg,#ef4444,#dc2626);}

  .lc-actions{display:flex;gap:8px;}
  .lc-btn{flex:1;padding:9px 8px;border-radius:var(--radius-sm);font-family:'DM Sans',sans-serif;
    font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;border:1.5px solid transparent;
    text-align:center;}
  .lc-btn-hist{background:var(--teal-50);color:var(--teal-700);border-color:var(--teal-200);}
  .lc-btn-hist:hover{background:var(--teal-100);}
  .lc-btn-apply{background:linear-gradient(135deg,var(--teal-500),var(--teal-600));
    color:#fff;box-shadow:0 2px 8px rgba(13,148,136,0.2);}
  .lc-btn-apply:hover{background:linear-gradient(135deg,var(--teal-400),var(--teal-500));}

  /* Stats section */
  .stats-section{background:var(--surface);border-radius:var(--radius-lg);
    box-shadow:var(--shadow-md);border:1px solid rgba(20,184,166,0.10);padding:24px;}
  .stats-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;
    color:var(--teal-800);display:flex;align-items:center;gap:8px;margin:0 0 18px;}
  .stats-title-icon{width:28px;height:28px;border-radius:7px;
    background:linear-gradient(135deg,var(--teal-100),var(--teal-200));
    display:flex;align-items:center;justify-content:center;color:var(--teal-600);font-size:13px;}
  .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  @media(min-width:640px){.stats-grid{grid-template-columns:repeat(4,1fr);}}
  .stat-tile{padding:16px;border-radius:var(--radius-md);text-align:center;
    border:1px solid transparent;transition:all 0.2s;}
  .stat-tile:hover{transform:translateY(-2px);box-shadow:var(--shadow-md);}
  .st-value{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;line-height:1;margin-bottom:4px;}
  .st-label{font-size:11px;font-weight:500;}
`;

const leaveConfig = [
  { key: 'casual',    label: 'Casual',    icon: <FiCalendar />,   accent: '#14b8a6', accentLight: 'rgba(20,184,166,0.08)' },
  { key: 'sick',      label: 'Sick',      icon: <FiClock />,      accent: '#22c55e', accentLight: 'rgba(34,197,94,0.08)'  },
  { key: 'earned',    label: 'Earned',    icon: <FiTrendingUp />, accent: '#f59e0b', accentLight: 'rgba(245,158,11,0.08)' },
  { key: 'maternity', label: 'Maternity', icon: <FiAward />,      accent: '#ec4899', accentLight: 'rgba(236,72,153,0.08)' },
  { key: 'paternity', label: 'Paternity', icon: <FiPlus />,       accent: '#8b5cf6', accentLight: 'rgba(139,92,246,0.08)' },
  { key: 'optional',  label: 'Optional',  icon: <FiMinus />,      accent: '#06b6d4', accentLight: 'rgba(6,182,212,0.08)'  },
];

const getFillClass = pct => pct >= 80 ? 'lc-fill lc-fill-danger' : pct >= 60 ? 'lc-fill lc-fill-warn' : 'lc-fill';

const LeaveBalance = () => {
  const [leaveData] = useState({
    casual:    { total: 12, used: 5,   remaining: 7   },
    sick:      { total: 10, used: 2,   remaining: 8   },
    earned:    { total: 15, used: 8,   remaining: 7   },
    maternity: { total: 180, used: 0,  remaining: 180 },
    paternity: { total: 15, used: 0,   remaining: 15  },
    optional:  { total: 3, used: 1,    remaining: 2   },
  });

  return (
    <div className="lb-root">
      <style>{style}</style>
      <div className="lb-inner">

        {/* Header */}
        <div className="lb-header">
          <div>
            <h1 className="lb-title">
              <span className="lb-title-icon"><FiCalendar /></span>
              Leave Balance
            </h1>
            <p className="lb-subtitle">Manage your leave balances and track usage</p>
          </div>
          <button className="btn-refresh"><FiRefreshCw style={{ fontSize: 14 }} /> Refresh</button>
        </div>

        {/* Summary */}
        <div className="summary-grid">
          {[
            { cls: 'sc-teal',    label: 'Total Available', value: '32 days', sub: 'Across all types',   icon: <FiTrendingUp /> },
            { cls: 'sc-emerald', label: 'Used This Year',  value: '16 days', sub: '50% of total',       icon: <FiClock /> },
            { cls: 'sc-cyan',    label: 'Pending Requests',value: '2',       sub: 'Awaiting approval',  icon: <FiAward /> },
          ].map((s, i) => (
            <div key={i} className={`summary-card ${s.cls}`}>
              <p className="sc-label">{s.label}</p>
              <p className="sc-value">{s.value}</p>
              <p className="sc-sub">{s.sub}</p>
              <div className="sc-icon">{s.icon}</div>
            </div>
          ))}
        </div>

        {/* Leave Cards */}
        <div className="leave-cards-grid">
          {leaveConfig.map(cfg => {
            const d = leaveData[cfg.key];
            const pct = Math.round((d.used / d.total) * 100);
            return (
              <div key={cfg.key} className="leave-card"
                style={{ '--card-accent': cfg.accent, '--card-accent-light': cfg.accentLight }}>
                <div className="lc-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="lc-icon">{cfg.icon}</div>
                    <div>
                      <div className="lc-name">{cfg.label} Leave</div>
                      <div className="lc-bal-label">Balance remaining</div>
                    </div>
                  </div>
                  <div className="lc-right">
                    <div className="lc-value">{d.remaining}</div>
                    <div className="lc-of">of {d.total}</div>
                  </div>
                </div>
                <div className="lc-bar-section">
                  <div className="lc-bar-meta">
                    <span>Used: {d.used} days</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="lc-track">
                    <div className={getFillClass(pct)}
                      style={{ width: `${pct}%`, background: pct >= 80 ? undefined : pct >= 60 ? undefined : cfg.accent }} />
                  </div>
                </div>
                <div className="lc-actions">
                  <button className="lc-btn lc-btn-hist">View History</button>
                  <button className="lc-btn lc-btn-apply">Apply Leave</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Usage Stats */}
        <div className="stats-section">
          <h3 className="stats-title">
            <span className="stats-title-icon"><FiActivity /></span>
            Leave Usage Statistics
          </h3>
          <div className="stats-grid">
            {[
              { value: '68%', label: 'Casual Leave Used',   bg: 'var(--teal-50)',  border: 'var(--teal-200)',  val: 'var(--teal-700)',  lbl: 'var(--teal-600)'  },
              { value: '42%', label: 'Overall Efficiency',  bg: '#f0fdf4',         border: '#bbf7d0',          val: '#16a34a',          lbl: '#15803d'          },
              { value: '12',  label: 'Leaves This Quarter', bg: '#fff7ed',         border: '#fed7aa',          val: '#c2410c',          lbl: '#ea580c'          },
              { value: '94%', label: 'Approval Rate',       bg: '#faf5ff',         border: '#e9d5ff',          val: '#7c3aed',          lbl: '#6d28d9'          },
            ].map((s, i) => (
              <div key={i} className="stat-tile"
                style={{ background: s.bg, borderColor: s.border }}>
                <div className="st-value" style={{ color: s.val }}>{s.value}</div>
                <div className="st-label" style={{ color: s.lbl }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeaveBalance;