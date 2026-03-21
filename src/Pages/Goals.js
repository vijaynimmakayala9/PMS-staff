import React, { useState } from 'react';
import {
  FiTarget, FiPlus, FiCheckCircle, FiClock,
  FiCalendar, FiTrendingUp, FiEdit, FiTrash2,
  FiAward, FiFlag, FiX
} from 'react-icons/fi';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');
  :root {
    --t50:#f0fdfa;--t100:#ccfbf1;--t200:#99f6e4;--t300:#5eead4;--t400:#2dd4bf;
    --t500:#14b8a6;--t600:#0d9488;--t700:#0f766e;--t800:#115e59;
    --s400:#94a3b8;--s500:#64748b;--s600:#475569;--s700:#334155;--s800:#1e293b;
    --sur:#ffffff;--sur2:#f8fffe;
    --rsm:8px;--rmd:14px;--rlg:20px;
    --shmd:0 4px 16px rgba(13,148,136,.10),0 2px 6px rgba(13,148,136,.06);
    --shlg:0 10px 40px rgba(13,148,136,.14),0 4px 12px rgba(13,148,136,.08);
    --glow:0 0 0 3px rgba(20,184,166,.16);
  }
  *{box-sizing:border-box;}
  .g-root{font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;}
  .g-root::before{content:'';position:fixed;top:-180px;right:-180px;width:540px;height:540px;
    background:radial-gradient(circle,rgba(20,184,166,.09) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .g-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:460px;height:460px;
    background:radial-gradient(circle,rgba(13,148,136,.07) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .g-inner{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:20px 14px 64px;}
  @media(min-width:480px){.g-inner{padding:24px 18px 64px;}}
  @media(min-width:640px){.g-inner{padding:32px 24px 72px;}}
  @media(min-width:1024px){.g-inner{padding:40px 40px 80px;}}

  /* Header */
  .g-hdr{display:flex;flex-direction:column;gap:14px;margin-bottom:24px;}
  @media(min-width:600px){.g-hdr{flex-direction:row;align-items:flex-start;justify-content:space-between;}}
  .g-title{font-family:'Syne',sans-serif;font-size:clamp(20px,4vw,30px);font-weight:800;
    color:var(--t800);letter-spacing:-.5px;display:flex;align-items:center;gap:10px;margin:0 0 4px;}
  .g-ticon{width:38px;height:38px;background:linear-gradient(135deg,var(--t400),var(--t600));
    border-radius:11px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;
    box-shadow:0 4px 14px rgba(13,148,136,.30);flex-shrink:0;}
  .g-sub{font-size:13px;color:var(--s500);margin:0;}
  .btn-new{display:inline-flex;align-items:center;gap:7px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:10px 18px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 4px 14px rgba(13,148,136,.28);white-space:nowrap;align-self:flex-start;}
  .btn-new:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(13,148,136,.38);}

  /* Stats */
  .stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:18px;}
  @media(min-width:640px){.stats-grid{grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px;}}
  .stat-card{background:var(--sur);border-radius:var(--rlg);padding:16px;text-align:center;
    border:1px solid rgba(20,184,166,.10);box-shadow:var(--shmd);position:relative;overflow:hidden;
    transition:transform .2s,box-shadow .2s;border-left:4px solid var(--bar,var(--t400));}
  .stat-card:hover{transform:translateY(-2px);box-shadow:var(--shlg);}
  .stat-val{font-family:'Syne',sans-serif;font-size:clamp(20px,3.5vw,26px);font-weight:800;line-height:1;margin-bottom:4px;}
  .stat-label{font-size:11px;font-weight:500;color:var(--s500);}

  /* Filters */
  .filters-bar{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:14px 16px;
    display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;}
  .fbtn{padding:7px 16px;border-radius:20px;font-family:'DM Sans',sans-serif;
    font-size:12px;font-weight:600;cursor:pointer;border:1.5px solid transparent;transition:all .15s;}
  .fbtn-inactive{background:var(--t50);color:var(--t700);border-color:var(--t100);}
  .fbtn-inactive:hover{background:var(--t100);}
  .fbtn-all{background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    box-shadow:0 2px 8px rgba(13,148,136,.25);}
  .fbtn-completed{background:#dcfce7;color:#166534;border-color:#86efac;}
  .fbtn-progress{background:#cffafe;color:#0e7490;border-color:#a5f3fc;}
  .fbtn-notstarted{background:var(--t50);color:var(--s600);border-color:var(--t200);}

  /* Goals grid */
  .goals-grid{display:grid;grid-template-columns:1fr;gap:14px;}
  @media(min-width:640px){.goals-grid{grid-template-columns:repeat(2,1fr);}}

  /* Goal card */
  .goal-card{background:var(--sur);border-radius:var(--rlg);padding:18px;
    box-shadow:var(--shmd);border:1px solid rgba(20,184,166,.10);
    transition:all .2s;position:relative;overflow:hidden;}
  .goal-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
    background:var(--gbar,var(--t400));}
  .goal-card:hover{transform:translateY(-2px);box-shadow:var(--shlg);}
  .goal-top{display:flex;align-items:flex-start;justify-content:space-between;
    gap:6px;flex-wrap:wrap;margin-bottom:10px;}
  .badge-row{display:flex;align-items:center;gap:5px;flex-wrap:wrap;}
  .badge{display:inline-flex;align-items:center;gap:3px;padding:3px 9px;
    border-radius:20px;font-size:10px;font-weight:700;text-transform:capitalize;white-space:nowrap;}
  .cat-badge{padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700;white-space:nowrap;}

  .goal-name{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;
    color:var(--s800);margin:0 0 4px;}
  .goal-desc{font-size:12px;color:var(--s500);margin:0 0 12px;line-height:1.45;}

  .prog-meta{display:flex;justify-content:space-between;font-size:11px;margin-bottom:5px;}
  .prog-track{width:100%;height:6px;background:var(--t50);border-radius:3px;
    overflow:hidden;border:1px solid var(--t100);margin-bottom:12px;}
  .prog-fill{height:100%;border-radius:3px;transition:width .5s ease;}

  /* Milestones */
  .ms-meta{display:flex;justify-content:space-between;font-size:11px;margin-bottom:5px;}
  .ms-dots{display:flex;gap:4px;margin-bottom:12px;}
  .ms-dot{flex:1;height:5px;border-radius:3px;transition:background .3s;}

  /* Dates */
  .dates-row{display:flex;align-items:center;justify-content:space-between;
    font-size:11px;color:var(--s500);margin-bottom:12px;flex-wrap:wrap;gap:6px;}
  .date-left{display:flex;align-items:center;gap:4px;}

  /* Actions */
  .goal-actions{display:flex;gap:6px;align-items:center;}
  .btn-update{flex:1;background:var(--t50);color:var(--t700);
    border:1.5px solid var(--t200);border-radius:var(--rsm);
    padding:8px 10px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;
    cursor:pointer;transition:all .15s;text-align:center;}
  .btn-update:hover{background:var(--t100);}
  .btn-icon{width:30px;height:30px;border:none;border-radius:7px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;font-size:13px;
    transition:all .15s;background:transparent;}
  .btn-edit{color:var(--t600);}
  .btn-edit:hover{background:var(--t50);}
  .btn-del{color:#dc2626;}
  .btn-del:hover{background:#fef2f2;}

  /* Empty state */
  .empty{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:48px 24px;text-align:center;}
  .empty-icon{font-size:36px;color:var(--t300);margin-bottom:12px;}
  .empty-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;
    color:var(--t800);margin:0 0 6px;}
  .empty-sub{font-size:13px;color:var(--s500);margin:0 0 20px;}
  .btn-create{display:inline-flex;align-items:center;gap:7px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:12px 20px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 4px 12px rgba(13,148,136,.28);}
  .btn-create:hover{transform:translateY(-1px);}

  /* Modal */
  .modal-overlay{position:fixed;inset:0;background:rgba(15,118,110,.25);
    backdrop-filter:blur(4px);display:flex;align-items:center;
    justify-content:center;padding:16px;z-index:50;}
  .modal{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shlg);
    max-width:480px;width:100%;border:1px solid var(--t100);overflow:hidden;
    max-height:90vh;overflow-y:auto;}
  .modal-hdr{background:linear-gradient(to right,var(--t50),var(--t100));
    padding:16px 20px;display:flex;align-items:center;justify-content:space-between;
    border-bottom:1px solid var(--t200);position:sticky;top:0;z-index:1;}
  .modal-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;
    color:var(--t800);margin:0;}
  .modal-close{background:none;border:none;cursor:pointer;color:var(--s400);
    font-size:17px;padding:4px;border-radius:6px;display:flex;align-items:center;}
  .modal-close:hover{background:var(--t100);color:var(--t700);}
  .modal-body{padding:20px;}
  .form-group{margin-bottom:16px;}
  .form-label{display:block;font-size:11px;font-weight:700;color:var(--t700);
    text-transform:uppercase;letter-spacing:.05em;margin-bottom:7px;}
  .form-input{width:100%;padding:10px 14px;border:1.5px solid var(--t100);
    border-radius:var(--rsm);font-family:'DM Sans',sans-serif;font-size:13px;
    color:var(--s700);background:var(--sur2);outline:none;transition:all .2s;}
  .form-input:focus{border-color:var(--t400);box-shadow:var(--glow);background:#fff;}
  .form-input::placeholder{color:var(--s400);}
  textarea.form-input{resize:none;}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .modal-actions{display:flex;gap:10px;padding:0 20px 20px;}
  .btn-cancel{flex:1;background:var(--t50);color:var(--t700);
    border:1.5px solid var(--t200);border-radius:var(--rsm);
    padding:12px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;
    cursor:pointer;transition:all .2s;}
  .btn-cancel:hover{background:var(--t100);}
  .btn-submit{flex:1;background:linear-gradient(135deg,var(--t500),var(--t600));
    color:#fff;border:none;border-radius:var(--rsm);padding:12px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
    transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px;
    box-shadow:0 3px 12px rgba(13,148,136,.28);}
  .btn-submit:hover{background:linear-gradient(135deg,var(--t400),var(--t500));transform:translateY(-1px);}
`;

const goalsData = {
  total:8, completed:3, inProgress:4, notStarted:1,
  goals: [
    { id:1, title:'Complete Advanced React Course',      description:'Finish the advanced React patterns and performance optimization course', category:'learning',      status:'in-progress',  progress:65,  priority:'high',   startDate:'2024-01-15', targetDate:'2024-07-30', milestones:[{id:1,title:'Complete basics',completed:true},{id:2,title:'Advanced patterns',completed:true},{id:3,title:'Performance',completed:false},{id:4,title:'Final project',completed:false}]},
    { id:2, title:'Lead Team Project Successfully',      description:'Successfully deliver the Q3 product launch project on time and within budget', category:'professional', status:'in-progress',  progress:45,  priority:'high',   startDate:'2024-03-01', targetDate:'2024-09-30', milestones:[{id:1,title:'Planning',completed:true},{id:2,title:'Onboarding',completed:true},{id:3,title:'Development',completed:false},{id:4,title:'Launch',completed:false}]},
    { id:3, title:'Improve Public Speaking Skills',      description:'Participate in 5 team presentations and 2 external conferences', category:'personal',      status:'not-started',  progress:0,   priority:'medium', startDate:'2024-06-01', targetDate:'2024-12-31', milestones:[{id:1,title:'Join Toastmasters',completed:false},{id:2,title:'Team presentations',completed:false},{id:3,title:'Conference prep',completed:false}]},
    { id:4, title:'Mentor Junior Developers',            description:'Guide and mentor 2 junior developers in the team', category:'professional', status:'completed',    progress:100, priority:'medium', startDate:'2024-01-01', targetDate:'2024-06-30', milestones:[{id:1,title:'Identify mentees',completed:true},{id:2,title:'Weekly sessions',completed:true},{id:3,title:'Project guidance',completed:true},{id:4,title:'Progress review',completed:true}]},
    { id:5, title:'Learn Node.js Backend Development',   description:'Build 3 full-stack applications using React and Node.js', category:'learning',      status:'in-progress',  progress:30,  priority:'medium', startDate:'2024-04-01', targetDate:'2024-10-31', milestones:[{id:1,title:'Learn fundamentals',completed:true},{id:2,title:'Build first app',completed:false},{id:3,title:'Advanced features',completed:false}]},
    { id:6, title:'Achieve AWS Certification',           description:'Complete AWS Solutions Architect Associate certification', category:'certification', status:'in-progress',  progress:20,  priority:'high',   startDate:'2024-05-01', targetDate:'2024-11-30', milestones:[{id:1,title:'Study materials',completed:true},{id:2,title:'Practice exams',completed:false},{id:3,title:'Schedule exam',completed:false}]},
  ]
};

const statusBadge = s => ({
  'completed':  {cls:'badge',style:{background:'#dcfce7',color:'#166534'}, icon:<FiCheckCircle style={{fontSize:9}}/>},
  'in-progress':{cls:'badge',style:{background:'#cffafe',color:'#0e7490'}, icon:<FiClock      style={{fontSize:9}}/>},
  'not-started':{cls:'badge',style:{background:'var(--t50)',color:'var(--s600)'}, icon:<FiTarget style={{fontSize:9}}/>},
}[s]||{cls:'badge',style:{},icon:null});

const priorityStyle = p => ({
  high:  {background:'#fee2e2',color:'#991b1b'},
  medium:{background:'#fef9c3',color:'#854d0e'},
  low:   {background:'#dcfce7',color:'#166534'},
}[p]||{});

const categoryStyle = c => ({
  professional: {background:'#cffafe',color:'#0e7490'},
  learning:     {background:'#f5f3ff',color:'#5b21b6'},
  personal:     {background:'#dcfce7',color:'#166534'},
  certification:{background:'#fff7ed',color:'#9a3412'},
}[c]||{});

const progressColor = p => p>=80 ? 'var(--t500)' : p>=50 ? '#f59e0b' : '#06b6d4';
const barAccent = s => ({completed:'var(--t400)','in-progress':'#06b6d4','not-started':'var(--s300)'}[s]||'var(--t400)');
const fmtDate = d => new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
const daysLeft = d => {
  const diff = Math.ceil((new Date(d)-new Date())/(1000*60*60*24));
  return diff > 0 ? `${diff} days left` : 'Due today';
};

const Goals = () => {
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [newGoal, setNewGoal] = useState({title:'',description:'',category:'professional',targetDate:'',priority:'medium'});

  const filtered = goalsData.goals.filter(g => filter==='all' || g.status===filter);

  const filterBtns = [
    {key:'all',        label:'All Goals',   cls:'fbtn-all'       },
    {key:'completed',  label:'Completed',   cls:'fbtn-completed' },
    {key:'in-progress',label:'In Progress', cls:'fbtn-progress'  },
    {key:'not-started',label:'Not Started', cls:'fbtn-notstarted'},
  ];

  return (
    <div className="g-root">
      <style>{style}</style>
      <div className="g-inner">

        {/* Header */}
        <div className="g-hdr">
          <div>
            <h1 className="g-title"><span className="g-ticon"><FiTarget/></span>Goals & Objectives</h1>
            <p className="g-sub">Set, track, and achieve your personal and professional goals</p>
          </div>
          <button className="btn-new" onClick={()=>setShowAdd(true)}><FiPlus style={{fontSize:14}}/>Add New Goal</button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            {label:'Total Goals',  val:goalsData.total,      color:'var(--t700)', bar:'var(--t400)'},
            {label:'Completed',    val:goalsData.completed,  color:'#16a34a',     bar:'#22c55e'    },
            {label:'In Progress',  val:goalsData.inProgress, color:'#0e7490',     bar:'#06b6d4'    },
            {label:'Not Started',  val:goalsData.notStarted, color:'var(--s600)', bar:'var(--s300)'},
          ].map((s,i)=>(
            <div key={i} className="stat-card" style={{'--bar':s.bar}}>
              <div className="stat-val" style={{color:s.color}}>{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="filters-bar">
          {filterBtns.map(b=>(
            <button key={b.key} className={`fbtn ${filter===b.key?b.cls:'fbtn-inactive'}`}
              onClick={()=>setFilter(b.key)}>{b.label}</button>
          ))}
        </div>

        {/* Goals */}
        {filtered.length > 0 ? (
          <div className="goals-grid">
            {filtered.map(goal=>{
              const sb = statusBadge(goal.status);
              const completedMs = goal.milestones.filter(m=>m.completed).length;
              return (
                <div key={goal.id} className="goal-card" style={{'--gbar':barAccent(goal.status)}}>
                  <div className="goal-top">
                    <div className="badge-row">
                      <span className={sb.cls} style={sb.style}>{sb.icon}{goal.status.replace(/-/g,' ')}</span>
                    </div>
                    <div className="badge-row">
                      <span className="badge" style={priorityStyle(goal.priority)}>{goal.priority}</span>
                      <span className="cat-badge" style={categoryStyle(goal.category)}>{goal.category}</span>
                    </div>
                  </div>

                  <h3 className="goal-name">{goal.title}</h3>
                  <p className="goal-desc">{goal.description}</p>

                  <div className="prog-meta">
                    <span style={{fontSize:11,color:'var(--s600)'}}>Progress</span>
                    <span style={{fontSize:11,fontWeight:700,color:'var(--s700)'}}>{goal.progress}%</span>
                  </div>
                  <div className="prog-track">
                    <div className="prog-fill" style={{width:`${goal.progress}%`,background:progressColor(goal.progress)}}/>
                  </div>

                  <div className="ms-meta">
                    <span style={{fontSize:11,color:'var(--s600)'}}>Milestones</span>
                    <span style={{fontSize:11,fontWeight:700,color:'var(--s700)'}}>{completedMs}/{goal.milestones.length}</span>
                  </div>
                  <div className="ms-dots">
                    {goal.milestones.map(m=>(
                      <div key={m.id} className="ms-dot"
                        style={{background:m.completed?'var(--t400)':'var(--t100)'}}
                        title={m.title}/>
                    ))}
                  </div>

                  <div className="dates-row">
                    <div className="date-left">
                      <FiCalendar style={{fontSize:11,color:'var(--t400)'}}/>
                      <span>Due: {fmtDate(goal.targetDate)}</span>
                    </div>
                    <span style={{fontWeight:600,color:goal.status==='completed'?'var(--t600)':'var(--s600)'}}>
                      {goal.status==='completed' ? '✓ Completed' : daysLeft(goal.targetDate)}
                    </span>
                  </div>

                  <div className="goal-actions">
                    <button className="btn-update">Update Progress</button>
                    <button className="btn-icon btn-edit" title="Edit"><FiEdit/></button>
                    <button className="btn-icon btn-del" title="Delete"><FiTrash2/></button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty">
            <div className="empty-icon"><FiTarget/></div>
            <p className="empty-title">No goals found</p>
            <p className="empty-sub">Try adjusting your filters or create a new goal</p>
            <button className="btn-create" onClick={()=>setShowAdd(true)}>
              <FiPlus style={{fontSize:14}}/>Create Your First Goal
            </button>
          </div>
        )}

        {/* Modal */}
        {showAdd && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-hdr">
                <h3 className="modal-title">Add New Goal</h3>
                <button className="modal-close" onClick={()=>setShowAdd(false)}><FiX/></button>
              </div>
              <form onSubmit={e=>{e.preventDefault();alert('Goal created!');setShowAdd(false);setNewGoal({title:'',description:'',category:'professional',targetDate:'',priority:'medium'});}}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Goal Title *</label>
                    <input className="form-input" type="text" placeholder="Enter your goal…"
                      value={newGoal.title} onChange={e=>setNewGoal({...newGoal,title:e.target.value})} required/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea className="form-input" rows={3} placeholder="Describe your goal…"
                      value={newGoal.description} onChange={e=>setNewGoal({...newGoal,description:e.target.value})}/>
                  </div>
                  <div className="form-row form-group">
                    <div>
                      <label className="form-label">Category</label>
                      <select className="form-input" value={newGoal.category} onChange={e=>setNewGoal({...newGoal,category:e.target.value})}>
                        <option value="professional">Professional</option>
                        <option value="learning">Learning</option>
                        <option value="personal">Personal</option>
                        <option value="certification">Certification</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Priority</label>
                      <select className="form-input" value={newGoal.priority} onChange={e=>setNewGoal({...newGoal,priority:e.target.value})}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Target Date *</label>
                    <input className="form-input" type="date"
                      value={newGoal.targetDate} onChange={e=>setNewGoal({...newGoal,targetDate:e.target.value})} required/>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={()=>setShowAdd(false)}>Cancel</button>
                  <button type="submit" className="btn-submit"><FiPlus style={{fontSize:13}}/>Create Goal</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Goals;