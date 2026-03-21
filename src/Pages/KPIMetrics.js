import React, { useState } from 'react';
import {
  FiTarget, FiTrendingUp, FiTrendingDown, FiBarChart2,
  FiDownload, FiArrowUp, FiArrowDown,
  FiCheckCircle, FiAlertCircle, FiClock, FiGrid, FiList
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
  .kpi-root{font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;}
  .kpi-root::before{content:'';position:fixed;top:-180px;right:-180px;width:540px;height:540px;
    background:radial-gradient(circle,rgba(20,184,166,.09) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .kpi-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:460px;height:460px;
    background:radial-gradient(circle,rgba(13,148,136,.07) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .kpi-inner{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:20px 14px 64px;}
  @media(min-width:480px){.kpi-inner{padding:24px 18px 64px;}}
  @media(min-width:640px){.kpi-inner{padding:32px 24px 72px;}}
  @media(min-width:1024px){.kpi-inner{padding:40px 40px 80px;}}

  /* Header */
  .kpi-hdr{display:flex;flex-direction:column;gap:14px;margin-bottom:24px;}
  @media(min-width:600px){.kpi-hdr{flex-direction:row;align-items:flex-start;justify-content:space-between;}}
  .kpi-title{font-family:'Syne',sans-serif;font-size:clamp(20px,4vw,30px);font-weight:800;
    color:var(--t800);letter-spacing:-.5px;display:flex;align-items:center;gap:10px;margin:0 0 4px;}
  .kpi-ticon{width:38px;height:38px;background:linear-gradient(135deg,var(--t400),var(--t600));
    border-radius:11px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;
    box-shadow:0 4px 14px rgba(13,148,136,.30);flex-shrink:0;}
  .kpi-sub{font-size:13px;color:var(--s500);margin:0;}
  .hdr-acts{display:flex;gap:10px;flex-wrap:wrap;}
  .sel{padding:10px 32px 10px 14px;border:1.5px solid var(--t100);border-radius:var(--rsm);
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:var(--s600);
    background:var(--sur2);outline:none;cursor:pointer;transition:all .2s;
    appearance:none;-webkit-appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230d9488' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 10px center;}
  .sel:focus{border-color:var(--t400);box-shadow:var(--glow);}
  .btn-exp{display:inline-flex;align-items:center;gap:7px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:10px 18px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 4px 14px rgba(13,148,136,.28);white-space:nowrap;}
  .btn-exp:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(13,148,136,.38);}

  /* Overview stat cards */
  .ov-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:18px;}
  @media(min-width:640px){.ov-grid{grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px;}}
  .ov-card{background:var(--sur);border-radius:var(--rlg);padding:16px;text-align:center;
    border:1px solid rgba(20,184,166,.10);box-shadow:var(--shmd);position:relative;overflow:hidden;
    transition:transform .2s,box-shadow .2s;border-left:4px solid var(--bar,var(--t400));}
  .ov-card:hover{transform:translateY(-2px);box-shadow:var(--shlg);}
  .ov-val{font-family:'Syne',sans-serif;font-size:clamp(20px,3.5vw,26px);font-weight:800;line-height:1;margin-bottom:4px;}
  .ov-label{font-size:11px;font-weight:500;color:var(--s500);}

  /* Toolbar */
  .toolbar{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:14px 16px;
    display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;gap:12px;flex-wrap:wrap;}
  .view-btns{display:flex;gap:6px;}
  .vbtn{display:flex;align-items:center;gap:5px;padding:7px 14px;border-radius:20px;
    font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;
    border:1.5px solid transparent;transition:all .15s;}
  .vbtn-active{background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    box-shadow:0 2px 8px rgba(13,148,136,.25);}
  .vbtn-inactive{background:var(--t50);color:var(--t700);border-color:var(--t100);}
  .vbtn-inactive:hover{background:var(--t100);}
  .toolbar-count{font-size:12px;color:var(--s500);}

  /* KPI grid */
  .kpi-grid{display:grid;grid-template-columns:1fr;gap:14px;}
  @media(min-width:540px){.kpi-grid{grid-template-columns:repeat(2,1fr);}}
  @media(min-width:1024px){.kpi-grid{grid-template-columns:repeat(3,1fr);}}

  /* KPI card */
  .kpi-card{background:var(--sur);border-radius:var(--rlg);padding:18px;
    box-shadow:var(--shmd);border:1px solid rgba(20,184,166,.10);
    transition:all .2s;position:relative;overflow:hidden;}
  .kpi-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
    background:var(--kbar,var(--t400));}
  .kpi-card:hover{transform:translateY(-2px);box-shadow:var(--shlg);}
  .kpi-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;gap:6px;flex-wrap:wrap;}
  .status-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;
    border-radius:20px;font-size:10px;font-weight:700;text-transform:capitalize;white-space:nowrap;}
  .st-on{background:#dcfce7;color:#166534;}
  .st-at{background:#fef9c3;color:#854d0e;}
  .st-off{background:#fee2e2;color:#991b1b;}
  .cat-tag{font-size:10px;font-weight:600;background:var(--t50);color:var(--t700);
    border:1px solid var(--t200);padding:3px 9px;border-radius:20px;white-space:nowrap;}
  .kpi-name{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--s800);margin:0 0 3px;}
  .kpi-desc{font-size:11px;color:var(--s500);margin:0 0 12px;line-height:1.4;}
  .prog-meta{display:flex;justify-content:space-between;font-size:11px;margin-bottom:5px;}
  .prog-label{color:var(--s600);}
  .prog-nums{font-weight:700;color:var(--s700);}
  .prog-track{width:100%;height:6px;background:var(--t50);border-radius:3px;overflow:hidden;
    border:1px solid var(--t100);margin-bottom:14px;}
  .prog-fill{height:100%;border-radius:3px;transition:width .5s ease;}
  .kpi-stats{display:flex;align-items:center;justify-content:space-between;}
  .stat-curr{font-family:'Syne',sans-serif;font-size:clamp(18px,3vw,22px);font-weight:800;color:var(--s800);line-height:1;}
  .stat-curr-label{font-size:10px;color:var(--s400);margin-top:2px;}
  .stat-tgt{font-size:14px;font-weight:700;color:var(--s600);text-align:center;line-height:1;}
  .stat-tgt-label{font-size:10px;color:var(--s400);margin-top:2px;text-align:center;}
  .stat-chg{display:flex;align-items:center;gap:3px;font-size:12px;font-weight:700;}
  .stat-chg-label{font-size:10px;color:var(--s400);text-align:right;margin-top:2px;}

  /* Summary */
  .sum-card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:20px;margin-top:18px;}
  .sum-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;
    color:var(--t800);display:flex;align-items:center;gap:8px;margin:0 0 16px;}
  .sum-ticon{width:27px;height:27px;border-radius:7px;
    background:linear-gradient(135deg,var(--t100),var(--t200));
    display:flex;align-items:center;justify-content:center;color:var(--t600);font-size:12px;}
  .sum-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  @media(min-width:640px){.sum-grid{grid-template-columns:repeat(4,1fr);gap:14px;}}
  .sum-tile{padding:14px 12px;border-radius:var(--rmd);text-align:center;
    border:1px solid transparent;transition:all .2s;}
  .sum-tile:hover{transform:translateY(-2px);box-shadow:var(--shmd);}
  .sum-val{font-family:'Syne',sans-serif;font-size:clamp(18px,3vw,22px);font-weight:800;line-height:1;margin-bottom:4px;}
  .sum-label{font-size:11px;font-weight:500;}
`;

const kpiData = {
  overview: { totalKPIs:12, onTrack:8, atRisk:3, offTrack:1 },
  metrics: [
    { id:1, name:'Productivity Rate',    current:92, target:90, trend:'up',   change:5.2,  status:'on-track',  category:'Efficiency',   description:'Tasks completed vs planned' },
    { id:2, name:'Quality Score',        current:88, target:85, trend:'up',   change:3.1,  status:'on-track',  category:'Quality',      description:'Error-free deliverables' },
    { id:3, name:'Project Completion',   current:78, target:80, trend:'down', change:-2.4, status:'at-risk',   category:'Delivery',     description:'On-time project delivery' },
    { id:4, name:'Customer Satisfaction',current:94, target:90, trend:'up',   change:4.7,  status:'on-track',  category:'Satisfaction', description:'Client feedback score' },
    { id:5, name:'Team Collaboration',   current:85, target:88, trend:'down', change:-1.2, status:'at-risk',   category:'Teamwork',     description:'Peer feedback rating' },
    { id:6, name:'Innovation Index',     current:72, target:75, trend:'down', change:-3.8, status:'off-track', category:'Innovation',   description:'New ideas implemented' },
    { id:7, name:'Training Completion',  current:95, target:90, trend:'up',   change:8.2,  status:'on-track',  category:'Development',  description:'Learning hours completed' },
    { id:8, name:'Process Adherence',    current:89, target:85, trend:'up',   change:2.1,  status:'on-track',  category:'Compliance',   description:'Process compliance rate' },
  ]
};

const statusCls = s => ({
  'on-track':'st-on','at-risk':'st-at','off-track':'st-off'
}[s]||'st-on');

const statusIcon = s => ({
  'on-track':<FiCheckCircle style={{color:'#22c55e',fontSize:11}}/>,
  'at-risk': <FiAlertCircle style={{color:'#f59e0b',fontSize:11}}/>,
  'off-track':<FiClock      style={{color:'#ef4444',fontSize:11}}/>,
}[s]);

const progColor = (c,t) => {
  const p = (c/t)*100;
  return p >= 100 ? '#22c55e' : p >= 90 ? '#f59e0b' : '#ef4444';
};

const barColor = s => ({
  'on-track':'var(--t400)','at-risk':'#f59e0b','off-track':'#ef4444'
}[s]||'var(--t400)');

const KPIMetrics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [viewType, setViewType] = useState('grid');

  return (
    <div className="kpi-root">
      <style>{style}</style>
      <div className="kpi-inner">

        {/* Header */}
        <div className="kpi-hdr">
          <div>
            <h1 className="kpi-title"><span className="kpi-ticon"><FiTarget/></span>KPI Metrics Dashboard</h1>
            <p className="kpi-sub">Track and monitor your key performance indicators</p>
          </div>
          <div className="hdr-acts">
            <select className="sel" value={timeRange} onChange={e=>setTimeRange(e.target.value)}>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
            </select>
            <button className="btn-exp" onClick={()=>alert('Exported!')}><FiDownload style={{fontSize:13}}/>Export Data</button>
          </div>
        </div>

        {/* Overview */}
        <div className="ov-grid">
          {[
            {label:'Total KPIs',  val:kpiData.overview.totalKPIs, color:'var(--t700)', bar:'var(--t400)'},
            {label:'On Track',    val:kpiData.overview.onTrack,   color:'#16a34a',     bar:'#22c55e'    },
            {label:'At Risk',     val:kpiData.overview.atRisk,    color:'#b45309',     bar:'#f59e0b'    },
            {label:'Off Track',   val:kpiData.overview.offTrack,  color:'#dc2626',     bar:'#ef4444'    },
          ].map((s,i)=>(
            <div key={i} className="ov-card" style={{'--bar':s.bar}}>
              <div className="ov-val" style={{color:s.color}}>{s.val}</div>
              <div className="ov-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="view-btns">
            <button className={`vbtn ${viewType==='grid'?'vbtn-active':'vbtn-inactive'}`} onClick={()=>setViewType('grid')}>
              <FiGrid style={{fontSize:12}}/>Grid View
            </button>
            <button className={`vbtn ${viewType==='list'?'vbtn-active':'vbtn-inactive'}`} onClick={()=>setViewType('list')}>
              <FiList style={{fontSize:12}}/>List View
            </button>
          </div>
          <span className="toolbar-count">Showing {kpiData.metrics.length} metrics</span>
        </div>

        {/* KPI Cards */}
        <div className={viewType==='grid' ? 'kpi-grid' : ''} style={viewType==='list'?{display:'flex',flexDirection:'column',gap:12}:{}}>
          {kpiData.metrics.map(m=>(
            <div key={m.id} className="kpi-card" style={{'--kbar':barColor(m.status)}}>
              <div className="kpi-card-top">
                <span className={`status-badge ${statusCls(m.status)}`}>
                  {statusIcon(m.status)}{m.status.replace('-',' ')}
                </span>
                <span className="cat-tag">{m.category}</span>
              </div>
              <p className="kpi-name">{m.name}</p>
              <p className="kpi-desc">{m.description}</p>
              <div className="prog-meta">
                <span className="prog-label">Progress</span>
                <span className="prog-nums">{m.current} / {m.target}</span>
              </div>
              <div className="prog-track">
                <div className="prog-fill" style={{
                  width:`${Math.min((m.current/m.target)*100,100)}%`,
                  background:progColor(m.current,m.target)
                }}/>
              </div>
              <div className="kpi-stats">
                <div>
                  <div className="stat-curr">{m.current}%</div>
                  <div className="stat-curr-label">Current</div>
                </div>
                <div>
                  <div className="stat-tgt">{m.target}%</div>
                  <div className="stat-tgt-label">Target</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className="stat-chg" style={{color:m.trend==='up'?'#16a34a':'#dc2626',justifyContent:'flex-end'}}>
                    {m.trend==='up'
                      ? <FiArrowUp style={{fontSize:12}}/>
                      : <FiArrowDown style={{fontSize:12}}/>}
                    {m.change}%
                  </div>
                  <div className="stat-chg-label">Change</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="sum-card">
          <h2 className="sum-title"><span className="sum-ticon"><FiBarChart2/></span>Performance Summary</h2>
          <div className="sum-grid">
            {[
              {val:'67%', label:'KPIs Exceeding Target',       bg:'var(--t50)',  border:'var(--t200)', vc:'var(--t700)',  lc:'var(--t600)'},
              {val:'92%', label:'Overall Achievement Rate',    bg:'#ecfeff',     border:'#a5f3fc',     vc:'#0e7490',     lc:'#0891b2'    },
              {val:'15%', label:'Quarter-over-Quarter Growth', bg:'#faf5ff',     border:'#e9d5ff',     vc:'#7c3aed',     lc:'#6d28d9'    },
              {val:'8.2', label:'Average Performance Score',   bg:'#fff7ed',     border:'#fed7aa',     vc:'#c2410c',     lc:'#ea580c'    },
            ].map((s,i)=>(
              <div key={i} className="sum-tile" style={{background:s.bg,borderColor:s.border}}>
                <div className="sum-val" style={{color:s.vc}}>{s.val}</div>
                <div className="sum-label" style={{color:s.lc}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default KPIMetrics;