import React, { useState, useEffect } from 'react';
import {
  FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle,
  FiSearch, FiDownload, FiEye, FiChevronLeft, FiChevronRight,
  FiCoffee, FiSun, FiAlertTriangle, FiBarChart2,
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
  .ah-root{
    font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;padding:18px 14px 64px;
  }
  @media(min-width:480px){.ah-root{padding:22px 18px 64px;}}
  @media(min-width:640px){.ah-root{padding:28px 24px 72px;}}
  @media(min-width:1024px){.ah-root{padding:36px 40px 80px;}}
  .ah-root::before{content:'';position:fixed;top:-180px;right:-180px;width:500px;height:500px;
    background:radial-gradient(circle,rgba(20,184,166,.08) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .ah-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:440px;height:440px;
    background:radial-gradient(circle,rgba(13,148,136,.06) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .ah-root > *{position:relative;z-index:1;}

  /* Header */
  .ah-hdr{margin-bottom:20px;}
  .ah-title{font-family:'Syne',sans-serif;font-size:clamp(18px,4vw,26px);font-weight:800;
    color:var(--t800);letter-spacing:-.5px;margin:0 0 3px;}
  .ah-sub{font-size:12px;color:var(--s500);margin:0;}
  @media(min-width:480px){.ah-sub{font-size:13px;}}

  /* Summary cards */
  .summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;}
  @media(min-width:480px){.summary-grid{grid-template-columns:repeat(3,1fr);}}
  @media(min-width:900px){.summary-grid{grid-template-columns:repeat(5,1fr);gap:12px;}}
  .sum-card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:13px 14px;
    display:flex;align-items:center;gap:11px;transition:transform .2s,box-shadow .2s;}
  .sum-card:hover{transform:translateY(-2px);box-shadow:var(--shlg);}
  .sum-icon{width:36px;height:36px;border-radius:9px;flex-shrink:0;
    display:flex;align-items:center;justify-content:center;font-size:15px;}
  .sum-label{font-size:9px;font-weight:600;color:var(--s400);text-transform:uppercase;
    letter-spacing:.04em;margin-bottom:2px;}
  @media(min-width:480px){.sum-label{font-size:10px;}}
  .sum-val{font-family:'Syne',sans-serif;font-size:clamp(16px,3vw,20px);font-weight:800;line-height:1;}

  /* Filter bar */
  .filter-bar{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,136,.10);padding:14px;margin-bottom:16px;
    display:flex;flex-direction:column;gap:10px;}
  @media(min-width:768px){.filter-bar{flex-direction:row;align-items:center;}}
  .search-wrap{position:relative;flex:1;min-width:0;}
  .search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);
    color:var(--t400);font-size:13px;pointer-events:none;}
  .search-input{width:100%;padding:9px 12px 9px 36px;background:var(--t50);
    border:1.5px solid var(--t100);border-radius:var(--rsm);
    font-family:'DM Sans',sans-serif;font-size:13px;color:var(--s700);outline:none;transition:all .2s;}
  .search-input:focus{border-color:var(--t400);box-shadow:var(--glow);background:#fff;}
  .search-input::placeholder{color:var(--s400);}
  .filter-controls{display:flex;flex-wrap:wrap;gap:8px;}
  .sel{padding:8px 28px 8px 12px;background:var(--t50);border:1.5px solid var(--t100);
    border-radius:var(--rsm);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;
    color:var(--s600);outline:none;cursor:pointer;transition:all .2s;
    appearance:none;-webkit-appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%230d9488' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 8px center;}
  .sel:focus{border-color:var(--t400);box-shadow:var(--glow);}
  .btn-export{display:inline-flex;align-items:center;gap:6px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:8px 16px;
    font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 3px 10px rgba(13,148,136,.24);white-space:nowrap;}
  .btn-export:hover{transform:translateY(-1px);box-shadow:0 5px 16px rgba(13,148,136,.34);}

  /* Table card */
  .table-card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);overflow:hidden;}
  .table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .table-wrap::-webkit-scrollbar{height:5px;}
  .table-wrap::-webkit-scrollbar-track{background:var(--t50);}
  .table-wrap::-webkit-scrollbar-thumb{background:var(--t300);border-radius:3px;}
  table{width:100%;border-collapse:separate;border-spacing:0;font-size:13px;}
  thead tr{background:linear-gradient(to right,var(--t50),var(--t100));}
  thead th{padding:12px 14px;text-align:left;font-size:10px;font-weight:700;
    text-transform:uppercase;letter-spacing:.06em;color:var(--t700);
    white-space:nowrap;border-bottom:2px solid var(--t200);}
  thead th.sortable{cursor:pointer;}
  thead th.sortable:hover{color:var(--t800);}
  tbody tr{transition:background .15s;border-bottom:1px solid var(--t50);}
  tbody tr:last-child{border-bottom:none;}
  tbody tr:hover{background:var(--t50);}
  td{padding:11px 14px;vertical-align:middle;}

  /* Cell content */
  .date-cell{font-size:12px;font-weight:700;color:var(--s800);white-space:nowrap;}
  .day-cell{font-size:12px;font-weight:600;color:var(--t500);}
  .punch-cell{display:flex;flex-direction:column;gap:3px;}
  .punch-row{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--s700);}
  .hours-main{font-size:13px;font-weight:700;color:var(--s800);}
  .hours-sub{font-size:10px;color:var(--s400);}
  .eff-hours{font-size:13px;font-weight:800;color:var(--t600);}
  .eff-bar-wrap{display:flex;align-items:center;gap:6px;min-width:72px;}
  .eff-track{flex:1;height:5px;background:var(--t100);border-radius:3px;overflow:hidden;}
  .eff-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--t400),var(--t600));transition:width .4s;}
  .eff-pct{font-size:10px;font-weight:700;color:var(--t600);white-space:nowrap;}

  .status-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;
    border-radius:20px;font-size:10px;font-weight:700;text-transform:capitalize;white-space:nowrap;}
  .loc-badge{display:inline-block;padding:2px 9px;border-radius:20px;
    font-size:10px;font-weight:700;white-space:nowrap;}
  .warn-clean{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;
    border-radius:20px;font-size:10px;font-weight:700;
    background:var(--t50);color:var(--t600);border:1px solid var(--t200);}
  .warn-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;
    border-radius:20px;font-size:10px;font-weight:700;cursor:pointer;
    background:#fef2f2;color:#dc2626;border:1px solid #fca5a5;position:relative;}
  .warn-tooltip{display:none;position:absolute;bottom:calc(100% + 6px);left:50%;
    transform:translateX(-50%);background:var(--t800);color:#fff;border-radius:10px;
    padding:8px 12px;min-width:160px;z-index:20;box-shadow:var(--shlg);}
  .warn-badge:hover .warn-tooltip{display:block;}
  .wt-title{font-size:10px;font-weight:700;color:var(--t300);margin-bottom:4px;}
  .wt-item{display:flex;align-items:center;gap:5px;font-size:10px;color:rgba(255,255,255,.85);margin-bottom:2px;}
  .wt-arrow{width:8px;height:8px;background:var(--t800);transform:rotate(45deg);
    position:absolute;bottom:-4px;left:50%;margin-left:-4px;}
  .view-btn{width:28px;height:28px;border:none;border-radius:7px;cursor:pointer;
    background:var(--t50);color:var(--t400);font-size:13px;
    display:flex;align-items:center;justify-content:center;transition:all .15s;}
  .view-btn:hover{background:var(--t100);color:var(--t600);}

  /* Empty state */
  .empty{text-align:center;padding:52px 24px;}
  .empty-icon{font-size:32px;color:var(--t200);margin-bottom:10px;}
  .empty-title{font-size:14px;font-weight:600;color:var(--s500);margin:0 0 4px;}
  .empty-sub{font-size:12px;color:var(--s400);margin:0;}

  /* Pagination */
  .pagination{padding:12px 16px;border-top:1px solid var(--t100);background:var(--t50);
    display:flex;flex-direction:column;gap:8px;align-items:center;}
  @media(min-width:480px){.pagination{flex-direction:row;justify-content:space-between;}}
  .pg-info{font-size:11px;color:var(--s400);}
  .pg-info strong{color:var(--t700);}
  .pg-btns{display:flex;align-items:center;gap:4px;}
  .pg-btn{width:28px;height:28px;border:1.5px solid var(--t100);background:var(--sur);
    border-radius:7px;display:flex;align-items:center;justify-content:center;
    color:var(--t400);cursor:pointer;font-size:12px;transition:all .15s;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;}
  .pg-btn:hover:not(:disabled){background:var(--t50);color:var(--t600);border-color:var(--t300);}
  .pg-btn:disabled{opacity:.4;cursor:not-allowed;}
  .pg-btn-active{background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border-color:var(--t500);box-shadow:0 2px 8px rgba(13,148,136,.22);}
  .pg-btn-active:hover{background:linear-gradient(135deg,var(--t500),var(--t600))!important;}
`;

const sampleData = [
  { id:1, date:'2024-01-15', day:'Mon', punchIn:'09:00 AM', punchOut:'06:15 PM', totalHours:'9.25', breakTime:'45m', effectiveHours:'8.5',  status:'present',  efficiency:'92', breaks:[{type:'lunch',start:'01:00 PM',end:'01:45 PM',duration:'45m'}],      location:'Office',   warnings:[] },
  { id:2, date:'2024-01-14', day:'Sun', punchIn:'--',       punchOut:'--',       totalHours:'0',    breakTime:'0m',  effectiveHours:'0',    status:'holiday',  efficiency:'0',  breaks:[], location:'--',        warnings:[] },
  { id:3, date:'2024-01-13', day:'Sat', punchIn:'--',       punchOut:'--',       totalHours:'0',    breakTime:'0m',  effectiveHours:'0',    status:'weekend',  efficiency:'0',  breaks:[], location:'--',        warnings:[] },
  { id:4, date:'2024-01-12', day:'Fri', punchIn:'09:15 AM', punchOut:'06:30 PM', totalHours:'9.25', breakTime:'1h',  effectiveHours:'8.25', status:'present',  efficiency:'89', breaks:[{type:'tea',duration:'15m'},{type:'lunch',duration:'45m'}],           location:'Office',   warnings:['Late punch-in'] },
  { id:5, date:'2024-01-11', day:'Thu', punchIn:'08:45 AM', punchOut:'05:45 PM', totalHours:'9',    breakTime:'30m', effectiveHours:'8.5',  status:'present',  efficiency:'94', breaks:[{type:'lunch',duration:'30m'}],                                        location:'WFH',      warnings:['Early punch-out'] },
  { id:6, date:'2024-01-10', day:'Wed', punchIn:'09:30 AM', punchOut:'04:30 PM', totalHours:'7',    breakTime:'30m', effectiveHours:'6.5',  status:'half-day', efficiency:'93', breaks:[{type:'lunch',duration:'30m'}],                                        location:'Office',   warnings:['Late punch-in','Short working hours'] },
  { id:7, date:'2024-01-09', day:'Tue', punchIn:'10:00 AM', punchOut:'07:00 PM', totalHours:'9',    breakTime:'1h',  effectiveHours:'8',    status:'present',  efficiency:'89', breaks:[{type:'tea',duration:'15m'},{type:'lunch',duration:'45m'}],           location:'Client',   warnings:['Late punch-in','Long break time'] },
  { id:8, date:'2024-01-08', day:'Mon', punchIn:'--',       punchOut:'--',       totalHours:'0',    breakTime:'0m',  effectiveHours:'0',    status:'absent',   efficiency:'0',  breaks:[], location:'--',        warnings:['Unauthorized absence'] },
];

const statusStyle = s => ({
  present:   {bg:'#dcfce7',color:'#166534',border:'#86efac'},
  absent:    {bg:'#fee2e2',color:'#991b1b',border:'#fca5a5'},
  'half-day':{bg:'#fef9c3',color:'#854d0e',border:'#fde68a'},
  weekend:   {bg:'#cffafe',color:'#0e7490',border:'#a5f3fc'},
  holiday:   {bg:'#f5f3ff',color:'#5b21b6',border:'#c4b5fd'},
}[s]||{bg:'var(--t50)',color:'var(--t600)',border:'var(--t200)'});

const statusIcon = s => ({
  present:   <FiCheckCircle style={{fontSize:9,color:'#22c55e'}}/>,
  absent:    <FiXCircle     style={{fontSize:9,color:'#ef4444'}}/>,
  'half-day':<FiAlertCircle style={{fontSize:9,color:'#f59e0b'}}/>,
  weekend:   <FiCalendar    style={{fontSize:9,color:'#06b6d4'}}/>,
  holiday:   <FiCalendar    style={{fontSize:9,color:'#8b5cf6'}}/>,
}[s]||<FiCalendar style={{fontSize:9}}/>);

const locationStyle = loc => ({
  'Office': {bg:'var(--t50)',  color:'var(--t700)', border:'var(--t200)'},
  'WFH':    {bg:'#ecfeff',     color:'#0e7490',     border:'#a5f3fc'},
  'Client': {bg:'#f5f3ff',     color:'#5b21b6',     border:'#c4b5fd'},
}[loc]||{bg:'var(--t50)',color:'var(--s400)',border:'var(--t100)'});

const AttendanceHistory = () => {
  const [data, setData]                 = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [currentPage, setCurrentPage]   = useState(1);
  const [searchTerm, setSearchTerm]     = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter]     = useState('all');
  const [sortConfig, setSortConfig]     = useState({ key:'date', direction:'desc' });
  const perPage = 8;

  useEffect(() => { setData(sampleData); setFiltered(sampleData); }, []);

  useEffect(() => {
    let r = [...data];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      r = r.filter(d => d.day.toLowerCase().includes(q) || d.date.includes(q) ||
        d.location.toLowerCase().includes(q) || (d.warnings||[]).some(w=>w.toLowerCase().includes(q)));
    }
    if (statusFilter !== 'all') r = r.filter(d => d.status === statusFilter);
    if (dateFilter !== 'all') {
      const today = new Date();
      const w1 = new Date(today.getTime()-7*86400000);
      const w2 = new Date(today.getTime()-14*86400000);
      r = r.filter(d => {
        const dt = new Date(d.date);
        if (dateFilter==='this-week') return dt >= w1;
        if (dateFilter==='last-week') return dt >= w2 && dt < w1;
        if (dateFilter==='this-month') return dt.getMonth()===today.getMonth()&&dt.getFullYear()===today.getFullYear();
        return true;
      });
    }
    setFiltered(r); setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, data]);

  const handleSort = key => {
    const dir = sortConfig.key===key && sortConfig.direction==='asc' ? 'desc' : 'asc';
    setSortConfig({key,direction:dir});
    setFiltered(p=>[...p].sort((a,b)=>{
      if(a[key]<b[key]) return dir==='asc'?-1:1;
      if(a[key]>b[key]) return dir==='asc'?1:-1;
      return 0;
    }));
  };

  const last    = currentPage * perPage;
  const first   = last - perPage;
  const current = filtered.slice(first, last);
  const total   = Math.ceil(filtered.length / perPage);

  const presentRecs = data.filter(d=>d.status==='present');
  const totalHrs    = presentRecs.reduce((a,c)=>a+(parseFloat(c.effectiveHours)||0),0).toFixed(0);
  const avgEff      = presentRecs.length > 0 ? Math.round(presentRecs.reduce((a,c)=>a+(parseFloat(c.efficiency)||0),0)/presentRecs.length) : 0;

  const summaryCards = [
    { label:'Present',       val:presentRecs.length,             color:'#16a34a', bg:'#f0fdf4',border:'#bbf7d0',icon:<FiCheckCircle style={{color:'#22c55e',fontSize:15}}/> },
    { label:'Absent',        val:data.filter(d=>d.status==='absent').length, color:'#dc2626',bg:'#fee2e2',border:'#fca5a5',icon:<FiXCircle style={{color:'#ef4444',fontSize:15}}/> },
    { label:'Total Hours',   val:`${totalHrs}h`,                 color:'var(--t700)', bg:'var(--t50)',border:'var(--t200)',icon:<FiClock style={{color:'var(--t500)',fontSize:15}}/> },
    { label:'Avg Efficiency',val:`${avgEff}%`,                   color:'#0e7490', bg:'#ecfeff',border:'#a5f3fc',icon:<FiBarChart2 style={{color:'#06b6d4',fontSize:15}}/> },
    { label:'With Warnings', val:data.filter(d=>(d.warnings||[]).length>0).length, color:'#d97706',bg:'#fffbeb',border:'#fde68a',icon:<FiAlertTriangle style={{color:'#f59e0b',fontSize:15}}/> },
  ];

  const sortArrow = col => sortConfig.key===col ? (sortConfig.direction==='asc'?'↑':'↓') : '';

  return (
    <div className="ah-root">
      <style>{style}</style>

      <div className="ah-hdr">
        <h1 className="ah-title">Attendance History</h1>
        <p className="ah-sub">Track your attendance records and warnings</p>
      </div>

      {/* Summary */}
      <div className="summary-grid">
        {summaryCards.map((c,i)=>(
          <div key={i} className="sum-card">
            <div className="sum-icon" style={{background:c.bg,border:`1px solid ${c.border}`}}>{c.icon}</div>
            <div>
              <div className="sum-label">{c.label}</div>
              <div className="sum-val" style={{color:c.color}}>{c.val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-wrap">
          <FiSearch className="search-icon"/>
          <input className="search-input" type="text"
            placeholder="Search by date, location or warnings…"
            value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
        </div>
        <div className="filter-controls">
          <select className="sel" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="half-day">Half Day</option>
          </select>
          <select className="sel" value={dateFilter} onChange={e=>setDateFilter(e.target.value)}>
            <option value="all">All Time</option>
            <option value="this-week">This Week</option>
            <option value="last-week">Last Week</option>
            <option value="this-month">This Month</option>
          </select>
          <button className="btn-export"><FiDownload style={{fontSize:12}}/>Export</button>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th className="sortable" onClick={()=>handleSort('date')}>Date {sortArrow('date')}</th>
                <th>Day</th>
                <th>In / Out</th>
                <th>Hours</th>
                <th>Breaks</th>
                <th className="sortable" onClick={()=>handleSort('effectiveHours')}>Effective {sortArrow('effectiveHours')}</th>
                <th>Efficiency</th>
                <th>Location</th>
                <th>Status</th>
                <th>Warnings</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {current.map(rec => {
                const ss = statusStyle(rec.status);
                const ls = locationStyle(rec.location);
                return (
                  <tr key={rec.id}>
                    <td><span className="date-cell">{rec.date}</span></td>
                    <td><span className="day-cell">{rec.day}</span></td>
                    <td>
                      <div className="punch-cell">
                        <div className="punch-row">
                          <FiCheckCircle style={{color:'var(--t400)',fontSize:10,flexShrink:0}}/>
                          <span>{rec.punchIn}</span>
                        </div>
                        <div className="punch-row">
                          <FiXCircle style={{color:'#ef4444',fontSize:10,flexShrink:0}}/>
                          <span>{rec.punchOut}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="hours-main">{rec.totalHours}h</div>
                      <div className="hours-sub">{rec.breakTime}</div>
                    </td>
                    <td>
                      {rec.breaks?.length ? (
                        <div style={{display:'flex',gap:4}}>
                          {rec.breaks.map((b,i)=>b.type==='tea'
                            ? <FiCoffee key={i} style={{color:'#d97706',fontSize:12}}/>
                            : <FiSun    key={i} style={{color:'#c2410c',fontSize:12}}/>
                          )}
                        </div>
                      ) : <span style={{color:'var(--t200)',fontSize:11}}>—</span>}
                    </td>
                    <td><span className="eff-hours">{rec.effectiveHours}h</span></td>
                    <td>
                      <div className="eff-bar-wrap">
                        <div className="eff-track">
                          <div className="eff-fill" style={{width:`${rec.efficiency}%`}}/>
                        </div>
                        <span className="eff-pct">{rec.efficiency}%</span>
                      </div>
                    </td>
                    <td>
                      {rec.location !== '--' ? (
                        <span className="loc-badge" style={{background:ls.bg,color:ls.color,border:`1px solid ${ls.border}`}}>
                          {rec.location}
                        </span>
                      ) : <span style={{color:'var(--t200)',fontSize:12}}>—</span>}
                    </td>
                    <td>
                      <span className="status-badge" style={{background:ss.bg,color:ss.color,border:`1px solid ${ss.border}`}}>
                        {statusIcon(rec.status)}{rec.status.replace('-',' ')}
                      </span>
                    </td>
                    <td>
                      {(rec.warnings||[]).length === 0 ? (
                        <span className="warn-clean"><FiCheckCircle style={{fontSize:10}}/>Clean</span>
                      ) : (
                        <div className="warn-badge">
                          <FiAlertTriangle style={{fontSize:10}}/>{rec.warnings.length} warning{rec.warnings.length>1?'s':''}
                          <div className="warn-tooltip">
                            <div className="wt-title">Warnings</div>
                            {rec.warnings.map((w,i)=>(
                              <div key={i} className="wt-item">
                                <FiAlertTriangle style={{color:'#f87171',fontSize:9,flexShrink:0}}/>{w}
                              </div>
                            ))}
                            <div className="wt-arrow"/>
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <button className="view-btn"><FiEye/></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {current.length === 0 && (
            <div className="empty">
              <div className="empty-icon"><FiCalendar/></div>
              <p className="empty-title">No records found</p>
              <p className="empty-sub">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {filtered.length > 0 && (
          <div className="pagination">
            <p className="pg-info">
              Showing <strong>{first+1}–{Math.min(last,filtered.length)}</strong> of <strong>{filtered.length}</strong> records
            </p>
            <div className="pg-btns">
              <button className="pg-btn" disabled={currentPage===1}
                onClick={()=>setCurrentPage(p=>Math.max(p-1,1))}>
                <FiChevronLeft/>
              </button>
              {Array.from({length:Math.min(5,total)},(_,i)=>{
                let p;
                if(total<=5) p=i+1;
                else if(currentPage<=3) p=i+1;
                else if(currentPage>=total-2) p=total-4+i;
                else p=currentPage-2+i;
                return (
                  <button key={p} className={`pg-btn ${currentPage===p?'pg-btn-active':''}`}
                    onClick={()=>setCurrentPage(p)}>{p}</button>
                );
              })}
              <button className="pg-btn" disabled={currentPage===total}
                onClick={()=>setCurrentPage(p=>Math.min(p+1,total))}>
                <FiChevronRight/>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceHistory;