import React, { useState } from 'react';
import {
  FiCalendar, FiClock, FiCheckCircle, FiXCircle,
  FiAlertCircle, FiSearch, FiDownload, FiEye, FiEdit, FiTrash2, FiActivity
} from 'react-icons/fi';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');

  :root {
    --teal-50:#f0fdfa;--teal-100:#ccfbf1;--teal-200:#99f6e4;--teal-300:#5eead4;
    --teal-400:#2dd4bf;--teal-500:#14b8a6;--teal-600:#0d9488;--teal-700:#0f766e;--teal-800:#115e59;
    --slate-100:#f1f5f9;--slate-200:#e2e8f0;--slate-400:#94a3b8;--slate-500:#64748b;
    --slate-600:#475569;--slate-700:#334155;--slate-800:#1e293b;
    --surface:#ffffff;--surface-2:#f8fffe;
    --radius-sm:8px;--radius-md:14px;--radius-lg:20px;
    --shadow-md:0 4px 16px rgba(13,148,136,0.10),0 2px 6px rgba(13,148,136,0.06);
    --shadow-lg:0 10px 40px rgba(13,148,136,0.14),0 4px 12px rgba(13,148,136,0.08);
    --glow:0 0 0 3px rgba(20,184,166,0.15);
  }
  *{box-sizing:border-box;}

  .lh-root{
    font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;
  }
  .lh-root::before{content:'';position:fixed;top:-180px;right:-180px;width:540px;height:540px;
    background:radial-gradient(circle,rgba(20,184,166,0.09) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .lh-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:460px;height:460px;
    background:radial-gradient(circle,rgba(13,148,136,0.07) 0%,transparent 70%);pointer-events:none;z-index:0;}

  .lh-inner{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:24px 16px 64px;}
  @media(min-width:640px){.lh-inner{padding:32px 24px 64px;}}
  @media(min-width:1024px){.lh-inner{padding:40px 40px 72px;}}

  /* Header */
  .lh-header{display:flex;flex-direction:column;gap:16px;margin-bottom:32px;}
  @media(min-width:640px){.lh-header{flex-direction:row;align-items:flex-start;justify-content:space-between;}}
  .lh-title{font-family:'Syne',sans-serif;font-size:clamp(22px,4vw,30px);font-weight:800;
    color:var(--teal-800);letter-spacing:-0.5px;display:flex;align-items:center;gap:12px;margin:0 0 5px;}
  .lh-title-icon{width:42px;height:42px;background:linear-gradient(135deg,var(--teal-400),var(--teal-600));
    border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;
    box-shadow:0 4px 14px rgba(13,148,136,0.3);}
  .lh-subtitle{font-size:14px;color:var(--slate-500);margin:0;}

  .btn-export{display:inline-flex;align-items:center;gap:7px;
    background:linear-gradient(135deg,var(--teal-500),var(--teal-600));color:#fff;
    border:none;border-radius:var(--radius-sm);padding:10px 20px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
    transition:all 0.2s;box-shadow:0 4px 14px rgba(13,148,136,0.28);align-self:flex-start;}
  .btn-export:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(13,148,136,0.38);}

  /* Stats */
  .stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px;}
  @media(min-width:640px){.stats-grid{grid-template-columns:repeat(4,1fr);gap:16px;}}

  .stat-card{background:var(--surface);border-radius:var(--radius-lg);
    padding:16px;text-align:center;border:1px solid rgba(20,184,166,0.10);
    box-shadow:var(--shadow-md);position:relative;overflow:hidden;transition:all 0.2s;}
  .stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
    background:var(--bar,var(--teal-400));}
  .stat-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-lg);}
  .stat-value{font-family:'Syne',sans-serif;font-size:clamp(20px,3vw,26px);font-weight:800;
    line-height:1;margin-bottom:4px;}
  .stat-label{font-size:11px;font-weight:500;color:var(--slate-500);}

  /* Filter bar */
  .filter-bar{background:var(--surface);border-radius:var(--radius-lg);
    box-shadow:var(--shadow-md);border:1px solid rgba(20,184,166,0.10);
    padding:18px 20px;margin-bottom:16px;
    display:flex;flex-direction:column;gap:12px;}
  @media(min-width:768px){.filter-bar{flex-direction:row;align-items:center;justify-content:space-between;}}

  .search-wrap{position:relative;flex:1;min-width:0;}
  .search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);
    color:var(--teal-400);font-size:15px;pointer-events:none;}
  .search-input{width:100%;padding:10px 16px 10px 42px;
    border:1.5px solid var(--teal-100);border-radius:var(--radius-sm);
    font-family:'DM Sans',sans-serif;font-size:14px;color:var(--slate-700);
    background:var(--surface-2);outline:none;transition:all 0.2s;}
  .search-input:focus{border-color:var(--teal-400);box-shadow:var(--glow);background:#fff;}
  .search-input::placeholder{color:var(--slate-400);}

  .filter-btns{display:flex;flex-wrap:wrap;gap:8px;}
  .filter-btn{padding:8px 16px;border-radius:20px;font-family:'DM Sans',sans-serif;
    font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;border:1.5px solid transparent;}
  .filter-btn-inactive{background:var(--teal-50);color:var(--teal-700);border-color:var(--teal-100);}
  .filter-btn-inactive:hover{background:var(--teal-100);}
  .filter-btn-all{background:linear-gradient(135deg,var(--teal-500),var(--teal-600));color:#fff;
    box-shadow:0 2px 8px rgba(13,148,136,0.25);}
  .filter-btn-approved{background:#dcfce7;color:#166534;border-color:#86efac;}
  .filter-btn-pending{background:#fef9c3;color:#854d0e;border-color:#fde047;}
  .filter-btn-rejected{background:#fee2e2;color:#991b1b;border-color:#fca5a5;}

  /* Table */
  .table-card{background:var(--surface);border-radius:var(--radius-lg);
    box-shadow:var(--shadow-md);border:1px solid rgba(20,184,166,0.10);
    overflow:hidden;margin-bottom:20px;}
  .table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .table-wrap::-webkit-scrollbar{height:6px;}
  .table-wrap::-webkit-scrollbar-track{background:var(--teal-50);}
  .table-wrap::-webkit-scrollbar-thumb{background:var(--teal-300);border-radius:3px;}

  table{width:100%;border-collapse:separate;border-spacing:0;font-size:14px;}
  thead tr{background:linear-gradient(to right,var(--teal-50),var(--teal-100));}
  thead th{padding:14px 18px;text-align:left;font-size:11px;font-weight:700;
    text-transform:uppercase;letter-spacing:0.06em;color:var(--teal-700);
    white-space:nowrap;border-bottom:2px solid var(--teal-200);}
  tbody tr{transition:background 0.15s;border-bottom:1px solid var(--slate-100);}
  tbody tr:last-child{border-bottom:none;}
  tbody tr:hover{background:var(--teal-50);}
  td{padding:14px 18px;vertical-align:middle;}

  /* Cell styles */
  .type-badge{display:inline-block;padding:3px 10px;border-radius:20px;
    font-size:11px;font-weight:700;margin-bottom:4px;}
  .id-tag{font-size:11px;color:var(--slate-400);font-weight:500;}
  .reason-text{font-size:12px;color:var(--slate-500);margin:3px 0 0;}
  .applied-text{font-size:11px;color:var(--slate-400);margin-top:3px;}

  .duration-value{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;
    color:var(--teal-600);text-align:center;line-height:1;}
  .duration-unit{font-size:11px;color:var(--slate-400);text-align:center;}

  .date-main{font-size:13px;font-weight:600;color:var(--slate-700);}
  .date-sep{font-size:10px;color:var(--slate-400);margin:1px 0;}

  .status-badge{display:inline-flex;align-items:center;gap:5px;
    padding:5px 12px;border-radius:20px;font-size:11px;font-weight:700;}
  .status-approved{background:#dcfce7;color:#166534;}
  .status-pending{background:#fef9c3;color:#854d0e;}
  .status-rejected{background:#fee2e2;color:#991b1b;}
  .status-date{font-size:10px;color:var(--slate-400);margin-top:3px;}

  .approver-name{font-size:13px;font-weight:600;color:var(--slate-700);}
  .approver-bal{font-size:11px;color:var(--slate-400);margin-top:2px;}

  .action-btns{display:flex;gap:6px;}
  .btn-icon{width:30px;height:30px;border:none;border-radius:7px;
    cursor:pointer;display:flex;align-items:center;justify-content:center;
    font-size:13px;transition:all 0.15s;background:transparent;}
  .btn-icon-view{color:var(--teal-600);}
  .btn-icon-view:hover{background:var(--teal-50);color:var(--teal-700);}
  .btn-icon-edit{color:#16a34a;}
  .btn-icon-edit:hover{background:#f0fdf4;}
  .btn-icon-del{color:#dc2626;}
  .btn-icon-del:hover{background:#fef2f2;}

  /* Empty state */
  .empty-state{text-align:center;padding:56px 24px;color:var(--slate-400);}
  .empty-state svg{font-size:36px;margin-bottom:12px;opacity:0.35;}
  .empty-state p{margin:0 0 5px;font-size:15px;font-weight:500;color:var(--slate-500);}
  .empty-state span{font-size:13px;}

  /* Summary bottom */
  .summary-bottom{background:var(--surface);border-radius:var(--radius-lg);
    box-shadow:var(--shadow-md);border:1px solid rgba(20,184,166,0.10);padding:24px;}
  .summary-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;
    color:var(--teal-800);display:flex;align-items:center;gap:8px;margin:0 0 18px;}
  .summary-title-icon{width:28px;height:28px;border-radius:7px;
    background:linear-gradient(135deg,var(--teal-100),var(--teal-200));
    display:flex;align-items:center;justify-content:center;color:var(--teal-600);font-size:13px;}
  .summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  @media(min-width:640px){.summary-grid{grid-template-columns:repeat(4,1fr);}}
  .sum-tile{padding:16px;border-radius:var(--radius-md);text-align:center;border:1px solid transparent;transition:all 0.2s;}
  .sum-tile:hover{transform:translateY(-2px);box-shadow:var(--shadow-md);}
  .sum-value{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;line-height:1;margin-bottom:4px;}
  .sum-label{font-size:11px;font-weight:500;}
`;

const leaveHistory = [
  { id:'L-2024-001', type:'Casual Leave',    startDate:'2024-01-15', endDate:'2024-01-16', duration:2, status:'approved', appliedDate:'2024-01-10', approvedDate:'2024-01-11', reason:'Family function',      approver:'Priya Sharma', balanceAfter:10 },
  { id:'L-2024-002', type:'Sick Leave',      startDate:'2024-02-20', endDate:'2024-02-22', duration:3, status:'approved', appliedDate:'2024-02-19', approvedDate:'2024-02-19', reason:'Medical checkup',      approver:'Raj Kumar',    balanceAfter:7  },
  { id:'L-2024-003', type:'Earned Leave',    startDate:'2024-03-10', endDate:'2024-03-15', duration:6, status:'pending',  appliedDate:'2024-03-01', approvedDate:null,          reason:'Vacation with family', approver:'Pending',      balanceAfter:9  },
  { id:'L-2024-004', type:'Optional Holiday',startDate:'2024-03-25', endDate:'2024-03-25', duration:1, status:'rejected', appliedDate:'2024-03-20', approvedDate:'2024-03-21', reason:'Personal work',        approver:'Anjali Singh', balanceAfter:2  },
  { id:'L-2024-005', type:'Casual Leave',    startDate:'2024-04-05', endDate:'2024-04-05', duration:1, status:'approved', appliedDate:'2024-04-01', approvedDate:'2024-04-02', reason:'Doctor appointment',   approver:'Priya Sharma', balanceAfter:6  },
  { id:'L-2024-006', type:'Sick Leave',      startDate:'2024-04-12', endDate:'2024-04-13', duration:2, status:'approved', appliedDate:'2024-04-11', approvedDate:'2024-04-11', reason:'Fever and cold',       approver:'Raj Kumar',    balanceAfter:5  },
];

const typeBadgeStyle = t => ({
  'Casual Leave':    { bg:'#ccfbf1', color:'#0f766e' },
  'Sick Leave':      { bg:'#dcfce7', color:'#166534' },
  'Earned Leave':    { bg:'#f5f3ff', color:'#5b21b6' },
  'Optional Holiday':{ bg:'#fff7ed', color:'#9a3412' },
}[t] || { bg:'#f1f5f9', color:'#475569' });

const statusIcon = s => ({
  approved: <FiCheckCircle style={{ color:'#22c55e' }} />,
  rejected: <FiXCircle    style={{ color:'#ef4444' }} />,
  pending:  <FiAlertCircle style={{ color:'#f59e0b' }} />,
}[s] || <FiClock />);

const fmtDate = d => d ? new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) : '—';

const LeaveHistory = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = leaveHistory.filter(l => {
    const matchFilter = filter === 'all' || l.status === filter;
    const matchSearch = l.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        l.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const stats = {
    total:    leaveHistory.length,
    approved: leaveHistory.filter(l => l.status === 'approved').length,
    pending:  leaveHistory.filter(l => l.status === 'pending').length,
    rejected: leaveHistory.filter(l => l.status === 'rejected').length,
  };

  const filterBtns = [
    { key: 'all',      label: 'All',      activeCls: 'filter-btn-all'      },
    { key: 'approved', label: 'Approved', activeCls: 'filter-btn-approved' },
    { key: 'pending',  label: 'Pending',  activeCls: 'filter-btn-pending'  },
    { key: 'rejected', label: 'Rejected', activeCls: 'filter-btn-rejected' },
  ];

  return (
    <div className="lh-root">
      <style>{style}</style>
      <div className="lh-inner">

        {/* Header */}
        <div className="lh-header">
          <div>
            <h1 className="lh-title">
              <span className="lh-title-icon"><FiCalendar /></span>
              Leave History
            </h1>
            <p className="lh-subtitle">Track all your leave applications and their status</p>
          </div>
          <button className="btn-export" onClick={() => alert('Exported!')}>
            <FiDownload style={{ fontSize: 14 }} /> Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: 'Total Applications', value: stats.total,    color: 'var(--teal-700)',  bar: 'var(--teal-400)' },
            { label: 'Approved',           value: stats.approved, color: '#16a34a',           bar: '#22c55e'         },
            { label: 'Pending',            value: stats.pending,  color: '#b45309',           bar: '#f59e0b'         },
            { label: 'Rejected',           value: stats.rejected, color: '#dc2626',           bar: '#ef4444'         },
          ].map((s, i) => (
            <div key={i} className="stat-card" style={{ '--bar': s.bar }}>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <div className="search-wrap">
            <FiSearch className="search-icon" />
            <input className="search-input" type="text"
              placeholder="Search by leave type or reason…"
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="filter-btns">
            {filterBtns.map(b => (
              <button key={b.key} className={`filter-btn ${filter === b.key ? b.activeCls : 'filter-btn-inactive'}`}
                onClick={() => setFilter(b.key)}>
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Leave Details</th>
                  <th>Duration</th>
                  <th>Dates</th>
                  <th>Status</th>
                  <th>Approver</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(leave => {
                  const tb = typeBadgeStyle(leave.type);
                  return (
                    <tr key={leave.id}>
                      <td>
                        <div>
                          <span className="type-badge" style={{ background: tb.bg, color: tb.color }}>{leave.type}</span>
                          <span className="id-tag" style={{ marginLeft: 6 }}>{leave.id}</span>
                          <div className="reason-text">{leave.reason}</div>
                          <div className="applied-text">Applied: {fmtDate(leave.appliedDate)}</div>
                        </div>
                      </td>
                      <td>
                        <div className="duration-value">{leave.duration}</div>
                        <div className="duration-unit">days</div>
                      </td>
                      <td>
                        <div className="date-main">{fmtDate(leave.startDate)}</div>
                        <div className="date-sep">to</div>
                        <div className="date-main">{fmtDate(leave.endDate)}</div>
                      </td>
                      <td>
                        <div className={`status-badge status-${leave.status}`}>
                          {statusIcon(leave.status)}
                          <span style={{ textTransform: 'capitalize' }}>{leave.status}</span>
                        </div>
                        {leave.approvedDate && (
                          <div className="status-date">{fmtDate(leave.approvedDate)}</div>
                        )}
                      </td>
                      <td>
                        <div className="approver-name">{leave.approver}</div>
                        <div className="approver-bal">Balance: {leave.balanceAfter}</div>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="btn-icon btn-icon-view" title="View"><FiEye /></button>
                          {leave.status === 'pending' && (
                            <>
                              <button className="btn-icon btn-icon-edit" title="Edit"><FiEdit /></button>
                              <button className="btn-icon btn-icon-del" title="Cancel"><FiTrash2 /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="empty-state">
                <div><FiCalendar /></div>
                <p>No leave applications found</p>
                <span>Try adjusting your filters or search terms</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="summary-bottom">
          <h3 className="summary-title">
            <span className="summary-title-icon"><FiActivity /></span>
            Leave Summary
          </h3>
          <div className="summary-grid">
            {[
              { value: '18', label: 'Total Leaves Taken',  bg: 'var(--teal-50)', border: 'var(--teal-200)', val: 'var(--teal-700)', lbl: 'var(--teal-600)' },
              { value: '14', label: 'Leaves Approved',     bg: '#f0fdf4',        border: '#bbf7d0',         val: '#16a34a',         lbl: '#15803d'         },
              { value: '2.1',label: 'Avg. Leave Duration', bg: '#fef9c3',        border: '#fde68a',         val: '#b45309',         lbl: '#92400e'         },
              { value: '78%',label: 'Approval Rate',       bg: '#faf5ff',        border: '#e9d5ff',         val: '#7c3aed',         lbl: '#6d28d9'         },
            ].map((s, i) => (
              <div key={i} className="sum-tile" style={{ background: s.bg, borderColor: s.border }}>
                <div className="sum-value" style={{ color: s.val }}>{s.value}</div>
                <div className="sum-label" style={{ color: s.lbl }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeaveHistory;