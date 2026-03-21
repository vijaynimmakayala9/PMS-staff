import React, { useState, useEffect, useRef } from 'react';
import {
  FiClock, FiMapPin, FiCalendar, FiUser, FiCheckCircle,
  FiAlertCircle, FiDownload, FiBarChart2, FiCoffee, FiSun, FiZap,
} from 'react-icons/fi';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');
  :root {
    --t50:#f0fdfa;--t100:#ccfbf1;--t200:#99f6e4;--t300:#5eead4;--t400:#2dd4bf;
    --t500:#14b8a6;--t600:#0d9488;--t700:#0f766e;--t800:#115e59;
    --s400:#94a3b8;--s500:#64748b;--s600:#475569;--s700:#334155;--s800:#1e293b;
    --sur:#fff;--sur2:#f8fffe;
    --rsm:8px;--rmd:14px;--rlg:20px;
    --shmd:0 4px 16px rgba(13,148,136,.10),0 2px 6px rgba(13,148,136,.06);
    --shlg:0 10px 40px rgba(13,148,136,.14),0 4px 12px rgba(13,148,136,.08);
    --glow:0 0 0 3px rgba(20,184,166,.16);
  }
  *{box-sizing:border-box;}
  .pio-root{
    font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;padding:18px 14px 64px;
  }
  @media(min-width:480px){.pio-root{padding:22px 18px 64px;}}
  @media(min-width:640px){.pio-root{padding:28px 24px 72px;}}
  @media(min-width:1024px){.pio-root{padding:36px 40px 80px;max-width:1200px;margin:0 auto;}}
  .pio-root::before{content:'';position:fixed;top:-180px;right:-180px;width:500px;height:500px;
    background:radial-gradient(circle,rgba(20,184,166,.08) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .pio-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:440px;height:440px;
    background:radial-gradient(circle,rgba(13,148,136,.06) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .pio-root > *{position:relative;z-index:1;}

  /* Header */
  .pio-hdr{margin-bottom:20px;}
  .pio-title{font-family:'Syne',sans-serif;font-size:clamp(18px,4vw,26px);font-weight:800;
    color:var(--t800);letter-spacing:-.5px;margin:0 0 3px;}
  .pio-sub{font-size:12px;color:var(--s500);margin:0;}
  @media(min-width:480px){.pio-sub{font-size:13px;}}

  /* Main grid */
  .pio-grid{display:grid;grid-template-columns:1fr;gap:16px;}
  @media(min-width:1024px){.pio-grid{grid-template-columns:1fr 1fr;gap:20px;}}

  /* Card */
  .card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:18px;}
  @media(min-width:480px){.card{padding:20px 22px;}}
  .card + .card{margin-top:16px;}

  /* Section title */
  .sec-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--t800);
    display:flex;align-items:center;gap:8px;margin:0 0 16px;}
  .sec-icon{width:27px;height:27px;border-radius:8px;
    background:linear-gradient(135deg,var(--t100),var(--t200));
    display:flex;align-items:center;justify-content:center;color:var(--t600);font-size:12px;}

  /* Status header */
  .status-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
  .status-pill{padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;border:1px solid;}
  .sp-in{background:var(--t50);color:var(--t600);border-color:var(--t200);}
  .sp-out{background:#fef2f2;color:#dc2626;border-color:#fca5a5;}

  /* Clock */
  .clock-wrap{text-align:center;margin-bottom:16px;}
  .clock-time{font-family:'Syne',sans-serif;font-size:clamp(32px,7vw,48px);font-weight:800;
    color:var(--t800);letter-spacing:-1px;line-height:1;margin-bottom:5px;font-variant-numeric:tabular-nums;}
  .clock-date{font-size:12px;color:var(--s500);}
  @media(min-width:480px){.clock-date{font-size:13px;}}

  /* Location */
  .location-row{display:flex;align-items:center;gap:8px;background:var(--t50);
    border:1px solid var(--t100);border-radius:var(--rmd);padding:10px 14px;margin-bottom:14px;}
  .loc-label{font-size:12px;font-weight:600;color:var(--t500);white-space:nowrap;}
  .loc-select{flex:1;background:transparent;color:var(--t700);font-family:'DM Sans',sans-serif;
    font-size:13px;font-weight:700;border:none;outline:none;cursor:pointer;min-width:0;}

  /* Punch buttons */
  .btn-punch-in{
    width:100%;background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rmd);padding:14px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;
    display:flex;align-items:center;justify-content:center;gap:8px;
    transition:all .2s;box-shadow:0 4px 14px rgba(13,148,136,.28);
  }
  .btn-punch-in:hover{background:linear-gradient(135deg,var(--t400),var(--t500));transform:translateY(-1px);}
  .btn-punch-in:disabled{opacity:.5;cursor:not-allowed;transform:none;}

  .break-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
  .btn-tea{background:#fffbeb;color:#d97706;border:1.5px solid #fde68a;
    border-radius:var(--rmd);padding:11px;font-family:'DM Sans',sans-serif;
    font-size:12px;font-weight:600;cursor:pointer;
    display:flex;align-items:center;justify-content:center;gap:7px;transition:all .15s;}
  .btn-tea:hover{background:#fef3c7;}
  .btn-lunch{background:#fff7ed;color:#c2410c;border:1.5px solid #fed7aa;
    border-radius:var(--rmd);padding:11px;font-family:'DM Sans',sans-serif;
    font-size:12px;font-weight:600;cursor:pointer;
    display:flex;align-items:center;justify-content:center;gap:7px;transition:all .15s;}
  .btn-lunch:hover{background:#ffedd5;}
  .btn-punch-out{width:100%;background:#fef2f2;color:#dc2626;border:1.5px solid #fca5a5;
    border-radius:var(--rmd);padding:12px;font-family:'DM Sans',sans-serif;
    font-size:13px;font-weight:700;cursor:pointer;grid-column:1/-1;
    display:flex;align-items:center;justify-content:center;gap:8px;transition:all .15s;}
  .btn-punch-out:hover{background:#fee2e2;}
  .btn-punch-out:disabled,.btn-tea:disabled,.btn-lunch:disabled{opacity:.5;cursor:not-allowed;}

  /* Spinner */
  .spinner-sm{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.3);
    border-top-color:#fff;animation:spin .6s linear infinite;}
  .spinner-tea{border-color:rgba(217,119,6,.3);border-top-color:#d97706;}
  .spinner-lunch{border-color:rgba(194,65,12,.3);border-top-color:#c2410c;}
  .spinner-out{border-color:rgba(220,38,38,.3);border-top-color:#dc2626;}
  @keyframes spin{to{transform:rotate(360deg);}}

  /* Stat tiles */
  .stat-tiles{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
  @media(min-width:480px){.stat-tiles{grid-template-columns:repeat(3,1fr);gap:10px;}}
  .stat-tile{display:flex;flex-direction:column;align-items:center;text-align:center;
    padding:11px 8px;border-radius:var(--rmd);border:1px solid transparent;transition:all .15s;}
  .stat-tile:hover{transform:translateY(-2px);box-shadow:var(--shmd);}
  .st-icon{font-size:16px;margin-bottom:5px;}
  .st-label{font-size:9px;color:var(--s400);font-weight:600;text-transform:uppercase;
    letter-spacing:.04em;margin-bottom:2px;}
  @media(min-width:480px){.st-label{font-size:10px;}}
  .st-val{font-family:'Syne',sans-serif;font-size:clamp(13px,2.5vw,16px);font-weight:800;color:var(--t800);}

  /* Timeline */
  .timeline-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
  .tl-dl-btn{width:27px;height:27px;border-radius:8px;background:var(--t50);
    border:1px solid var(--t200);display:flex;align-items:center;justify-content:center;
    color:var(--t400);cursor:pointer;font-size:12px;transition:all .15s;}
  .tl-dl-btn:hover{background:var(--t100);color:var(--t600);}

  .tl-scroll{max-height:260px;overflow-y:auto;padding-right:2px;}
  .tl-scroll::-webkit-scrollbar{width:4px;}
  .tl-scroll::-webkit-scrollbar-track{background:var(--t50);}
  .tl-scroll::-webkit-scrollbar-thumb{background:var(--t300);border-radius:2px;}

  .tl-item{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;
    background:var(--t50);border:1px solid var(--t100);border-radius:var(--rmd);
    margin-bottom:7px;transition:background .15s;}
  .tl-item:last-child{margin-bottom:0;}
  .tl-item:hover{background:var(--t100);}
  .tl-icon{font-size:16px;flex-shrink:0;margin-top:1px;}
  .tl-content{flex:1;min-width:0;}
  .tl-label{font-size:12px;font-weight:700;color:var(--t800);
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px;}
  .tl-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:10px;color:var(--s400);}
  .tl-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:5px;}

  /* Daily summary */
  .summary-section{margin-top:16px;padding-top:16px;border-top:1px solid var(--t100);}
  .summary-label{font-size:10px;font-weight:700;color:var(--t600);text-transform:uppercase;
    letter-spacing:.06em;margin-bottom:10px;}
  .summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
  .sum-row{display:flex;align-items:center;justify-content:space-between;
    font-size:11px;padding:4px 0;}
  .sum-key{color:var(--s400);}
  .sum-val{font-weight:700;color:var(--t700);}

  /* Quick actions */
  .qa-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
  @media(min-width:480px){.qa-grid{gap:10px;}}
  .qa-btn{display:flex;align-items:center;justify-content:center;gap:7px;
    padding:11px 10px;border-radius:var(--rmd);font-family:'DM Sans',sans-serif;
    font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;border:1.5px solid transparent;}
  @media(min-width:480px){.qa-btn{font-size:12px;padding:12px 10px;}}
  .qa-btn:hover{transform:translateY(-1px);box-shadow:var(--shmd);}

  /* Idle popup */
  .idle-overlay{position:fixed;inset:0;background:rgba(15,118,110,.25);
    backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;
    padding:16px;z-index:50;}
  .idle-modal{background:var(--sur);border:1px solid var(--t100);border-radius:var(--rlg);
    box-shadow:var(--shlg);padding:24px;max-width:340px;width:100%;text-align:center;}
  .idle-icon-wrap{width:56px;height:56px;background:#fef9c3;border:1.5px solid #fde68a;
    border-radius:16px;display:flex;align-items:center;justify-content:center;
    margin:0 auto 14px;font-size:22px;}
  .idle-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:var(--t800);margin:0 0 4px;}
  .idle-sub{font-size:12px;color:var(--s500);margin:0 0 3px;}
  .idle-time{font-size:11px;color:var(--s400);margin:0 0 8px;}
  .idle-cta{font-size:12px;font-weight:700;color:var(--t600);margin:0 0 16px;}
  .idle-btn{width:100%;background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rmd);padding:12px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;
    transition:all .2s;box-shadow:0 4px 12px rgba(13,148,136,.28);}
  .idle-btn:hover{background:linear-gradient(135deg,var(--t400),var(--t500));}

  /* Empty state */
  .empty{text-align:center;padding:40px 16px;}
  .empty-icon{font-size:32px;color:var(--t200);margin-bottom:10px;}
  .empty-title{font-size:13px;font-weight:600;color:var(--s500);margin:0 0 4px;}
  .empty-sub{font-size:11px;color:var(--s400);margin:0;}
`;

const fmtTime = d => d.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
const fmtSecs = s => { const m = Math.floor(s/60); return `${m}m ${s%60}s`; };

const recordMeta = type => ({
  in:          { label:'Punched In — Work Started',  icon:<FiCheckCircle style={{color:'var(--t500)'}}/> },
  out:         { label:'Punched Out — Work Ended',   icon:<FiCheckCircle style={{color:'#dc2626'}}/> },
  tea_break:   { label:'Tea Break',                  icon:<FiCoffee      style={{color:'#d97706'}}/> },
  lunch_break: { label:'Lunch Break',                icon:<FiSun         style={{color:'#c2410c'}}/> },
}[type] || { label:'Unknown', icon:<FiClock style={{color:'var(--t300)'}}/> });

const StaffPunchInOut = () => {
  const [currentTime, setCurrentTime]       = useState(new Date());
  const [punchStatus, setPunchStatus]       = useState('out');
  const [todayRecords, setTodayRecords]     = useState([]);
  const [location, setLocation]             = useState('Office');
  const [isLoading, setIsLoading]           = useState(false);
  const [showIdlePopup, setShowIdlePopup]   = useState(false);
  const [idleTime, setIdleTime]             = useState(0);
  const [workStats, setWorkStats]           = useState({ totalHours:0, effectiveHours:0, idleTime:0, teaBreakCount:0, lunchBreakCount:0 });

  const idleTimerRef        = useRef(null);
  const activityTimerRef    = useRef(null);
  const punchInTimeRef      = useRef(null);
  const idleTimeRef         = useRef(0);
  const lastActivityTimeRef = useRef(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (punchStatus === 'in' && punchInTimeRef.current) {
        const totalMs = Date.now() - punchInTimeRef.current;
        const effMs   = totalMs - idleTimeRef.current;
        setWorkStats(p => ({ ...p,
          totalHours:     (totalMs / 3_600_000).toFixed(2),
          effectiveHours: (effMs   / 3_600_000).toFixed(2),
          idleTime:       (idleTimeRef.current / 60_000).toFixed(0),
        }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [punchStatus]);

  useEffect(() => {
    const handle = () => {
      lastActivityTimeRef.current = Date.now();
      setShowIdlePopup(false); setIdleTime(0);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => { setShowIdlePopup(true); startIdle(); }, 60_000);
    };
    ['mousemove','keypress','click','scroll'].forEach(e => window.addEventListener(e, handle));
    handle();
    return () => {
      ['mousemove','keypress','click','scroll'].forEach(e => window.removeEventListener(e, handle));
      if (idleTimerRef.current)     clearTimeout(idleTimerRef.current);
      if (activityTimerRef.current) clearInterval(activityTimerRef.current);
    };
  }, []);

  const startIdle = () => {
    if (activityTimerRef.current) clearInterval(activityTimerRef.current);
    activityTimerRef.current = setInterval(() => {
      const s = Math.floor((Date.now() - lastActivityTimeRef.current) / 1000) - 60;
      if (s > 0) { setIdleTime(s); idleTimeRef.current += 1000; }
    }, 1000);
  };

  useEffect(() => {
    setTodayRecords([
      { id:1, type:'in',          time:'09:00 AM', location:'Office',    status:'completed' },
      { id:2, type:'tea_break',   time:'11:00 AM', location:'Pantry',    status:'completed', duration:'15 mins' },
      { id:3, type:'lunch_break', time:'01:00 PM', location:'Cafeteria', status:'completed', duration:'45 mins' },
      { id:4, type:'tea_break',   time:'04:00 PM', location:'Pantry',    status:'completed', duration:'10 mins' },
    ]);
  }, []);

  const withLoading = fn => { setIsLoading(true); setTimeout(() => { fn(); setIsLoading(false); }, 900); };

  const handlePunchIn  = () => withLoading(() => {
    const now = new Date();
    setTodayRecords(p => [{ id:p.length+1, type:'in',  time:fmtTime(now), location, status:'completed' }, ...p]);
    setPunchStatus('in'); punchInTimeRef.current = now.getTime(); idleTimeRef.current = 0;
  });
  const handlePunchOut = () => withLoading(() => {
    const now = new Date();
    if (punchInTimeRef.current) {
      const totalMs = now.getTime() - punchInTimeRef.current;
      setWorkStats(p => ({ ...p, totalHours:(totalMs/3_600_000).toFixed(2), effectiveHours:((totalMs-idleTimeRef.current)/3_600_000).toFixed(2), idleTime:(idleTimeRef.current/60_000).toFixed(0) }));
    }
    setTodayRecords(p => [{ id:p.length+1, type:'out', time:fmtTime(now), location, status:'completed' }, ...p]);
    setPunchStatus('out'); punchInTimeRef.current = null;
  });
  const handleBreak = t => withLoading(() => {
    const now = new Date();
    setTodayRecords(p => [{ id:p.length+1, type:t, time:fmtTime(now), location, status:'completed' }, ...p]);
    setWorkStats(p => ({ ...p, teaBreakCount: t==='tea_break'?p.teaBreakCount+1:p.teaBreakCount, lunchBreakCount:t==='lunch_break'?p.lunchBreakCount+1:p.lunchBreakCount }));
  });

  const efficiency = workStats.totalHours > 0 ? Math.round((workStats.effectiveHours / workStats.totalHours) * 100) : 0;

  const statTiles = [
    { icon:<FiClock   style={{color:'var(--t500)'}}/>, label:'Total Hours',    val:`${workStats.totalHours}h`,     bg:'var(--t50)',   border:'var(--t100)'   },
    { icon:<FiUser    style={{color:'#16a34a'}}/>,      label:'Effective Hrs',  val:`${workStats.effectiveHours}h`, bg:'#f0fdf4',     border:'#bbf7d0'       },
    { icon:<FiAlertCircle style={{color:'#dc2626'}}/>,  label:'Idle Time',      val:`${workStats.idleTime}m`,       bg:'#fef2f2',     border:'#fca5a5'       },
    { icon:<FiCoffee  style={{color:'#d97706'}}/>,      label:'Tea Breaks',     val:workStats.teaBreakCount,        bg:'#fffbeb',     border:'#fde68a'       },
    { icon:<FiSun     style={{color:'#c2410c'}}/>,      label:'Lunch Breaks',   val:workStats.lunchBreakCount,      bg:'#fff7ed',     border:'#fed7aa'       },
    { icon:<FiZap     style={{color:'var(--t500)'}}/>,  label:'Efficiency',     val:`${efficiency}%`,               bg:'var(--t50)',   border:'var(--t100)'   },
  ];

  const summaryRows = [
    { key:'Work Started', val: todayRecords.find(r=>r.type==='in')?.time||'--:--' },
    { key:'Total Breaks', val: workStats.teaBreakCount + workStats.lunchBreakCount },
    { key:'Productivity',  val:`${efficiency}%`,    color:'var(--t600)' },
    { key:'Idle Time',     val:`${workStats.idleTime} mins`, color:'#dc2626' },
  ];

  return (
    <div className="pio-root">
      <style>{style}</style>

      {/* Idle popup */}
      {showIdlePopup && (
        <div className="idle-overlay">
          <div className="idle-modal">
            <div className="idle-icon-wrap"><FiAlertCircle style={{color:'#d97706',fontSize:24}}/></div>
            <h3 className="idle-title">Hey there! 👋</h3>
            <p className="idle-sub">You seem to be away from your desk</p>
            <p className="idle-time">Idle for: {fmtSecs(idleTime)}</p>
            <p className="idle-cta">Time to get back to work! 🚀</p>
            <button className="idle-btn" onClick={() => { setShowIdlePopup(false); setIdleTime(0); lastActivityTimeRef.current = Date.now(); }}>
              I'm Back! Let's Work 💪
            </button>
          </div>
        </div>
      )}

      <div className="pio-hdr">
        <h1 className="pio-title">Smart Attendance System</h1>
        <p className="pio-sub">Track your work hours with intelligent idle detection</p>
      </div>

      <div className="pio-grid">
        {/* LEFT */}
        <div>
          {/* Status card */}
          <div className="card" style={{marginBottom:16}}>
            <div className="status-row">
              <div className="sec-title" style={{margin:0}}><span className="sec-icon"><FiClock/></span>Current Status</div>
              <span className={`status-pill ${punchStatus==='in'?'sp-in':'sp-out'}`}>
                {punchStatus==='in'?'● Working':'○ Not Working'}
              </span>
            </div>

            <div className="clock-wrap">
              <div className="clock-time">
                {currentTime.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'})}
              </div>
              <p className="clock-date">
                {currentTime.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}
              </p>
            </div>

            <div className="location-row">
              <FiMapPin style={{color:'var(--t400)',flexShrink:0}}/>
              <span className="loc-label">Location:</span>
              <select className="loc-select" value={location} onChange={e=>setLocation(e.target.value)}>
                <option value="Office">Office</option>
                <option value="Work From Home">Work From Home</option>
                <option value="Client Site">Client Site</option>
              </select>
            </div>

            {punchStatus === 'out' ? (
              <button className="btn-punch-in" onClick={handlePunchIn} disabled={isLoading}>
                {isLoading ? <div className="spinner-sm"/> : <FiClock style={{fontSize:14}}/>}
                START WORKING 🚀
              </button>
            ) : (
              <div className="break-grid">
                <button className="btn-tea" onClick={()=>handleBreak('tea_break')} disabled={isLoading}>
                  {isLoading?<div className="spinner-sm spinner-tea"/>:<FiCoffee/>} Tea Break
                </button>
                <button className="btn-lunch" onClick={()=>handleBreak('lunch_break')} disabled={isLoading}>
                  {isLoading?<div className="spinner-sm spinner-lunch"/>:<FiSun/>} Lunch Break
                </button>
                <button className="btn-punch-out" onClick={handlePunchOut} disabled={isLoading}>
                  {isLoading?<div className="spinner-sm spinner-out"/>:<FiCheckCircle/>} END WORK DAY
                </button>
              </div>
            )}
          </div>

          {/* Analytics card */}
          <div className="card">
            <h3 className="sec-title"><span className="sec-icon"><FiBarChart2/></span>Work Analytics</h3>
            <div className="stat-tiles">
              {statTiles.map((t,i)=>(
                <div key={i} className="stat-tile" style={{background:t.bg,borderColor:t.border}}>
                  <div className="st-icon">{t.icon}</div>
                  <div className="st-label">{t.label}</div>
                  <div className="st-val">{t.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* Timeline */}
          <div className="card" style={{marginBottom:16}}>
            <div className="timeline-hdr">
              <h3 className="sec-title" style={{margin:0}}><span className="sec-icon"><FiCalendar/></span>Today's Timeline</h3>
              <button className="tl-dl-btn"><FiDownload/></button>
            </div>
            <div className="tl-scroll">
              {todayRecords.length > 0 ? todayRecords.map(rec => {
                const meta = recordMeta(rec.type);
                return (
                  <div key={rec.id} className="tl-item">
                    <div className="tl-icon">{meta.icon}</div>
                    <div className="tl-content">
                      <p className="tl-label">{meta.label}</p>
                      <div className="tl-meta">
                        <span>🕒 {rec.time}</span>
                        <span>📍 {rec.location}</span>
                        {rec.duration && <span>⏱ {rec.duration}</span>}
                      </div>
                    </div>
                    <div className="tl-dot" style={{background: rec.status==='completed'?'var(--t400)':'#f59e0b'}}/>
                  </div>
                );
              }) : (
                <div className="empty">
                  <div className="empty-icon"><FiClock/></div>
                  <p className="empty-title">No activity recorded today</p>
                  <p className="empty-sub">Start working to see your timeline</p>
                </div>
              )}
            </div>

            <div className="summary-section">
              <p className="summary-label">Daily Summary</p>
              <div className="summary-grid">
                {summaryRows.map((r,i)=>(
                  <div key={i} className="sum-row">
                    <span className="sum-key">{r.key}</span>
                    <span className="sum-val" style={r.color?{color:r.color}:{}}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="card">
            <h3 className="sec-title"><span className="sec-icon"><FiZap/></span>Quick Actions</h3>
            <div className="qa-grid">
              {[
                { icon:<FiBarChart2/>, label:'Weekly Report',     bg:'var(--t50)',  border:'var(--t200)', color:'var(--t600)' },
                { icon:<FiDownload/>,  label:'Export Data',        bg:'#ecfeff',    border:'#a5f3fc',     color:'#0e7490'    },
                { icon:<FiUser/>,      label:'My Performance',     bg:'#f0fdf4',    border:'#bbf7d0',     color:'#16a34a'    },
                { icon:<FiCalendar/>,  label:'Attendance History', bg:'var(--t50)', border:'var(--t200)', color:'var(--t600)' },
              ].map((a,i)=>(
                <button key={i} className="qa-btn"
                  style={{background:a.bg,borderColor:a.border,color:a.color}}>
                  <span style={{fontSize:14}}>{a.icon}</span>
                  <span>{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPunchInOut;