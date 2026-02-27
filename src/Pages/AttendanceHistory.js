import React, { useState, useEffect } from 'react';
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiSearch,
  FiDownload,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiCoffee,
  FiSun,
  FiAlertTriangle,
  FiBarChart2,
  FiUsers,
} from 'react-icons/fi';

const AttendanceHistory = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData,   setFilteredData]   = useState([]);
  const [currentPage,    setCurrentPage]    = useState(1);
  const [searchTerm,     setSearchTerm]     = useState('');
  const [statusFilter,   setStatusFilter]   = useState('all');
  const [dateFilter,     setDateFilter]     = useState('all');
  const [sortConfig,     setSortConfig]     = useState({ key: 'date', direction: 'desc' });

  const recordsPerPage = 8;

  useEffect(() => {
    const sampleData = [
      { id:1, date:'2024-01-15', day:'Mon', punchIn:'09:00 AM', punchOut:'06:15 PM', totalHours:'9.25', breakTime:'45m', effectiveHours:'8.5',  status:'present',  efficiency:'92', breaks:[{ type:'lunch', start:'01:00 PM', end:'01:45 PM', duration:'45m' }], location:'Office',    warnings:[] },
      { id:2, date:'2024-01-14', day:'Sun', punchIn:'--',       punchOut:'--',       totalHours:'0',    breakTime:'0m',  effectiveHours:'0',    status:'holiday',  efficiency:'0',  breaks:[], location:'--',        warnings:[] },
      { id:3, date:'2024-01-13', day:'Sat', punchIn:'--',       punchOut:'--',       totalHours:'0',    breakTime:'0m',  effectiveHours:'0',    status:'weekend',  efficiency:'0',  breaks:[], location:'--',        warnings:[] },
      { id:4, date:'2024-01-12', day:'Fri', punchIn:'09:15 AM', punchOut:'06:30 PM', totalHours:'9.25', breakTime:'1h',  effectiveHours:'8.25', status:'present',  efficiency:'89', breaks:[{ type:'tea', start:'11:00 AM', end:'11:15 AM', duration:'15m' },{ type:'lunch', start:'01:00 PM', end:'01:45 PM', duration:'45m' }], location:'Office',    warnings:['Late punch-in'] },
      { id:5, date:'2024-01-11', day:'Thu', punchIn:'08:45 AM', punchOut:'05:45 PM', totalHours:'9',    breakTime:'30m', effectiveHours:'8.5',  status:'present',  efficiency:'94', breaks:[{ type:'lunch', start:'12:30 PM', end:'01:00 PM', duration:'30m' }], location:'WFH',       warnings:['Early punch-out'] },
      { id:6, date:'2024-01-10', day:'Wed', punchIn:'09:30 AM', punchOut:'04:30 PM', totalHours:'7',    breakTime:'30m', effectiveHours:'6.5',  status:'half-day', efficiency:'93', breaks:[{ type:'lunch', start:'01:00 PM', end:'01:30 PM', duration:'30m' }], location:'Office',    warnings:['Late punch-in','Short working hours'] },
      { id:7, date:'2024-01-09', day:'Tue', punchIn:'10:00 AM', punchOut:'07:00 PM', totalHours:'9',    breakTime:'1h',  effectiveHours:'8',    status:'present',  efficiency:'89', breaks:[{ type:'tea', start:'11:30 AM', end:'11:45 AM', duration:'15m' },{ type:'lunch', start:'01:30 PM', end:'02:15 PM', duration:'45m' }], location:'Client',    warnings:['Late punch-in','Long break time'] },
      { id:8, date:'2024-01-08', day:'Mon', punchIn:'--',       punchOut:'--',       totalHours:'0',    breakTime:'0m',  effectiveHours:'0',    status:'absent',   efficiency:'0',  breaks:[], location:'--',        warnings:['Unauthorized absence'] },
    ];
    setAttendanceData(sampleData);
    setFilteredData(sampleData);
  }, []);

  // Filter + search
  useEffect(() => {
    let result = [...attendanceData];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(r =>
        r.day.toLowerCase().includes(q) ||
        r.date.includes(q) ||
        r.location.toLowerCase().includes(q) ||
        (r.warnings || []).some(w => w.toLowerCase().includes(q))
      );
    }
    if (statusFilter !== 'all') result = result.filter(r => r.status === statusFilter);
    if (dateFilter !== 'all') {
      const today = new Date();
      const w1 = new Date(today.getTime() - 7*86400000);
      const w2 = new Date(today.getTime() - 14*86400000);
      result = result.filter(r => {
        const d = new Date(r.date);
        if (dateFilter === 'this-week')  return d >= w1;
        if (dateFilter === 'last-week')  return d >= w2 && d < w1;
        if (dateFilter === 'this-month') return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
        return true;
      });
    }
    setFilteredData(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, attendanceData]);

  const handleSort = (key) => {
    const dir = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction: dir });
    setFilteredData(prev => [...prev].sort((a,b) => {
      if (a[key] < b[key]) return dir === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return dir === 'asc' ? 1 : -1;
      return 0;
    }));
  };

  // Pagination
  const indexOfLast    = currentPage * recordsPerPage;
  const indexOfFirst   = indexOfLast - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages     = Math.ceil(filteredData.length / recordsPerPage);

  // Summary calcs
  const presentRecords = attendanceData.filter(d => d.status === 'present');
  const absentRecords  = attendanceData.filter(d => d.status === 'absent');
  const warnRecords    = attendanceData.filter(d => (d.warnings||[]).length > 0);
  const totalHours     = presentRecords.reduce((a,c) => a + (parseFloat(c.effectiveHours)||0), 0).toFixed(0);
  const avgEfficiency  = presentRecords.length > 0
    ? Math.round(presentRecords.reduce((a,c) => a + (parseFloat(c.efficiency)||0), 0) / presentRecords.length) : 0;

  // ── Badge helpers ──────────────────────────────────────────────────────────
  const statusCls = (s) => ({
    present:  'bg-teal-50  text-teal-600  border-teal-200',
    absent:   'bg-rose-50  text-rose-500  border-rose-200',
    'half-day':'bg-amber-50 text-amber-600 border-amber-200',
    weekend:  'bg-cyan-50  text-cyan-600  border-cyan-200',
    holiday:  'bg-violet-50 text-violet-600 border-violet-200',
  }[s] || 'bg-teal-50 text-teal-600 border-teal-200');

  const statusIcon = (s) => ({
    present:   <FiCheckCircle className="text-teal-500 text-xs" />,
    absent:    <FiXCircle     className="text-rose-400 text-xs" />,
    'half-day':<FiAlertCircle className="text-amber-400 text-xs" />,
    weekend:   <FiCalendar    className="text-cyan-400 text-xs" />,
    holiday:   <FiCalendar    className="text-violet-400 text-xs" />,
  }[s] || <FiCalendar className="text-teal-300 text-xs" />);

  const locationCls = (loc) => ({
    'Office':  'bg-teal-50  text-teal-600  border-teal-200',
    'WFH':     'bg-cyan-50  text-cyan-600  border-cyan-200',
    'Client':  'bg-violet-50 text-violet-600 border-violet-200',
  }[loc] || 'bg-teal-50 text-teal-400 border-teal-100');

  const BreakIcons = ({ breaks }) => {
    if (!breaks?.length) return <span className="text-teal-200 text-xs">—</span>;
    return (
      <div className="flex gap-1">
        {breaks.map((b,i) => b.type === 'tea'
          ? <FiCoffee key={i} className="text-amber-400 text-xs" />
          : <FiSun    key={i} className="text-orange-400 text-xs" />
        )}
      </div>
    );
  };

  const WarningBadge = ({ warnings }) => {
    const list = warnings || [];
    if (!list.length)
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-500 border border-teal-200">
          <FiCheckCircle className="text-[10px]" /> Clean
        </span>
      );
    return (
      <div className="relative group">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-500 border border-rose-200 cursor-pointer">
          <FiAlertTriangle className="text-[10px]" /> {list.length} warning{list.length > 1 ? 's' : ''}
        </span>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
          <div className="bg-teal-900 text-white text-[11px] rounded-lg py-2 px-3 whitespace-nowrap shadow-xl">
            <p className="font-bold mb-1 text-teal-200">Warnings</p>
            {list.map((w,i) => (
              <div key={i} className="flex items-center gap-1.5 text-teal-100">
                <FiAlertTriangle className="text-rose-400 text-[10px] flex-shrink-0" />{w}
              </div>
            ))}
          </div>
          <div className="w-2.5 h-2.5 bg-teal-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
        </div>
      </div>
    );
  };

  const SortArrow = ({ col }) => sortConfig.key === col
    ? <span className="text-teal-400 ml-0.5">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
    : null;

  const thCls = "px-3 py-3 text-left text-[11px] font-bold text-teal-500 uppercase tracking-widest whitespace-nowrap";
  const tdCls = "px-3 py-3 text-sm text-teal-800";

  // Summary card configs
  const summaryCards = [
    { label:'Present',      value: presentRecords.length, color:'text-teal-500',   bg:'bg-teal-50  border-teal-100',  icon:<FiCheckCircle className="text-teal-400" /> },
    { label:'Absent',       value: absentRecords.length,  color:'text-rose-500',   bg:'bg-rose-50  border-rose-100',  icon:<FiXCircle     className="text-rose-400" /> },
    { label:'Total Hours',  value: `${totalHours}h`,      color:'text-teal-600',   bg:'bg-teal-50  border-teal-100',  icon:<FiClock       className="text-teal-400" /> },
    { label:'Avg Efficiency',value:`${avgEfficiency}%`,   color:'text-cyan-500',   bg:'bg-cyan-50  border-cyan-100',  icon:<FiBarChart2   className="text-cyan-400" /> },
    { label:'With Warnings',value: warnRecords.length,    color:'text-amber-500',  bg:'bg-amber-50 border-amber-100', icon:<FiAlertTriangle className="text-amber-400" /> },
  ];

  return (
    <div className="min-h-screen bg-teal-50/40 p-3 sm:p-5">
      <div className="max-w-full mx-auto">

        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-teal-800">Attendance History</h1>
          <p className="text-teal-400 text-sm mt-0.5">Track your attendance records and warnings</p>
        </div>

        {/* ── Summary Cards ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
          {summaryCards.map((c,i) => (
            <div key={i} className={`bg-white border ${c.bg.split(' ')[1]} rounded-2xl shadow-sm p-3 sm:p-4 flex items-center gap-3`}>
              <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0 text-base`}>
                {c.icon}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-teal-400 uppercase tracking-wide">{c.label}</p>
                <p className={`text-lg font-bold ${c.color} leading-tight`}>{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters ─────────────────────────────────────────────────────────── */}
        <div className="bg-white border border-teal-100 rounded-2xl shadow-sm p-3 sm:p-4 mb-5">
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-300 text-sm" />
              <input
                type="text"
                placeholder="Search by date, location or warnings…"
                className="w-full pl-9 pr-3 py-2 bg-teal-50/50 border border-teal-200 rounded-xl text-sm text-teal-700 placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                className="bg-teal-50 border border-teal-200 text-teal-600 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="half-day">Half Day</option>
              </select>

              <select
                className="bg-teal-50 border border-teal-200 text-teal-600 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="this-week">This Week</option>
                <option value="last-week">Last Week</option>
                <option value="this-month">This Month</option>
              </select>

              <button className="flex items-center gap-1.5 bg-teal-400 hover:bg-teal-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm">
                <FiDownload className="text-sm" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Table ───────────────────────────────────────────────────────────── */}
        <div className="bg-white border border-teal-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-teal-50/80 border-b border-teal-100">
                <tr>
                  <th className={`${thCls} cursor-pointer hover:text-teal-700`} onClick={() => handleSort('date')}>
                    Date <SortArrow col="date" />
                  </th>
                  <th className={thCls}>Day</th>
                  <th className={thCls}>In / Out</th>
                  <th className={thCls}>Hours</th>
                  <th className={thCls}>Breaks</th>
                  <th className={`${thCls} cursor-pointer hover:text-teal-700`} onClick={() => handleSort('effectiveHours')}>
                    Effective <SortArrow col="effectiveHours" />
                  </th>
                  <th className={thCls}>Efficiency</th>
                  <th className={thCls}>Location</th>
                  <th className={thCls}>Status</th>
                  <th className={thCls}>Warnings</th>
                  <th className={thCls}>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-50">
                {currentRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-teal-50/40 transition-colors">

                    {/* Date */}
                    <td className={tdCls}>
                      <span className="font-semibold">{rec.date}</span>
                    </td>

                    {/* Day */}
                    <td className={tdCls}>
                      <span className="font-medium text-teal-500">{rec.day}</span>
                    </td>

                    {/* In / Out */}
                    <td className={tdCls}>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <FiCheckCircle className="text-teal-400 text-xs flex-shrink-0" />
                          <span className="text-xs">{rec.punchIn}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiXCircle className="text-rose-400 text-xs flex-shrink-0" />
                          <span className="text-xs">{rec.punchOut}</span>
                        </div>
                      </div>
                    </td>

                    {/* Hours */}
                    <td className={tdCls}>
                      <span className="font-semibold">{rec.totalHours}h</span>
                      <br />
                      <span className="text-[11px] text-teal-400">{rec.breakTime}</span>
                    </td>

                    {/* Breaks */}
                    <td className={tdCls}>
                      <BreakIcons breaks={rec.breaks} />
                    </td>

                    {/* Effective */}
                    <td className={tdCls}>
                      <span className="font-bold text-teal-500">{rec.effectiveHours}h</span>
                    </td>

                    {/* Efficiency bar */}
                    <td className={tdCls}>
                      <div className="flex items-center gap-2 min-w-[70px]">
                        <div className="flex-1 bg-teal-100 rounded-full h-1.5">
                          <div
                            className="bg-teal-400 h-1.5 rounded-full"
                            style={{ width: `${rec.efficiency}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-teal-600 whitespace-nowrap">{rec.efficiency}%</span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className={tdCls}>
                      {rec.location !== '--' ? (
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold border ${locationCls(rec.location)}`}>
                          {rec.location}
                        </span>
                      ) : (
                        <span className="text-teal-200">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className={tdCls}>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusCls(rec.status)}`}>
                        {statusIcon(rec.status)}
                        <span className="capitalize">{rec.status.replace('-', ' ')}</span>
                      </span>
                    </td>

                    {/* Warnings */}
                    <td className={tdCls}>
                      <WarningBadge warnings={rec.warnings} />
                    </td>

                    {/* Action */}
                    <td className={tdCls}>
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-teal-50 border border-teal-200 text-teal-400 hover:bg-teal-100 hover:text-teal-600 transition-all">
                        <FiEye className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty state */}
            {currentRecords.length === 0 && (
              <div className="text-center py-14">
                <FiCalendar className="text-4xl text-teal-200 mx-auto mb-3" />
                <p className="text-teal-500 text-sm font-medium">No records found</p>
                <p className="text-teal-300 text-xs mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* ── Pagination ────────────────────────────────────────────────────── */}
          {filteredData.length > 0 && (
            <div className="px-4 py-3 border-t border-teal-100 bg-teal-50/40 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-xs text-teal-400">
                Showing <span className="font-semibold text-teal-600">{indexOfFirst + 1}–{Math.min(indexOfLast, filteredData.length)}</span> of <span className="font-semibold text-teal-600">{filteredData.length}</span> records
              </p>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p-1, 1))}
                  disabled={currentPage === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-teal-200 bg-white text-teal-400 hover:bg-teal-50 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <FiChevronLeft className="text-sm" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let p;
                  if (totalPages <= 5)              p = i + 1;
                  else if (currentPage <= 3)        p = i + 1;
                  else if (currentPage >= totalPages - 2) p = totalPages - 4 + i;
                  else                              p = currentPage - 2 + i;
                  return (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition-all ${
                        currentPage === p
                          ? 'bg-teal-400 text-white border border-teal-400'
                          : 'bg-white border border-teal-200 text-teal-500 hover:bg-teal-50'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(p+1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-teal-200 bg-white text-teal-400 hover:bg-teal-50 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <FiChevronRight className="text-sm" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;