import { useState, useEffect } from "react";
import {
  FiClock, FiDollarSign, FiCheckCircle, FiTrendingUp,
  FiCalendar, FiStar, FiBarChart2, FiSettings, FiLogOut,
  FiMail, FiPhone, FiActivity,
} from "react-icons/fi";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line,
  CartesianGrid, ResponsiveContainer,
} from "recharts";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');
  :root {
    --t50:#f0fdfa;--t100:#ccfbf1;--t200:#99f6e4;--t300:#5eead4;--t400:#2dd4bf;
    --t500:#14b8a6;--t600:#0d9488;--t700:#0f766e;--t800:#115e59;
    --s400:#94a3b8;--s500:#64748b;--s600:#475569;--s700:#334155;--s800:#1e293b;
    --sur:#fff;--sur2:#f8fffe;
    --rsm:8px;--rmd:12px;--rlg:18px;
    --shmd:0 4px 16px rgba(13,148,136,.10),0 2px 6px rgba(13,148,136,.06);
    --shlg:0 10px 40px rgba(13,148,136,.14),0 4px 12px rgba(13,148,136,.08);
    --glow:0 0 0 3px rgba(20,184,166,.16);
  }
  *{box-sizing:border-box;}

  .spd-root{
    font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;padding:14px 12px 56px;
  }
  @media(min-width:480px){.spd-root{padding:18px 16px 60px;}}
  @media(min-width:640px){.spd-root{padding:24px 22px 68px;}}
  @media(min-width:1024px){.spd-root{padding:32px 36px 72px;max-width:1280px;margin:0 auto;}}
  .spd-root::before{content:'';position:fixed;top:-180px;right:-180px;width:520px;height:520px;
    background:radial-gradient(circle,rgba(20,184,166,.08) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .spd-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:440px;height:440px;
    background:radial-gradient(circle,rgba(13,148,136,.06) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .spd-root > *{position:relative;z-index:1;}

  /* PAGE HEADER */
  .page-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;gap:8px;}
  @media(min-width:480px){.page-hdr{margin-bottom:16px;}}
  .welcome-title{font-family:'Syne',sans-serif;font-size:clamp(15px,3.5vw,22px);
    font-weight:800;color:var(--t800);margin:0 0 2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .welcome-accent{color:var(--t500);}
  .page-sub{font-size:11px;color:var(--s500);margin:0;}
  @media(min-width:480px){.page-sub{font-size:12px;}}
  .icon-btns{display:flex;gap:7px;flex-shrink:0;}
  .icon-btn{width:32px;height:32px;display:flex;align-items:center;justify-content:center;
    border-radius:var(--rsm);background:var(--sur);border:1.5px solid var(--t100);
    color:var(--t400);cursor:pointer;transition:all .15s;font-size:13px;}
  @media(min-width:480px){.icon-btn{width:34px;height:34px;font-size:14px;}}
  .icon-btn:hover{background:var(--t50);color:var(--t600);border-color:var(--t300);}
  .icon-btn-red:hover{background:#fef2f2;color:#ef4444;border-color:#fca5a5;}

  /* PROFILE CARD — always row layout so it stays compact on mobile */
  .profile-card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.12);padding:14px;margin-bottom:14px;
    position:relative;overflow:hidden;}
  .profile-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
    background:linear-gradient(90deg,var(--t300),var(--t500));}
  @media(min-width:480px){.profile-card{padding:16px 18px;margin-bottom:16px;}}

  .profile-inner{display:flex;flex-direction:row;gap:11px;align-items:flex-start;}
  @media(min-width:480px){.profile-inner{gap:15px;}}

  .avatar{width:46px;height:46px;border-radius:13px;flex-shrink:0;
    background:linear-gradient(135deg,var(--t400),var(--t700));
    display:flex;align-items:center;justify-content:center;
    color:#fff;font-family:'Syne',sans-serif;font-size:17px;font-weight:800;
    box-shadow:0 4px 14px rgba(13,148,136,.28);}
  @media(min-width:480px){.avatar{width:54px;height:54px;font-size:19px;border-radius:15px;}}
  @media(min-width:768px){.avatar{width:62px;height:62px;font-size:21px;}}

  .profile-details{flex:1;min-width:0;}
  .profile-name{font-family:'Syne',sans-serif;font-size:clamp(12px,2.5vw,15px);font-weight:800;
    color:var(--t800);margin:0 0 1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .profile-role{font-size:11px;color:var(--s500);margin:0 0 4px;}
  .emp-chip{display:inline-block;background:var(--t50);color:var(--t700);
    border:1px solid var(--t200);border-radius:20px;font-size:9px;font-weight:700;padding:1px 8px;}

  /* Info tiles 2-col → 4-col */
  .info-tiles{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:9px;}
  @media(min-width:520px){.info-tiles{grid-template-columns:repeat(4,1fr);gap:7px;}}
  .info-tile{background:var(--t50);border:1px solid var(--t100);border-radius:var(--rsm);padding:6px 8px;min-width:0;}
  .it-label{font-size:8px;color:var(--s400);font-weight:600;text-transform:uppercase;letter-spacing:.04em;margin-bottom:1px;}
  @media(min-width:480px){.it-label{font-size:9px;}}
  .it-val{font-size:11px;font-weight:700;color:var(--t700);display:flex;align-items:center;gap:3px;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}

  /* Contact row */
  .contact-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;}
  .contact-item{display:flex;align-items:center;gap:4px;font-size:10px;color:var(--t600);min-width:0;}
  .contact-item span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:150px;}
  @media(min-width:480px){.contact-item span{max-width:220px;}}
  .ci-icon{font-size:10px;color:var(--t400);flex-shrink:0;}

  /* STAT CARDS — 2-col → 4-col at 860px */
  .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;}
  @media(min-width:480px){.stats-grid{gap:10px;}}
  @media(min-width:860px){.stats-grid{grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px;}}

  .stat-card{background:var(--sur);border-radius:var(--rlg);padding:11px 10px;
    border:1px solid rgba(20,184,166,.10);box-shadow:var(--shmd);
    display:flex;align-items:center;gap:9px;
    border-left:4px solid var(--sc-bar,var(--t400));
    transition:transform .2s,box-shadow .2s;min-width:0;overflow:hidden;}
  @media(min-width:480px){.stat-card{padding:13px 12px;gap:11px;}}
  @media(min-width:640px){.stat-card{padding:14px;gap:12px;}}
  .stat-card:hover{transform:translateY(-2px);box-shadow:var(--shlg);}
  .sc-icon{width:32px;height:32px;border-radius:9px;flex-shrink:0;
    display:flex;align-items:center;justify-content:center;font-size:14px;
    background:var(--sc-bg,var(--t50));color:var(--sc-color,var(--t500));}
  @media(min-width:480px){.sc-icon{width:36px;height:36px;font-size:15px;}}
  @media(min-width:640px){.sc-icon{width:38px;height:38px;font-size:16px;}}
  .sc-text{min-width:0;flex:1;}
  .sc-label{font-size:9px;font-weight:600;color:var(--s500);margin-bottom:1px;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  @media(min-width:480px){.sc-label{font-size:10px;}}
  .sc-val{font-family:'Syne',sans-serif;font-size:clamp(12px,2.8vw,17px);
    font-weight:800;color:var(--sc-vcolor,var(--t800));line-height:1;margin-bottom:1px;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .sc-sub{font-size:9px;color:var(--s400);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

  /* CHARTS — stacked → 2-col at 768px. min-width:0 is critical for recharts. */
  .charts-grid{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:14px;}
  @media(min-width:768px){.charts-grid{grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;}}
  .chart-card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:14px;
    min-width:0;overflow:hidden;}
  @media(min-width:480px){.chart-card{padding:16px;}}
  @media(min-width:640px){.chart-card{padding:18px;}}
  .chart-hdr{display:flex;align-items:flex-start;justify-content:space-between;
    margin-bottom:12px;gap:8px;}
  .chart-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--t800);margin:0 0 2px;}
  .chart-sub{font-size:10px;color:var(--s400);}
  .chart-sel{font-size:11px;border:1.5px solid var(--t100);background:var(--t50);
    color:var(--t600);border-radius:var(--rsm);padding:5px 10px;
    font-family:'DM Sans',sans-serif;font-weight:500;outline:none;cursor:pointer;
    appearance:none;-webkit-appearance:none;transition:all .2s;flex-shrink:0;}
  .chart-sel:focus{border-color:var(--t400);box-shadow:var(--glow);}

  /* BOTTOM GRID — stacked → 2-col at 768px */
  .bottom-grid{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:14px;}
  @media(min-width:768px){.bottom-grid{grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;}}
  .tasks-card,.info-card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:14px;min-width:0;}
  @media(min-width:480px){.tasks-card,.info-card{padding:16px;}}
  @media(min-width:640px){.tasks-card,.info-card{padding:18px;}}

  .card-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;gap:8px;}
  .card-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--t800);margin:0;}
  .tasks-badge{font-size:10px;font-weight:700;color:var(--t700);
    background:var(--t50);border:1px solid var(--t200);border-radius:20px;
    padding:3px 10px;white-space:nowrap;flex-shrink:0;}

  .progress-track{width:100%;height:5px;background:var(--t50);border-radius:3px;
    overflow:hidden;margin-bottom:12px;border:1px solid var(--t100);}
  .progress-fill{height:100%;border-radius:3px;
    background:linear-gradient(90deg,var(--t400),var(--t600));transition:width .6s ease;}

  .task-row{display:flex;align-items:center;justify-content:space-between;
    padding:8px 0;border-bottom:1px solid var(--t50);gap:8px;}
  .task-row:last-child{border-bottom:none;}
  .task-info{flex:1;min-width:0;}
  .task-title{font-size:12px;font-weight:600;color:var(--t800);
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:1px;}
  .task-due{font-size:10px;color:var(--s400);}
  .task-status{flex-shrink:0;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700;white-space:nowrap;}
  .ts-done{background:#dcfce7;color:#166534;border:1px solid #86efac;}
  .ts-prog{background:#cffafe;color:#0e7490;border:1px solid #a5f3fc;}
  .ts-pend{background:#fef9c3;color:#854d0e;border:1px solid #fde68a;}

  /* QUICK INFO */
  .qi-item{display:flex;align-items:center;gap:9px;background:var(--t50);
    border:1px solid var(--t100);border-radius:var(--rmd);padding:9px 11px;
    margin-bottom:7px;transition:all .15s;}
  .qi-item:last-child{margin-bottom:0;}
  .qi-item:hover{background:var(--t100);}
  .qi-icon{width:28px;height:28px;border-radius:7px;background:var(--sur);
    border:1px solid var(--t200);display:flex;align-items:center;justify-content:center;
    color:var(--t500);font-size:12px;flex-shrink:0;}
  @media(min-width:480px){.qi-icon{width:30px;height:30px;}}
  .qi-text{flex:1;min-width:0;}
  .qi-label{font-size:10px;color:var(--s400);font-weight:500;margin-bottom:1px;}
  .qi-val{font-size:12px;font-weight:800;color:var(--t700);line-height:1.2;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  /* sub text hidden on tiny screens */
  .qi-sub{font-size:9px;color:var(--s400);flex-shrink:0;display:none;}
  @media(min-width:380px){.qi-sub{display:block;}}

  /* QUICK ACTIONS */
  .actions-card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:14px;}
  @media(min-width:480px){.actions-card{padding:16px;}}
  @media(min-width:640px){.actions-card{padding:18px;}}
  .actions-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:11px;}
  @media(min-width:480px){.actions-grid{gap:10px;}}
  @media(min-width:640px){.actions-grid{gap:12px;}}
  .action-btn{display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:5px;padding:11px 4px;background:var(--t50);border:1.5px solid var(--t100);
    border-radius:var(--rmd);cursor:pointer;transition:all .2s;
    font-family:'DM Sans',sans-serif;min-width:0;}
  @media(min-width:360px){.action-btn{padding:12px 6px;}}
  @media(min-width:480px){.action-btn{padding:14px 8px;border-radius:var(--rlg);gap:6px;}}
  .action-btn:hover{background:var(--t100);border-color:var(--t300);
    transform:translateY(-2px);box-shadow:var(--shmd);}
  .action-icon{font-size:15px;display:flex;align-items:center;justify-content:center;}
  @media(min-width:360px){.action-icon{font-size:16px;}}
  @media(min-width:480px){.action-icon{font-size:18px;}}
  .action-label{font-size:9px;font-weight:700;color:var(--t700);text-align:center;line-height:1.2;}
  @media(min-width:360px){.action-label{font-size:10px;}}
  @media(min-width:480px){.action-label{font-size:11px;}}

  /* LOADING */
  .loading-screen{display:flex;align-items:center;justify-content:center;
    min-height:100vh;flex-direction:column;gap:12px;
    background:linear-gradient(135deg,#f0fdfa,#e6faf7);font-family:'DM Sans',sans-serif;}
  .spinner{width:36px;height:36px;border:3px solid var(--t100);
    border-top-color:var(--t500);border-radius:50%;animation:spin .75s linear infinite;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .loading-text{font-size:13px;color:var(--t600);font-weight:600;}

  /* SCROLLBAR */
  ::-webkit-scrollbar{width:5px;height:5px;}
  ::-webkit-scrollbar-track{background:var(--t50);}
  ::-webkit-scrollbar-thumb{background:var(--t300);border-radius:3px;}
`;

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:'#fff',border:'1.5px solid #99f6e4',borderRadius:10,
      padding:'7px 11px',boxShadow:'0 4px 14px rgba(13,148,136,.12)',
      fontFamily:'DM Sans,sans-serif',fontSize:11,color:'#0f766e'}}>
      <p style={{fontWeight:700,marginBottom:3}}>{label}</p>
      <p>{payload[0].name}: <strong style={{color:'#14b8a6'}}>{payload[0].value}</strong></p>
    </div>
  );
};

const StaffPersonalDashboard = () => {
  const [attendanceFilter, setAttendanceFilter] = useState('weekly');
  const [performanceFilter, setPerformanceFilter] = useState('weekly');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData({
        personalInfo:{
          name:'Raj Sharma', employeeId:'EMP001', department:'Sales',
          position:'Senior Executive', joinDate:'2022-01-15',
          contact:{ email:'raj.sharma@company.com', phone:'+91-9876543210' },
          manager:'Priya Patel',
        },
        attendance:{ presentThisMonth:22, absentThisMonth:1, attendancePercentage:'95%' },
        tasks:{
          assigned:15, completed:12, pending:3, completionRate:'80%',
          recentTasks:[
            { id:1, title:'Client Meeting Prep', status:'completed',   dueDate:'2024-01-10' },
            { id:2, title:'Sales Report',         status:'completed',   dueDate:'2024-01-12' },
            { id:3, title:'Budget Planning',       status:'in-progress', dueDate:'2024-01-20' },
          ],
        },
        performance:{ efficiency:92, rating:4.5, rank:'Top 10%' },
        salary:{ netSalary:67000, lastSalaryDate:'2024-01-01' },
        leaveBalance:{ total:35, taken:5 },
        charts:{
          attendanceData:{
            weekly:[
              {day:'Mon',hours:8.5},{day:'Tue',hours:9.0},{day:'Wed',hours:8.0},
              {day:'Thu',hours:7.5},{day:'Fri',hours:8.5},
            ],
          },
          performanceData:{
            weekly:[
              {day:'Mon',efficiency:88},{day:'Tue',efficiency:92},{day:'Wed',efficiency:85},
              {day:'Thu',efficiency:90},{day:'Fri',efficiency:95},
            ],
          },
        },
      });
      setLoading(false);
    }, 600);
  }, []);

  if (loading) return (
    <div className="loading-screen">
      <style>{style}</style>
      <div className="spinner"/>
      <p className="loading-text">Loading dashboard…</p>
    </div>
  );

  const { personalInfo:pi, attendance:att, tasks, performance:perf, salary, leaveBalance:lb, charts } = data;
  const initials = pi.name.split(' ').map(n => n[0]).join('');
  const taskCls = s => s==='completed'?'task-status ts-done':s==='in-progress'?'task-status ts-prog':'task-status ts-pend';

  const statCards = [
    { label:'Attendance',  value:att.attendancePercentage,               sub:`${att.presentThisMonth} days present`,
      bar:'var(--t400)', bg:'var(--t50)',  color:'var(--t500)', vcolor:'var(--t800)', icon:<FiClock/> },
    { label:'Tasks Done',  value:`${tasks.completed}/${tasks.assigned}`,  sub:`${tasks.pending} pending`,
      bar:'#22c55e',    bg:'#f0fdf4',    color:'#16a34a',      vcolor:'#14532d',     icon:<FiCheckCircle/> },
    { label:'Performance', value:`${perf.efficiency}%`,                   sub:perf.rank,
      bar:'#06b6d4',    bg:'#ecfeff',    color:'#0e7490',      vcolor:'#164e63',     icon:<FiTrendingUp/> },
    { label:'Net Salary',  value:`₹${salary.netSalary.toLocaleString()}`, sub:`Paid ${salary.lastSalaryDate}`,
      bar:'#8b5cf6',    bg:'#faf5ff',    color:'#7c3aed',      vcolor:'#4c1d95',     icon:<FiDollarSign/> },
  ];

  const quickActions = [
    { label:'Punch',  icon:<FiClock      style={{fontSize:16,color:'var(--t500)'}}/> },
    { label:'Leave',  icon:<FiCalendar   style={{fontSize:16,color:'#16a34a'}}/> },
    { label:'Report', icon:<FiBarChart2  style={{fontSize:16,color:'#0e7490'}}/> },
    { label:'Salary', icon:<FiDollarSign style={{fontSize:16,color:'#7c3aed'}}/> },
  ];

  return (
    <div className="spd-root">
      <style>{style}</style>

      {/* Page header */}
      <div className="page-hdr">
        <div style={{minWidth:0,flex:1}}>
          <h1 className="welcome-title">
            Welcome back, <span className="welcome-accent">{pi.name.split(' ')[0]}</span>!
          </h1>
          <p className="page-sub">Your performance overview for today</p>
        </div>
        <div className="icon-btns">
          <button className="icon-btn"><FiSettings/></button>
          <button className="icon-btn icon-btn-red"><FiLogOut/></button>
        </div>
      </div>

      {/* Profile card */}
      <div className="profile-card">
        <div className="profile-inner">
          <div className="avatar">{initials}</div>
          <div className="profile-details">
            <div style={{display:'flex',alignItems:'center',gap:7,flexWrap:'wrap',marginBottom:2}}>
              <p className="profile-name">{pi.name}</p>
              <span className="emp-chip">{pi.employeeId}</span>
            </div>
            <p className="profile-role">{pi.position}</p>
            <div className="info-tiles">
              {[
                {label:'Department', val:pi.department},
                {label:'Manager',    val:pi.manager},
                {label:'Joined',     val:pi.joinDate},
                {label:'Rating',     val:<>{perf.rating}/5 <FiStar style={{color:'#f59e0b',fontSize:10}}/></>},
              ].map((t,i) => (
                <div key={i} className="info-tile">
                  <div className="it-label">{t.label}</div>
                  <div className="it-val">{t.val}</div>
                </div>
              ))}
            </div>
            <div className="contact-row">
              <div className="contact-item"><FiMail className="ci-icon"/><span>{pi.contact.email}</span></div>
              <div className="contact-item"><FiPhone className="ci-icon"/><span>{pi.contact.phone}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        {statCards.map((s,i) => (
          <div key={i} className="stat-card"
            style={{'--sc-bar':s.bar,'--sc-bg':s.bg,'--sc-color':s.color,'--sc-vcolor':s.vcolor}}>
            <div className="sc-icon">{s.icon}</div>
            <div className="sc-text">
              <p className="sc-label">{s.label}</p>
              <p className="sc-val">{s.value}</p>
              <p className="sc-sub">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-hdr">
            <div><p className="chart-title">Work Hours</p><p className="chart-sub">Hours logged per day</p></div>
            <select className="chart-sel" value={attendanceFilter} onChange={e=>setAttendanceFilter(e.target.value)}>
              <option value="weekly">This Week</option>
            </select>
          </div>
          <div style={{height:148}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.attendanceData[attendanceFilter]} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0faf8" vertical={false}/>
                <XAxis dataKey="day" fontSize={10} tick={{fill:'#5eada8',fontFamily:'DM Sans'}} axisLine={false} tickLine={false}/>
                <YAxis fontSize={10} tick={{fill:'#5eada8',fontFamily:'DM Sans'}} axisLine={false} tickLine={false} width={24}/>
                <Tooltip content={<ChartTooltip/>} cursor={{fill:'rgba(20,184,166,.06)'}}/>
                <Bar dataKey="hours" name="Hours" fill="#14b8a6" radius={[5,5,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-hdr">
            <div><p className="chart-title">Performance</p><p className="chart-sub">Efficiency % per day</p></div>
            <select className="chart-sel" value={performanceFilter} onChange={e=>setPerformanceFilter(e.target.value)}>
              <option value="weekly">This Week</option>
            </select>
          </div>
          <div style={{height:148}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.performanceData[performanceFilter]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0faf8" vertical={false}/>
                <XAxis dataKey="day" fontSize={10} tick={{fill:'#5eada8',fontFamily:'DM Sans'}} axisLine={false} tickLine={false}/>
                <YAxis fontSize={10} tick={{fill:'#5eada8',fontFamily:'DM Sans'}} axisLine={false} tickLine={false} domain={[80,100]} width={28}/>
                <Tooltip content={<ChartTooltip/>}/>
                <Line type="monotone" dataKey="efficiency" stroke="#14b8a6" strokeWidth={2.5} name="Efficiency %"
                  dot={{fill:'#14b8a6',strokeWidth:2,r:3,stroke:'#fff'}} activeDot={{r:5,fill:'#0d9488'}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tasks + Quick Info */}
      <div className="bottom-grid">
        <div className="tasks-card">
          <div className="card-hdr">
            <h3 className="card-title">Recent Tasks</h3>
            <span className="tasks-badge">{tasks.completed}/{tasks.assigned} done</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{width:tasks.completionRate}}/>
          </div>
          {tasks.recentTasks.map(task => (
            <div key={task.id} className="task-row">
              <div className="task-info">
                <p className="task-title">{task.title}</p>
                <p className="task-due">Due: {task.dueDate}</p>
              </div>
              <span className={taskCls(task.status)}>{task.status.replace('-',' ')}</span>
            </div>
          ))}
        </div>

        <div className="info-card">
          <h3 className="card-title" style={{marginBottom:11}}>Quick Info</h3>
          {[
            { label:'Leave Balance',      value:`${lb.total-lb.taken} days left`, sub:`${lb.taken} taken`,           icon:<FiCalendar/> },
            { label:'Performance Rating', value:`${perf.rating} / 5.0`,            sub:perf.rank,                    icon:<FiStar/> },
            { label:'Last Salary',        value:`₹${salary.netSalary.toLocaleString()}`, sub:`on ${salary.lastSalaryDate}`, icon:<FiDollarSign/> },
            { label:'Attendance Rate',    value:att.attendancePercentage,           sub:`${att.absentThisMonth} absent`, icon:<FiActivity/> },
          ].map((item,i) => (
            <div key={i} className="qi-item">
              <div className="qi-icon">{item.icon}</div>
              <div className="qi-text">
                <p className="qi-label">{item.label}</p>
                <p className="qi-val">{item.value}</p>
              </div>
              <span className="qi-sub">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="actions-card">
        <h3 className="card-title">Quick Actions</h3>
        <div className="actions-grid">
          {quickActions.map((a,i) => (
            <button key={i} className="action-btn">
              <span className="action-icon">{a.icon}</span>
              <span className="action-label">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default StaffPersonalDashboard;