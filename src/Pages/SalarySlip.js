import React, { useState } from 'react';
import {
  FiDownload, FiPrinter, FiMail, FiCalendar, FiUser,
  FiDollarSign, FiCreditCard, FiTrendingUp, FiPieChart,
  FiFileText, FiArrowUp, FiArrowDown, FiEye, FiEyeOff, FiExternalLink
} from 'react-icons/fi';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');

  :root {
    --teal-50:#f0fdfa;--teal-100:#ccfbf1;--teal-200:#99f6e4;--teal-300:#5eead4;
    --teal-400:#2dd4bf;--teal-500:#14b8a6;--teal-600:#0d9488;--teal-700:#0f766e;
    --teal-800:#115e59;--teal-900:#134e4a;
    --slate-50:#f8fafc;--slate-100:#f1f5f9;--slate-200:#e2e8f0;
    --slate-400:#94a3b8;--slate-500:#64748b;--slate-600:#475569;
    --slate-700:#334155;--slate-800:#1e293b;
    --surface:#ffffff;--surface-2:#f8fffe;
    --radius-sm:8px;--radius-md:14px;--radius-lg:20px;
    --shadow-sm:0 1px 3px rgba(13,148,136,0.08);
    --shadow-md:0 4px 16px rgba(13,148,136,0.10),0 2px 6px rgba(13,148,136,0.06);
    --shadow-lg:0 10px 40px rgba(13,148,136,0.14),0 4px 12px rgba(13,148,136,0.08);
    --glow:0 0 0 3px rgba(20,184,166,0.16);
  }
  *{box-sizing:border-box;}

  .ss-root{
    font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;
  }
  .ss-root::before{content:'';position:fixed;top:-180px;right:-180px;width:560px;height:560px;
    background:radial-gradient(circle,rgba(20,184,166,0.09) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .ss-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:480px;height:480px;
    background:radial-gradient(circle,rgba(13,148,136,0.07) 0%,transparent 70%);pointer-events:none;z-index:0;}

  .ss-inner{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:20px 14px 64px;}
  @media(min-width:480px){.ss-inner{padding:24px 18px 64px;}}
  @media(min-width:640px){.ss-inner{padding:32px 24px 72px;}}
  @media(min-width:1024px){.ss-inner{padding:40px 40px 80px;}}

  /* ── Header ── */
  .ss-header{display:flex;flex-direction:column;gap:14px;margin-bottom:24px;}
  @media(min-width:600px){.ss-header{flex-direction:row;align-items:flex-start;justify-content:space-between;}}
  .ss-title{font-family:'Syne',sans-serif;font-size:clamp(20px,4vw,30px);font-weight:800;
    color:var(--teal-800);letter-spacing:-0.5px;display:flex;align-items:center;gap:10px;margin:0 0 4px;}
  .ss-title-icon{width:38px;height:38px;background:linear-gradient(135deg,var(--teal-400),var(--teal-600));
    border-radius:11px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;
    box-shadow:0 4px 14px rgba(13,148,136,0.30);flex-shrink:0;}
  .ss-subtitle{font-size:13px;color:var(--slate-500);margin:0;}

  .select-month{
    width:100%;
    padding:10px 32px 10px 14px;border:1.5px solid var(--teal-100);border-radius:var(--radius-sm);
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:var(--slate-600);
    background:var(--surface-2);outline:none;cursor:pointer;transition:all 0.2s;
    appearance:none;-webkit-appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230d9488' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 10px center;
  }
  @media(min-width:600px){.select-month{width:auto;}}
  .select-month:focus{border-color:var(--teal-400);box-shadow:var(--glow);}

  /* ── Summary Cards ── */
  /* mobile: 1 col → 480px: 1 col with bigger padding → 640px: 3 col */
  .summary-grid{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:20px;}
  @media(min-width:480px){.summary-grid{grid-template-columns:1fr 1fr;gap:12px;}}
  @media(min-width:768px){.summary-grid{grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;}}

  .sum-card{background:var(--surface);border-radius:var(--radius-lg);padding:16px 14px;
    border:1px solid rgba(20,184,166,0.10);box-shadow:var(--shadow-md);
    position:relative;overflow:hidden;transition:transform 0.2s,box-shadow 0.2s;
    border-left:4px solid var(--accent,var(--teal-400));}
  @media(min-width:480px){.sum-card{padding:18px 16px;}}
  @media(min-width:768px){.sum-card{padding:20px 18px;}}
  .sum-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg);}
  .sum-card-top{display:flex;align-items:flex-start;justify-content:space-between;}
  .sum-label{font-size:11px;font-weight:600;margin-bottom:3px;}
  @media(min-width:480px){.sum-label{font-size:12px;margin-bottom:4px;}}
  .sum-value{font-family:'Syne',sans-serif;font-size:clamp(17px,3.5vw,24px);font-weight:800;
    line-height:1;margin:5px 0 2px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
  .sum-sub{font-size:11px;}
  .sum-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;
    justify-content:center;font-size:16px;flex-shrink:0;}
  @media(min-width:480px){.sum-icon{width:40px;height:40px;font-size:17px;}}
  .sum-trend{display:flex;align-items:center;gap:5px;margin-top:8px;font-size:11px;font-weight:500;flex-wrap:wrap;}
  @media(min-width:480px){.sum-trend{font-size:12px;}}
  .eye-btn{background:none;border:none;cursor:pointer;color:var(--slate-400);
    font-size:14px;padding:2px;display:flex;align-items:center;transition:color 0.15s;}
  .eye-btn:hover{color:var(--teal-500);}

  /* ── Main layout ── */
  /* mobile: single col → 1024px: slip + sidebar side-by-side */
  .main-grid{display:grid;grid-template-columns:1fr;gap:16px;}
  @media(min-width:1024px){.main-grid{grid-template-columns:1fr 268px;gap:22px;align-items:start;}}

  /* sidebar on tablet: 2-col grid of cards */
  .sidebar-stack{display:grid;grid-template-columns:1fr;gap:14px;}
  @media(min-width:600px) and (max-width:1023px){.sidebar-stack{grid-template-columns:1fr 1fr;gap:16px;}}
  @media(min-width:1024px){.sidebar-stack{display:flex;flex-direction:column;gap:16px;}}

  /* ── Slip card ── */
  .slip-card{background:var(--surface);border-radius:var(--radius-lg);
    box-shadow:var(--shadow-md);border:1px solid rgba(20,184,166,0.10);overflow:hidden;}

  .slip-header{
    background:linear-gradient(135deg,var(--teal-600) 0%,var(--teal-800) 100%);
    padding:18px 16px;color:#fff;position:relative;overflow:hidden;
  }
  @media(min-width:480px){.slip-header{padding:20px 20px;}}
  @media(min-width:640px){.slip-header{padding:22px 24px;}}
  .slip-header::before{content:'';position:absolute;top:-40px;right:-40px;
    width:160px;height:160px;background:rgba(255,255,255,0.06);border-radius:50%;}
  .slip-header::after{content:'';position:absolute;bottom:-30px;left:30px;
    width:100px;height:100px;background:rgba(255,255,255,0.04);border-radius:50%;}
  .slip-header-inner{display:flex;flex-direction:column;gap:10px;position:relative;z-index:1;}
  @media(min-width:480px){.slip-header-inner{flex-direction:row;align-items:flex-start;justify-content:space-between;gap:12px;}}
  .slip-title{font-family:'Syne',sans-serif;font-size:clamp(17px,3vw,20px);font-weight:800;color:#fff;margin:0 0 3px;}
  .slip-period{font-size:12px;color:rgba(255,255,255,0.75);}
  .slip-company{font-size:13px;font-weight:700;color:#fff;}
  @media(min-width:480px){.slip-company{text-align:right;}}
  .slip-company-sub{font-size:11px;color:rgba(255,255,255,0.7);margin-top:2px;}

  /* Employee details */
  .emp-section{padding:16px;border-bottom:1px solid var(--teal-50);}
  @media(min-width:480px){.emp-section{padding:18px 20px;}}
  @media(min-width:640px){.emp-section{padding:20px 24px;}}
  .emp-grid{display:grid;grid-template-columns:1fr;gap:12px;}
  @media(min-width:480px){.emp-grid{grid-template-columns:1fr 1fr;gap:14px;}}
  .emp-item{display:flex;align-items:center;gap:10px;}
  .emp-icon{width:30px;height:30px;border-radius:7px;display:flex;align-items:center;
    justify-content:center;font-size:12px;flex-shrink:0;}
  @media(min-width:480px){.emp-icon{width:32px;height:32px;font-size:13px;}}
  .emp-key{font-size:10px;color:var(--slate-500);font-weight:500;margin-bottom:2px;text-transform:uppercase;letter-spacing:0.04em;}
  .emp-val{font-size:12px;font-weight:700;color:var(--slate-800);}
  @media(min-width:480px){.emp-val{font-size:13px;}}

  /* Breakdown */
  .breakdown-section{padding:16px;}
  @media(min-width:480px){.breakdown-section{padding:18px 20px;}}
  @media(min-width:640px){.breakdown-section{padding:20px 24px;}}
  .breakdown-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
  .breakdown-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:var(--teal-800);margin:0;}
  @media(min-width:480px){.breakdown-title{font-size:15px;}}
  .toggle-btn{font-size:11px;font-weight:600;color:var(--teal-600);background:var(--teal-50);
    border:1px solid var(--teal-200);border-radius:20px;padding:4px 11px;cursor:pointer;transition:all 0.15s;white-space:nowrap;}
  .toggle-btn:hover{background:var(--teal-100);}

  .earn-head{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;
    color:var(--teal-600);display:flex;align-items:center;gap:6px;margin:0 0 8px;}
  .earn-dot{width:7px;height:7px;border-radius:50%;background:var(--teal-500);}
  .ded-head{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;
    color:#dc2626;display:flex;align-items:center;gap:6px;margin:14px 0 8px;}
  .ded-dot{width:7px;height:7px;border-radius:50%;background:#ef4444;}

  .row{display:flex;align-items:center;justify-content:space-between;padding:6px 0;
    border-bottom:1px solid var(--teal-50);}
  .row:last-child{border-bottom:none;}
  .row-key{font-size:12px;color:var(--slate-600);}
  @media(min-width:480px){.row-key{font-size:13px;}}
  .row-val{font-size:12px;font-weight:700;color:var(--slate-800);text-align:right;}
  @media(min-width:480px){.row-val{font-size:13px;}}

  .total-row{display:flex;align-items:center;justify-content:space-between;
    padding:9px 0 0;border-top:2px solid var(--teal-200);margin-top:6px;}
  .total-key{font-size:13px;font-weight:700;color:var(--slate-800);}
  .total-earn{font-size:13px;font-weight:800;color:var(--teal-600);}
  @media(min-width:480px){.total-earn{font-size:14px;}}
  .total-ded{font-size:13px;font-weight:800;color:#dc2626;}
  @media(min-width:480px){.total-ded{font-size:14px;}}

  /* Net salary box */
  .net-box{background:linear-gradient(135deg,var(--teal-50),var(--teal-100));
    border:1.5px solid var(--teal-200);border-radius:var(--radius-md);
    padding:14px 15px;margin-top:14px;}
  @media(min-width:480px){.net-box{padding:16px 18px;}}
  .net-top{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;}
  .net-label{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--teal-800);}
  @media(min-width:480px){.net-label{font-size:14px;}}
  .net-value{font-family:'Syne',sans-serif;font-size:clamp(18px,4vw,24px);font-weight:800;color:var(--teal-700);}
  .net-words{font-size:10px;color:var(--teal-600);margin-top:6px;font-weight:500;line-height:1.5;}
  @media(min-width:480px){.net-words{font-size:11px;}}

  /* Slip footer */
  .slip-footer{background:var(--teal-50);border-top:1px solid var(--teal-100);
    padding:12px 24px;display:flex;flex-direction:column;gap:6px;}
  @media(min-width:480px){.slip-footer{flex-direction:row;justify-content:space-between;align-items:center;}}
  .slip-footer-text{font-size:11px;color:var(--slate-500);}
  .slip-footer-sig{font-size:11px;font-weight:600;color:var(--teal-700);}

  /* Action buttons — 1 col mobile → 2 col small → 3 col medium+ */
  .action-btns{display:grid;grid-template-columns:1fr;gap:10px;margin-top:14px;}
  @media(min-width:380px){.action-btns{grid-template-columns:1fr 1fr;}}
  @media(min-width:560px){.action-btns{grid-template-columns:1fr 1fr 1fr;margin-top:16px;}}
  .action-btn{display:flex;align-items:center;justify-content:center;gap:7px;
    padding:12px 10px;border:none;border-radius:var(--radius-md);
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;
    cursor:pointer;transition:all 0.2s;white-space:nowrap;}
  /* on 2-col layout email spans full width */
  @media(min-width:380px) and (max-width:559px){.action-btn-email{grid-column:1/-1;}}
  .action-btn-dl{background:linear-gradient(135deg,var(--teal-500),var(--teal-600));color:#fff;
    box-shadow:0 4px 12px rgba(13,148,136,0.28);}
  .action-btn-dl:hover{background:linear-gradient(135deg,var(--teal-400),var(--teal-500));transform:translateY(-1px);}
  .action-btn-print{background:linear-gradient(135deg,#059669,#047857);color:#fff;
    box-shadow:0 4px 12px rgba(5,150,105,0.25);}
  .action-btn-print:hover{background:linear-gradient(135deg,#10b981,#059669);transform:translateY(-1px);}
  .action-btn-email{background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;
    box-shadow:0 4px 12px rgba(124,58,237,0.22);}
  .action-btn-email:hover{background:linear-gradient(135deg,#8b5cf6,#7c3aed);transform:translateY(-1px);}

  /* ── Sidebar ── */
  /* mobile/tablet: 2-col grid of cards; desktop: single stacked column */
  .sidebar-stack{display:grid;grid-template-columns:1fr;gap:14px;}
  @media(min-width:560px) and (max-width:1023px){.sidebar-stack{grid-template-columns:1fr 1fr;gap:16px;}}
  @media(min-width:1024px){.sidebar-stack{display:flex;flex-direction:column;gap:16px;}}

  .card{background:var(--surface);border-radius:var(--radius-lg);
    box-shadow:var(--shadow-md);border:1px solid rgba(20,184,166,0.10);}
  .card-padded{padding:16px;}
  @media(min-width:480px){.card-padded{padding:18px 20px;}}

  .card-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;
    color:var(--teal-800);display:flex;align-items:center;gap:7px;margin:0 0 12px;}
  .card-title-icon{width:24px;height:24px;border-radius:6px;
    background:linear-gradient(135deg,var(--teal-100),var(--teal-200));
    display:flex;align-items:center;justify-content:center;color:var(--teal-600);font-size:11px;}

  .att-row{display:flex;align-items:center;justify-content:space-between;
    padding:6px 0;border-bottom:1px solid var(--teal-50);}
  .att-row:last-child{border-bottom:none;}
  .att-key{font-size:12px;color:var(--slate-500);font-weight:500;}
  .att-val{font-size:13px;font-weight:800;}

  /* Attendance visual */
  .att-visual{display:flex;gap:3px;flex-wrap:wrap;margin-bottom:12px;}
  .att-dot{width:9px;height:9px;border-radius:3px;}

  /* YTD panel */
  .ytd-panel{border-radius:var(--radius-lg);
    background:linear-gradient(135deg,var(--teal-600),var(--teal-800));
    padding:16px;color:#fff;position:relative;overflow:hidden;
    box-shadow:0 8px 28px rgba(13,148,136,0.32);}
  @media(min-width:480px){.ytd-panel{padding:20px;}}
  .ytd-panel::before{content:'';position:absolute;top:-35px;right:-35px;
    width:120px;height:120px;background:rgba(255,255,255,0.07);border-radius:50%;}
  .ytd-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;
    margin:0 0 12px;position:relative;z-index:1;}
  .ytd-row{display:flex;align-items:center;justify-content:space-between;
    padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.12);
    position:relative;z-index:1;font-size:12px;}
  .ytd-row:last-child{border-bottom:none;}
  .ytd-key{color:rgba(255,255,255,0.75);}
  .ytd-val{font-weight:700;color:#fff;font-size:12px;}
  .ytd-footer{display:flex;justify-content:space-between;font-size:10px;
    color:rgba(255,255,255,0.55);margin-top:10px;padding-top:8px;
    border-top:1px solid rgba(255,255,255,0.12);position:relative;z-index:1;}

  /* Quick links */
  .quick-link{display:flex;align-items:center;justify-content:space-between;
    width:100%;padding:8px 10px;border-radius:var(--radius-sm);
    background:none;border:none;cursor:pointer;transition:all 0.15s;
    font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;
    color:var(--teal-600);text-align:left;margin-bottom:3px;}
  .quick-link:last-child{margin-bottom:0;}
  .quick-link:hover{background:var(--teal-50);color:var(--teal-700);}

  /* Tax card */
  .tax-row{display:flex;align-items:center;justify-content:space-between;
    padding:6px 0;border-bottom:1px solid var(--teal-50);}
  .tax-row:last-child{border-bottom:none;}
  .tax-key{font-size:12px;color:var(--slate-500);}
  .tax-val-red{font-size:12px;font-weight:700;color:#dc2626;}
  .tax-val-teal{font-size:12px;font-weight:700;color:var(--teal-600);}
  .tax-total-row{padding:9px 0 0;border-top:2px solid var(--teal-100);margin-top:5px;
    display:flex;align-items:center;justify-content:space-between;}

  /* scrollbar */
  ::-webkit-scrollbar{width:6px;height:6px;}
  ::-webkit-scrollbar-track{background:var(--teal-50);}
  ::-webkit-scrollbar-thumb{background:var(--teal-300);border-radius:3px;}
`;

const salaryData = {
  employee: {
    name: 'Rajesh Kumar', employeeId: 'EMP-2024-001',
    designation: 'Senior Software Engineer', department: 'Technology',
    bankAccount: 'XXXX XXXX 1234', joiningDate: '2022-03-15', panNumber: 'ABCDE1234F'
  },
  salaryDetails: {
    basic: 75000, hra: 37500, specialAllowance: 45000, medicalAllowance: 1250,
    travelAllowance: 8000, performanceBonus: 15000, overtime: 5000, otherAllowances: 2000
  },
  deductions: {
    pf: 9000, professionalTax: 200, incomeTax: 12000,
    insurance: 2500, loanRecovery: 0, otherDeductions: 500
  },
  attendance: { workingDays: 22, presentDays: 21, leaves: 1, lopDays: 0 }
};

const months = [
  { value: '2024-06', label: 'June 2024' }, { value: '2024-05', label: 'May 2024' },
  { value: '2024-04', label: 'April 2024' }, { value: '2024-03', label: 'March 2024' },
  { value: '2024-02', label: 'February 2024' }, { value: '2024-01', label: 'January 2024' }
];

const fmt = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const fmtKey = k => {
  if (k === 'pf') return 'Provident Fund';
  if (k === 'lop') return 'Loss of Pay';
  return k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim();
};

const convertToWords = num => {
  const ones = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine'];
  const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  const teens = ['Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  if (num === 0) return 'Zero';
  let w = '';
  if (num >= 100000) { w += convertToWords(Math.floor(num/100000)) + ' Lakh '; num %= 100000; }
  if (num >= 1000)   { w += convertToWords(Math.floor(num/1000))   + ' Thousand '; num %= 1000; }
  if (num >= 100)    { w += ones[Math.floor(num/100)] + ' Hundred '; num %= 100; }
  if (num >= 20)     { w += tens[Math.floor(num/10)] + ' '; num %= 10; }
  else if (num >= 10){ w += teens[num-10] + ' '; num = 0; }
  if (num > 0) w += ones[num] + ' ';
  return w.trim();
};

const SalarySlip = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-06');
  const [showBreakdown, setShowBreakdown] = useState(true);
  const [showNet, setShowNet] = useState(true);

  const totalEarnings  = Object.values(salaryData.salaryDetails).reduce((s, v) => s + v, 0);
  const totalDeductions = Object.values(salaryData.deductions).reduce((s, v) => s + v, 0);
  const netSalary = totalEarnings - totalDeductions;
  const monthLabel = months.find(m => m.value === selectedMonth)?.label || '';

  // Attendance dots: 22 working days visualised
  const attDots = Array.from({ length: salaryData.attendance.workingDays }, (_, i) => {
    if (i < salaryData.attendance.presentDays - salaryData.attendance.leaves) return 'present';
    if (i < salaryData.attendance.presentDays) return 'leave';
    return 'absent';
  });

  return (
    <div className="ss-root">
      <style>{style}</style>
      <div className="ss-inner">

        {/* Header */}
        <div className="ss-header">
          <div>
            <h1 className="ss-title">
              <span className="ss-title-icon"><FiDollarSign /></span>
              Salary Slip
            </h1>
            <p className="ss-subtitle">View and download your monthly salary details</p>
          </div>
          <select className="select-month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
            {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          {/* Net Salary */}
          <div className="sum-card" style={{ '--accent': 'var(--teal-500)' }}>
            <div className="sum-card-top">
              <div>
                <div className="sum-label" style={{ color: 'var(--teal-600)' }}>Net Salary</div>
                <div className="sum-value" style={{ color: 'var(--teal-700)' }}>
                  {showNet ? fmt(netSalary) : '••••••'}
                  <button className="eye-btn" onClick={() => setShowNet(!showNet)}>
                    {showNet ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className="sum-sub" style={{ color: 'var(--teal-500)' }}>This month</div>
              </div>
              <div className="sum-icon" style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
                <FiCreditCard />
              </div>
            </div>
            <div className="sum-trend" style={{ color: '#16a34a' }}>
              <FiArrowUp style={{ fontSize: 12 }} /> +8.5% from last month
            </div>
          </div>

          {/* Total Earnings */}
          <div className="sum-card" style={{ '--accent': '#06b6d4' }}>
            <div className="sum-card-top">
              <div>
                <div className="sum-label" style={{ color: '#0e7490' }}>Total Earnings</div>
                <div className="sum-value" style={{ color: '#164e63' }}>{fmt(totalEarnings)}</div>
                <div className="sum-sub" style={{ color: '#0891b2' }}>Before deductions</div>
              </div>
              <div className="sum-icon" style={{ background: '#ecfeff', color: '#0e7490' }}>
                <FiTrendingUp />
              </div>
            </div>
            <div className="sum-trend" style={{ color: '#0e7490' }}>
              <FiArrowUp style={{ fontSize: 12 }} /> All components included
            </div>
          </div>

          {/* Total Deductions */}
          <div className="sum-card" style={{ '--accent': '#a78bfa' }}>
            <div className="sum-card-top">
              <div>
                <div className="sum-label" style={{ color: '#7c3aed' }}>Total Deductions</div>
                <div className="sum-value" style={{ color: '#4c1d95' }}>{fmt(totalDeductions)}</div>
                <div className="sum-sub" style={{ color: '#6d28d9' }}>Taxes & contributions</div>
              </div>
              <div className="sum-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                <FiPieChart />
              </div>
            </div>
            <div className="sum-trend" style={{ color: '#dc2626' }}>
              <FiArrowDown style={{ fontSize: 12 }} /> Statutory deductions
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="main-grid">

          {/* Slip */}
          <div>
            <div className="slip-card">
              {/* Slip Header */}
              <div className="slip-header">
                <div className="slip-header-inner">
                  <div>
                    <p className="slip-title">Salary Slip</p>
                    <p className="slip-period">{monthLabel}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="slip-company">ABC Technologies Pvt. Ltd.</p>
                    <p className="slip-company-sub">Bangalore, Karnataka</p>
                  </div>
                </div>
              </div>

              {/* Employee Details */}
              <div className="emp-section">
                <div className="emp-grid">
                  {[
                    { icon: <FiUser />, bg: 'var(--teal-50)', color: 'var(--teal-600)', key: 'Employee Name',  val: salaryData.employee.name },
                    { icon: <FiFileText />, bg: '#f0fdf4', color: '#16a34a',            key: 'Employee ID',    val: salaryData.employee.employeeId },
                    { icon: <FiUser />, bg: '#faf5ff', color: '#7c3aed',                key: 'Designation',    val: salaryData.employee.designation },
                    { icon: <FiCalendar />, bg: '#fff7ed', color: '#c2410c',            key: 'Pay Period',     val: `1 – 30 ${monthLabel.split(' ')[0]}` },
                    { icon: <FiCreditCard />, bg: 'var(--teal-50)', color: 'var(--teal-600)', key: 'Bank Account', val: salaryData.employee.bankAccount },
                    { icon: <FiFileText />, bg: '#fef9c3', color: '#b45309',            key: 'PAN Number',     val: salaryData.employee.panNumber },
                  ].map((item, i) => (
                    <div key={i} className="emp-item">
                      <div className="emp-icon" style={{ background: item.bg, color: item.color }}>{item.icon}</div>
                      <div>
                        <div className="emp-key">{item.key}</div>
                        <div className="emp-val">{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breakdown */}
              <div className="breakdown-section">
                <div className="breakdown-header">
                  <h3 className="breakdown-title">Salary Breakdown</h3>
                  <button className="toggle-btn" onClick={() => setShowBreakdown(!showBreakdown)}>
                    {showBreakdown ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>

                {showBreakdown && (
                  <>
                    {/* Earnings */}
                    <div className="earn-head"><span className="earn-dot" />Earnings</div>
                    {Object.entries(salaryData.salaryDetails).map(([k, v]) => (
                      <div key={k} className="row">
                        <span className="row-key">{fmtKey(k)}</span>
                        <span className="row-val">{fmt(v)}</span>
                      </div>
                    ))}
                    <div className="total-row">
                      <span className="total-key">Total Earnings</span>
                      <span className="total-earn">{fmt(totalEarnings)}</span>
                    </div>

                    {/* Deductions */}
                    <div className="ded-head"><span className="ded-dot" />Deductions</div>
                    {Object.entries(salaryData.deductions).map(([k, v]) => (
                      <div key={k} className="row">
                        <span className="row-key">{fmtKey(k)}</span>
                        <span className="row-val" style={{ color: v > 0 ? '#dc2626' : 'var(--slate-400)' }}>{fmt(v)}</span>
                      </div>
                    ))}
                    <div className="total-row">
                      <span className="total-key">Total Deductions</span>
                      <span className="total-ded">{fmt(totalDeductions)}</span>
                    </div>
                  </>
                )}

                {/* Net Salary box */}
                <div className="net-box">
                  <div className="net-top">
                    <span className="net-label">Net Salary Payable</span>
                    <span className="net-value">{showNet ? fmt(netSalary) : '••••••'}</span>
                  </div>
                  {showNet && (
                    <div className="net-words">
                      In Words: Rupees {convertToWords(netSalary)} Only &nbsp;·&nbsp; Bank Transfer
                    </div>
                  )}
                </div>
              </div>

              {/* Slip Footer */}
              <div className="slip-footer">
                <span className="slip-footer-text">Generated: {new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })}</span>
                <span className="slip-footer-sig">Authorised Signatory</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-btns">
              <button className="action-btn action-btn-dl" onClick={() => alert('Downloaded!')}>
                <FiDownload style={{ fontSize: 14 }} /> Download PDF
              </button>
              <button className="action-btn action-btn-print" onClick={() => window.print()}>
                <FiPrinter style={{ fontSize: 14 }} /> Print Slip
              </button>
              <button className="action-btn action-btn-email" onClick={() => alert('Sent to email!')}>
                <FiMail style={{ fontSize: 14 }} /> Email
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar-stack">

            {/* Attendance */}
            <div className="card card-padded">
              <h3 className="card-title">
                <span className="card-title-icon"><FiCalendar /></span>
                Attendance Summary
              </h3>
              <div className="att-visual">
                {attDots.map((d, i) => (
                  <div key={i} className="att-dot" style={{
                    background: d === 'present' ? 'var(--teal-400)' : d === 'leave' ? '#f59e0b' : '#e2e8f0'
                  }} />
                ))}
              </div>
              {[
                { key: 'Working Days',  val: salaryData.attendance.workingDays,  color: 'var(--teal-700)' },
                { key: 'Present Days',  val: salaryData.attendance.presentDays,  color: '#16a34a'          },
                { key: 'Leaves Taken',  val: salaryData.attendance.leaves,        color: '#b45309'          },
                { key: 'LOP Days',      val: salaryData.attendance.lopDays,       color: '#dc2626'          },
              ].map((r, i) => (
                <div key={i} className="att-row">
                  <span className="att-key">{r.key}</span>
                  <span className="att-val" style={{ color: r.color }}>{r.val}</span>
                </div>
              ))}
            </div>

            {/* Tax Summary */}
            <div className="card card-padded">
              <h3 className="card-title">
                <span className="card-title-icon"><FiPieChart /></span>
                Tax Summary
              </h3>
              <div className="tax-row">
                <span className="tax-key">Income Tax</span>
                <span className="tax-val-red">{fmt(salaryData.deductions.incomeTax)}</span>
              </div>
              <div className="tax-row">
                <span className="tax-key">Professional Tax</span>
                <span className="tax-val-red">{fmt(salaryData.deductions.professionalTax)}</span>
              </div>
              <div className="tax-row">
                <span className="tax-key">Provident Fund</span>
                <span className="tax-val-teal">{fmt(salaryData.deductions.pf)}</span>
              </div>
              <div className="tax-total-row">
                <span style={{ fontSize:13, fontWeight:700, color:'var(--slate-800)' }}>Total Tax Paid YTD</span>
                <span style={{ fontSize:14, fontWeight:800, color:'#dc2626' }}>{fmt(45000)}</span>
              </div>
            </div>

            {/* YTD */}
            <div className="ytd-panel">
              <p className="ytd-title">Year-to-Date Summary</p>
              {[
                { key: 'Total Earnings', val: fmt(1560000) },
                { key: 'Tax Paid',       val: fmt(234000)  },
                { key: 'Net Salary',     val: fmt(1326000) },
              ].map((r, i) => (
                <div key={i} className="ytd-row">
                  <span className="ytd-key">{r.key}</span>
                  <span className="ytd-val">{r.val}</span>
                </div>
              ))}
              <div className="ytd-footer">
                <span>Financial Year 2024-25</span>
                <span>6 Months</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="card card-padded">
              <h3 className="card-title">
                <span className="card-title-icon"><FiExternalLink /></span>
                Quick Links
              </h3>
              {['Form 16 Download', 'Investment Declaration', 'Tax Saving Options', 'Salary Revision History'].map((l, i) => (
                <button key={i} className="quick-link">
                  {l} <FiExternalLink style={{ fontSize: 11, opacity: 0.5 }} />
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySlip;