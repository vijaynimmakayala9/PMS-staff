import React, { useState } from 'react';
import {
  FiCalendar, FiClock, FiUser, FiFileText,
  FiSend, FiX, FiCheck, FiAlertCircle
} from 'react-icons/fi';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');

  :root {
    --teal-50:#f0fdfa;--teal-100:#ccfbf1;--teal-200:#99f6e4;--teal-300:#5eead4;
    --teal-400:#2dd4bf;--teal-500:#14b8a6;--teal-600:#0d9488;--teal-700:#0f766e;
    --teal-800:#115e59;--teal-900:#134e4a;
    --slate-400:#94a3b8;--slate-500:#64748b;--slate-600:#475569;--slate-700:#334155;--slate-800:#1e293b;
    --surface:#ffffff;--surface-2:#f8fffe;
    --radius-sm:8px;--radius-md:14px;--radius-lg:20px;
    --shadow-md:0 4px 16px rgba(13,148,136,0.10),0 2px 6px rgba(13,148,136,0.06);
    --shadow-lg:0 10px 40px rgba(13,148,136,0.14),0 4px 12px rgba(13,148,136,0.08);
    --glow:0 0 0 3px rgba(20,184,166,0.18);
  }
  *{box-sizing:border-box;}

  .al-root{
    font-family:'DM Sans',sans-serif;
    min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;
  }
  .al-root::before{content:'';position:fixed;top:-180px;right:-180px;width:540px;height:540px;
    background:radial-gradient(circle,rgba(20,184,166,0.09) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .al-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:460px;height:460px;
    background:radial-gradient(circle,rgba(13,148,136,0.07) 0%,transparent 70%);pointer-events:none;z-index:0;}

  .al-inner{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:24px 16px 64px;}
  @media(min-width:640px){.al-inner{padding:32px 24px 64px;}}
  @media(min-width:1024px){.al-inner{padding:40px 40px 72px;}}

  /* Header */
  .al-header{text-align:center;margin-bottom:36px;}
  .al-title{
    font-family:'Syne',sans-serif;
    font-size:clamp(22px,4vw,30px);font-weight:800;
    color:var(--teal-800);letter-spacing:-0.5px;
    display:inline-flex;align-items:center;gap:12px;margin:0 0 6px;
  }
  .al-title-icon{
    width:42px;height:42px;
    background:linear-gradient(135deg,var(--teal-400),var(--teal-600));
    border-radius:12px;display:flex;align-items:center;justify-content:center;
    color:#fff;font-size:18px;box-shadow:0 4px 14px rgba(13,148,136,0.3);
  }
  .al-subtitle{font-size:14px;color:var(--slate-500);margin:0;}

  /* Layout */
  .al-grid{display:grid;grid-template-columns:1fr;gap:20px;}
  @media(min-width:1024px){.al-grid{grid-template-columns:1fr 300px;gap:24px;align-items:start;}}

  /* Card */
  .card{background:var(--surface);border-radius:var(--radius-lg);box-shadow:var(--shadow-md);
    border:1px solid rgba(20,184,166,0.10);}
  .card-padded{padding:24px;}
  @media(min-width:640px){.card-padded{padding:28px 30px;}}

  /* Form */
  .form-label{display:block;font-size:12px;font-weight:700;color:var(--teal-700);
    text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;}
  .form-group{margin-bottom:22px;}

  .form-input{
    width:100%;padding:11px 16px;
    border:1.5px solid var(--teal-100);border-radius:var(--radius-sm);
    font-family:'DM Sans',sans-serif;font-size:14px;color:var(--slate-700);
    background:var(--surface-2);outline:none;transition:all 0.2s;
  }
  .form-input:focus{border-color:var(--teal-400);box-shadow:var(--glow);background:#fff;}
  .form-input::placeholder{color:var(--slate-400);}

  .input-wrap{position:relative;}
  .input-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);
    color:var(--teal-400);font-size:14px;pointer-events:none;}
  .input-icon-top{position:absolute;left:14px;top:14px;color:var(--teal-400);font-size:14px;pointer-events:none;}
  .form-input-icon{padding-left:42px;}
  textarea.form-input-icon{padding-left:42px;resize:none;}

  /* Leave type grid */
  .leave-type-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .leave-type-card{
    border:1.5px solid var(--teal-100);border-radius:var(--radius-md);
    padding:14px;cursor:pointer;transition:all 0.2s;
    background:var(--surface-2);
  }
  .leave-type-card:hover{border-color:var(--teal-300);background:var(--teal-50);}
  .leave-type-card.active{border-color:var(--teal-500);background:var(--teal-50);
    box-shadow:0 0 0 3px rgba(20,184,166,0.12);}
  .lt-top{display:flex;align-items:flex-start;justify-content:space-between;}
  .lt-name{font-size:13px;font-weight:700;color:var(--slate-800);}
  .lt-bal{font-size:11px;color:var(--teal-600);margin-top:2px;font-weight:500;}
  .lt-check{
    width:20px;height:20px;border-radius:50%;
    background:linear-gradient(135deg,var(--teal-400),var(--teal-600));
    display:flex;align-items:center;justify-content:center;
    color:#fff;font-size:11px;flex-shrink:0;
  }

  /* Date grid */
  .date-grid{display:grid;grid-template-columns:1fr;gap:16px;}
  @media(min-width:480px){.date-grid{grid-template-columns:1fr 1fr;}}

  /* Duration box */
  .duration-box{
    background:var(--teal-50);border:1.5px solid var(--teal-100);
    border-radius:var(--radius-md);padding:16px;
    display:flex;align-items:center;justify-content:space-between;
  }
  .duration-label{font-size:13px;font-weight:500;color:var(--slate-600);}
  .duration-value{
    font-family:'Syne',sans-serif;font-size:24px;font-weight:800;color:var(--teal-700);
  }
  .duration-unit{font-size:13px;color:var(--teal-500);font-weight:500;margin-left:4px;}
  .alert-row{display:flex;align-items:center;gap:6px;margin-top:10px;
    font-size:12px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;
    border-radius:8px;padding:8px 12px;}

  /* Contact grid */
  .contact-grid{display:grid;grid-template-columns:1fr;gap:16px;}
  @media(min-width:480px){.contact-grid{grid-template-columns:1fr 1fr;}}

  /* Submit */
  .btn-submit{
    width:100%;
    background:linear-gradient(135deg,var(--teal-500),var(--teal-600));
    color:#fff;border:none;border-radius:var(--radius-md);
    padding:14px 24px;
    font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;
    cursor:pointer;transition:all 0.2s;
    display:flex;align-items:center;justify-content:center;gap:10px;
    box-shadow:0 4px 16px rgba(13,148,136,0.3);
    letter-spacing:0.01em;
  }
  .btn-submit:hover{transform:translateY(-1px);box-shadow:0 6px 22px rgba(13,148,136,0.4);
    background:linear-gradient(135deg,var(--teal-400),var(--teal-500));}

  /* Sidebar */
  .sidebar-stack{display:flex;flex-direction:column;gap:16px;}

  .info-row{display:flex;justify-content:space-between;align-items:center;
    padding:8px 0;border-bottom:1px solid var(--teal-50);}
  .info-row:last-child{border-bottom:none;padding-bottom:0;}
  .info-key{font-size:12px;color:var(--slate-500);font-weight:500;}
  .info-val{font-size:13px;font-weight:700;color:var(--teal-700);}

  .card-title{
    font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:var(--teal-800);
    display:flex;align-items:center;gap:8px;margin:0 0 16px;
  }
  .card-title-icon{
    width:26px;height:26px;border-radius:7px;
    background:linear-gradient(135deg,var(--teal-100),var(--teal-200));
    display:flex;align-items:center;justify-content:center;
    color:var(--teal-600);font-size:12px;
  }

  /* Policy panel */
  .policy-panel{
    border-radius:var(--radius-lg);
    background:linear-gradient(135deg,var(--teal-600),var(--teal-800));
    padding:20px;color:#fff;
    box-shadow:0 8px 28px rgba(13,148,136,0.32);
    position:relative;overflow:hidden;
  }
  .policy-panel::before{content:'';position:absolute;top:-40px;right:-40px;
    width:130px;height:130px;background:rgba(255,255,255,0.06);border-radius:50%;}
  .policy-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;
    margin:0 0 14px;position:relative;z-index:1;}
  .policy-list{display:flex;flex-direction:column;gap:9px;position:relative;z-index:1;}
  .policy-item{display:flex;align-items:flex-start;gap:8px;font-size:12px;
    color:rgba(255,255,255,0.88);line-height:1.45;}
  .policy-check{color:#6ee7b7;font-size:13px;flex-shrink:0;margin-top:1px;}

  /* Help card */
  .help-card{
    background:linear-gradient(135deg,#fff7ed,#fef3c7);
    border:1.5px solid #fde68a;border-radius:var(--radius-lg);padding:20px;
  }
  .help-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;
    color:#92400e;margin:0 0 6px;}
  .help-text{font-size:12px;color:#b45309;margin:0 0 14px;line-height:1.5;}
  .btn-help{
    width:100%;background:linear-gradient(135deg,#f59e0b,#d97706);
    color:#fff;border:none;border-radius:var(--radius-sm);
    padding:10px 16px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;
    cursor:pointer;transition:all 0.2s;
    box-shadow:0 3px 10px rgba(217,119,6,0.25);
  }
  .btn-help:hover{background:linear-gradient(135deg,#d97706,#b45309);transform:translateY(-1px);}

  /* Modal */
  .modal-overlay{
    position:fixed;inset:0;background:rgba(15,118,110,0.25);
    backdrop-filter:blur(4px);
    display:flex;align-items:center;justify-content:center;padding:16px;z-index:50;
  }
  .modal{
    background:var(--surface);border-radius:var(--radius-lg);
    box-shadow:var(--shadow-lg);max-width:440px;width:100%;
    border:1px solid var(--teal-100);overflow:hidden;
  }
  .modal-header{
    background:linear-gradient(to right,var(--teal-50),var(--teal-100));
    padding:18px 20px;
    display:flex;align-items:center;justify-content:space-between;
    border-bottom:1px solid var(--teal-200);
  }
  .modal-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:var(--teal-800);margin:0;}
  .modal-close{background:none;border:none;cursor:pointer;color:var(--slate-400);
    font-size:18px;padding:4px;border-radius:6px;display:flex;align-items:center;justify-content:center;}
  .modal-close:hover{background:var(--teal-100);color:var(--teal-700);}
  .modal-body{padding:20px;}
  .modal-row{display:flex;justify-content:space-between;padding:9px 0;
    border-bottom:1px solid var(--teal-50);font-size:13px;}
  .modal-row:last-child{border-bottom:none;}
  .modal-key{color:var(--slate-500);font-weight:500;}
  .modal-val{font-weight:700;color:var(--teal-700);}
  .modal-actions{display:flex;gap:10px;padding:0 20px 20px;}
  .btn-cancel{
    flex:1;background:var(--teal-50);color:var(--teal-700);
    border:1.5px solid var(--teal-200);border-radius:var(--radius-sm);
    padding:12px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;
    cursor:pointer;transition:all 0.2s;
  }
  .btn-cancel:hover{background:var(--teal-100);}
  .btn-confirm{
    flex:1;background:linear-gradient(135deg,var(--teal-500),var(--teal-600));
    color:#fff;border:none;border-radius:var(--radius-sm);
    padding:12px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;
    cursor:pointer;transition:all 0.2s;
    display:flex;align-items:center;justify-content:center;gap:6px;
    box-shadow:0 3px 12px rgba(13,148,136,0.28);
  }
  .btn-confirm:hover{background:linear-gradient(135deg,var(--teal-400),var(--teal-500));transform:translateY(-1px);}

  /* Scrollbar */
  ::-webkit-scrollbar{width:6px;height:6px;}
  ::-webkit-scrollbar-track{background:var(--teal-50);}
  ::-webkit-scrollbar-thumb{background:var(--teal-300);border-radius:3px;}
`;

const leaveTypes = [
  { value: 'casual',   label: 'Casual Leave',      balance: 7 },
  { value: 'sick',     label: 'Sick Leave',         balance: 8 },
  { value: 'earned',   label: 'Earned Leave',       balance: 7 },
  { value: 'optional', label: 'Optional Holiday',   balance: 2 },
];

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    leaveType: '', startDate: '', endDate: '',
    duration: '', reason: '', contact: '', handoverTo: ''
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const calcDuration = () => {
    if (formData.startDate && formData.endDate) {
      const diff = Math.ceil(Math.abs(new Date(formData.endDate) - new Date(formData.startDate)) / 86400000) + 1;
      setFormData(p => ({ ...p, duration: diff }));
    }
  };

  const getBalance = t => (leaveTypes.find(l => l.value === t) || {}).balance || 0;

  const confirmApplication = () => {
    alert('Leave application submitted successfully!');
    setShowPreview(false);
    setFormData({ leaveType: '', startDate: '', endDate: '', duration: '', reason: '', contact: '', handoverTo: '' });
  };

  const selectedLeave = leaveTypes.find(l => l.value === formData.leaveType);

  return (
    <div className="al-root">
      <style>{style}</style>
      <div className="al-inner">

        {/* Header */}
        <div className="al-header">
          <h1 className="al-title">
            <span className="al-title-icon"><FiCalendar /></span>
            Apply for Leave
          </h1>
          <p className="al-subtitle">Fill out the form below to submit your leave application</p>
        </div>

        <div className="al-grid">
          {/* Main Form */}
          <div className="card card-padded">
            <form onSubmit={e => { e.preventDefault(); setShowPreview(true); }}>

              {/* Leave Type */}
              <div className="form-group">
                <label className="form-label">Leave Type *</label>
                <div className="leave-type-grid">
                  {leaveTypes.map(t => (
                    <div
                      key={t.value}
                      className={`leave-type-card${formData.leaveType === t.value ? ' active' : ''}`}
                      onClick={() => setFormData(p => ({ ...p, leaveType: t.value }))}
                    >
                      <div className="lt-top">
                        <div>
                          <div className="lt-name">{t.label}</div>
                          <div className="lt-bal">{t.balance} days remaining</div>
                        </div>
                        {formData.leaveType === t.value && (
                          <div className="lt-check"><FiCheck /></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="date-grid form-group">
                <div>
                  <label className="form-label">Start Date *</label>
                  <div className="input-wrap">
                    <FiCalendar className="input-icon" />
                    <input type="date" name="startDate" value={formData.startDate}
                      onChange={handleChange} onBlur={calcDuration}
                      className="form-input form-input-icon" required />
                  </div>
                </div>
                <div>
                  <label className="form-label">End Date *</label>
                  <div className="input-wrap">
                    <FiCalendar className="input-icon" />
                    <input type="date" name="endDate" value={formData.endDate}
                      onChange={handleChange} onBlur={calcDuration}
                      className="form-input form-input-icon" required />
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="form-group">
                <label className="form-label">Duration</label>
                <div className="duration-box">
                  <span className="duration-label">Total Leave Days</span>
                  <div>
                    <span className="duration-value">{formData.duration || 0}</span>
                    <span className="duration-unit">days</span>
                  </div>
                </div>
                {formData.leaveType && formData.duration > getBalance(formData.leaveType) && (
                  <div className="alert-row">
                    <FiAlertCircle style={{ flexShrink: 0 }} />
                    Insufficient balance! Only {getBalance(formData.leaveType)} days available.
                  </div>
                )}
              </div>

              {/* Reason */}
              <div className="form-group">
                <label className="form-label">Reason for Leave *</label>
                <div className="input-wrap">
                  <FiFileText className="input-icon-top" />
                  <textarea name="reason" value={formData.reason} onChange={handleChange}
                    rows={4} className="form-input form-input-icon"
                    placeholder="Provide a detailed reason for your leave…" required />
                </div>
              </div>

              {/* Contact + Handover */}
              <div className="contact-grid form-group">
                <div>
                  <label className="form-label">Emergency Contact</label>
                  <div className="input-wrap">
                    <FiUser className="input-icon" />
                    <input type="text" name="contact" value={formData.contact}
                      onChange={handleChange} className="form-input form-input-icon"
                      placeholder="Phone number" />
                  </div>
                </div>
                <div>
                  <label className="form-label">Work Handover To</label>
                  <div className="input-wrap">
                    <FiUser className="input-icon" />
                    <input type="text" name="handoverTo" value={formData.handoverTo}
                      onChange={handleChange} className="form-input form-input-icon"
                      placeholder="Colleague name" />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-submit">
                <FiSend style={{ fontSize: 16 }} />
                Submit Leave Application
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="sidebar-stack">

            {/* Quick Info */}
            <div className="card card-padded">
              <h3 className="card-title">
                <span className="card-title-icon"><FiClock /></span>
                Quick Info
              </h3>
              <div className="info-row"><span className="info-key">Application ID</span><span className="info-val">L-2024-001</span></div>
              <div className="info-row"><span className="info-key">Submitted Date</span><span className="info-val">{new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</span></div>
              <div className="info-row"><span className="info-key">Reporting Manager</span><span className="info-val">Priya Sharma</span></div>
              {selectedLeave && (
                <div className="info-row"><span className="info-key">Leave Balance</span><span className="info-val">{selectedLeave.balance} days</span></div>
              )}
            </div>

            {/* Policy */}
            <div className="policy-panel">
              <p className="policy-title">Leave Policy</p>
              <div className="policy-list">
                {[
                  'Apply at least 3 days in advance for planned leaves',
                  'Sick leave requires medical certificate for 3+ days',
                  'Maximum 10 consecutive days allowed',
                  'Holidays during leave are not counted',
                ].map((item, i) => (
                  <div key={i} className="policy-item">
                    <FiCheck className="policy-check" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Help */}
            <div className="help-card">
              <p className="help-title">Need Help?</p>
              <p className="help-text">Contact HR for immediate assistance with your leave application.</p>
              <button className="btn-help">Contact HR Department</button>
            </div>

          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Confirm Leave Application</h3>
              <button className="modal-close" onClick={() => setShowPreview(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              {[
                ['Leave Type', formData.leaveType ? formData.leaveType.charAt(0).toUpperCase() + formData.leaveType.slice(1) : '—'],
                ['Duration', `${formData.duration || 0} days`],
                ['Start Date', formData.startDate ? new Date(formData.startDate).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) : '—'],
                ['End Date', formData.endDate ? new Date(formData.endDate).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) : '—'],
                ['Handover To', formData.handoverTo || 'Not specified'],
              ].map(([k, v], i) => (
                <div key={i} className="modal-row">
                  <span className="modal-key">{k}</span>
                  <span className="modal-val">{v}</span>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowPreview(false)}>Cancel</button>
              <button className="btn-confirm" onClick={confirmApplication}>
                <FiCheck style={{ fontSize: 14 }} /> Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyLeave;