import React, { useState } from 'react';
import {
  FiFolder, FiPlus, FiSearch, FiCalendar, FiUsers, FiBarChart2,
  FiMoreVertical, FiEdit, FiEye, FiDownload,
  FiClock, FiCheckCircle, FiAlertCircle, FiPause
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
  .tp-root{font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;}
  .tp-root::before{content:'';position:fixed;top:-180px;right:-180px;width:540px;height:540px;
    background:radial-gradient(circle,rgba(20,184,166,.09) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .tp-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:460px;height:460px;
    background:radial-gradient(circle,rgba(13,148,136,.07) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .tp-inner{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:20px 14px 64px;}
  @media(min-width:480px){.tp-inner{padding:24px 18px 64px;}}
  @media(min-width:640px){.tp-inner{padding:32px 24px 72px;}}
  @media(min-width:1024px){.tp-inner{padding:40px 40px 80px;}}

  /* Header */
  .tp-hdr{display:flex;flex-direction:column;gap:14px;margin-bottom:24px;}
  @media(min-width:600px){.tp-hdr{flex-direction:row;align-items:flex-start;justify-content:space-between;}}
  .tp-title{font-family:'Syne',sans-serif;font-size:clamp(20px,4vw,30px);font-weight:800;
    color:var(--t800);letter-spacing:-.5px;display:flex;align-items:center;gap:10px;margin:0 0 4px;}
  .tp-ticon{width:38px;height:38px;background:linear-gradient(135deg,var(--t400),var(--t600));
    border-radius:11px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;
    box-shadow:0 4px 14px rgba(13,148,136,.30);flex-shrink:0;}
  .tp-sub{font-size:13px;color:var(--s500);margin:0;}
  .hdr-acts{display:flex;gap:10px;flex-wrap:wrap;}
  .btn-new{display:inline-flex;align-items:center;gap:7px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:10px 18px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 4px 14px rgba(13,148,136,.28);white-space:nowrap;}
  .btn-new:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(13,148,136,.38);}
  .btn-exp{display:inline-flex;align-items:center;gap:7px;
    background:var(--t50);color:var(--t700);border:1.5px solid var(--t200);
    border-radius:var(--rsm);padding:9px 16px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;}
  .btn-exp:hover{background:var(--t100);}

  /* Stats */
  .stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:18px;}
  @media(min-width:640px){.stats-grid{grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px;}}
  .stat-card{background:var(--sur);border-radius:var(--rlg);padding:16px;text-align:center;
    border:1px solid rgba(20,184,166,.10);box-shadow:var(--shmd);
    border-left:4px solid var(--bar,var(--t400));transition:transform .2s,box-shadow .2s;}
  .stat-card:hover{transform:translateY(-2px);box-shadow:var(--shlg);}
  .stat-val{font-family:'Syne',sans-serif;font-size:clamp(20px,3.5vw,26px);font-weight:800;line-height:1;margin-bottom:4px;}
  .stat-label{font-size:11px;font-weight:500;color:var(--s500);}

  /* Filter bar */
  .filter-bar{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:14px 16px;margin-bottom:18px;
    display:flex;flex-direction:column;gap:12px;}
  @media(min-width:768px){.filter-bar{flex-direction:row;align-items:center;justify-content:space-between;}}
  .search-wrap{position:relative;flex:1;min-width:0;}
  .search-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);
    color:var(--t400);font-size:14px;pointer-events:none;}
  .search-input{width:100%;padding:10px 14px 10px 40px;
    border:1.5px solid var(--t100);border-radius:var(--rsm);
    font-family:'DM Sans',sans-serif;font-size:13px;color:var(--s700);
    background:var(--sur2);outline:none;transition:all .2s;}
  .search-input:focus{border-color:var(--t400);box-shadow:var(--glow);background:#fff;}
  .search-input::placeholder{color:var(--s400);}
  .filter-selects{display:flex;flex-wrap:wrap;gap:8px;}
  .sel{padding:9px 30px 9px 13px;border:1.5px solid var(--t100);border-radius:var(--rsm);
    font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;color:var(--s600);
    background:var(--sur2);outline:none;cursor:pointer;transition:all .2s;
    appearance:none;-webkit-appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%230d9488' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 9px center;}
  .sel:focus{border-color:var(--t400);box-shadow:var(--glow);}

  /* Projects grid */
  .projects-grid{display:grid;grid-template-columns:1fr;gap:14px;}
  @media(min-width:640px){.projects-grid{grid-template-columns:repeat(2,1fr);}}
  @media(min-width:1100px){.projects-grid{grid-template-columns:repeat(3,1fr);}}

  /* Project card */
  .proj-card{background:var(--sur);border-radius:var(--rlg);padding:18px;
    box-shadow:var(--shmd);border:1px solid rgba(20,184,166,.10);
    transition:all .2s;position:relative;overflow:hidden;}
  .proj-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
    background:var(--pbar,var(--t400));}
  .proj-card:hover{transform:translateY(-2px);box-shadow:var(--shlg);}

  .proj-top{display:flex;align-items:center;justify-content:space-between;
    margin-bottom:10px;flex-wrap:wrap;gap:6px;}
  .badge-left{display:flex;align-items:center;gap:5px;}
  .badge-right{display:flex;align-items:center;gap:5px;}
  .status-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;
    border-radius:20px;font-size:10px;font-weight:700;text-transform:capitalize;white-space:nowrap;}
  .st-completed{background:#dcfce7;color:#166534;}
  .st-progress{background:#cffafe;color:#0e7490;}
  .st-planning{background:#fef9c3;color:#854d0e;}
  .st-hold{background:#fff7ed;color:#9a3412;}
  .pri-badge{padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700;white-space:nowrap;}
  .pri-high{background:#fee2e2;color:#991b1b;}
  .pri-med{background:#fef9c3;color:#854d0e;}
  .pri-low{background:#dcfce7;color:#166534;}
  .more-btn{background:none;border:none;cursor:pointer;color:var(--s400);font-size:15px;
    padding:3px;border-radius:5px;display:flex;align-items:center;}
  .more-btn:hover{background:var(--t50);color:var(--t600);}

  .proj-name{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;
    color:var(--s800);margin:0 0 5px;}
  .proj-desc{font-size:12px;color:var(--s500);margin:0 0 12px;line-height:1.45;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}

  .prog-meta{display:flex;justify-content:space-between;font-size:11px;margin-bottom:5px;}
  .prog-track{width:100%;height:6px;background:var(--t50);border-radius:3px;
    overflow:hidden;border:1px solid var(--t100);margin-bottom:12px;}
  .prog-fill{height:100%;border-radius:3px;transition:width .5s ease;}

  .proj-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;
    text-align:center;margin-bottom:12px;padding:10px 0;
    border-top:1px solid var(--t50);border-bottom:1px solid var(--t50);}
  .ps-val{font-family:'Syne',sans-serif;font-size:13px;font-weight:800;
    color:var(--s800);line-height:1;margin-bottom:2px;}
  .ps-label{font-size:9px;color:var(--s400);font-weight:500;}

  .tech-wrap{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;}
  .tech-tag{padding:2px 8px;background:var(--t50);color:var(--t700);
    border:1px solid var(--t200);border-radius:20px;font-size:10px;font-weight:600;}
  .tech-more{padding:2px 8px;background:var(--sur2);color:var(--s500);
    border:1px solid var(--s200);border-radius:20px;font-size:10px;font-weight:600;}

  .proj-footer{display:flex;align-items:center;justify-content:space-between;
    padding-top:10px;border-top:1px solid var(--t50);margin-bottom:10px;flex-wrap:wrap;gap:6px;}
  .footer-date{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--s500);}
  .footer-mgr-label{font-size:10px;color:var(--s400);text-align:right;}
  .footer-mgr-name{font-size:12px;font-weight:700;color:var(--s700);text-align:right;}

  .card-actions{display:flex;gap:6px;}
  .btn-view{flex:1;display:flex;align-items:center;justify-content:center;gap:5px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:8px;
    font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 2px 8px rgba(13,148,136,.22);}
  .btn-view:hover{background:linear-gradient(135deg,var(--t400),var(--t500));}
  .btn-edit-p{flex:1;display:flex;align-items:center;justify-content:center;gap:5px;
    background:var(--t50);color:var(--t700);border:1.5px solid var(--t200);
    border-radius:var(--rsm);padding:7px;
    font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;transition:all .2s;}
  .btn-edit-p:hover{background:var(--t100);}

  /* Empty */
  .empty{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:48px 24px;text-align:center;}
  .empty-icon{font-size:36px;color:var(--t300);margin-bottom:12px;}
  .empty-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:var(--t800);margin:0 0 6px;}
  .empty-sub{font-size:13px;color:var(--s500);margin:0 0 20px;}
`;

const projects = [
  { id:1, name:'E-commerce Platform Redesign',       description:'Complete redesign of the company e-commerce platform with modern UI/UX',        status:'in-progress', priority:'high',   startDate:'2024-01-15', endDate:'2024-06-30', progress:65,  teamMembers:8, budget:'$125K', tasks:{total:48,completed:31,pending:17}, technologies:['React','Node.js','MongoDB','AWS'],              manager:'Priya Sharma'  },
  { id:2, name:'Mobile App Development',             description:'Build a cross-platform mobile application for customer engagement',              status:'planning',    priority:'high',   startDate:'2024-03-01', endDate:'2024-09-15', progress:20,  teamMembers:6, budget:'$95K',  tasks:{total:36,completed:7, pending:29}, technologies:['React Native','Firebase','Redux'],              manager:'Rajesh Kumar'  },
  { id:3, name:'Data Analytics Dashboard',           description:'Develop an interactive dashboard for business intelligence and analytics',       status:'completed',   priority:'medium', startDate:'2023-11-10', endDate:'2024-02-28', progress:100, teamMembers:4, budget:'$75K',  tasks:{total:28,completed:28,pending:0},  technologies:['Python','D3.js','PostgreSQL','Tableau'],        manager:'Mike Johnson'  },
  { id:4, name:'CRM System Upgrade',                 description:'Upgrade and migrate the existing CRM system to latest version',                 status:'on-hold',     priority:'medium', startDate:'2024-02-01', endDate:'2024-07-15', progress:35,  teamMembers:5, budget:'$85K',  tasks:{total:42,completed:15,pending:27}, technologies:['Salesforce','Apex','Integration APIs'],         manager:'Amit Verma'    },
  { id:5, name:'AI Chatbot Implementation',          description:'Implement AI-powered chatbot for customer support automation',                  status:'in-progress', priority:'high',   startDate:'2024-03-20', endDate:'2024-08-10', progress:45,  teamMembers:7, budget:'$110K', tasks:{total:52,completed:23,pending:29}, technologies:['Python','TensorFlow','NLP','Dialogflow'],       manager:'Neha Gupta'    },
  { id:6, name:'Website Performance Optimization',   description:'Optimize website performance and improve core web vitals scores',              status:'in-progress', priority:'low',    startDate:'2024-04-01', endDate:'2024-05-30', progress:80,  teamMembers:3, budget:'$35K',  tasks:{total:18,completed:14,pending:4},  technologies:['Next.js','CDN','Lighthouse','Webpack'],         manager:'Anjali Singh'  },
];

const statusInfo = s => ({
  completed:   {cls:'st-completed', icon:<FiCheckCircle style={{fontSize:10,color:'#22c55e'}}/>, bar:'var(--t400)'  },
  'in-progress':{cls:'st-progress', icon:<FiBarChart2   style={{fontSize:10,color:'#06b6d4'}}/>, bar:'#06b6d4'      },
  planning:    {cls:'st-planning',  icon:<FiClock       style={{fontSize:10,color:'#f59e0b'}}/>, bar:'#f59e0b'      },
  'on-hold':   {cls:'st-hold',      icon:<FiPause       style={{fontSize:10,color:'#f97316'}}/>, bar:'#f97316'      },
}[s]||{cls:'st-progress',icon:null,bar:'var(--t400)'});

const priCls = p => ({high:'pri-high',medium:'pri-med',low:'pri-low'}[p]||'pri-med');
const progColor = p => p>=80?'var(--t500)':p>=50?'#f59e0b':'#ef4444';
const fmtDate = d => new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});

const TeamProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filtered = projects.filter(p => {
    const s = searchTerm.toLowerCase();
    return (p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s))
      && (statusFilter==='all' || p.status===statusFilter)
      && (priorityFilter==='all' || p.priority===priorityFilter);
  });

  return (
    <div className="tp-root">
      <style>{style}</style>
      <div className="tp-inner">

        {/* Header */}
        <div className="tp-hdr">
          <div>
            <h1 className="tp-title"><span className="tp-ticon"><FiFolder/></span>Team Projects</h1>
            <p className="tp-sub">Manage and track all team projects and their progress</p>
          </div>
          <div className="hdr-acts">
            <button className="btn-new"><FiPlus style={{fontSize:14}}/>New Project</button>
            <button className="btn-exp" onClick={()=>alert('Exported!')}><FiDownload style={{fontSize:13}}/>Export</button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            {label:'Total Projects', val:projects.length,                                     color:'var(--t700)', bar:'var(--t400)'},
            {label:'In Progress',    val:projects.filter(p=>p.status==='in-progress').length, color:'#0e7490',     bar:'#06b6d4'    },
            {label:'Completed',      val:projects.filter(p=>p.status==='completed').length,   color:'#16a34a',     bar:'#22c55e'    },
            {label:'High Priority',  val:projects.filter(p=>p.priority==='high').length,      color:'#dc2626',     bar:'#ef4444'    },
          ].map((s,i)=>(
            <div key={i} className="stat-card" style={{'--bar':s.bar}}>
              <div className="stat-val" style={{color:s.color}}>{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <div className="search-wrap">
            <FiSearch className="search-icon"/>
            <input className="search-input" type="text"
              placeholder="Search projects by name or description…"
              value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
          </div>
          <div className="filter-selects">
            <select className="sel" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
            <select className="sel" value={priorityFilter} onChange={e=>setPriorityFilter(e.target.value)}>
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="projects-grid">
            {filtered.map(p=>{
              const si = statusInfo(p.status);
              return (
                <div key={p.id} className="proj-card" style={{'--pbar':si.bar}}>
                  <div className="proj-top">
                    <div className="badge-left">
                      <span className={`status-badge ${si.cls}`}>{si.icon}{p.status.replace(/-/g,' ')}</span>
                    </div>
                    <div className="badge-right">
                      <span className={`pri-badge ${priCls(p.priority)}`}>{p.priority}</span>
                      <button className="more-btn"><FiMoreVertical/></button>
                    </div>
                  </div>

                  <h3 className="proj-name">{p.name}</h3>
                  <p className="proj-desc">{p.description}</p>

                  <div className="prog-meta">
                    <span style={{fontSize:11,color:'var(--s600)'}}>Progress</span>
                    <span style={{fontSize:11,fontWeight:700,color:'var(--s700)'}}>{p.progress}%</span>
                  </div>
                  <div className="prog-track">
                    <div className="prog-fill" style={{width:`${p.progress}%`,background:progColor(p.progress)}}/>
                  </div>

                  <div className="proj-stats">
                    <div>
                      <div className="ps-val">{p.tasks.completed}/{p.tasks.total}</div>
                      <div className="ps-label">Tasks</div>
                    </div>
                    <div>
                      <div className="ps-val" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:3}}>
                        <FiUsers style={{fontSize:10,color:'var(--t500)'}}/>{p.teamMembers}
                      </div>
                      <div className="ps-label">Team</div>
                    </div>
                    <div>
                      <div className="ps-val" style={{color:'var(--t700)'}}>{p.budget}</div>
                      <div className="ps-label">Budget</div>
                    </div>
                  </div>

                  <div className="tech-wrap">
                    {p.technologies.slice(0,3).map((t,i)=><span key={i} className="tech-tag">{t}</span>)}
                    {p.technologies.length>3&&<span className="tech-more">+{p.technologies.length-3}</span>}
                  </div>

                  <div className="proj-footer">
                    <div className="footer-date">
                      <FiCalendar style={{fontSize:11,color:'var(--t400)'}}/>
                      {fmtDate(p.endDate)}
                    </div>
                    <div>
                      <div className="footer-mgr-label">Manager</div>
                      <div className="footer-mgr-name">{p.manager}</div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button className="btn-view"><FiEye style={{fontSize:11}}/>View</button>
                    <button className="btn-edit-p"><FiEdit style={{fontSize:11}}/>Edit</button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty">
            <div className="empty-icon"><FiFolder/></div>
            <p className="empty-title">No projects found</p>
            <p className="empty-sub">Try adjusting your search or filters</p>
            <button className="btn-new" style={{margin:'0 auto'}}>
              <FiPlus style={{fontSize:14}}/>Create New Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamProjects;