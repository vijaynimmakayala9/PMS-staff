import React, { useState, useEffect, useRef } from 'react';
import {
  FiClock,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiDownload,
  FiBarChart2,
  FiCoffee,
  FiSun,
  FiZap,
} from 'react-icons/fi';

const StaffPunchInOut = () => {
  const [currentTime, setCurrentTime]   = useState(new Date());
  const [punchStatus, setPunchStatus]   = useState('out');
  const [todayRecords, setTodayRecords] = useState([]);
  const [location, setLocation]         = useState('Office');
  const [isLoading, setIsLoading]       = useState(false);
  const [showIdlePopup, setShowIdlePopup] = useState(false);
  const [idleTime, setIdleTime]         = useState(0);
  const [workStats, setWorkStats]       = useState({
    totalHours: 0, effectiveHours: 0,
    idleTime: 0, teaBreakCount: 0, lunchBreakCount: 0,
  });

  const idleTimerRef        = useRef(null);
  const activityTimerRef    = useRef(null);
  const punchInTimeRef      = useRef(null);
  const idleTimeRef         = useRef(0);
  const lastActivityTimeRef = useRef(Date.now());

  /* ── Clock + work-time tick ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (punchStatus === 'in' && punchInTimeRef.current) {
        const totalMs     = Date.now() - punchInTimeRef.current;
        const effectiveMs = totalMs - idleTimeRef.current;
        setWorkStats(p => ({
          ...p,
          totalHours:     (totalMs     / 3_600_000).toFixed(2),
          effectiveHours: (effectiveMs / 3_600_000).toFixed(2),
          idleTime:       (idleTimeRef.current / 60_000).toFixed(0),
        }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [punchStatus]);

  /* ── Idle detection ── */
  useEffect(() => {
    const handleActivity = () => {
      lastActivityTimeRef.current = Date.now();
      setShowIdlePopup(false);
      setIdleTime(0);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setShowIdlePopup(true);
        startIdleTimer();
      }, 60_000);
    };
    ['mousemove','keypress','click','scroll'].forEach(e => window.addEventListener(e, handleActivity));
    handleActivity();
    return () => {
      ['mousemove','keypress','click','scroll'].forEach(e => window.removeEventListener(e, handleActivity));
      if (idleTimerRef.current)     clearTimeout(idleTimerRef.current);
      if (activityTimerRef.current) clearInterval(activityTimerRef.current);
    };
  }, []);

  const startIdleTimer = () => {
    if (activityTimerRef.current) clearInterval(activityTimerRef.current);
    activityTimerRef.current = setInterval(() => {
      const s = Math.floor((Date.now() - lastActivityTimeRef.current) / 1000) - 60;
      if (s > 0) { setIdleTime(s); idleTimeRef.current += 1000; }
    }, 1000);
  };

  /* ── Mock records ── */
  useEffect(() => {
    setTodayRecords([
      { id: 1, type: 'in',          time: '09:00 AM', location: 'Office',    status: 'completed' },
      { id: 2, type: 'tea_break',   time: '11:00 AM', location: 'Pantry',    status: 'completed', duration: '15 mins' },
      { id: 3, type: 'lunch_break', time: '01:00 PM', location: 'Cafeteria', status: 'completed', duration: '45 mins' },
      { id: 4, type: 'tea_break',   time: '04:00 PM', location: 'Pantry',    status: 'completed', duration: '10 mins' },
    ]);
  }, []);

  /* ── Actions ── */
  const withLoading = (fn) => { setIsLoading(true); setTimeout(() => { fn(); setIsLoading(false); }, 900); };

  const handlePunchIn = () => withLoading(() => {
    const now = new Date();
    setTodayRecords(p => [{ id: p.length+1, type:'in', time: fmtTime(now), location, status:'completed' }, ...p]);
    setPunchStatus('in');
    punchInTimeRef.current = now.getTime();
    idleTimeRef.current    = 0;
  });

  const handlePunchOut = () => withLoading(() => {
    const now = new Date();
    if (punchInTimeRef.current) {
      const totalMs = now.getTime() - punchInTimeRef.current;
      setWorkStats(p => ({
        ...p,
        totalHours:     (totalMs / 3_600_000).toFixed(2),
        effectiveHours: ((totalMs - idleTimeRef.current) / 3_600_000).toFixed(2),
        idleTime:       (idleTimeRef.current / 60_000).toFixed(0),
      }));
    }
    setTodayRecords(p => [{ id: p.length+1, type:'out', time: fmtTime(now), location, status:'completed' }, ...p]);
    setPunchStatus('out');
    punchInTimeRef.current = null;
  });

  const handleBreak = (breakType) => withLoading(() => {
    const now = new Date();
    setTodayRecords(p => [{ id: p.length+1, type: breakType, time: fmtTime(now), location, status:'completed' }, ...p]);
    setWorkStats(p => ({
      ...p,
      teaBreakCount:   breakType === 'tea_break'   ? p.teaBreakCount   + 1 : p.teaBreakCount,
      lunchBreakCount: breakType === 'lunch_break' ? p.lunchBreakCount + 1 : p.lunchBreakCount,
    }));
  });

  const fmtTime = (d) => d.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
  const fmtSecs = (s) => { const m = Math.floor(s/60); return `${m}m ${s%60}s`; };

  /* ── Record helpers ── */
  const recordIcon = (type) => ({
    in:           <FiCheckCircle className="text-teal-500 text-lg flex-shrink-0" />,
    out:          <FiCheckCircle className="text-rose-400  text-lg flex-shrink-0" />,
    tea_break:    <FiCoffee      className="text-amber-400 text-lg flex-shrink-0" />,
    lunch_break:  <FiSun        className="text-orange-400 text-lg flex-shrink-0" />,
  }[type] || <FiClock className="text-teal-300 text-lg flex-shrink-0" />);

  const recordLabel = (type) => ({
    in:           'Punched In — Work Started',
    out:          'Punched Out — Work Ended',
    tea_break:    'Tea Break',
    lunch_break:  'Lunch Break',
  }[type] || 'Unknown');

  const efficiency = workStats.totalHours > 0
    ? Math.round((workStats.effectiveHours / workStats.totalHours) * 100) : 0;

  /* ── Stat tiles ── */
  const statTiles = [
    { icon: <FiClock className="text-teal-500 text-xl" />,   label:'Total Hours',     val: `${workStats.totalHours}h`,     bg:'bg-teal-50  border-teal-100'  },
    { icon: <FiUser  className="text-emerald-500 text-xl" />, label:'Effective Hours',  val: `${workStats.effectiveHours}h`, bg:'bg-emerald-50 border-emerald-100' },
    { icon: <FiAlertCircle className="text-rose-400 text-xl" />, label:'Idle Time',    val: `${workStats.idleTime}m`,       bg:'bg-rose-50  border-rose-100'  },
    { icon: <FiCoffee className="text-amber-400 text-xl" />,  label:'Tea Breaks',      val: workStats.teaBreakCount,        bg:'bg-amber-50 border-amber-100' },
    { icon: <FiSun    className="text-orange-400 text-xl" />, label:'Lunch Breaks',    val: workStats.lunchBreakCount,      bg:'bg-orange-50 border-orange-100'},
    { icon: <FiZap    className="text-teal-500 text-xl" />,   label:'Efficiency',      val: `${efficiency}%`,               bg:'bg-teal-50  border-teal-100'  },
  ];

  return (
    <div className="min-h-screen bg-teal-50/40 p-3 sm:p-5 lg:p-6">

      {/* ── Idle Popup ──────────────────────────────────────────────────────── */}
      {showIdlePopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-teal-100 rounded-2xl shadow-xl p-6 sm:p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiAlertCircle className="text-amber-400 text-3xl" />
            </div>
            <h3 className="text-lg font-bold text-teal-800 mb-1">Hey there! 👋</h3>
            <p className="text-teal-500 text-sm mb-1">You seem to be away from your desk</p>
            <p className="text-teal-400 text-xs mb-3">Idle for: {fmtSecs(idleTime)}</p>
            <p className="text-sm font-semibold text-teal-600 mb-5">Time to get back to work! 🚀</p>
            <button
              onClick={() => { setShowIdlePopup(false); setIdleTime(0); lastActivityTimeRef.current = Date.now(); }}
              className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all"
            >
              I'm Back! Let's Work 💪
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">

        {/* ── Page Header ─────────────────────────────────────────────────────── */}
        <div className="mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-teal-800">Smart Attendance System</h1>
          <p className="text-teal-400 text-sm mt-0.5">Track your work hours with intelligent idle detection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* ══ LEFT COLUMN ══════════════════════════════════════════════════════ */}
          <div className="space-y-5">

            {/* Current Status Card */}
            <div className="bg-white border border-teal-100 rounded-2xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold text-teal-800">Current Status</h2>
                <span className={`px-3 py-1 rounded-full border text-xs font-bold ${
                  punchStatus === 'in'
                    ? 'bg-teal-50 text-teal-600 border-teal-200'
                    : 'bg-rose-50 text-rose-500 border-rose-200'
                }`}>
                  {punchStatus === 'in' ? '● Working' : '○ Not Working'}
                </span>
              </div>

              {/* Clock */}
              <div className="text-center mb-5">
                <div className="text-4xl sm:text-5xl font-bold text-teal-800 tabular-nums leading-none mb-1.5">
                  {currentTime.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', second:'2-digit' })}
                </div>
                <p className="text-teal-400 text-sm">
                  {currentTime.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
                </p>
              </div>

              {/* Location selector */}
              <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-4 py-2.5 mb-5">
                <FiMapPin className="text-teal-400 flex-shrink-0" />
                <span className="text-teal-500 text-sm font-medium">Location:</span>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent text-teal-700 font-semibold text-sm focus:outline-none cursor-pointer"
                >
                  <option value="Office">Office</option>
                  <option value="Work From Home">Work From Home</option>
                  <option value="Client Site">Client Site</option>
                </select>
              </div>

              {/* Punch buttons */}
              {punchStatus === 'out' ? (
                <button
                  onClick={handlePunchIn}
                  disabled={isLoading}
                  className="w-full bg-teal-400 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-sm"
                >
                  {isLoading
                    ? <div className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    : <FiClock className="text-base" />}
                  <span>START WORKING 🚀</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleBreak('tea_break')}
                    disabled={isLoading}
                    className="bg-amber-50 border border-amber-200 hover:bg-amber-100 disabled:opacity-50 text-amber-600 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? <div className="w-4 h-4 rounded-full border-2 border-amber-300 border-t-amber-500 animate-spin" /> : <FiCoffee />}
                    <span>Tea Break</span>
                  </button>

                  <button
                    onClick={() => handleBreak('lunch_break')}
                    disabled={isLoading}
                    className="bg-orange-50 border border-orange-200 hover:bg-orange-100 disabled:opacity-50 text-orange-500 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? <div className="w-4 h-4 rounded-full border-2 border-orange-300 border-t-orange-500 animate-spin" /> : <FiSun />}
                    <span>Lunch Break</span>
                  </button>

                  <button
                    onClick={handlePunchOut}
                    disabled={isLoading}
                    className="col-span-2 bg-rose-50 border border-rose-200 hover:bg-rose-100 disabled:opacity-50 text-rose-500 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? <div className="w-4 h-4 rounded-full border-2 border-rose-300 border-t-rose-500 animate-spin" /> : <FiCheckCircle />}
                    <span>END WORK DAY</span>
                  </button>
                </div>
              )}
            </div>

            {/* Work Analytics */}
            <div className="bg-white border border-teal-100 rounded-2xl shadow-sm p-4 sm:p-6">
              <h3 className="text-sm font-bold text-teal-800 flex items-center gap-2 mb-5">
                <span className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-500">
                  <FiBarChart2 className="text-sm" />
                </span>
                Work Analytics
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {statTiles.map((t, i) => (
                  <div key={i} className={`flex flex-col items-center text-center p-3 border rounded-xl ${t.bg}`}>
                    {t.icon}
                    <p className="text-[10px] text-teal-400 font-medium mt-1.5">{t.label}</p>
                    <p className="font-bold text-teal-800 text-base leading-tight">{t.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ RIGHT COLUMN ═════════════════════════════════════════════════════ */}
          <div className="space-y-5">

            {/* Timeline */}
            <div className="bg-white border border-teal-100 rounded-2xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-teal-800 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-500">
                    <FiCalendar className="text-sm" />
                  </span>
                  Today's Timeline
                </h3>
                <button className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-400 hover:bg-teal-100 hover:text-teal-600 transition-all">
                  <FiDownload className="text-sm" />
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {todayRecords.length > 0 ? todayRecords.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-start gap-3 p-3 bg-teal-50/60 border border-teal-100 rounded-xl hover:bg-teal-50 transition-all"
                  >
                    {recordIcon(rec.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-teal-800 truncate">{recordLabel(rec.type)}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[11px] text-teal-400">
                        <span>🕒 {rec.time}</span>
                        <span>📍 {rec.location}</span>
                        {rec.duration && <span>⏱ {rec.duration}</span>}
                      </div>
                    </div>
                    <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      rec.status === 'completed' ? 'bg-teal-400' : 'bg-amber-400'
                    }`} />
                  </div>
                )) : (
                  <div className="text-center py-10">
                    <FiClock className="text-4xl text-teal-200 mx-auto mb-3" />
                    <p className="text-sm text-teal-400 font-medium">No activity recorded today</p>
                    <p className="text-xs text-teal-300 mt-1">Start working to see your timeline</p>
                  </div>
                )}
              </div>

              {/* Daily Summary */}
              <div className="mt-5 pt-5 border-t border-teal-100">
                <h4 className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">Daily Summary</h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
                  {[
                    { label:'Work Started',  val: todayRecords.find(r => r.type==='in')?.time || '--:--', color:'' },
                    { label:'Total Breaks',  val: workStats.teaBreakCount + workStats.lunchBreakCount,    color:'' },
                    { label:'Productivity',  val: `${efficiency}%`,  color:'text-teal-500' },
                    { label:'Idle Time',     val: `${workStats.idleTime} mins`, color:'text-rose-400' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                      <span className="text-teal-400">{row.label}</span>
                      <span className={`font-semibold text-teal-700 ${row.color}`}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-teal-100 rounded-2xl shadow-sm p-4 sm:p-6">
              <h3 className="text-sm font-bold text-teal-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <FiBarChart2 />, label:'Weekly Report',      bg:'bg-teal-50  border-teal-100  text-teal-600  hover:bg-teal-100'  },
                  { icon: <FiDownload  />, label:'Export Data',         bg:'bg-cyan-50  border-cyan-100  text-cyan-600  hover:bg-cyan-100'  },
                  { icon: <FiUser      />, label:'My Performance',      bg:'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100' },
                  { icon: <FiCalendar  />, label:'Attendance History',  bg:'bg-teal-50  border-teal-100  text-teal-600  hover:bg-teal-100'  },
                ].map((a, i) => (
                  <button
                    key={i}
                    className={`flex items-center justify-center gap-2 py-3 px-3 border rounded-xl text-xs font-semibold transition-all ${a.bg}`}
                  >
                    <span className="text-base">{a.icon}</span>
                    <span>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPunchInOut;