import React, { useState, useEffect } from 'react';
import {
  FiTrendingUp,
  FiAward,
  FiTarget,
  FiBarChart2,
  FiPieChart,
  FiCalendar,
  FiClock,
  FiUser,
  FiCheckCircle,
  FiStar,
  FiActivity,
  FiDownload,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiZap
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
    --shadow-sm: 0 1px 3px rgba(13,148,136,0.08);
    --shadow-md: 0 4px 16px rgba(13,148,136,0.10), 0 2px 6px rgba(13,148,136,0.06);
    --shadow-lg: 0 10px 40px rgba(13,148,136,0.14), 0 4px 12px rgba(13,148,136,0.08);
    --shadow-glow: 0 0 0 3px rgba(20,184,166,0.15);
  }

  * { box-sizing: border-box; }

  .pp-root {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f0fdfa 0%, #e6faf7 40%, #f0fdf9 70%, #ecfdf5 100%);
    position: relative;
    overflow-x: hidden;
  }
  .pp-root::before {
    content: '';
    position: fixed; top: -200px; right: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(20,184,166,0.09) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }
  .pp-root::after {
    content: '';
    position: fixed; bottom: -150px; left: -150px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .pp-inner {
    position: relative; z-index: 1;
    max-width: 1280px; margin: 0 auto;
    padding: 24px 16px 64px;
  }
  @media (min-width: 640px)  { .pp-inner { padding: 32px 24px 64px; } }
  @media (min-width: 1024px) { .pp-inner { padding: 40px 40px 80px; } }

  /* ── Header ── */
  .pp-header {
    display: flex; flex-direction: column; gap: 16px;
    margin-bottom: 36px;
  }
  @media (min-width: 640px) {
    .pp-header { flex-direction: row; align-items: flex-start; justify-content: space-between; }
  }
  .pp-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(22px, 4vw, 32px);
    font-weight: 800;
    color: var(--teal-800);
    letter-spacing: -0.5px;
    line-height: 1.1;
    display: flex; align-items: center; gap: 12px;
    margin: 0 0 6px 0;
  }
  .pp-title-icon {
    width: 42px; height: 42px;
    background: linear-gradient(135deg, var(--teal-400), var(--teal-600));
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 19px; flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(13,148,136,0.3);
  }
  .pp-subtitle { font-size: 14px; color: var(--slate-500); margin: 0; }

  .header-actions { display: flex; gap: 10px; flex-wrap: wrap; }

  .select-filter {
    padding: 10px 32px 10px 14px;
    border: 1.5px solid var(--teal-100);
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500;
    color: var(--slate-600); background: var(--surface-2);
    outline: none; cursor: pointer;
    transition: all 0.2s;
    appearance: none; -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230d9488' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 10px center;
  }
  .select-filter:focus { border-color: var(--teal-400); box-shadow: var(--shadow-glow); }

  .btn-export {
    display: inline-flex; align-items: center; gap: 7px;
    background: linear-gradient(135deg, var(--teal-500), var(--teal-600));
    color: #fff; border: none; border-radius: var(--radius-sm);
    padding: 10px 20px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(13,148,136,0.28);
    white-space: nowrap;
  }
  .btn-export:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(13,148,136,0.38);
    background: linear-gradient(135deg, var(--teal-400), var(--teal-500));
  }

  /* ── Stat Cards ── */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px; margin-bottom: 24px;
  }
  @media (min-width: 768px)  { .stats-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; } }

  .stat-card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    padding: 20px 18px;
    border: 1px solid rgba(20,184,166,0.10);
    box-shadow: var(--shadow-md);
    position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .stat-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
  .stat-card::before {
    content: '';
    position: absolute; top: 0; left: 0; bottom: 0; width: 4px;
    background: var(--accent, var(--teal-400));
    border-radius: 0 2px 2px 0;
  }
  .stat-top { display: flex; align-items: flex-start; justify-content: space-between; }
  .stat-icon {
    width: 42px; height: 42px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .stat-label { font-size: 12px; font-weight: 600; margin-bottom: 4px; }
  .stat-value {
    font-family: 'Syne', sans-serif;
    font-size: clamp(22px, 3.5vw, 28px); font-weight: 800;
    line-height: 1; margin: 6px 0 2px;
  }
  .stat-sub { font-size: 11px; }
  .stat-bar-track { width: 100%; height: 5px; border-radius: 3px; margin-top: 14px; overflow: hidden; }
  .stat-bar-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; }
  .stat-trend { display: flex; align-items: center; gap: 5px; margin-top: 10px; font-size: 12px; font-weight: 500; }

  /* ── Card base ── */
  .card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    border: 1px solid rgba(20,184,166,0.10);
    overflow: hidden;
  }
  .card-padded { padding: 24px; }
  @media (min-width: 640px) { .card-padded { padding: 26px 28px; } }

  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700;
    color: var(--teal-800);
    display: flex; align-items: center; gap: 8px; margin: 0;
  }
  .card-title-icon {
    width: 28px; height: 28px; border-radius: 7px;
    background: linear-gradient(135deg, var(--teal-100), var(--teal-200));
    display: flex; align-items: center; justify-content: center;
    color: var(--teal-600); font-size: 13px;
  }
  .card-badge {
    font-size: 11px; font-weight: 600;
    background: var(--teal-50); color: var(--teal-700);
    border: 1px solid var(--teal-200); padding: 3px 10px; border-radius: 20px;
  }

  /* ── Grids ── */
  .grid-2-1 { display: grid; grid-template-columns: 1fr; gap: 20px; margin-bottom: 20px; }
  @media (min-width: 1024px) { .grid-2-1 { grid-template-columns: 2fr 1fr; gap: 24px; } }

  .grid-1-1 { display: grid; grid-template-columns: 1fr; gap: 20px; margin-bottom: 20px; }
  @media (min-width: 768px)  { .grid-1-1 { grid-template-columns: 1fr 1fr; gap: 24px; } }

  .grid-4 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media (min-width: 768px)  { .grid-4 { grid-template-columns: repeat(4, 1fr); gap: 16px; } }

  /* ── Productivity Chart ── */
  .chart-wrap {
    display: flex; align-items: flex-end; justify-content: space-between;
    height: 160px; gap: 6px; padding-bottom: 28px;
    margin-top: 16px;
  }
  .chart-col { display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; justify-content: flex-end; }
  .chart-bar-outer {
    width: 100%; background: var(--teal-50);
    border-radius: 6px 6px 0 0;
    border: 1px solid var(--teal-100);
    display: flex; flex-direction: column; justify-content: flex-end;
    height: 120px; overflow: hidden; position: relative;
  }
  .chart-bar-inner {
    background: linear-gradient(to top, var(--teal-600), var(--teal-400));
    border-radius: 5px 5px 0 0;
    transition: height 0.7s ease;
    position: relative;
  }
  .chart-score {
    font-size: 11px; font-weight: 700; color: var(--teal-700);
    margin-top: 6px; text-align: center;
  }
  .chart-month { font-size: 10px; color: var(--slate-400); font-weight: 500; margin-top: 2px; }

  /* ── Task Distribution ── */
  .dist-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .dist-row:last-child { margin-bottom: 0; }
  .dist-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .dist-label { font-size: 13px; color: var(--slate-600); flex: 1; margin-left: 10px; }
  .dist-bar-wrap { display: flex; align-items: center; gap: 8px; }
  .dist-track { width: 80px; height: 6px; background: var(--slate-100); border-radius: 3px; overflow: hidden; }
  @media (min-width: 480px) { .dist-track { width: 100px; } }
  .dist-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
  .dist-count { font-size: 12px; font-weight: 700; color: var(--slate-700); width: 24px; text-align: right; }

  .section-divider { height: 1px; background: var(--teal-100); margin: 20px 0; }
  .subsection-title {
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 700; color: var(--teal-800); margin: 0 0 14px 0;
  }

  .pri-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .pri-row:last-child { margin-bottom: 0; }
  .pri-label { font-size: 12px; font-weight: 500; color: var(--slate-600); text-transform: capitalize; min-width: 56px; }
  .pri-bar-wrap { display: flex; align-items: center; gap: 8px; flex: 1; margin-left: 8px; }
  .pri-track { flex: 1; height: 7px; background: var(--slate-100); border-radius: 4px; overflow: hidden; }
  .pri-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
  .pri-pct { font-size: 12px; font-weight: 700; color: var(--teal-700); width: 36px; text-align: right; }

  /* ── Weekly Performance ── */
  .weekly-row {
    display: flex; align-items: center;
    margin-bottom: 10px; gap: 10px;
  }
  .weekly-row:last-child { margin-bottom: 0; }
  .weekly-day { font-size: 12px; font-weight: 600; color: var(--slate-600); width: 30px; flex-shrink: 0; }
  .weekly-track { flex: 1; height: 8px; background: var(--teal-50); border-radius: 4px; overflow: hidden; border: 1px solid var(--teal-100); }
  .weekly-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
  .weekly-pct { font-size: 11px; font-weight: 700; width: 36px; text-align: right; flex-shrink: 0; }
  .weekly-tasks { font-size: 11px; color: var(--slate-400); width: 44px; text-align: right; flex-shrink: 0; white-space: nowrap; }

  /* ── Team Comparison ── */
  .team-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 14px; border-radius: var(--radius-md);
    margin-bottom: 8px; transition: all 0.15s ease;
  }
  .team-row:last-child { margin-bottom: 0; }
  .team-row-self {
    background: var(--teal-50);
    border: 1.5px solid var(--teal-200);
  }
  .team-row-other {
    background: var(--slate-50);
    border: 1px solid var(--slate-100);
  }
  .team-row-other:hover { background: var(--teal-50); border-color: var(--teal-100); }
  .team-left { display: flex; align-items: center; gap: 10px; }
  .team-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 800;
    color: #fff; flex-shrink: 0;
    background: linear-gradient(135deg, var(--teal-400), var(--teal-600));
  }
  .team-avatar-self { background: linear-gradient(135deg, var(--teal-500), var(--teal-700)); }
  .team-name { font-size: 13px; font-weight: 600; color: var(--slate-700); }
  .team-name-self { color: var(--teal-700); }
  .team-eff { display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--slate-500); margin-top: 2px; }
  .team-score { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: var(--teal-700); }
  .team-tasks { font-size: 11px; color: var(--slate-400); text-align: right; }

  /* ── Achievements ── */
  .ach-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media (min-width: 768px) { .ach-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; } }

  .ach-card {
    background: linear-gradient(135deg, #fffbeb, #fef3c7);
    border-radius: var(--radius-md);
    padding: 16px;
    border: 1px solid #fde68a;
    transition: all 0.2s ease;
    position: relative; overflow: hidden;
  }
  .ach-card::before {
    content: '';
    position: absolute; top: -20px; right: -20px;
    width: 70px; height: 70px;
    background: rgba(251,191,36,0.1); border-radius: 50%;
  }
  .ach-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(245,158,11,0.2); }
  .ach-icon-wrap {
    width: 38px; height: 38px; border-radius: 10px;
    background: rgba(251,191,36,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 10px;
  }
  .ach-title { font-size: 13px; font-weight: 700; color: var(--slate-800); margin: 0 0 4px 0; }
  .ach-desc { font-size: 11px; color: var(--slate-500); line-height: 1.4; margin: 0 0 10px 0; }
  .ach-footer { display: flex; align-items: center; justify-content: space-between; }
  .ach-date { font-size: 10px; color: var(--slate-400); }
  .ach-pts { font-size: 11px; font-weight: 700; color: #d97706; background: rgba(217,119,6,0.1); padding: 2px 8px; border-radius: 20px; }

  /* ── Bottom Insight Panels ── */
  .insight-panel {
    border-radius: var(--radius-lg);
    padding: 24px;
    position: relative; overflow: hidden;
    color: #fff;
  }
  .insight-panel::before {
    content: '';
    position: absolute; top: -50px; right: -50px;
    width: 160px; height: 160px;
    background: rgba(255,255,255,0.07); border-radius: 50%;
  }
  .insight-panel::after {
    content: '';
    position: absolute; bottom: -40px; left: -40px;
    width: 120px; height: 120px;
    background: rgba(255,255,255,0.04); border-radius: 50%;
  }
  .insight-panel-teal { background: linear-gradient(135deg, var(--teal-600), var(--teal-800)); box-shadow: 0 8px 32px rgba(13,148,136,0.35); }
  .insight-panel-emerald { background: linear-gradient(135deg, #059669, #0f766e); box-shadow: 0 8px 32px rgba(5,150,105,0.3); }
  .insight-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700;
    display: flex; align-items: center; gap: 8px;
    margin: 0 0 16px 0; position: relative; z-index: 1;
    color: #fff;
  }
  .insight-list { display: flex; flex-direction: column; gap: 11px; position: relative; z-index: 1; }
  .insight-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.9); line-height: 1.45; }
  .insight-bullet { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.6); margin-top: 5px; flex-shrink: 0; }
`;

const performanceData = {
  overallScore: 87,
  tasksCompleted: 156,
  avgCompletionTime: 2.3,
  onTimeRate: 94,
  efficiency: 112,
  productivityTrend: [
    { month: 'Jan', score: 78 },
    { month: 'Feb', score: 82 },
    { month: 'Mar', score: 85 },
    { month: 'Apr', score: 87 },
    { month: 'May', score: 90 },
    { month: 'Jun', score: 87 },
  ],
  taskBreakdown: [
    { type: 'Completed',   count: 156, dot: '#22c55e', fill: '#22c55e' },
    { type: 'In Progress', count: 12,  dot: '#06b6d4', fill: '#06b6d4' },
    { type: 'Pending',     count: 8,   dot: '#f59e0b', fill: '#f59e0b' },
    { type: 'Overdue',     count: 3,   dot: '#ef4444', fill: '#ef4444' },
  ],
  priorityPerformance: [
    { priority: 'High',   rate: 94, color: '#ef4444' },
    { priority: 'Medium', rate: 95, color: '#f59e0b' },
    { priority: 'Low',    rate: 87, color: 'var(--teal-500)' },
  ],
  achievements: [
    { id: 1, title: 'Early Bird',       description: 'Completed 10+ tasks before deadline',       icon: '🏆', date: '2024-06-15', points: 50  },
    { id: 2, title: 'Efficiency Master',description: 'Maintained 120%+ efficiency for 2 weeks',  icon: '⚡', date: '2024-06-10', points: 75  },
    { id: 3, title: 'Task Champion',    description: 'Completed 50 tasks in a month',             icon: '🎯', date: '2024-06-05', points: 100 },
    { id: 4, title: 'Quality Star',     description: 'Zero revisions needed for 20 tasks',        icon: '⭐', date: '2024-05-28', points: 60  },
  ],
  teamStats: [
    { name: 'You',          score: 87, tasks: 156, efficiency: 112, trend: 'up'   },
    { name: 'Alex Chen',    score: 82, tasks: 142, efficiency: 105, trend: 'up'   },
    { name: 'Priya Sharma', score: 79, tasks: 138, efficiency: 98,  trend: 'down' },
    { name: 'Mike Johnson', score: 85, tasks: 148, efficiency: 108, trend: 'up'   },
    { name: 'Sarah Wilson', score: 91, tasks: 162, efficiency: 118, trend: 'up'   },
  ],
  weeklyPerformance: [
    { day: 'Mon', productivity: 85, tasks: 8  },
    { day: 'Tue', productivity: 92, tasks: 10 },
    { day: 'Wed', productivity: 88, tasks: 9  },
    { day: 'Thu', productivity: 95, tasks: 11 },
    { day: 'Fri', productivity: 82, tasks: 7  },
    { day: 'Sat', productivity: 65, tasks: 4  },
    { day: 'Sun', productivity: 45, tasks: 2  },
  ],
};

const weeklyFillColor = p => p >= 90 ? 'var(--teal-500)' : p >= 70 ? '#f59e0b' : '#ef4444';

const PerformancePage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const totalTasks = performanceData.taskBreakdown.reduce((s, i) => s + i.count, 0);

  const statCards = [
    {
      label: 'Overall Score', value: `${performanceData.overallScore}/100`, sub: 'Performance rating',
      accent: 'var(--teal-400)', iconBg: 'var(--teal-50)', iconColor: 'var(--teal-600)',
      labelColor: 'var(--teal-600)', valueColor: 'var(--teal-800)', subColor: 'var(--teal-500)',
      icon: <FiAward />,
      bar: true, barPct: performanceData.overallScore, barFill: 'var(--teal-500)', barTrack: 'var(--teal-100)',
      trend: '+5 pts this month', trendColor: '#16a34a',
    },
    {
      label: 'Tasks Completed', value: performanceData.tasksCompleted, sub: 'Total completed',
      accent: '#22c55e', iconBg: '#f0fdf4', iconColor: '#16a34a',
      labelColor: '#16a34a', valueColor: '#14532d', subColor: '#15803d',
      icon: <FiCheckCircle />,
      trend: '+12% from last month', trendColor: '#16a34a',
    },
    {
      label: 'Avg. Completion', value: `${performanceData.avgCompletionTime}d`, sub: 'Per task',
      accent: '#a78bfa', iconBg: '#f5f3ff', iconColor: '#7c3aed',
      labelColor: '#7c3aed', valueColor: '#4c1d95', subColor: '#6d28d9',
      icon: <FiClock />,
      trend: '−0.5 days improvement', trendColor: '#16a34a',
    },
    {
      label: 'Efficiency', value: `${performanceData.efficiency}%`, sub: 'Vs estimated',
      accent: '#fb923c', iconBg: '#fff7ed', iconColor: '#c2410c',
      labelColor: '#c2410c', valueColor: '#7c2d12', subColor: '#ea580c',
      icon: <FiTarget />,
      trend: '+8% better than target', trendColor: '#16a34a',
    },
  ];

  return (
    <div className="pp-root">
      <style>{style}</style>
      <div className="pp-inner">

        {/* Header */}
        <div className="pp-header">
          <div>
            <h1 className="pp-title">
              <span className="pp-title-icon"><FiActivity /></span>
              Performance Analytics
            </h1>
            <p className="pp-subtitle">Track your productivity, efficiency, and performance metrics</p>
          </div>
          <div className="header-actions">
            <select className="select-filter" value={timeRange} onChange={e => setTimeRange(e.target.value)}>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button className="btn-export" onClick={() => alert('Exported!')}>
              <FiDownload style={{ fontSize: 14 }} /> Export Report
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {statCards.map((s, i) => (
            <div key={i} className="stat-card" style={{ '--accent': s.accent }}>
              <div className="stat-top">
                <div>
                  <div className="stat-label" style={{ color: s.labelColor }}>{s.label}</div>
                  <div className="stat-value" style={{ color: s.valueColor }}>{s.value}</div>
                  <div className="stat-sub" style={{ color: s.subColor }}>{s.sub}</div>
                </div>
                <div className="stat-icon" style={{ background: s.iconBg, color: s.iconColor }}>{s.icon}</div>
              </div>
              {s.bar && (
                <div className="stat-bar-track" style={{ background: s.barTrack }}>
                  <div className="stat-bar-fill" style={{ width: `${s.barPct}%`, background: s.barFill }} />
                </div>
              )}
              <div className="stat-trend" style={{ color: s.trendColor }}>
                <FiTrendingUp style={{ fontSize: 12 }} /> {s.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Productivity Chart + Distribution */}
        <div className="grid-2-1">
          <div className="card card-padded">
            <div className="card-header">
              <h2 className="card-title">
                <span className="card-title-icon"><FiTrendingUp /></span>
                Productivity Trend
              </h2>
              <span className="card-badge">Last 6 Months</span>
            </div>
            <div className="chart-wrap">
              {performanceData.productivityTrend.map((m, i) => (
                <div key={i} className="chart-col">
                  <div className="chart-bar-outer">
                    <div className="chart-bar-inner" style={{ height: `${m.score}%` }} />
                  </div>
                  <div className="chart-score">{m.score}</div>
                  <div className="chart-month">{m.month}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card card-padded">
            <div className="card-header">
              <h2 className="card-title">
                <span className="card-title-icon"><FiPieChart /></span>
                Task Distribution
              </h2>
            </div>
            {performanceData.taskBreakdown.map((item, i) => (
              <div key={i} className="dist-row">
                <div className="dist-dot" style={{ background: item.dot }} />
                <span className="dist-label">{item.type}</span>
                <div className="dist-bar-wrap">
                  <div className="dist-track">
                    <div className="dist-fill" style={{ width: `${(item.count / totalTasks) * 100}%`, background: item.fill }} />
                  </div>
                  <span className="dist-count">{item.count}</span>
                </div>
              </div>
            ))}

            <div className="section-divider" />
            <p className="subsection-title">Priority Performance</p>
            {performanceData.priorityPerformance.map((p, i) => (
              <div key={i} className="pri-row">
                <span className="pri-label">{p.priority}</span>
                <div className="pri-bar-wrap">
                  <div className="pri-track">
                    <div className="pri-fill" style={{ width: `${p.rate}%`, background: p.color }} />
                  </div>
                  <span className="pri-pct">{p.rate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly + Team */}
        <div className="grid-1-1">
          <div className="card card-padded">
            <div className="card-header">
              <h2 className="card-title">
                <span className="card-title-icon"><FiCalendar /></span>
                Weekly Performance
              </h2>
            </div>
            {performanceData.weeklyPerformance.map((d, i) => (
              <div key={i} className="weekly-row">
                <span className="weekly-day">{d.day}</span>
                <div className="weekly-track">
                  <div className="weekly-fill" style={{ width: `${d.productivity}%`, background: weeklyFillColor(d.productivity) }} />
                </div>
                <span className="weekly-pct" style={{ color: weeklyFillColor(d.productivity) }}>{d.productivity}%</span>
                <span className="weekly-tasks">{d.tasks} tasks</span>
              </div>
            ))}
          </div>

          <div className="card card-padded">
            <div className="card-header">
              <h2 className="card-title">
                <span className="card-title-icon"><FiUser /></span>
                Team Comparison
              </h2>
              <span className="card-badge">This Month</span>
            </div>
            {performanceData.teamStats.map((m, i) => {
              const isSelf = m.name === 'You';
              return (
                <div key={i} className={`team-row ${isSelf ? 'team-row-self' : 'team-row-other'}`}>
                  <div className="team-left">
                    <div className={`team-avatar ${isSelf ? 'team-avatar-self' : ''}`}>
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div className={`team-name ${isSelf ? 'team-name-self' : ''}`}>{m.name}</div>
                      <div className="team-eff">
                        {m.trend === 'up'
                          ? <FiArrowUp style={{ color: '#22c55e', fontSize: 11 }} />
                          : <FiArrowDown style={{ color: '#ef4444', fontSize: 11 }} />}
                        {m.efficiency}% efficiency
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="team-score">{m.score}</div>
                    <div className="team-tasks">{m.tasks} tasks</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="card card-padded" style={{ marginBottom: 20 }}>
          <div className="card-header">
            <h2 className="card-title">
              <span className="card-title-icon"><FiStar /></span>
              Recent Achievements
            </h2>
            <span className="card-badge">{performanceData.achievements.length} unlocked</span>
          </div>
          <div className="ach-grid">
            {performanceData.achievements.map(a => (
              <div key={a.id} className="ach-card">
                <div className="ach-icon-wrap">{a.icon}</div>
                <p className="ach-title">{a.title}</p>
                <p className="ach-desc">{a.description}</p>
                <div className="ach-footer">
                  <span className="ach-date">{new Date(a.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                  <span className="ach-pts">+{a.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Panels */}
        <div className="grid-1-1">
          <div className="insight-panel insight-panel-teal">
            <h3 className="insight-title"><FiEye style={{ fontSize: 16 }} /> Performance Insights</h3>
            <div className="insight-list">
              {[
                { icon: <FiTrendingUp style={{ color: '#6ee7b7', fontSize: 14, flexShrink: 0, marginTop: 2 }} />, text: 'Your productivity has increased by 15% over the last quarter' },
                { icon: <FiTarget style={{ color: '#a5f3fc', fontSize: 14, flexShrink: 0, marginTop: 2 }} />,     text: 'You consistently exceed efficiency targets by 8–12%' },
                { icon: <FiClock style={{ color: '#fde68a', fontSize: 14, flexShrink: 0, marginTop: 2 }} />,      text: 'Average task completion time improved by 18% this month' },
                { icon: <FiAward style={{ color: '#fca5a5', fontSize: 14, flexShrink: 0, marginTop: 2 }} />,      text: 'Ranked #2 in team performance for this quarter' },
              ].map((ins, i) => (
                <div key={i} className="insight-item">{ins.icon}<span>{ins.text}</span></div>
              ))}
            </div>
          </div>

          <div className="insight-panel insight-panel-emerald">
            <h3 className="insight-title"><FiStar style={{ color: '#fde68a', fontSize: 16 }} /> Recommendations</h3>
            <div className="insight-list">
              {[
                'Focus on high-priority tasks in the morning for peak efficiency',
                'Take regular breaks to maintain consistent productivity all week',
                'Consider delegating low-priority tasks to focus on strategic work',
                'Your peak performance window is between 10 AM – 12 PM',
              ].map((text, i) => (
                <div key={i} className="insight-item">
                  <div className="insight-bullet" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PerformancePage;