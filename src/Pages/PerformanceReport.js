import React, { useState } from 'react';
import {
  FiTrendingUp, FiBarChart2, FiTarget, FiAward,
  FiCalendar, FiDownload, FiEye, FiUsers,
  FiStar, FiActivity, FiZap
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
  .pr-root{font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;}
  .pr-root::before{content:'';position:fixed;top:-180px;right:-180px;width:540px;height:540px;
    background:radial-gradient(circle,rgba(20,184,166,.09) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .pr-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:460px;height:460px;
    background:radial-gradient(circle,rgba(13,148,136,.07) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .pr-inner{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:20px 14px 64px;}
  @media(min-width:480px){.pr-inner{padding:24px 18px 64px;}}
  @media(min-width:640px){.pr-inner{padding:32px 24px 72px;}}
  @media(min-width:1024px){.pr-inner{padding:40px 40px 80px;}}

  /* Header */
  .pr-hdr{display:flex;flex-direction:column;gap:14px;margin-bottom:28px;}
  @media(min-width:600px){.pr-hdr{flex-direction:row;align-items:flex-start;justify-content:space-between;}}
  .pr-title{font-family:'Syne',sans-serif;font-size:clamp(20px,4vw,30px);font-weight:800;
    color:var(--t800);letter-spacing:-.5px;display:flex;align-items:center;gap:10px;margin:0 0 4px;}
  .pr-ticon{width:38px;height:38px;background:linear-gradient(135deg,var(--t400),var(--t600));
    border-radius:11px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;
    box-shadow:0 4px 14px rgba(13,148,136,.30);flex-shrink:0;}
  .pr-sub{font-size:13px;color:var(--s500);margin:0;}
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

  /* Main grid */
  .main-grid{display:grid;grid-template-columns:1fr;gap:18px;}
  @media(min-width:1024px){.main-grid{grid-template-columns:1fr 300px;gap:22px;align-items:start;}}

  /* Card */
  .card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);}
  .cp{padding:20px;}
  @media(min-width:480px){.cp{padding:22px 24px;}}
  .card-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;
    color:var(--t800);display:flex;align-items:center;gap:8px;margin:0 0 18px;}
  .cticon{width:27px;height:27px;border-radius:7px;
    background:linear-gradient(135deg,var(--t100),var(--t200));
    display:flex;align-items:center;justify-content:center;color:var(--t600);font-size:12px;}

  /* Score card */
  .score-top{display:flex;align-items:flex-start;justify-content:space-between;
    flex-wrap:wrap;gap:12px;margin-bottom:18px;}
  .score-num{font-family:'Syne',sans-serif;font-size:clamp(28px,5vw,36px);
    font-weight:800;color:var(--t700);line-height:1;}
  .score-sub{font-size:11px;color:var(--s500);margin-top:3px;}

  /* Metrics grid */
  .metrics-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;}
  @media(min-width:480px){.metrics-grid{grid-template-columns:repeat(3,1fr);}}
  @media(min-width:640px){.metrics-grid{grid-template-columns:repeat(5,1fr);}}
  .metric-tile{text-align:center;padding:12px 8px;border-radius:var(--rmd);
    background:var(--t50);border:1px solid var(--t100);transition:all .2s;}
  .metric-tile:hover{transform:translateY(-2px);box-shadow:var(--shmd);}
  .metric-val{font-family:'Syne',sans-serif;font-size:clamp(18px,3vw,22px);font-weight:800;line-height:1;margin-bottom:4px;}
  .metric-key{font-size:11px;color:var(--s500);font-weight:500;text-transform:capitalize;margin-bottom:6px;}
  .metric-bar{width:100%;height:5px;background:var(--t100);border-radius:3px;overflow:hidden;}
  .metric-fill{height:100%;border-radius:3px;transition:width .5s ease;}

  /* Chart */
  .chart-wrap{display:flex;align-items:flex-end;justify-content:space-between;
    gap:4px;height:140px;padding-bottom:24px;margin-top:6px;}
  @media(min-width:480px){.chart-wrap{gap:6px;height:160px;}}
  .chart-col{display:flex;flex-direction:column;align-items:center;flex:1;height:100%;justify-content:flex-end;}
  .chart-outer{width:100%;background:var(--t50);border-radius:5px 5px 0 0;
    border:1px solid var(--t100);display:flex;flex-direction:column;
    justify-content:flex-end;height:110px;overflow:hidden;}
  @media(min-width:480px){.chart-outer{height:130px;}}
  .chart-fill{background:linear-gradient(to top,var(--t600),var(--t400));
    border-radius:4px 4px 0 0;transition:height .6s ease;}
  .chart-score{font-size:10px;font-weight:700;color:var(--t700);margin-top:4px;}
  @media(min-width:480px){.chart-score{font-size:11px;}}
  .chart-month{font-size:9px;color:var(--s400);font-weight:500;margin-top:1px;}
  @media(min-width:480px){.chart-month{font-size:10px;}}

  /* Achievements */
  .ach-list{display:flex;flex-direction:column;gap:10px;}
  .ach-item{display:flex;flex-direction:column;gap:10px;padding:14px;
    border-radius:var(--rmd);background:linear-gradient(135deg,#fffbeb,#fef3c7);
    border:1px solid #fde68a;transition:all .2s;}
  @media(min-width:440px){.ach-item{flex-direction:row;align-items:center;justify-content:space-between;}}
  .ach-item:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(245,158,11,.18);}
  .ach-left{display:flex;align-items:center;gap:12px;}
  .ach-icon{width:36px;height:36px;border-radius:10px;background:rgba(251,191,36,.15);
    display:flex;align-items:center;justify-content:center;font-size:15px;color:#d97706;flex-shrink:0;}
  .ach-name{font-size:13px;font-weight:700;color:var(--s800);}
  .ach-desc{font-size:11px;color:var(--s500);margin-top:2px;}
  .ach-right{text-align:left;flex-shrink:0;}
  @media(min-width:440px){.ach-right{text-align:right;}}
  .ach-pts{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:#d97706;}
  .ach-date{font-size:11px;color:var(--s400);margin-top:2px;}

  /* Sidebar */
  .sidebar{display:flex;flex-direction:column;gap:16px;}

  /* Comparison */
  .cmp-row{display:flex;align-items:center;justify-content:space-between;
    padding:10px 12px;border-radius:var(--rsm);margin-bottom:8px;}
  .cmp-row:last-child{margin-bottom:0;}
  .cmp-label{font-size:12px;color:var(--s600);font-weight:500;}
  .cmp-val{font-size:14px;font-weight:800;}
  .cmp-divider{height:1px;background:var(--t100);margin:8px 0;}

  /* Strengths / improvement panels */
  .panel{border-radius:var(--rlg);padding:18px 16px;color:#fff;
    position:relative;overflow:hidden;}
  @media(min-width:480px){.panel{padding:20px;}}
  .panel::before{content:'';position:absolute;top:-35px;right:-35px;
    width:120px;height:120px;background:rgba(255,255,255,.07);border-radius:50%;}
  .panel-teal{background:linear-gradient(135deg,var(--t500),var(--t700));
    box-shadow:0 6px 24px rgba(13,148,136,.30);}
  .panel-emerald{background:linear-gradient(135deg,#059669,#0f766e);
    box-shadow:0 6px 24px rgba(5,150,105,.25);}
  .panel-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;
    margin:0 0 12px;position:relative;z-index:1;}
  .panel-list{display:flex;flex-direction:column;gap:9px;position:relative;z-index:1;}
  .panel-item{display:flex;align-items:flex-start;gap:8px;font-size:12px;
    color:rgba(255,255,255,.9);line-height:1.45;}
  .panel-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.6);
    margin-top:4px;flex-shrink:0;}

  /* Manager feedback */
  .feedback-box{background:linear-gradient(135deg,#fffbeb,#fef3c7);
    border:1.5px solid #fde68a;border-radius:var(--rmd);padding:14px;}
  .feedback-text{font-size:12px;color:var(--s700);font-style:italic;line-height:1.6;margin:0 0 10px;}
  .feedback-meta{display:flex;align-items:center;justify-content:space-between;font-size:11px;}
  .feedback-name{color:var(--s600);font-weight:600;}
  .feedback-role{color:var(--s400);}
`;

const performanceData = {
  overallScore: 87,
  metrics: { productivity:92, quality:88, efficiency:85, teamwork:90, innovation:82 },
  trend: [
    { month:'Jan', score:78 }, { month:'Feb', score:82 }, { month:'Mar', score:85 },
    { month:'Apr', score:87 }, { month:'May', score:90 }, { month:'Jun', score:87 }
  ],
  achievements: [
    { id:1, title:'Top Performer',    description:'Ranked #1 in team for Q2',         date:'2024-06-30', points:100 },
    { id:2, title:'Quality Champion', description:'Zero defects in deliverables',      date:'2024-06-15', points:75  },
    { id:3, title:'Team Player',      description:'Recognized for collaboration',      date:'2024-05-28', points:50  },
  ],
  comparison: { teamAverage:79, companyAverage:75, yourRank:2, totalEmployees:45 }
};

const metricColor = v => v >= 90 ? '#22c55e' : v >= 80 ? '#f59e0b' : '#ef4444';
const fmtDate = d => new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short'});

const PerformanceReport = () => {
  const [timeRange, setTimeRange] = useState('quarter');

  return (
    <div className="pr-root">
      <style>{style}</style>
      <div className="pr-inner">

        {/* Header */}
        <div className="pr-hdr">
          <div>
            <h1 className="pr-title"><span className="pr-ticon"><FiActivity /></span>Performance Report</h1>
            <p className="pr-sub">Comprehensive analysis of your work performance and achievements</p>
          </div>
          <div className="hdr-acts">
            <select className="sel" value={timeRange} onChange={e=>setTimeRange(e.target.value)}>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button className="btn-exp" onClick={()=>alert('Exported!')}><FiDownload style={{fontSize:13}}/>Export PDF</button>
          </div>
        </div>

        <div className="main-grid">
          <div style={{display:'flex',flexDirection:'column',gap:18}}>

            {/* Overall Score */}
            <div className="card cp">
              <div className="score-top">
                <h2 className="card-title" style={{margin:0}}><span className="cticon"><FiBarChart2/></span>Overall Performance Score</h2>
                <div style={{textAlign:'right'}}>
                  <div className="score-num">{performanceData.overallScore}<span style={{fontSize:'clamp(14px,2vw,18px)',color:'var(--s400)',fontWeight:600}}>/100</span></div>
                  <div className="score-sub">Current Rating</div>
                </div>
              </div>
              <div className="metrics-grid">
                {Object.entries(performanceData.metrics).map(([k,v])=>(
                  <div key={k} className="metric-tile">
                    <div className="metric-val" style={{color:metricColor(v)}}>{v}</div>
                    <div className="metric-key">{k}</div>
                    <div className="metric-bar"><div className="metric-fill" style={{width:`${v}%`,background:metricColor(v)}}/></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend Chart */}
            <div className="card cp">
              <h2 className="card-title"><span className="cticon"><FiTrendingUp/></span>Performance Trend</h2>
              <div className="chart-wrap">
                {performanceData.trend.map((m,i)=>(
                  <div key={i} className="chart-col">
                    <div className="chart-outer"><div className="chart-fill" style={{height:`${m.score}%`}}/></div>
                    <div className="chart-score">{m.score}</div>
                    <div className="chart-month">{m.month}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="card cp">
              <h2 className="card-title"><span className="cticon"><FiAward/></span>Recent Achievements</h2>
              <div className="ach-list">
                {performanceData.achievements.map(a=>(
                  <div key={a.id} className="ach-item">
                    <div className="ach-left">
                      <div className="ach-icon"><FiStar/></div>
                      <div>
                        <div className="ach-name">{a.title}</div>
                        <div className="ach-desc">{a.description}</div>
                      </div>
                    </div>
                    <div className="ach-right">
                      <div className="ach-pts">+{a.points} pts</div>
                      <div className="ach-date">{fmtDate(a.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">

            {/* Comparison */}
            <div className="card cp">
              <h3 className="card-title"><span className="cticon"><FiUsers/></span>Performance Comparison</h3>
              {[
                {label:'Your Score',       val:performanceData.overallScore,             bg:'var(--t50)',  border:'var(--t200)', color:'var(--t700)'},
                {label:'Team Average',     val:performanceData.comparison.teamAverage,   bg:'var(--sur2)', border:'var(--t100)', color:'var(--s700)'},
                {label:'Company Average',  val:performanceData.comparison.companyAverage,bg:'var(--sur2)', border:'var(--t100)', color:'var(--s700)'},
              ].map((r,i)=>(
                <div key={i} className="cmp-row" style={{background:r.bg,border:`1px solid ${r.border}`}}>
                  <span className="cmp-label">{r.label}</span>
                  <span className="cmp-val" style={{color:r.color}}>{r.val}</span>
                </div>
              ))}
              <div className="cmp-divider"/>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'6px 0'}}>
                <span style={{fontSize:12,color:'var(--s600)',fontWeight:500}}>Your Rank</span>
                <span style={{fontSize:14,fontWeight:800,color:'#16a34a'}}>
                  #{performanceData.comparison.yourRank} of {performanceData.comparison.totalEmployees}
                </span>
              </div>
            </div>

            {/* Strengths */}
            <div className="panel panel-emerald">
              <p className="panel-title">Key Strengths</p>
              <div className="panel-list">
                {[
                  {icon:<FiTrendingUp style={{color:'#6ee7b7',fontSize:13,flexShrink:0}}/>, text:'Consistently exceeds productivity targets'},
                  {icon:<FiUsers style={{color:'#6ee7b7',fontSize:13,flexShrink:0}}/>,      text:'Excellent team collaboration skills'},
                  {icon:<FiTarget style={{color:'#a5f3fc',fontSize:13,flexShrink:0}}/>,     text:'Strong problem-solving abilities'},
                  {icon:<FiStar style={{color:'#fde68a',fontSize:13,flexShrink:0}}/>,       text:'High quality of work delivery'},
                ].map((item,i)=>(
                  <div key={i} className="panel-item">{item.icon}<span>{item.text}</span></div>
                ))}
              </div>
            </div>

            {/* Improvement */}
            <div className="panel panel-teal">
              <p className="panel-title">Areas for Improvement</p>
              <div className="panel-list">
                {['Documentation consistency','Cross-team communication','Innovation initiative'].map((t,i)=>(
                  <div key={i} className="panel-item"><div className="panel-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>

            {/* Manager Feedback */}
            <div className="card cp">
              <h3 className="card-title"><span className="cticon"><FiStar/></span>Manager's Feedback</h3>
              <div className="feedback-box">
                <p className="feedback-text">
                  "Excellent performance this quarter! Your productivity and quality metrics are outstanding.
                  Continue focusing on innovation and cross-team collaboration to reach the next level."
                </p>
                <div className="feedback-meta">
                  <span className="feedback-name">— Priya Sharma</span>
                  <span className="feedback-role">Reporting Manager</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReport;