// import React, { useState, useEffect } from 'react';
// import {
//   FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle,
//   FiSearch, FiDownload, FiEye, FiChevronLeft, FiChevronRight,
//   FiCoffee, FiSun, FiAlertTriangle, FiBarChart2,
// } from 'react-icons/fi';

// const style = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');
//   :root {
//     --t50:#f0fdfa;--t100:#ccfbf1;--t200:#99f6e4;--t300:#5eead4;--t400:#2dd4bf;
//     --t500:#14b8a6;--t600:#0d9488;--t700:#0f766e;--t800:#115e59;
//     --s400:#94a3b8;--s500:#64748b;--s600:#475569;--s700:#334155;--s800:#1e293b;
//     --sur:#fff;--sur2:#f8fffe;
//     --rsm:8px;--rmd:14px;--rlg:20px;
//     --shmd:0 4px 16px rgba(13,148,136,.10),0 2px 6px rgba(13,148,136,.06);
//     --shlg:0 10px 40px rgba(13,148,136,.14),0 4px 12px rgba(13,148,136,.08);
//     --glow:0 0 0 3px rgba(20,184,166,.16);
//   }
//   *{box-sizing:border-box;}
//   .ah-root{
//     font-family:'DM Sans',sans-serif;min-height:100vh;
//     background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
//     position:relative;overflow-x:hidden;padding:18px 14px 64px;
//   }
//   @media(min-width:480px){.ah-root{padding:22px 18px 64px;}}
//   @media(min-width:640px){.ah-root{padding:28px 24px 72px;}}
//   @media(min-width:1024px){.ah-root{padding:36px 40px 80px;}}
//   .ah-root::before{content:'';position:fixed;top:-180px;right:-180px;width:500px;height:500px;
//     background:radial-gradient(circle,rgba(20,184,166,.08) 0%,transparent 70%);pointer-events:none;z-index:0;}
//   .ah-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:440px;height:440px;
//     background:radial-gradient(circle,rgba(13,148,136,.06) 0%,transparent 70%);pointer-events:none;z-index:0;}
//   .ah-root > *{position:relative;z-index:1;}

//   /* Header */
//   .ah-hdr{margin-bottom:20px;}
//   .ah-title{font-family:'Syne',sans-serif;font-size:clamp(18px,4vw,26px);font-weight:800;
//     color:var(--t800);letter-spacing:-.5px;margin:0 0 3px;}
//   .ah-sub{font-size:12px;color:var(--s500);margin:0;}
//   @media(min-width:480px){.ah-sub{font-size:13px;}}

//   /* Summary cards */
//   .summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;}
//   @media(min-width:480px){.summary-grid{grid-template-columns:repeat(3,1fr);}}
//   @media(min-width:900px){.summary-grid{grid-template-columns:repeat(5,1fr);gap:12px;}}
//   .sum-card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
//     border:1px solid rgba(20,184,166,.10);padding:13px 14px;
//     display:flex;align-items:center;gap:11px;transition:transform .2s,box-shadow .2s;}
//   .sum-card:hover{transform:translateY(-2px);box-shadow:var(--shlg);}
//   .sum-icon{width:36px;height:36px;border-radius:9px;flex-shrink:0;
//     display:flex;align-items:center;justify-content:center;font-size:15px;}
//   .sum-label{font-size:9px;font-weight:600;color:var(--s400);text-transform:uppercase;
//     letter-spacing:.04em;margin-bottom:2px;}
//   @media(min-width:480px){.sum-label{font-size:10px;}}
//   .sum-val{font-family:'Syne',sans-serif;font-size:clamp(16px,3vw,20px);font-weight:800;line-height:1;}

//   /* Filter bar */
//   .filter-bar{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
//     border:1px solid rgba(20,184,136,.10);padding:14px;margin-bottom:16px;
//     display:flex;flex-direction:column;gap:10px;}
//   @media(min-width:768px){.filter-bar{flex-direction:row;align-items:center;}}
//   .search-wrap{position:relative;flex:1;min-width:0;}
//   .search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);
//     color:var(--t400);font-size:13px;pointer-events:none;}
//   .search-input{width:100%;padding:9px 12px 9px 36px;background:var(--t50);
//     border:1.5px solid var(--t100);border-radius:var(--rsm);
//     font-family:'DM Sans',sans-serif;font-size:13px;color:var(--s700);outline:none;transition:all .2s;}
//   .search-input:focus{border-color:var(--t400);box-shadow:var(--glow);background:#fff;}
//   .search-input::placeholder{color:var(--s400);}
//   .filter-controls{display:flex;flex-wrap:wrap;gap:8px;}
//   .sel{padding:8px 28px 8px 12px;background:var(--t50);border:1.5px solid var(--t100);
//     border-radius:var(--rsm);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;
//     color:var(--s600);outline:none;cursor:pointer;transition:all .2s;
//     appearance:none;-webkit-appearance:none;
//     background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%230d9488' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
//     background-repeat:no-repeat;background-position:right 8px center;}
//   .sel:focus{border-color:var(--t400);box-shadow:var(--glow);}
//   .btn-export{display:inline-flex;align-items:center;gap:6px;
//     background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
//     border:none;border-radius:var(--rsm);padding:8px 16px;
//     font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;
//     transition:all .2s;box-shadow:0 3px 10px rgba(13,148,136,.24);white-space:nowrap;}
//   .btn-export:hover{transform:translateY(-1px);box-shadow:0 5px 16px rgba(13,148,136,.34);}

//   /* Table card */
//   .table-card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
//     border:1px solid rgba(20,184,166,.10);overflow:hidden;}
//   .table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}
//   .table-wrap::-webkit-scrollbar{height:5px;}
//   .table-wrap::-webkit-scrollbar-track{background:var(--t50);}
//   .table-wrap::-webkit-scrollbar-thumb{background:var(--t300);border-radius:3px;}
//   table{width:100%;border-collapse:separate;border-spacing:0;font-size:13px;}
//   thead tr{background:linear-gradient(to right,var(--t50),var(--t100));}
//   thead th{padding:12px 14px;text-align:left;font-size:10px;font-weight:700;
//     text-transform:uppercase;letter-spacing:.06em;color:var(--t700);
//     white-space:nowrap;border-bottom:2px solid var(--t200);}
//   thead th.sortable{cursor:pointer;}
//   thead th.sortable:hover{color:var(--t800);}
//   tbody tr{transition:background .15s;border-bottom:1px solid var(--t50);}
//   tbody tr:last-child{border-bottom:none;}
//   tbody tr:hover{background:var(--t50);}
//   td{padding:11px 14px;vertical-align:middle;}

//   /* Cell content */
//   .date-cell{font-size:12px;font-weight:700;color:var(--s800);white-space:nowrap;}
//   .day-cell{font-size:12px;font-weight:600;color:var(--t500);}
//   .punch-cell{display:flex;flex-direction:column;gap:3px;}
//   .punch-row{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--s700);}
//   .hours-main{font-size:13px;font-weight:700;color:var(--s800);}
//   .hours-sub{font-size:10px;color:var(--s400);}
//   .eff-hours{font-size:13px;font-weight:800;color:var(--t600);}
//   .eff-bar-wrap{display:flex;align-items:center;gap:6px;min-width:72px;}
//   .eff-track{flex:1;height:5px;background:var(--t100);border-radius:3px;overflow:hidden;}
//   .eff-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--t400),var(--t600));transition:width .4s;}
//   .eff-pct{font-size:10px;font-weight:700;color:var(--t600);white-space:nowrap;}

//   .status-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;
//     border-radius:20px;font-size:10px;font-weight:700;text-transform:capitalize;white-space:nowrap;}
//   .loc-badge{display:inline-block;padding:2px 9px;border-radius:20px;
//     font-size:10px;font-weight:700;white-space:nowrap;}
//   .warn-clean{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;
//     border-radius:20px;font-size:10px;font-weight:700;
//     background:var(--t50);color:var(--t600);border:1px solid var(--t200);}
//   .warn-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;
//     border-radius:20px;font-size:10px;font-weight:700;cursor:pointer;
//     background:#fef2f2;color:#dc2626;border:1px solid #fca5a5;position:relative;}
//   .warn-tooltip{display:none;position:absolute;bottom:calc(100% + 6px);left:50%;
//     transform:translateX(-50%);background:var(--t800);color:#fff;border-radius:10px;
//     padding:8px 12px;min-width:160px;z-index:20;box-shadow:var(--shlg);}
//   .warn-badge:hover .warn-tooltip{display:block;}
//   .wt-title{font-size:10px;font-weight:700;color:var(--t300);margin-bottom:4px;}
//   .wt-item{display:flex;align-items:center;gap:5px;font-size:10px;color:rgba(255,255,255,.85);margin-bottom:2px;}
//   .wt-arrow{width:8px;height:8px;background:var(--t800);transform:rotate(45deg);
//     position:absolute;bottom:-4px;left:50%;margin-left:-4px;}
//   .view-btn{width:28px;height:28px;border:none;border-radius:7px;cursor:pointer;
//     background:var(--t50);color:var(--t400);font-size:13px;
//     display:flex;align-items:center;justify-content:center;transition:all .15s;}
//   .view-btn:hover{background:var(--t100);color:var(--t600);}

//   /* Empty state */
//   .empty{text-align:center;padding:52px 24px;}
//   .empty-icon{font-size:32px;color:var(--t200);margin-bottom:10px;}
//   .empty-title{font-size:14px;font-weight:600;color:var(--s500);margin:0 0 4px;}
//   .empty-sub{font-size:12px;color:var(--s400);margin:0;}

//   /* Pagination */
//   .pagination{padding:12px 16px;border-top:1px solid var(--t100);background:var(--t50);
//     display:flex;flex-direction:column;gap:8px;align-items:center;}
//   @media(min-width:480px){.pagination{flex-direction:row;justify-content:space-between;}}
//   .pg-info{font-size:11px;color:var(--s400);}
//   .pg-info strong{color:var(--t700);}
//   .pg-btns{display:flex;align-items:center;gap:4px;}
//   .pg-btn{width:28px;height:28px;border:1.5px solid var(--t100);background:var(--sur);
//     border-radius:7px;display:flex;align-items:center;justify-content:center;
//     color:var(--t400);cursor:pointer;font-size:12px;transition:all .15s;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;}
//   .pg-btn:hover:not(:disabled){background:var(--t50);color:var(--t600);border-color:var(--t300);}
//   .pg-btn:disabled{opacity:.4;cursor:not-allowed;}
//   .pg-btn-active{background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
//     border-color:var(--t500);box-shadow:0 2px 8px rgba(13,148,136,.22);}
//   .pg-btn-active:hover{background:linear-gradient(135deg,var(--t500),var(--t600))!important;}
// `;

// const sampleData = [
//   { id:1, date:'2024-01-15', day:'Mon', punchIn:'09:00 AM', punchOut:'06:15 PM', totalHours:'9.25', breakTime:'45m', effectiveHours:'8.5',  status:'present',  efficiency:'92', breaks:[{type:'lunch',start:'01:00 PM',end:'01:45 PM',duration:'45m'}],      location:'Office',   warnings:[] },
//   { id:2, date:'2024-01-14', day:'Sun', punchIn:'--',       punchOut:'--',       totalHours:'0',    breakTime:'0m',  effectiveHours:'0',    status:'holiday',  efficiency:'0',  breaks:[], location:'--',        warnings:[] },
//   { id:3, date:'2024-01-13', day:'Sat', punchIn:'--',       punchOut:'--',       totalHours:'0',    breakTime:'0m',  effectiveHours:'0',    status:'weekend',  efficiency:'0',  breaks:[], location:'--',        warnings:[] },
//   { id:4, date:'2024-01-12', day:'Fri', punchIn:'09:15 AM', punchOut:'06:30 PM', totalHours:'9.25', breakTime:'1h',  effectiveHours:'8.25', status:'present',  efficiency:'89', breaks:[{type:'tea',duration:'15m'},{type:'lunch',duration:'45m'}],           location:'Office',   warnings:['Late punch-in'] },
//   { id:5, date:'2024-01-11', day:'Thu', punchIn:'08:45 AM', punchOut:'05:45 PM', totalHours:'9',    breakTime:'30m', effectiveHours:'8.5',  status:'present',  efficiency:'94', breaks:[{type:'lunch',duration:'30m'}],                                        location:'WFH',      warnings:['Early punch-out'] },
//   { id:6, date:'2024-01-10', day:'Wed', punchIn:'09:30 AM', punchOut:'04:30 PM', totalHours:'7',    breakTime:'30m', effectiveHours:'6.5',  status:'half-day', efficiency:'93', breaks:[{type:'lunch',duration:'30m'}],                                        location:'Office',   warnings:['Late punch-in','Short working hours'] },
//   { id:7, date:'2024-01-09', day:'Tue', punchIn:'10:00 AM', punchOut:'07:00 PM', totalHours:'9',    breakTime:'1h',  effectiveHours:'8',    status:'present',  efficiency:'89', breaks:[{type:'tea',duration:'15m'},{type:'lunch',duration:'45m'}],           location:'Client',   warnings:['Late punch-in','Long break time'] },
//   { id:8, date:'2024-01-08', day:'Mon', punchIn:'--',       punchOut:'--',       totalHours:'0',    breakTime:'0m',  effectiveHours:'0',    status:'absent',   efficiency:'0',  breaks:[], location:'--',        warnings:['Unauthorized absence'] },
// ];

// const statusStyle = s => ({
//   present:   {bg:'#dcfce7',color:'#166534',border:'#86efac'},
//   absent:    {bg:'#fee2e2',color:'#991b1b',border:'#fca5a5'},
//   'half-day':{bg:'#fef9c3',color:'#854d0e',border:'#fde68a'},
//   weekend:   {bg:'#cffafe',color:'#0e7490',border:'#a5f3fc'},
//   holiday:   {bg:'#f5f3ff',color:'#5b21b6',border:'#c4b5fd'},
// }[s]||{bg:'var(--t50)',color:'var(--t600)',border:'var(--t200)'});

// const statusIcon = s => ({
//   present:   <FiCheckCircle style={{fontSize:9,color:'#22c55e'}}/>,
//   absent:    <FiXCircle     style={{fontSize:9,color:'#ef4444'}}/>,
//   'half-day':<FiAlertCircle style={{fontSize:9,color:'#f59e0b'}}/>,
//   weekend:   <FiCalendar    style={{fontSize:9,color:'#06b6d4'}}/>,
//   holiday:   <FiCalendar    style={{fontSize:9,color:'#8b5cf6'}}/>,
// }[s]||<FiCalendar style={{fontSize:9}}/>);

// const locationStyle = loc => ({
//   'Office': {bg:'var(--t50)',  color:'var(--t700)', border:'var(--t200)'},
//   'WFH':    {bg:'#ecfeff',     color:'#0e7490',     border:'#a5f3fc'},
//   'Client': {bg:'#f5f3ff',     color:'#5b21b6',     border:'#c4b5fd'},
// }[loc]||{bg:'var(--t50)',color:'var(--s400)',border:'var(--t100)'});

// const AttendanceHistory = () => {
//   const [data, setData]                 = useState([]);
//   const [filtered, setFiltered]         = useState([]);
//   const [currentPage, setCurrentPage]   = useState(1);
//   const [searchTerm, setSearchTerm]     = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [dateFilter, setDateFilter]     = useState('all');
//   const [sortConfig, setSortConfig]     = useState({ key:'date', direction:'desc' });
//   const perPage = 8;

//   useEffect(() => { setData(sampleData); setFiltered(sampleData); }, []);

//   useEffect(() => {
//     let r = [...data];
//     if (searchTerm) {
//       const q = searchTerm.toLowerCase();
//       r = r.filter(d => d.day.toLowerCase().includes(q) || d.date.includes(q) ||
//         d.location.toLowerCase().includes(q) || (d.warnings||[]).some(w=>w.toLowerCase().includes(q)));
//     }
//     if (statusFilter !== 'all') r = r.filter(d => d.status === statusFilter);
//     if (dateFilter !== 'all') {
//       const today = new Date();
//       const w1 = new Date(today.getTime()-7*86400000);
//       const w2 = new Date(today.getTime()-14*86400000);
//       r = r.filter(d => {
//         const dt = new Date(d.date);
//         if (dateFilter==='this-week') return dt >= w1;
//         if (dateFilter==='last-week') return dt >= w2 && dt < w1;
//         if (dateFilter==='this-month') return dt.getMonth()===today.getMonth()&&dt.getFullYear()===today.getFullYear();
//         return true;
//       });
//     }
//     setFiltered(r); setCurrentPage(1);
//   }, [searchTerm, statusFilter, dateFilter, data]);

//   const handleSort = key => {
//     const dir = sortConfig.key===key && sortConfig.direction==='asc' ? 'desc' : 'asc';
//     setSortConfig({key,direction:dir});
//     setFiltered(p=>[...p].sort((a,b)=>{
//       if(a[key]<b[key]) return dir==='asc'?-1:1;
//       if(a[key]>b[key]) return dir==='asc'?1:-1;
//       return 0;
//     }));
//   };

//   const last    = currentPage * perPage;
//   const first   = last - perPage;
//   const current = filtered.slice(first, last);
//   const total   = Math.ceil(filtered.length / perPage);

//   const presentRecs = data.filter(d=>d.status==='present');
//   const totalHrs    = presentRecs.reduce((a,c)=>a+(parseFloat(c.effectiveHours)||0),0).toFixed(0);
//   const avgEff      = presentRecs.length > 0 ? Math.round(presentRecs.reduce((a,c)=>a+(parseFloat(c.efficiency)||0),0)/presentRecs.length) : 0;

//   const summaryCards = [
//     { label:'Present',       val:presentRecs.length,             color:'#16a34a', bg:'#f0fdf4',border:'#bbf7d0',icon:<FiCheckCircle style={{color:'#22c55e',fontSize:15}}/> },
//     { label:'Absent',        val:data.filter(d=>d.status==='absent').length, color:'#dc2626',bg:'#fee2e2',border:'#fca5a5',icon:<FiXCircle style={{color:'#ef4444',fontSize:15}}/> },
//     { label:'Total Hours',   val:`${totalHrs}h`,                 color:'var(--t700)', bg:'var(--t50)',border:'var(--t200)',icon:<FiClock style={{color:'var(--t500)',fontSize:15}}/> },
//     { label:'Avg Efficiency',val:`${avgEff}%`,                   color:'#0e7490', bg:'#ecfeff',border:'#a5f3fc',icon:<FiBarChart2 style={{color:'#06b6d4',fontSize:15}}/> },
//     { label:'With Warnings', val:data.filter(d=>(d.warnings||[]).length>0).length, color:'#d97706',bg:'#fffbeb',border:'#fde68a',icon:<FiAlertTriangle style={{color:'#f59e0b',fontSize:15}}/> },
//   ];

//   const sortArrow = col => sortConfig.key===col ? (sortConfig.direction==='asc'?'↑':'↓') : '';

//   return (
//     <div className="ah-root">
//       <style>{style}</style>

//       <div className="ah-hdr">
//         <h1 className="ah-title">Attendance History</h1>
//         <p className="ah-sub">Track your attendance records and warnings</p>
//       </div>

//       {/* Summary */}
//       <div className="summary-grid">
//         {summaryCards.map((c,i)=>(
//           <div key={i} className="sum-card">
//             <div className="sum-icon" style={{background:c.bg,border:`1px solid ${c.border}`}}>{c.icon}</div>
//             <div>
//               <div className="sum-label">{c.label}</div>
//               <div className="sum-val" style={{color:c.color}}>{c.val}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="filter-bar">
//         <div className="search-wrap">
//           <FiSearch className="search-icon"/>
//           <input className="search-input" type="text"
//             placeholder="Search by date, location or warnings…"
//             value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
//         </div>
//         <div className="filter-controls">
//           <select className="sel" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
//             <option value="all">All Status</option>
//             <option value="present">Present</option>
//             <option value="absent">Absent</option>
//             <option value="half-day">Half Day</option>
//           </select>
//           <select className="sel" value={dateFilter} onChange={e=>setDateFilter(e.target.value)}>
//             <option value="all">All Time</option>
//             <option value="this-week">This Week</option>
//             <option value="last-week">Last Week</option>
//             <option value="this-month">This Month</option>
//           </select>
//           <button className="btn-export"><FiDownload style={{fontSize:12}}/>Export</button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="table-card">
//         <div className="table-wrap">
//           <table>
//             <thead>
//               <tr>
//                 <th className="sortable" onClick={()=>handleSort('date')}>Date {sortArrow('date')}</th>
//                 <th>Day</th>
//                 <th>In / Out</th>
//                 <th>Hours</th>
//                 <th>Breaks</th>
//                 <th className="sortable" onClick={()=>handleSort('effectiveHours')}>Effective {sortArrow('effectiveHours')}</th>
//                 <th>Efficiency</th>
//                 <th>Location</th>
//                 <th>Status</th>
//                 <th>Warnings</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {current.map(rec => {
//                 const ss = statusStyle(rec.status);
//                 const ls = locationStyle(rec.location);
//                 return (
//                   <tr key={rec.id}>
//                     <td><span className="date-cell">{rec.date}</span></td>
//                     <td><span className="day-cell">{rec.day}</span></td>
//                     <td>
//                       <div className="punch-cell">
//                         <div className="punch-row">
//                           <FiCheckCircle style={{color:'var(--t400)',fontSize:10,flexShrink:0}}/>
//                           <span>{rec.punchIn}</span>
//                         </div>
//                         <div className="punch-row">
//                           <FiXCircle style={{color:'#ef4444',fontSize:10,flexShrink:0}}/>
//                           <span>{rec.punchOut}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="hours-main">{rec.totalHours}h</div>
//                       <div className="hours-sub">{rec.breakTime}</div>
//                     </td>
//                     <td>
//                       {rec.breaks?.length ? (
//                         <div style={{display:'flex',gap:4}}>
//                           {rec.breaks.map((b,i)=>b.type==='tea'
//                             ? <FiCoffee key={i} style={{color:'#d97706',fontSize:12}}/>
//                             : <FiSun    key={i} style={{color:'#c2410c',fontSize:12}}/>
//                           )}
//                         </div>
//                       ) : <span style={{color:'var(--t200)',fontSize:11}}>—</span>}
//                     </td>
//                     <td><span className="eff-hours">{rec.effectiveHours}h</span></td>
//                     <td>
//                       <div className="eff-bar-wrap">
//                         <div className="eff-track">
//                           <div className="eff-fill" style={{width:`${rec.efficiency}%`}}/>
//                         </div>
//                         <span className="eff-pct">{rec.efficiency}%</span>
//                       </div>
//                     </td>
//                     <td>
//                       {rec.location !== '--' ? (
//                         <span className="loc-badge" style={{background:ls.bg,color:ls.color,border:`1px solid ${ls.border}`}}>
//                           {rec.location}
//                         </span>
//                       ) : <span style={{color:'var(--t200)',fontSize:12}}>—</span>}
//                     </td>
//                     <td>
//                       <span className="status-badge" style={{background:ss.bg,color:ss.color,border:`1px solid ${ss.border}`}}>
//                         {statusIcon(rec.status)}{rec.status.replace('-',' ')}
//                       </span>
//                     </td>
//                     <td>
//                       {(rec.warnings||[]).length === 0 ? (
//                         <span className="warn-clean"><FiCheckCircle style={{fontSize:10}}/>Clean</span>
//                       ) : (
//                         <div className="warn-badge">
//                           <FiAlertTriangle style={{fontSize:10}}/>{rec.warnings.length} warning{rec.warnings.length>1?'s':''}
//                           <div className="warn-tooltip">
//                             <div className="wt-title">Warnings</div>
//                             {rec.warnings.map((w,i)=>(
//                               <div key={i} className="wt-item">
//                                 <FiAlertTriangle style={{color:'#f87171',fontSize:9,flexShrink:0}}/>{w}
//                               </div>
//                             ))}
//                             <div className="wt-arrow"/>
//                           </div>
//                         </div>
//                       )}
//                     </td>
//                     <td>
//                       <button className="view-btn"><FiEye/></button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           {current.length === 0 && (
//             <div className="empty">
//               <div className="empty-icon"><FiCalendar/></div>
//               <p className="empty-title">No records found</p>
//               <p className="empty-sub">Try adjusting your filters</p>
//             </div>
//           )}
//         </div>

//         {filtered.length > 0 && (
//           <div className="pagination">
//             <p className="pg-info">
//               Showing <strong>{first+1}–{Math.min(last,filtered.length)}</strong> of <strong>{filtered.length}</strong> records
//             </p>
//             <div className="pg-btns">
//               <button className="pg-btn" disabled={currentPage===1}
//                 onClick={()=>setCurrentPage(p=>Math.max(p-1,1))}>
//                 <FiChevronLeft/>
//               </button>
//               {Array.from({length:Math.min(5,total)},(_,i)=>{
//                 let p;
//                 if(total<=5) p=i+1;
//                 else if(currentPage<=3) p=i+1;
//                 else if(currentPage>=total-2) p=total-4+i;
//                 else p=currentPage-2+i;
//                 return (
//                   <button key={p} className={`pg-btn ${currentPage===p?'pg-btn-active':''}`}
//                     onClick={()=>setCurrentPage(p)}>{p}</button>
//                 );
//               })}
//               <button className="pg-btn" disabled={currentPage===total}
//                 onClick={()=>setCurrentPage(p=>Math.min(p+1,total))}>
//                 <FiChevronRight/>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AttendanceHistory;


// AttendanceHistory.jsx - Fixed with correct API endpoints
import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle,
  FiSearch, FiDownload, FiEye, FiChevronLeft, FiChevronRight,
  FiCoffee, FiBarChart2, FiLoader, FiRefreshCw, FiPlay, FiPause
} from 'react-icons/fi';
import axios from 'axios';

const API_BASE_URL = 'https://pmsbackend.pixelmindsolutions.com/api';

const AttendanceHistory = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeName, setEmployeeName] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [stats, setStats] = useState({ totalWork: 0, totalBreak: 0, totalIdle: 0, avgEfficiency: 0 });
  const [showTimeline, setShowTimeline] = useState(false);
  const [timeline, setTimeline] = useState(null);
  
  const perPage = 10;

  // Get employee data from session storage
  const getUserDataFromStorage = () => {
    try {
      // First try to get staffDetails from login
      const staffDetails = sessionStorage.getItem('staffDetails');
      if (staffDetails) {
        const parsed = JSON.parse(staffDetails);
        return {
          employeeId: parsed.user?.employeeId,
          employeeName: parsed.user?.employeeName,
          token: parsed.token
        };
      }
      
      // Alternative: Check for individual items
      const empId = sessionStorage.getItem('employeeId');
      const token = sessionStorage.getItem('token');
      const empName = sessionStorage.getItem('employeeName');
      
      return {
        employeeId: empId,
        employeeName: empName,
        token: token
      };
    } catch (err) {
      console.error('Error parsing user data:', err);
      return { employeeId: null, employeeName: null, token: null };
    }
  };

  // Fetch all sessions from backend - using correct endpoint from your routes
  const fetchSessions = useCallback(async () => {
    const { employeeId: empId, employeeName: empName, token } = getUserDataFromStorage();
    
    if (!empId) {
      console.error('No employeeId found in session storage');
      setError('Employee ID not found. Please login again.');
      setLoading(false);
      return;
    }

    setEmployeeId(empId);
    setEmployeeName(empName);
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching sessions for employee:', empId);
      
      // Using the correct endpoint from your backend routes
      // Based on your routes: GET /api/work-session/all-sessions/:employeeId
      const response = await axios.get(
        `${API_BASE_URL}/work-session/all-sessions/${empId}`,
        { 
          headers: { 
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
          } 
        }
      );
      
      console.log('API Response:', response.data);
      
      if (response.data.success) {
        const sessionsData = response.data.data?.sessions || [];
        setSessions(sessionsData);
        setFilteredSessions(sessionsData);
        
        // Calculate statistics
        const totalWork = sessionsData.reduce((sum, s) => sum + (s.totalWorkDuration || 0), 0) / 60;
        const totalBreak = sessionsData.reduce((sum, s) => sum + (s.totalBreakDuration || 0), 0) / 60;
        const totalIdle = sessionsData.reduce((sum, s) => sum + (s.totalIdleTime || 0), 0) / 60;
        
        // Calculate average efficiency
        const completedSessions = sessionsData.filter(s => s.status === 'completed' && s.totalWorkDuration > 0);
        let avgEfficiency = 0;
        if (completedSessions.length > 0) {
          const totalEfficiency = completedSessions.reduce((sum, s) => {
            const total = (s.totalWorkDuration || 0) + (s.totalBreakDuration || 0);
            return sum + (total > 0 ? ((s.totalWorkDuration || 0) / total) * 100 : 0);
          }, 0);
          avgEfficiency = Math.round(totalEfficiency / completedSessions.length);
        }
        
        setStats({ 
          totalWork: totalWork.toFixed(1), 
          totalBreak: totalBreak.toFixed(1), 
          totalIdle: totalIdle.toFixed(1), 
          avgEfficiency 
        });
      } else {
        setError(response.data.message || 'Failed to fetch sessions');
      }
    } catch (err) {
      console.error('Error fetching sessions:', err);
      console.error('Error details:', err.response?.data);
      
      // Check if it's a route error
      if (err.response?.status === 404) {
        setError('API endpoint not found. Please check if the backend route is registered correctly.');
      } else {
        setError(err.response?.data?.message || err.message || 'Network error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch today's timeline - using correct endpoint
  const fetchTimeline = async () => {
    const { employeeId: empId, token } = getUserDataFromStorage();
    if (!empId) {
      setError('Employee ID not found');
      return;
    }

    try {
      // Using the correct endpoint from your routes: GET /api/work-session/timeline/:employeeId
      const response = await axios.get(
        `${API_BASE_URL}/work-session/timeline/${empId}`,
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );
      if (response.data.success) {
        setTimeline(response.data.data);
        setShowTimeline(true);
      } else {
        console.error('Timeline fetch failed:', response.data.message);
      }
    } catch (err) {
      console.error('Error fetching timeline:', err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Filter and sort
  useEffect(() => {
    let filtered = [...sessions];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(s => 
        new Date(s.date).toLocaleDateString().includes(term) ||
        s.status?.includes(term)
      );
    }
    
    filtered.sort((a, b) => {
      let aVal = sortConfig.key === 'date' ? new Date(a.date) : (a[sortConfig.key] || 0);
      let bVal = sortConfig.key === 'date' ? new Date(b.date) : (b[sortConfig.key] || 0);
      return sortConfig.direction === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
    
    setFilteredSessions(filtered);
    setCurrentPage(1);
  }, [searchTerm, sortConfig, sessions]);

  const formatDuration = (minutes) => {
    if (!minutes) return '0h';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-';
  const formatTime = (date) => date ? new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '-';

  const getEfficiency = (session) => {
    const work = session.totalWorkDuration || 0;
    const breaks = session.totalBreakDuration || 0;
    const total = work + breaks;
    return total > 0 ? Math.round((work / total) * 100) : 0;
  };

  const exportCSV = () => {
    const headers = ['Date', 'Status', 'Start', 'End', 'Work Hours', 'Break', 'Idle', 'Efficiency'];
    const rows = filteredSessions.map(s => [
      formatDate(s.date), s.status, formatTime(s.startTime), formatTime(s.endTime),
      ((s.totalWorkDuration || 0) / 60).toFixed(2),
      ((s.totalBreakDuration || 0) / 60).toFixed(2),
      ((s.totalIdleTime || 0) / 60).toFixed(2),
      `${getEfficiency(s)}%`
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${employeeId}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const paginatedSessions = filteredSessions.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filteredSessions.length / perPage);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-teal-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading attendance history...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchSessions}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-teal-900">Attendance History</h1>
          <p className="text-sm text-gray-500 mt-1">Track your work sessions, breaks, and performance</p>
          {employeeName && (
            <p className="text-sm text-teal-600 mt-2 font-medium">Welcome, {employeeName}</p>
          )}
          {employeeId && (
            <p className="text-xs text-gray-400">Employee ID: {employeeId}</p>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">Total Days</p>
                <p className="text-xl font-bold text-teal-700">{filteredSessions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <FiClock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">Work Hours</p>
                <p className="text-xl font-bold text-emerald-700">{stats.totalWork}h</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                <FiCoffee className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">Break Hours</p>
                <p className="text-xl font-bold text-orange-700">{stats.totalBreak}h</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <FiBarChart2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">Efficiency</p>
                <p className="text-xl font-bold text-blue-700">{stats.avgEfficiency}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium"
              >
                <FiDownload /> Export
              </button>
              <button
                onClick={fetchTimeline}
                className="flex items-center gap-2 px-4 py-2 border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition text-sm font-medium"
              >
                <FiEye /> Today's Timeline
              </button>
              <button
                onClick={fetchSessions}
                className="flex items-center gap-2 px-4 py-2 border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition text-sm font-medium"
              >
                <FiRefreshCw /> Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-teal-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b-2 border-teal-100">
                <tr>
                  {['Date', 'Status', 'Start', 'End', 'Work Hours', 'Break', 'Idle', 'Efficiency', ''].map((col, idx) => (
                    <th key={idx} className="px-4 py-3 text-left text-xs font-semibold text-teal-800 uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-50">
                {paginatedSessions.length > 0 ? (
                  paginatedSessions.map((session) => {
                    const efficiency = getEfficiency(session);
                    return (
                      <tr key={session._id} className="hover:bg-teal-50/50 transition">
                        <td className="px-4 py-3 font-medium text-gray-800 text-sm">{formatDate(session.date)}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                            session.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                            session.status === 'working' ? 'bg-teal-100 text-teal-800 border-teal-200' :
                            'bg-gray-100 text-gray-600 border-gray-200'
                          }`}>
                            {session.status === 'completed' ? <FiCheckCircle className="w-3 h-3" /> :
                             session.status === 'working' ? <FiPlay className="w-3 h-3" /> :
                             <FiPause className="w-3 h-3" />}
                            {session.status?.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{formatTime(session.startTime)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{formatTime(session.endTime)}</td>
                        <td className="px-4 py-3 font-semibold text-emerald-700">{formatDuration(session.totalWorkDuration)}</td>
                        <td className="px-4 py-3 text-orange-600">{formatDuration(session.totalBreakDuration)}</td>
                        <td className="px-4 py-3 text-purple-600">{formatDuration(session.totalIdleTime)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full" style={{ width: `${efficiency}%` }} />
                            </div>
                            <span className="text-xs font-medium">{efficiency}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={fetchTimeline} className="text-teal-500 hover:bg-teal-50 p-1 rounded">
                            <FiEye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-12">
                      <FiCalendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No attendance records found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredSessions.length > 0 && (
            <div className="px-4 py-3 border-t border-teal-100 flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, filteredSessions.length)} of {filteredSessions.length}
              </p>
              <div className="flex gap-1">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="p-2 border border-teal-200 rounded-lg disabled:opacity-50 hover:bg-teal-50">
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 text-sm">{currentPage} / {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="p-2 border border-teal-200 rounded-lg disabled:opacity-50 hover:bg-teal-50">
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline Modal */}
      {showTimeline && timeline && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowTimeline(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Today's Timeline</h3>
              <button onClick={() => setShowTimeline(false)} className="text-gray-500 hover:bg-gray-100 p-1 rounded">✕</button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-teal-50 p-3 rounded"><p className="text-xs text-teal-600">Work Hours</p><p className="text-xl font-bold">{timeline.summary?.totalWorkHours || '0'}h</p></div>
                <div className="bg-orange-50 p-3 rounded"><p className="text-xs text-orange-600">Break Hours</p><p className="text-xl font-bold">{timeline.summary?.totalBreakHours || '0'}h</p></div>
                <div className="bg-purple-50 p-3 rounded"><p className="text-xs text-purple-600">Idle Time</p><p className="text-xl font-bold">{timeline.summary?.totalIdleHours || '0'}h</p></div>
                <div className="bg-blue-50 p-3 rounded"><p className="text-xs text-blue-600">Productivity</p><p className="text-xl font-bold">{timeline.summary?.productivity || 0}%</p></div>
              </div>
              <div className="space-y-3">
                {timeline.timeline?.map((event, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 text-xs text-gray-500">{event.formattedTime}</div>
                    <div className="flex-1 flex gap-3 pb-3 border-b">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-lg">{event.icon || '📋'}</div>
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.location}</p>
                        {event.duration && <p className="text-xs text-teal-600 mt-1">Duration: {event.duration} min</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceHistory;