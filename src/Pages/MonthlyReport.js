import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { FiDownload, FiCalendar, FiClock, FiBarChart2, FiActivity, FiCoffee } from "react-icons/fi";

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
  .mr-root{
    font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;padding:18px 14px 64px;
  }
  @media(min-width:480px){.mr-root{padding:22px 18px 64px;}}
  @media(min-width:640px){.mr-root{padding:28px 24px 72px;}}
  @media(min-width:1024px){.mr-root{padding:36px 40px 80px;max-width:1280px;margin:0 auto;}}
  .mr-root::before{content:'';position:fixed;top:-180px;right:-180px;width:500px;height:500px;
    background:radial-gradient(circle,rgba(20,184,166,.08) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .mr-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:440px;height:440px;
    background:radial-gradient(circle,rgba(13,148,136,.06) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .mr-root > *{position:relative;z-index:1;}

  /* Header */
  .mr-hdr{display:flex;flex-direction:column;gap:14px;margin-bottom:22px;}
  @media(min-width:600px){.mr-hdr{flex-direction:row;align-items:flex-start;justify-content:space-between;}}
  .mr-title{font-family:'Syne',sans-serif;font-size:clamp(18px,4vw,26px);font-weight:800;
    color:var(--t800);letter-spacing:-.5px;margin:0 0 3px;}
  .mr-sub{font-size:12px;color:var(--s500);margin:0;}
  .hdr-acts{display:flex;gap:9px;flex-wrap:wrap;}
  .sel{padding:9px 28px 9px 13px;background:var(--sur);border:1.5px solid var(--t100);
    border-radius:var(--rsm);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;
    color:var(--s600);outline:none;cursor:pointer;transition:all .2s;
    appearance:none;-webkit-appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%230d9488' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 9px center;}
  .sel:focus{border-color:var(--t400);box-shadow:var(--glow);}
  .btn-exp{display:inline-flex;align-items:center;gap:7px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:9px 18px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 4px 12px rgba(13,148,136,.26);white-space:nowrap;}
  .btn-exp:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(13,148,136,.36);}

  /* Summary cards */
  .summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;}
  @media(min-width:480px){.summary-grid{grid-template-columns:repeat(3,1fr);}}
  @media(min-width:900px){.summary-grid{grid-template-columns:repeat(5,1fr);gap:14px;}}
  .sum-card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:16px;
    transition:transform .2s,box-shadow .2s;position:relative;overflow:hidden;
    border-top:3px solid var(--bar,var(--t400));}
  .sum-card:hover{transform:translateY(-2px);box-shadow:var(--shlg);}
  .sum-label{font-size:10px;font-weight:600;color:var(--s400);text-transform:uppercase;
    letter-spacing:.05em;margin-bottom:5px;}
  .sum-val{font-family:'Syne',sans-serif;font-size:clamp(20px,3.5vw,26px);font-weight:800;
    color:var(--t800);line-height:1;}

  /* Charts grid */
  .charts-grid{display:grid;grid-template-columns:1fr;gap:16px;margin-bottom:16px;}
  @media(min-width:768px){.charts-grid{grid-template-columns:1fr 1fr;}}

  .chart-card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,136,.10);padding:18px;min-width:0;overflow:hidden;}
  @media(min-width:480px){.chart-card{padding:20px 22px;}}
  .chart-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;
    color:var(--t800);margin:0 0 14px;display:flex;align-items:center;gap:8px;}
  .chart-icon{width:26px;height:26px;border-radius:7px;
    background:linear-gradient(135deg,var(--t100),var(--t200));
    display:flex;align-items:center;justify-content:center;color:var(--t600);font-size:12px;}

  /* Perf metrics */
  .perf-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;}
  .perf-tile{background:var(--t50);border:1px solid var(--t100);border-radius:var(--rmd);
    padding:12px;text-align:center;transition:all .15s;}
  .perf-tile:hover{background:var(--t100);}
  .pt-label{font-size:9px;font-weight:600;color:var(--s400);text-transform:uppercase;
    letter-spacing:.04em;margin-bottom:5px;}
  .pt-val{font-family:'Syne',sans-serif;font-size:clamp(18px,3vw,22px);font-weight:800;color:var(--t700);}
  .pt-bar-track{width:100%;height:4px;background:var(--t100);border-radius:2px;overflow:hidden;margin-top:6px;}
  .pt-bar-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--t400),var(--t600));transition:width .5s;}

  /* Heatmap */
  .heatmap-card{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:18px;}
  @media(min-width:480px){.heatmap-card{padding:20px 22px;}}
  .hm-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;
    color:var(--t800);margin:0 0 14px;display:flex;align-items:center;gap:8px;}

  /* Day labels */
  .hm-wrapper{overflow-x:auto;padding-bottom:4px;}
  .hm-wrapper::-webkit-scrollbar{height:4px;}
  .hm-wrapper::-webkit-scrollbar-track{background:var(--t50);}
  .hm-wrapper::-webkit-scrollbar-thumb{background:var(--t300);border-radius:2px;}
  .hm-inner{min-width:220px;}
  .day-labels{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:4px;}
  .day-lbl{font-size:9px;color:var(--s400);font-weight:600;text-align:center;text-transform:uppercase;}
  .hm-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;}
  .hm-cell{aspect-ratio:1;border-radius:4px;cursor:default;transition:transform .15s;}
  .hm-cell:hover{transform:scale(1.2);}

  /* Legend */
  .hm-legend{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;}
  .legend-item{display:flex;align-items:center;gap:5px;font-size:10px;color:var(--s500);font-weight:500;}
  .legend-dot{width:10px;height:10px;border-radius:3px;}

  /* Break stats */
  .break-stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;}
  .bs-chip{display:flex;align-items:center;gap:6px;background:var(--t50);
    border:1px solid var(--t200);border-radius:20px;padding:5px 12px;
    font-size:11px;font-weight:600;color:var(--t700);}

  /* Loading */
  .loading-screen{display:flex;align-items:center;justify-content:center;
    min-height:100vh;flex-direction:column;gap:12px;
    background:linear-gradient(135deg,#f0fdfa,#e6faf7);font-family:'DM Sans',sans-serif;}
  .spinner{width:36px;height:36px;border:3px solid var(--t100);
    border-top-color:var(--t500);border-radius:50%;animation:spin .75s linear infinite;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .loading-text{font-size:13px;color:var(--t600);font-weight:600;}

  /* Scrollbar */
  ::-webkit-scrollbar{width:5px;height:5px;}
  ::-webkit-scrollbar-track{background:var(--t50);}
  ::-webkit-scrollbar-thumb{background:var(--t300);border-radius:3px;}
`;

const monthlyData = {
  "2024-01":{
    month:"January 2024",
    summary:{ workingDays:22, presentDays:20, absentDays:1, halfDays:1, totalHours:176.5, avgEfficiency:92 },
    performance:{ attendanceRate:91, punctuality:88, productivity:92, consistency:90 },
    breaks:{ totalBreaks:42, teaBreaks:28, lunchBreaks:14, avgBreakTime:"32 mins" },
    trends:[
      {week:"Week 1",hours:42.5,efficiency:92},{week:"Week 2",hours:38.5,efficiency:90},
      {week:"Week 3",hours:43.0,efficiency:94},{week:"Week 4",hours:38.5,efficiency:91},
    ],
    dailyData:[
      {date:"2024-01-01",status:"holiday"},{date:"2024-01-02",status:"present"},{date:"2024-01-03",status:"present"},
      {date:"2024-01-04",status:"present"},{date:"2024-01-05",status:"present"},{date:"2024-01-06",status:"weekend"},
      {date:"2024-01-07",status:"weekend"},{date:"2024-01-08",status:"present"},{date:"2024-01-09",status:"present"},
      {date:"2024-01-10",status:"half-day"},{date:"2024-01-11",status:"present"},{date:"2024-01-12",status:"present"},
      {date:"2024-01-13",status:"weekend"},{date:"2024-01-14",status:"weekend"},{date:"2024-01-15",status:"present"},
      {date:"2024-01-16",status:"present"},{date:"2024-01-17",status:"present"},{date:"2024-01-18",status:"present"},
      {date:"2024-01-19",status:"present"},{date:"2024-01-20",status:"weekend"},{date:"2024-01-21",status:"weekend"},
      {date:"2024-01-22",status:"absent"},{date:"2024-01-23",status:"present"},{date:"2024-01-24",status:"present"},
      {date:"2024-01-25",status:"present"},{date:"2024-01-26",status:"present"},{date:"2024-01-27",status:"weekend"},
      {date:"2024-01-28",status:"weekend"},{date:"2024-01-29",status:"present"},{date:"2024-01-30",status:"present"},
      {date:"2024-01-31",status:"present"},
    ],
  },
};

const heatmapColor = s => ({
  present:   '#14b8a6',
  absent:    '#ef4444',
  'half-day':'#f59e0b',
  weekend:   '#e2e8f0',
  holiday:   '#8b5cf6',
}[s]||'#e2e8f0');

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:'#fff',border:'1.5px solid #99f6e4',borderRadius:10,
      padding:'8px 12px',boxShadow:'0 4px 14px rgba(13,148,136,.12)',
      fontFamily:'DM Sans,sans-serif',fontSize:11,color:'#0f766e'}}>
      <p style={{fontWeight:700,marginBottom:4}}>{label}</p>
      {payload.map((p,i)=>(
        <p key={i}>{p.name}: <strong style={{color:p.color||'#14b8a6'}}>{p.value}</strong></p>
      ))}
    </div>
  );
};

export default function MonthlyReport() {
  const [selectedMonth, setSelectedMonth] = useState("2024-01");
  const [reportData, setReportData]       = useState(null);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => { setReportData(monthlyData[selectedMonth]); setLoading(false); }, 700);
  }, [selectedMonth]);

  if (loading) return (
    <div className="loading-screen">
      <style>{style}</style>
      <div className="spinner"/>
      <p className="loading-text">Loading report…</p>
    </div>
  );

  const { summary:s, performance:p, breaks:b, trends, dailyData, month } = reportData;

  const summaryCards = [
    { label:'Present Days',   val:s.presentDays,  bar:'var(--t400)' },
    { label:'Absent Days',    val:s.absentDays,   bar:'#ef4444'     },
    { label:'Total Hours',    val:`${s.totalHours}h`, bar:'#06b6d4' },
    { label:'Avg Efficiency', val:`${s.avgEfficiency}%`, bar:'#8b5cf6' },
    { label:'Total Breaks',   val:b.totalBreaks,  bar:'#f59e0b'     },
  ];

  const perfMetrics = [
    { label:'Attendance Rate',  val:p.attendanceRate  },
    { label:'Punctuality',      val:p.punctuality     },
    { label:'Productivity',     val:p.productivity    },
    { label:'Consistency',      val:p.consistency     },
  ];

  const legend = [
    { status:'present',  label:'Present',  color:'#14b8a6' },
    { status:'absent',   label:'Absent',   color:'#ef4444' },
    { status:'half-day', label:'Half Day', color:'#f59e0b' },
    { status:'weekend',  label:'Weekend',  color:'#e2e8f0' },
    { status:'holiday',  label:'Holiday',  color:'#8b5cf6' },
  ];

  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  return (
    <div className="mr-root">
      <style>{style}</style>

      {/* Header */}
      <div className="mr-hdr">
        <div>
          <h1 className="mr-title">Monthly Attendance Report</h1>
          <p className="mr-sub">Performance overview for {month}</p>
        </div>
        <div className="hdr-acts">
          <select className="sel" value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)}>
            <option value="2024-01">January 2024</option>
          </select>
          <button className="btn-exp"><FiDownload style={{fontSize:13}}/>Export PDF</button>
        </div>
      </div>

      {/* Summary */}
      <div className="summary-grid">
        {summaryCards.map((c,i)=>(
          <div key={i} className="sum-card" style={{'--bar':c.bar}}>
            <div className="sum-label">{c.label}</div>
            <div className="sum-val">{c.val}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title"><span className="chart-icon"><FiActivity/></span>Weekly Trend</h3>
          <div style={{height:220}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends}>
                <CartesianGrid stroke="#e0faf8" vertical={false}/>
                <XAxis dataKey="week" fontSize={10} tick={{fill:'#5eada8',fontFamily:'DM Sans'}} axisLine={false} tickLine={false}/>
                <YAxis fontSize={10} tick={{fill:'#5eada8',fontFamily:'DM Sans'}} axisLine={false} tickLine={false} width={28}/>
                <Tooltip content={<ChartTooltip/>}/>
                <Legend wrapperStyle={{fontSize:11,fontFamily:'DM Sans'}}/>
                <Line dataKey="hours"      name="Hours"      stroke="#14b8a6" strokeWidth={2.5} dot={{r:4,fill:'#14b8a6',stroke:'#fff',strokeWidth:2}} activeDot={{r:6}}/>
                <Line dataKey="efficiency" name="Efficiency" stroke="#06b6d4" strokeWidth={2.5} dot={{r:4,fill:'#06b6d4',stroke:'#fff',strokeWidth:2}} activeDot={{r:6}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title"><span className="chart-icon"><FiBarChart2/></span>Performance Breakdown</h3>
          <div className="perf-grid">
            {perfMetrics.map((m,i)=>(
              <div key={i} className="perf-tile">
                <div className="pt-label">{m.label}</div>
                <div className="pt-val">{m.val}%</div>
                <div className="pt-bar-track">
                  <div className="pt-bar-fill" style={{width:`${m.val}%`}}/>
                </div>
              </div>
            ))}
          </div>
          <div className="break-stats">
            {[
              {icon:<FiCoffee style={{color:'#d97706',fontSize:12}}/>, label:`Tea Breaks: ${b.teaBreaks}`},
              {icon:<span style={{fontSize:12}}>☀️</span>, label:`Lunch Breaks: ${b.lunchBreaks}`},
              {icon:<FiClock style={{color:'var(--t500)',fontSize:12}}/>, label:`Avg: ${b.avgBreakTime}`},
            ].map((x,i)=>(
              <div key={i} className="bs-chip">{x.icon}{x.label}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="heatmap-card">
        <h3 className="hm-title"><span className="chart-icon"><FiCalendar/></span>Attendance Heatmap — {month}</h3>
        <div className="hm-wrapper">
          <div className="hm-inner">
            <div className="day-labels">
              {days.map(d=><div key={d} className="day-lbl">{d}</div>)}
            </div>
            <div className="hm-grid">
              {dailyData.map(day=>(
                <div key={day.date} className="hm-cell"
                  style={{background:heatmapColor(day.status)}}
                  title={`${day.date} · ${day.status}`}/>
              ))}
            </div>
          </div>
        </div>
        <div className="hm-legend">
          {legend.map(l=>(
            <div key={l.status} className="legend-item">
              <div className="legend-dot" style={{background:l.color}}/>
              {l.label}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}