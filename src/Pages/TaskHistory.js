import React, { useState, useEffect } from 'react';
import {
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiTrendingUp,
  FiAward,
  FiTarget,
  FiPieChart,
  FiBarChart2,
  FiDownload,
  FiZap,
  FiActivity,
  FiStar
} from 'react-icons/fi';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');

  :root {
    --teal-50:  #f0fdfa;
    --teal-100: #ccfbf1;
    --teal-200: #99f6e4;
    --teal-300: #5eead4;
    --teal-400: #2dd4bf;
    --teal-500: #14b8a6;
    --teal-600: #0d9488;
    --teal-700: #0f766e;
    --teal-800: #115e59;
    --teal-900: #134e4a;
    --slate-50:  #f8fafc;
    --slate-100: #f1f5f9;
    --slate-200: #e2e8f0;
    --slate-300: #cbd5e1;
    --slate-400: #94a3b8;
    --slate-500: #64748b;
    --slate-600: #475569;
    --slate-700: #334155;
    --slate-800: #1e293b;
    --surface: #ffffff;
    --surface-2: #f8fffe;
    --radius-sm: 8px;
    --radius-md: 14px;
    --radius-lg: 20px;
    --radius-xl: 28px;
    --shadow-sm: 0 1px 3px rgba(13,148,136,0.08), 0 1px 2px rgba(13,148,136,0.04);
    --shadow-md: 0 4px 16px rgba(13,148,136,0.10), 0 2px 6px rgba(13,148,136,0.06);
    --shadow-lg: 0 10px 40px rgba(13,148,136,0.14), 0 4px 12px rgba(13,148,136,0.08);
    --shadow-glow: 0 0 0 3px rgba(20,184,166,0.15);
  }

  * { box-sizing: border-box; }

  .th-root {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f0fdfa 0%, #e6faf7 40%, #f0fdf9 70%, #ecfdf5 100%);
    position: relative;
    overflow-x: hidden;
  }

  .th-root::before {
    content: '';
    position: fixed;
    top: -180px; right: -180px;
    width: 560px; height: 560px;
    background: radial-gradient(circle, rgba(20,184,166,0.09) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }
  .th-root::after {
    content: '';
    position: fixed;
    bottom: -140px; left: -140px;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .th-inner {
    position: relative; z-index: 1;
    max-width: 1280px;
    margin: 0 auto;
    padding: 24px 16px 56px;
  }
  @media (min-width: 640px)  { .th-inner { padding: 32px 24px 56px; } }
  @media (min-width: 1024px) { .th-inner { padding: 40px 40px 72px; } }

  /* ── Header ── */
  .th-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (min-width: 640px) {
    .th-header { flex-direction: row; align-items: flex-start; justify-content: space-between; }
  }

  .th-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(22px, 4vw, 32px);
    font-weight: 800;
    color: var(--teal-800);
    letter-spacing: -0.5px;
    line-height: 1.1;
    display: flex; align-items: center; gap: 12px;
    margin: 0 0 6px 0;
  }
  .th-title-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, var(--teal-400), var(--teal-600));
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    font-size: 18px;
    flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(13,148,136,0.3);
  }
  .th-subtitle { font-size: 14px; color: var(--slate-500); margin: 0; }

  .header-actions { display: flex; gap: 10px; flex-wrap: wrap; }

  .select-filter {
    padding: 10px 32px 10px 14px;
    border: 1.5px solid var(--teal-100);
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500;
    color: var(--slate-600);
    background: var(--surface-2);
    outline: none; cursor: pointer;
    transition: all 0.2s ease;
    appearance: none; -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230d9488' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
  }
  .select-filter:focus { border-color: var(--teal-400); box-shadow: var(--shadow-glow); }

  .btn-export {
    display: inline-flex; align-items: center; gap: 7px;
    background: linear-gradient(135deg, var(--teal-500), var(--teal-600));
    color: #fff;
    border: none; border-radius: var(--radius-sm);
    padding: 10px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(13,148,136,0.28);
    white-space: nowrap;
  }
  .btn-export:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(13,148,136,0.38);
    background: linear-gradient(135deg, var(--teal-400), var(--teal-500));
  }

  /* ── Stats Cards ── */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 28px;
  }
  @media (min-width: 768px)  { .stats-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; } }

  .stat-card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    padding: 20px 18px;
    border: 1px solid rgba(20,184,166,0.12);
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .stat-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
  .stat-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--accent, var(--teal-400));
  }
  .stat-card-top { display: flex; align-items: flex-start; justify-content: space-between; }
  .stat-card-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    flex-shrink: 0;
    background: var(--icon-bg, var(--teal-50));
    color: var(--icon-color, var(--teal-600));
  }
  .stat-label { font-size: 12px; font-weight: 600; margin-bottom: 4px; color: var(--label-color, var(--teal-600)); }
  .stat-value {
    font-family: 'Syne', sans-serif;
    font-size: clamp(24px, 3.5vw, 30px);
    font-weight: 800;
    line-height: 1;
    margin: 6px 0 2px;
    color: var(--value-color, var(--teal-800));
  }
  .stat-sub { font-size: 11px; color: var(--sub-color, var(--teal-500)); }
  .stat-bar-track { width: 100%; height: 5px; border-radius: 3px; margin-top: 12px; background: var(--track, var(--teal-100)); overflow: hidden; }
  .stat-bar-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; background: var(--fill, var(--teal-400)); }

  /* ── Two-col layout ── */
  .main-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  @media (min-width: 1024px) { .main-grid { grid-template-columns: 2fr 1fr; gap: 24px; } }

  /* ── Card base ── */
  .card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    border: 1px solid rgba(20,184,166,0.10);
    overflow: hidden;
  }
  .card-padded { padding: 24px; }
  @media (min-width: 640px) { .card-padded { padding: 28px 30px; } }

  .card-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px;
  }
  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700;
    color: var(--teal-800);
    display: flex; align-items: center; gap: 8px;
    margin: 0;
  }
  .card-title-icon {
    width: 28px; height: 28px;
    background: linear-gradient(135deg, var(--teal-100), var(--teal-200));
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    color: var(--teal-600); font-size: 13px;
  }
  .card-badge {
    font-size: 11px; font-weight: 600;
    background: var(--teal-50); color: var(--teal-700);
    border: 1px solid var(--teal-200);
    padding: 3px 10px; border-radius: 20px;
  }

  /* ── Completion Items ── */
  .completion-list { display: flex; flex-direction: column; gap: 10px; }

  .completion-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 16px;
    border-radius: var(--radius-md);
    background: var(--teal-50);
    border: 1px solid var(--teal-100);
    transition: all 0.2s ease;
    cursor: default;
  }
  @media (min-width: 540px) {
    .completion-item { flex-direction: row; align-items: center; justify-content: space-between; }
  }
  .completion-item:hover { background: var(--teal-100); border-color: var(--teal-200); }

  .completion-left { display: flex; align-items: flex-start; gap: 12px; flex: 1; min-width: 0; }
  .completion-icon-wrap {
    width: 34px; height: 34px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; flex-shrink: 0;
  }
  .completion-title { font-size: 14px; font-weight: 600; color: var(--slate-800); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .completion-desc { font-size: 12px; color: var(--slate-500); margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .completion-meta { display: flex; align-items: center; gap: 12px; margin-top: 6px; flex-wrap: wrap; }
  .completion-meta-item { display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--slate-500); }

  .completion-right { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; flex-shrink: 0; }
  @media (min-width: 540px) { .completion-right { align-items: flex-end; } }
  .efficiency-badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; white-space: nowrap; }
  .time-label { font-size: 11px; color: var(--slate-500); }

  /* ── Side panels ── */
  .side-stack { display: flex; flex-direction: column; gap: 20px; }

  /* Weekly productivity */
  .week-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .week-row:last-child { margin-bottom: 0; }
  .week-name { font-size: 13px; color: var(--slate-600); min-width: 70px; }
  .week-bar-wrap { display: flex; align-items: center; gap: 8px; flex: 1; }
  .week-track { flex: 1; height: 7px; background: var(--teal-100); border-radius: 4px; overflow: hidden; }
  .week-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }
  .week-pct { font-size: 12px; font-weight: 700; color: var(--teal-700); width: 36px; text-align: right; }

  /* Efficiency Distribution */
  .eff-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .eff-row:last-child { margin-bottom: 0; }
  .eff-label { font-size: 12px; color: var(--slate-600); flex: 1; }
  .eff-bar-wrap { display: flex; align-items: center; gap: 8px; }
  .eff-track { width: 70px; height: 8px; border-radius: 4px; overflow: hidden; }
  @media (min-width: 480px) { .eff-track { width: 90px; } }
  .eff-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
  .eff-pct { font-size: 12px; font-weight: 700; width: 32px; text-align: right; }

  /* Insights Panel */
  .insights-card {
    border-radius: var(--radius-lg);
    background: linear-gradient(135deg, var(--teal-600) 0%, var(--teal-800) 100%);
    padding: 24px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(13,148,136,0.35);
  }
  .insights-card::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 180px; height: 180px;
    background: rgba(255,255,255,0.06);
    border-radius: 50%;
  }
  .insights-card::after {
    content: '';
    position: absolute;
    bottom: -40px; left: -40px;
    width: 130px; height: 130px;
    background: rgba(255,255,255,0.04);
    border-radius: 50%;
  }
  .insights-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700;
    color: #fff; margin: 0 0 16px 0;
    display: flex; align-items: center; gap: 8px;
    position: relative; z-index: 1;
  }
  .insights-list { display: flex; flex-direction: column; gap: 11px; position: relative; z-index: 1; }
  .insight-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.9); line-height: 1.4; }
  .insight-icon { flex-shrink: 0; margin-top: 1px; font-size: 14px; }
  .insight-green  { color: #6ee7b7; }
  .insight-yellow { color: #fde68a; }
  .insight-blue   { color: #a5f3fc; }

  .divider { height: 1px; background: var(--teal-100); margin: 0; }
`;

const taskHistoryData = [
  { id: 1, title: 'Complete Monthly Sales Report', description: 'Prepare and submit the monthly sales performance report', status: 'completed', priority: 'high', dueDate: '2024-01-20', assignedDate: '2024-01-15', completedDate: '2024-01-19', estimatedHours: 8, actualHours: 6.5, assigner: 'Priya Patel', category: 'Reporting', efficiency: 123 },
  { id: 2, title: 'Customer Feedback Analysis', description: 'Analyze recent customer feedback and prepare suggestions', status: 'completed', priority: 'medium', dueDate: '2024-01-24', assignedDate: '2024-01-20', completedDate: '2024-01-23', estimatedHours: 6, actualHours: 5.5, assigner: 'Priya Patel', category: 'Analysis', efficiency: 109 },
  { id: 3, title: 'Social Media Campaign', description: 'Create and schedule social media posts for product launch', status: 'completed', priority: 'medium', dueDate: '2024-01-28', assignedDate: '2024-01-22', completedDate: '2024-01-26', estimatedHours: 10, actualHours: 8, assigner: 'Neha Singh', category: 'Marketing', efficiency: 125 },
  { id: 4, title: 'Vendor Contract Review', description: 'Review and finalize contracts with new vendors', status: 'completed', priority: 'high', dueDate: '2024-01-19', assignedDate: '2024-01-12', completedDate: '2024-01-18', estimatedHours: 7, actualHours: 9, assigner: 'Arjun Mehta', category: 'Legal', efficiency: 78 },
  { id: 5, title: 'Team Training Documentation', description: 'Prepare training materials for new team members', status: 'completed', priority: 'low', dueDate: '2024-01-30', assignedDate: '2024-01-25', completedDate: '2024-01-28', estimatedHours: 5, actualHours: 4, assigner: 'Anjali Sharma', category: 'Training', efficiency: 125 },
  { id: 6, title: 'Website Performance Audit', description: 'Conduct performance audit and optimization', status: 'completed', priority: 'high', dueDate: '2024-01-22', assignedDate: '2024-01-18', completedDate: '2024-01-21', estimatedHours: 12, actualHours: 10, assigner: 'Rajesh Kumar', category: 'Technical', efficiency: 120 },
  { id: 7, title: 'Client Proposal Draft', description: 'Draft proposal for new client acquisition', status: 'completed', priority: 'medium', dueDate: '2024-01-25', assignedDate: '2024-01-20', completedDate: '2024-01-24', estimatedHours: 8, actualHours: 9.5, assigner: 'Meera Joshi', category: 'Sales', efficiency: 84 },
  { id: 8, title: 'Budget Review Meeting', description: 'Quarterly budget review and planning session', status: 'completed', priority: 'high', dueDate: '2024-01-31', assignedDate: '2024-01-28', completedDate: '2024-01-30', estimatedHours: 6, actualHours: 5, assigner: 'Amit Verma', category: 'Finance', efficiency: 120 },
];

const productivityTrend = [
  { week: 'Week 1', productivity: 85 },
  { week: 'Week 2', productivity: 92 },
  { week: 'Week 3', productivity: 78 },
  { week: 'Week 4', productivity: 100 },
  { week: 'Current', productivity: 105 },
];

const efficiencyDist = [
  { label: 'Excellent (110%+)', pct: 45, trackBg: '#d1fae5', fillBg: '#10b981' },
  { label: 'Good (90–109%)',    pct: 35, trackBg: '#fef9c3', fillBg: '#f59e0b' },
  { label: 'Needs Improvement',pct: 20, trackBg: '#fee2e2', fillBg: '#ef4444' },
];

const getEffInfo = eff => {
  if (eff >= 110) return { text: 'Excellent',         cls: 'bg:#dcfce7;color:#166534;', iconBg: '#dcfce7', iconColor: '#16a34a' };
  if (eff >= 90)  return { text: 'Good',              cls: 'bg:#fef9c3;color:#854d0e;', iconBg: '#fef9c3', iconColor: '#b45309' };
  return              { text: 'Needs Improvement', cls: 'bg:#fee2e2;color:#991b1b;', iconBg: '#fee2e2', iconColor: '#dc2626' };
};

const weekFillColor = p => p >= 100 ? 'var(--teal-500)' : p >= 80 ? '#f59e0b' : '#ef4444';

const TaskHistory = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [stats, setStats] = useState({});

  useEffect(() => {
    const total = taskHistoryData.length;
    const avgEff = Math.round(taskHistoryData.reduce((a, t) => a + t.efficiency, 0) / total);
    const avgDays = Math.round(taskHistoryData.reduce((a, t) => {
      return a + (new Date(t.completedDate) - new Date(t.assignedDate)) / 86400000;
    }, 0) / total * 10) / 10;
    const onTime = taskHistoryData.filter(t => new Date(t.completedDate) <= new Date(t.dueDate)).length;
    const prodScore = Math.round(taskHistoryData.reduce((a, t) => a + Math.min(t.efficiency, 150), 0) / total);
    setStats({ total, avgEff, avgDays, onTimeRate: Math.round((onTime / total) * 100), prodScore });
  }, [timeRange]);

  const statCards = [
    {
      label: 'Productivity Score', value: stats.prodScore || 0, sub: 'Overall efficiency',
      accent: 'var(--teal-400)', iconBg: 'var(--teal-50)', iconColor: 'var(--teal-600)', icon: <FiAward />,
      labelColor: 'var(--teal-600)', valueColor: 'var(--teal-800)', subColor: 'var(--teal-500)',
      bar: true, barFill: stats.prodScore || 0,
    },
    {
      label: 'Tasks Completed', value: stats.total || 0, sub: 'Total completed',
      accent: '#06b6d4', iconBg: '#ecfeff', iconColor: '#0e7490', icon: <FiCheckCircle />,
      labelColor: '#0e7490', valueColor: '#164e63', subColor: '#0891b2',
    },
    {
      label: 'Avg. Completion', value: `${stats.avgDays || 0}d`, sub: 'Days per task',
      accent: '#a78bfa', iconBg: '#f5f3ff', iconColor: '#7c3aed', icon: <FiClock />,
      labelColor: '#7c3aed', valueColor: '#4c1d95', subColor: '#6d28d9',
    },
    {
      label: 'On-Time Delivery', value: `${stats.onTimeRate || 0}%`, sub: 'Meeting deadlines',
      accent: '#fb923c', iconBg: '#fff7ed', iconColor: '#c2410c', icon: <FiTarget />,
      labelColor: '#c2410c', valueColor: '#7c2d12', subColor: '#ea580c',
    },
  ];

  const recentCompletions = [...taskHistoryData]
    .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
    .slice(0, 6);

  return (
    <div className="th-root">
      <style>{style}</style>
      <div className="th-inner">

        {/* ── Header ── */}
        <div className="th-header">
          <div>
            <h1 className="th-title">
              <span className="th-title-icon"><FiTrendingUp /></span>
              Task History & Analytics
            </h1>
            <p className="th-subtitle">Track your productivity and completion patterns over time</p>
          </div>
          <div className="header-actions">
            <select className="select-filter" value={timeRange} onChange={e => setTimeRange(e.target.value)}>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
            <button className="btn-export" onClick={() => alert('Exported!')}>
              <FiDownload style={{ fontSize: 14 }} /> Export Report
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="stats-grid">
          {statCards.map((s, i) => (
            <div key={i} className="stat-card" style={{ '--accent': s.accent }}>
              <div className="stat-card-top">
                <div>
                  <div className="stat-label" style={{ color: s.labelColor }}>{s.label}</div>
                  <div className="stat-value" style={{ color: s.valueColor }}>{s.value}</div>
                  <div className="stat-sub" style={{ color: s.subColor }}>{s.sub}</div>
                </div>
                <div className="stat-card-icon" style={{ background: s.iconBg, color: s.iconColor }}>
                  {s.icon}
                </div>
              </div>
              {s.bar && (
                <div className="stat-bar-track" style={{ '--track': 'var(--teal-100)' }}>
                  <div className="stat-bar-fill" style={{ width: `${Math.min(s.barFill, 100)}%`, '--fill': s.accent }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Main Grid ── */}
        <div className="main-grid">

          {/* Recent Completions */}
          <div className="card card-padded">
            <div className="card-header">
              <h2 className="card-title">
                <span className="card-title-icon"><FiCheckCircle /></span>
                Recently Completed Tasks
              </h2>
              <span className="card-badge">{recentCompletions.length} tasks</span>
            </div>
            <div className="completion-list">
              {recentCompletions.map(task => {
                const eff = getEffInfo(task.efficiency);
                return (
                  <div key={task.id} className="completion-item">
                    <div className="completion-left">
                      <div
                        className="completion-icon-wrap"
                        style={{ background: eff.iconBg, color: eff.iconColor }}
                      >
                        <FiCheckCircle />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="completion-title">{task.title}</div>
                        <div className="completion-desc">{task.description}</div>
                        <div className="completion-meta">
                          <span className="completion-meta-item">
                            <FiCalendar style={{ fontSize: 11 }} />
                            {new Date(task.completedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="completion-meta-item" style={{
                            background: 'var(--teal-50)', color: 'var(--teal-700)',
                            border: '1px solid var(--teal-200)', borderRadius: 6,
                            padding: '1px 7px', fontWeight: 600, fontSize: 10
                          }}>
                            {task.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="completion-right">
                      <span
                        className="efficiency-badge"
                        style={{ background: eff.iconBg, color: eff.iconColor, border: `1px solid ${eff.iconBg}` }}
                      >
                        {task.efficiency}% — {eff.text}
                      </span>
                      <span className="time-label">{task.actualHours}h / {task.estimatedHours}h est.</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side column */}
          <div className="side-stack">

            {/* Weekly Productivity */}
            <div className="card card-padded">
              <div className="card-header" style={{ marginBottom: 16 }}>
                <h3 className="card-title">
                  <span className="card-title-icon"><FiBarChart2 /></span>
                  Weekly Productivity
                </h3>
              </div>
              {productivityTrend.map((w, i) => (
                <div key={i} className="week-row">
                  <span className="week-name">{w.week}</span>
                  <div className="week-bar-wrap">
                    <div className="week-track">
                      <div
                        className="week-fill"
                        style={{ width: `${Math.min(w.productivity, 100)}%`, background: weekFillColor(w.productivity) }}
                      />
                    </div>
                    <span className="week-pct" style={{ color: weekFillColor(w.productivity) }}>{w.productivity}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Efficiency Distribution */}
            <div className="card card-padded">
              <div className="card-header" style={{ marginBottom: 16 }}>
                <h3 className="card-title">
                  <span className="card-title-icon"><FiPieChart /></span>
                  Efficiency Distribution
                </h3>
              </div>
              {efficiencyDist.map((e, i) => (
                <div key={i} className="eff-row">
                  <span className="eff-label">{e.label}</span>
                  <div className="eff-bar-wrap">
                    <div className="eff-track" style={{ background: e.trackBg }}>
                      <div className="eff-fill" style={{ width: `${e.pct}%`, background: e.fillBg }} />
                    </div>
                    <span className="eff-pct" style={{ color: e.fillBg }}>{e.pct}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance Insights */}
            <div className="insights-card">
              <h3 className="insights-title">
                <FiStar style={{ color: '#fde68a', fontSize: 16 }} />
                Performance Insights
              </h3>
              <div className="insights-list">
                {[
                  { icon: <FiActivity className="insight-green" />, text: "You're 23% more productive than last month" },
                  { icon: <FiCheckCircle className="insight-green" />, text: 'Best task: Social Media Campaign at 125% efficiency' },
                  { icon: <FiClock className="insight-yellow" />, text: 'Avg. completion time improved by 2 days' },
                  { icon: <FiTarget className="insight-blue" />, text: '92% of tasks completed before deadline' },
                ].map((ins, i) => (
                  <div key={i} className="insight-item">
                    <span className="insight-icon">{ins.icon}</span>
                    <span>{ins.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskHistory;