import React, { useState } from 'react';
import {
  FiUsers, FiSearch, FiMail, FiMapPin, FiStar,
  FiMoreVertical, FiUserPlus, FiDownload, FiEdit, FiMessageSquare
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
  .tm-root{font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;}
  .tm-root::before{content:'';position:fixed;top:-180px;right:-180px;width:540px;height:540px;
    background:radial-gradient(circle,rgba(20,184,166,.09) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .tm-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:460px;height:460px;
    background:radial-gradient(circle,rgba(13,148,136,.07) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .tm-inner{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:20px 14px 64px;}
  @media(min-width:480px){.tm-inner{padding:24px 18px 64px;}}
  @media(min-width:640px){.tm-inner{padding:32px 24px 72px;}}
  @media(min-width:1024px){.tm-inner{padding:40px 40px 80px;}}

  /* Header */
  .tm-hdr{display:flex;flex-direction:column;gap:14px;margin-bottom:24px;}
  @media(min-width:600px){.tm-hdr{flex-direction:row;align-items:flex-start;justify-content:space-between;}}
  .tm-title{font-family:'Syne',sans-serif;font-size:clamp(20px,4vw,30px);font-weight:800;
    color:var(--t800);letter-spacing:-.5px;display:flex;align-items:center;gap:10px;margin:0 0 4px;}
  .tm-ticon{width:38px;height:38px;background:linear-gradient(135deg,var(--t400),var(--t600));
    border-radius:11px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;
    box-shadow:0 4px 14px rgba(13,148,136,.30);flex-shrink:0;}
  .tm-sub{font-size:13px;color:var(--s500);margin:0;}
  .hdr-acts{display:flex;gap:10px;flex-wrap:wrap;}
  .btn-add{display:inline-flex;align-items:center;gap:7px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:10px 18px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 4px 14px rgba(13,148,136,.28);white-space:nowrap;}
  .btn-add:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(13,148,136,.38);}
  .btn-exp{display:inline-flex;align-items:center;gap:7px;
    background:var(--t50);color:var(--t700);
    border:1.5px solid var(--t200);border-radius:var(--rsm);padding:9px 16px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
    transition:all .2s;white-space:nowrap;}
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

  /* Members grid */
  .members-grid{display:grid;grid-template-columns:1fr;gap:14px;}
  @media(min-width:480px){.members-grid{grid-template-columns:repeat(2,1fr);}}
  @media(min-width:900px){.members-grid{grid-template-columns:repeat(3,1fr);}}
  @media(min-width:1200px){.members-grid{grid-template-columns:repeat(4,1fr);}}

  /* Member card */
  .member-card{background:var(--sur);border-radius:var(--rlg);padding:18px;
    box-shadow:var(--shmd);border:1px solid rgba(20,184,166,.10);
    transition:all .2s;position:relative;overflow:hidden;}
  .member-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
    background:linear-gradient(90deg,var(--t400),var(--t600));}
  .member-card:hover{transform:translateY(-3px);box-shadow:var(--shlg);}

  /* Avatar */
  .avatar-wrap{position:relative;flex-shrink:0;}
  .avatar{width:44px;height:44px;border-radius:50%;
    background:linear-gradient(135deg,var(--t400),var(--t700));
    display:flex;align-items:center;justify-content:center;
    color:#fff;font-family:'Syne',sans-serif;font-size:14px;font-weight:800;}
  .avail-dot{position:absolute;bottom:-1px;right:-1px;width:13px;height:13px;
    border-radius:50%;border:2px solid #fff;}

  .card-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;}
  .card-top-left{display:flex;align-items:center;gap:10px;flex:1;min-width:0;}
  .member-name{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;
    color:var(--s800);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .member-role{font-size:11px;color:var(--s500);margin-top:1px;}
  .more-btn{background:none;border:none;cursor:pointer;color:var(--s400);
    font-size:15px;padding:3px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;}
  .more-btn:hover{background:var(--t50);color:var(--t600);}

  .dept-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
  .dept-tag{font-size:11px;font-weight:600;color:var(--t700);
    background:var(--t50);border:1px solid var(--t200);padding:3px 9px;border-radius:20px;}
  .status-badge{display:inline-block;padding:3px 9px;border-radius:20px;
    font-size:10px;font-weight:700;text-transform:capitalize;}
  .st-active{background:#dcfce7;color:#166534;}
  .st-leave{background:#fef9c3;color:#854d0e;}
  .st-inactive{background:#fee2e2;color:#991b1b;}

  .contact-item{display:flex;align-items:center;gap:7px;font-size:11px;
    color:var(--s600);margin-bottom:5px;}
  .contact-item:last-child{margin-bottom:0;}
  .contact-icon{color:var(--t400);font-size:12px;flex-shrink:0;}
  .contact-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}

  .skills-wrap{display:flex;flex-wrap:wrap;gap:4px;margin:10px 0;}
  .skill-tag{padding:2px 8px;background:var(--t50);color:var(--t700);
    border:1px solid var(--t200);border-radius:20px;font-size:10px;font-weight:600;}
  .skill-more{padding:2px 8px;background:var(--sur2);color:var(--s500);
    border:1px solid var(--s200);border-radius:20px;font-size:10px;font-weight:600;}

  .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;
    text-align:center;margin:10px 0;padding:10px 0;
    border-top:1px solid var(--t50);border-bottom:1px solid var(--t50);}
  .stat-item-val{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;line-height:1;margin-bottom:2px;}
  .stat-item-label{font-size:9px;color:var(--s400);font-weight:500;}

  .card-actions{display:flex;gap:6px;margin-top:10px;}
  .btn-msg{flex:1;display:flex;align-items:center;justify-content:center;gap:5px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:8px;
    font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 2px 8px rgba(13,148,136,.22);}
  .btn-msg:hover{background:linear-gradient(135deg,var(--t400),var(--t500));}
  .btn-edit-c{flex:1;display:flex;align-items:center;justify-content:center;gap:5px;
    background:var(--t50);color:var(--t700);
    border:1.5px solid var(--t200);border-radius:var(--rsm);padding:7px;
    font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;
    transition:all .2s;}
  .btn-edit-c:hover{background:var(--t100);}

  /* Empty state */
  .empty{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:48px 24px;text-align:center;}
  .empty-icon{font-size:36px;color:var(--t300);margin-bottom:12px;}
  .empty-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:var(--t800);margin:0 0 6px;}
  .empty-sub{font-size:13px;color:var(--s500);margin:0 0 20px;}
`;

const teamMembers = [
  { id:1, name:'Priya Sharma',   role:'Project Manager',    department:'Management', email:'priya.sharma@company.com',   location:'Bangalore', avatar:'PS', status:'active',   skills:['Leadership','Agile','Stakeholder Mgmt'],  projects:12, performance:95, availability:'available' },
  { id:2, name:'Rajesh Kumar',   role:'Senior Developer',   department:'Technology', email:'rajesh.kumar@company.com',   location:'Hyderabad', avatar:'RK', status:'active',   skills:['React','Node.js','AWS','MongoDB'],          projects:8,  performance:88, availability:'busy'      },
  { id:3, name:'Anjali Singh',   role:'UI/UX Designer',     department:'Design',     email:'anjali.singh@company.com',   location:'Mumbai',    avatar:'AS', status:'active',   skills:['Figma','Adobe XD','Prototyping','Research'],projects:6,  performance:92, availability:'available' },
  { id:4, name:'Mike Johnson',   role:'DevOps Engineer',    department:'Technology', email:'mike.johnson@company.com',   location:'Remote',    avatar:'MJ', status:'active',   skills:['Docker','Kubernetes','CI/CD','AWS'],        projects:10, performance:90, availability:'available' },
  { id:5, name:'Sneha Patel',    role:'QA Engineer',        department:'Quality',    email:'sneha.patel@company.com',    location:'Delhi',     avatar:'SP', status:'active',   skills:['Automation','Selenium','Jest','Cypress'],   projects:7,  performance:85, availability:'away'      },
  { id:6, name:'Amit Verma',     role:'Product Manager',    department:'Product',    email:'amit.verma@company.com',     location:'Bangalore', avatar:'AV', status:'active',   skills:['Product Strategy','Roadmapping','Analytics'],projects:9, performance:94, availability:'available' },
  { id:7, name:'Neha Gupta',     role:'Frontend Developer', department:'Technology', email:'neha.gupta@company.com',     location:'Pune',      avatar:'NG', status:'active',   skills:['React','TypeScript','Next.js','Tailwind'],  projects:5,  performance:87, availability:'busy'      },
  { id:8, name:'Rohit Mehta',    role:'Backend Developer',  department:'Technology', email:'rohit.mehta@company.com',    location:'Chennai',   avatar:'RM', status:'on-leave', skills:['Java','Spring Boot','MySQL','Microservices'],projects:6, performance:82, availability:'offline'   },
];

const departments = ['all','Technology','Design','Management','Quality','Product'];
const roles = ['all','Developer','Designer','Manager','Engineer'];

const availColor = a => ({available:'#22c55e',busy:'#f59e0b',away:'#f97316',offline:'#94a3b8'}[a]||'#94a3b8');
const perfColor = p => p>=90?'#16a34a':p>=80?'#d97706':'#dc2626';
const statusCls = s => ({active:'st-active','on-leave':'st-leave',inactive:'st-inactive'}[s]||'st-active');
const avatarGradients = [
  'linear-gradient(135deg,#2dd4bf,#0f766e)',
  'linear-gradient(135deg,#06b6d4,#0e7490)',
  'linear-gradient(135deg,#8b5cf6,#6d28d9)',
  'linear-gradient(135deg,#f59e0b,#d97706)',
  'linear-gradient(135deg,#ec4899,#be185d)',
  'linear-gradient(135deg,#14b8a6,#0d9488)',
  'linear-gradient(135deg,#6366f1,#4338ca)',
  'linear-gradient(135deg,#22c55e,#15803d)',
];

const TeamMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = teamMembers.filter(m => {
    const s = searchTerm.toLowerCase();
    const matchSearch = m.name.toLowerCase().includes(s) || m.role.toLowerCase().includes(s) || m.department.toLowerCase().includes(s);
    const matchDept = deptFilter==='all' || m.department===deptFilter;
    const matchRole = roleFilter==='all' || m.role.toLowerCase().includes(roleFilter.toLowerCase());
    return matchSearch && matchDept && matchRole;
  });

  return (
    <div className="tm-root">
      <style>{style}</style>
      <div className="tm-inner">

        {/* Header */}
        <div className="tm-hdr">
          <div>
            <h1 className="tm-title"><span className="tm-ticon"><FiUsers/></span>Team Members</h1>
            <p className="tm-sub">Manage and connect with your team members</p>
          </div>
          <div className="hdr-acts">
            <button className="btn-add"><FiUserPlus style={{fontSize:14}}/>Add Member</button>
            <button className="btn-exp" onClick={()=>alert('Exported!')}><FiDownload style={{fontSize:13}}/>Export</button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            {label:'Total Members', val:teamMembers.length,                                       color:'var(--t700)', bar:'var(--t400)'},
            {label:'Active',        val:teamMembers.filter(m=>m.status==='active').length,         color:'#16a34a',     bar:'#22c55e'    },
            {label:'Tech Team',     val:teamMembers.filter(m=>m.department==='Technology').length, color:'#0e7490',     bar:'#06b6d4'    },
            {label:'Total Projects',val:teamMembers.reduce((a,m)=>a+m.projects,0),                color:'#7c3aed',     bar:'#8b5cf6'    },
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
              placeholder="Search by name, role, or department…"
              value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
          </div>
          <div className="filter-selects">
            <select className="sel" value={deptFilter} onChange={e=>setDeptFilter(e.target.value)}>
              {departments.map(d=><option key={d} value={d}>{d==='all'?'All Departments':d}</option>)}
            </select>
            <select className="sel" value={roleFilter} onChange={e=>setRoleFilter(e.target.value)}>
              {roles.map(r=><option key={r} value={r}>{r==='all'?'All Roles':r}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="members-grid">
            {filtered.map((m,idx)=>(
              <div key={m.id} className="member-card">
                <div className="card-top">
                  <div className="card-top-left">
                    <div className="avatar-wrap">
                      <div className="avatar" style={{background:avatarGradients[idx%avatarGradients.length]}}>{m.avatar}</div>
                      <div className="avail-dot" style={{background:availColor(m.availability)}}/>
                    </div>
                    <div style={{minWidth:0}}>
                      <div className="member-name">{m.name}</div>
                      <div className="member-role">{m.role}</div>
                    </div>
                  </div>
                  <button className="more-btn"><FiMoreVertical/></button>
                </div>

                <div className="dept-row">
                  <span className="dept-tag">{m.department}</span>
                  <span className={`status-badge ${statusCls(m.status)}`}>{m.status.replace('-',' ')}</span>
                </div>

                <div style={{marginBottom:10}}>
                  <div className="contact-item">
                    <FiMail className="contact-icon"/><span className="contact-text">{m.email}</span>
                  </div>
                  <div className="contact-item">
                    <FiMapPin className="contact-icon"/><span className="contact-text">{m.location}</span>
                  </div>
                </div>

                <div className="skills-wrap">
                  {m.skills.slice(0,3).map((s,i)=><span key={i} className="skill-tag">{s}</span>)}
                  {m.skills.length>3&&<span className="skill-more">+{m.skills.length-3}</span>}
                </div>

                <div className="stats-row">
                  <div>
                    <div className="stat-item-val" style={{color:'var(--t700)'}}>{m.projects}</div>
                    <div className="stat-item-label">Projects</div>
                  </div>
                  <div>
                    <div className="stat-item-val" style={{color:perfColor(m.performance)}}>{m.performance}%</div>
                    <div className="stat-item-label">Perf.</div>
                  </div>
                  <div>
                    <div className="stat-item-val" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:2}}>
                      <FiStar style={{color:'#f59e0b',fontSize:11}}/>
                      <span style={{color:'var(--s800)'}}>4.8</span>
                    </div>
                    <div className="stat-item-label">Rating</div>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn-msg"><FiMessageSquare style={{fontSize:11}}/>Message</button>
                  <button className="btn-edit-c"><FiEdit style={{fontSize:11}}/>Edit</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <div className="empty-icon"><FiUsers/></div>
            <p className="empty-title">No team members found</p>
            <p className="empty-sub">Try adjusting your search or filters</p>
            <button className="btn-add" style={{margin:'0 auto'}}>
              <FiUserPlus style={{fontSize:14}}/>Add New Member
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMembers;