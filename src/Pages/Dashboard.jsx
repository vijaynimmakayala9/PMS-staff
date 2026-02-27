import { useState, useEffect } from "react";
import {
  FiUser,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
  FiTrendingUp,
  FiCalendar,
  FiStar,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiMail,
  FiPhone,
  FiAward,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const StaffPersonalDashboard = () => {
  const [attendanceFilter, setAttendanceFilter] = useState("weekly");
  const [performanceFilter, setPerformanceFilter] = useState("weekly");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData = {
      personalInfo: {
        id: 1,
        name: "Raj Sharma",
        employeeId: "EMP001",
        department: "Sales",
        position: "Senior Executive",
        joinDate: "2022-01-15",
        contact: {
          email: "raj.sharma@company.com",
          phone: "+91-9876543210",
        },
        manager: "Priya Patel",
      },
      attendance: {
        presentThisMonth: 22,
        absentThisMonth: 1,
        attendancePercentage: "95%",
      },
      tasks: {
        assigned: 15,
        completed: 12,
        pending: 3,
        completionRate: "80%",
        recentTasks: [
          { id: 1, title: "Client Meeting Prep", status: "completed", dueDate: "2024-01-10" },
          { id: 2, title: "Sales Report", status: "completed", dueDate: "2024-01-12" },
          { id: 3, title: "Budget Planning", status: "in-progress", dueDate: "2024-01-20" },
        ],
      },
      performance: {
        efficiency: 92,
        rating: 4.5,
        rank: "Top 10%",
      },
      salary: {
        netSalary: 67000,
        lastSalaryDate: "2024-01-01",
      },
      leaveBalance: {
        total: 35,
        taken: 5,
      },
      charts: {
        attendanceData: {
          weekly: [
            { day: "Mon", hours: 8.5 },
            { day: "Tue", hours: 9.0 },
            { day: "Wed", hours: 8.0 },
            { day: "Thu", hours: 7.5 },
            { day: "Fri", hours: 8.5 },
          ],
        },
        performanceData: {
          weekly: [
            { day: "Mon", efficiency: 88 },
            { day: "Tue", efficiency: 92 },
            { day: "Wed", efficiency: 85 },
            { day: "Thu", efficiency: 90 },
            { day: "Fri", efficiency: 95 },
          ],
        },
      },
    };

    setTimeout(() => {
      setDashboardData(mockData);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-teal-400 mx-auto" />
          <p className="mt-3 text-teal-500 text-sm font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const { personalInfo, attendance, tasks, performance, salary, leaveBalance, charts } = dashboardData;
  const initials = personalInfo.name.split(" ").map((n) => n[0]).join("");

  // ── Stat cards ──────────────────────────────────────────────────────────────
  const stats = [
    {
      label: "Attendance",
      value: attendance.attendancePercentage,
      sub: `${attendance.presentThisMonth} days present`,
      icon: <FiClock className="text-teal-500 text-xl" />,
      bg: "bg-teal-50",
      border: "border-teal-200",
    },
    {
      label: "Tasks Done",
      value: `${tasks.completed}/${tasks.assigned}`,
      sub: `${tasks.pending} pending`,
      icon: <FiCheckCircle className="text-emerald-500 text-xl" />,
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      label: "Performance",
      value: `${performance.efficiency}%`,
      sub: performance.rank,
      icon: <FiTrendingUp className="text-cyan-500 text-xl" />,
      bg: "bg-cyan-50",
      border: "border-cyan-200",
    },
    {
      label: "Net Salary",
      value: `₹${salary.netSalary.toLocaleString()}`,
      sub: `Paid ${salary.lastSalaryDate}`,
      icon: <FiDollarSign className="text-teal-600 text-xl" />,
      bg: "bg-teal-50",
      border: "border-teal-200",
    },
  ];

  // ── Quick actions ────────────────────────────────────────────────────────────
  const actions = [
    { label: "Punch", icon: <FiClock className="text-teal-500 text-lg" />, bg: "hover:bg-teal-100" },
    { label: "Leave", icon: <FiCalendar className="text-emerald-500 text-lg" />, bg: "hover:bg-emerald-100" },
    { label: "Report", icon: <FiBarChart2 className="text-cyan-500 text-lg" />, bg: "hover:bg-cyan-100" },
    { label: "Salary", icon: <FiDollarSign className="text-teal-600 text-lg" />, bg: "hover:bg-teal-100" },
  ];

  // ── Custom chart tooltip ─────────────────────────────────────────────────────
  const ChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-teal-200 rounded-lg px-3 py-2 shadow-md text-xs text-teal-700">
          <p className="font-semibold mb-0.5">{label}</p>
          <p>{payload[0].name}: <span className="font-bold text-teal-500">{payload[0].value}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-teal-50/40 min-h-screen p-3 sm:p-5">

      {/* ── Page Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-teal-800">
            Welcome back, <span className="text-teal-500">{personalInfo.name.split(" ")[0]}</span>!
          </h1>
          <p className="text-teal-400 text-xs sm:text-sm mt-0.5">Your performance overview for today</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-teal-200 text-teal-400 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-400 transition-all">
            <FiSettings className="text-base" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-teal-200 text-teal-400 hover:bg-red-50 hover:text-red-400 hover:border-red-200 transition-all">
            <FiLogOut className="text-base" />
          </button>
        </div>
      </div>

      {/* ── Profile Card ──────────────────────────────────────────────────────── */}
      <div className="bg-white border border-teal-100 rounded-2xl shadow-sm p-4 sm:p-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
              {initials}
            </div>
            <div className="sm:hidden">
              <h2 className="font-bold text-teal-800 text-base">{personalInfo.name}</h2>
              <p className="text-teal-500 text-sm">{personalInfo.position}</p>
              <span className="inline-block mt-1 bg-teal-50 text-teal-500 border border-teal-200 rounded-full text-[10px] font-semibold px-2 py-0.5">
                {personalInfo.employeeId}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="hidden sm:block mb-1">
              <h2 className="font-bold text-teal-800 text-base">{personalInfo.name}</h2>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <p className="text-teal-500 text-sm">{personalInfo.position}</p>
                <span className="w-1 h-1 rounded-full bg-teal-200" />
                <span className="bg-teal-50 text-teal-500 border border-teal-200 rounded-full text-[10px] font-semibold px-2 py-0.5">
                  {personalInfo.employeeId}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 sm:mt-3">
              <div className="bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">
                <p className="text-[10px] text-teal-400 font-medium uppercase tracking-wide">Department</p>
                <p className="text-sm font-semibold text-teal-700 mt-0.5">{personalInfo.department}</p>
              </div>
              <div className="bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">
                <p className="text-[10px] text-teal-400 font-medium uppercase tracking-wide">Manager</p>
                <p className="text-sm font-semibold text-teal-700 mt-0.5">{personalInfo.manager}</p>
              </div>
              <div className="bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">
                <p className="text-[10px] text-teal-400 font-medium uppercase tracking-wide">Joined</p>
                <p className="text-sm font-semibold text-teal-700 mt-0.5">{personalInfo.joinDate}</p>
              </div>
              <div className="bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">
                <p className="text-[10px] text-teal-400 font-medium uppercase tracking-wide">Rating</p>
                <p className="text-sm font-semibold text-teal-700 mt-0.5 flex items-center gap-1">
                  {performance.rating}/5 <FiStar className="text-teal-400 text-xs" />
                </p>
              </div>
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-teal-500">
                <FiMail className="flex-shrink-0" />
                <span className="truncate max-w-[180px]">{personalInfo.contact.email}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-teal-500">
                <FiPhone className="flex-shrink-0" />
                <span>{personalInfo.contact.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`bg-white border ${s.border} rounded-2xl shadow-sm p-3 sm:p-4 flex items-center gap-3`}
          >
            <div className={`w-10 h-10 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center flex-shrink-0`}>
              {s.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-teal-400 font-medium">{s.label}</p>
              <p className="text-base sm:text-lg font-bold text-teal-800 leading-tight">{s.value}</p>
              <p className="text-[10px] text-teal-400 truncate">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts ────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Work Hours Chart */}
        <div className="bg-white border border-teal-100 rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-teal-800">Work Hours</h3>
              <p className="text-[11px] text-teal-400 mt-0.5">Hours logged per day</p>
            </div>
            <select
              className="text-xs border border-teal-200 bg-teal-50 text-teal-600 rounded-lg px-2 py-1.5 focus:outline-none focus:border-teal-400"
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
            >
              <option value="weekly">This Week</option>
            </select>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.attendanceData[attendanceFilter]} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0faf8" />
                <XAxis dataKey="day" fontSize={11} tick={{ fill: "#5eada8" }} axisLine={false} tickLine={false} />
                <YAxis fontSize={11} tick={{ fill: "#5eada8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(6,202,188,0.06)" }} />
                <Bar dataKey="hours" name="Hours" fill="#06cabc" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white border border-teal-100 rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-teal-800">Performance</h3>
              <p className="text-[11px] text-teal-400 mt-0.5">Efficiency % per day</p>
            </div>
            <select
              className="text-xs border border-teal-200 bg-teal-50 text-teal-600 rounded-lg px-2 py-1.5 focus:outline-none focus:border-teal-400"
              value={performanceFilter}
              onChange={(e) => setPerformanceFilter(e.target.value)}
            >
              <option value="weekly">This Week</option>
            </select>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.performanceData[performanceFilter]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0faf8" />
                <XAxis dataKey="day" fontSize={11} tick={{ fill: "#5eada8" }} axisLine={false} tickLine={false} />
                <YAxis fontSize={11} tick={{ fill: "#5eada8" }} axisLine={false} tickLine={false} domain={[80, 100]} />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#06cabc"
                  strokeWidth={2.5}
                  name="Efficiency %"
                  dot={{ fill: "#06cabc", strokeWidth: 2, r: 4, stroke: "#ffffff" }}
                  activeDot={{ r: 6, fill: "#06cabc" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Tasks + Quick Info ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

        {/* Recent Tasks */}
        <div className="bg-white border border-teal-100 rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-teal-800">Recent Tasks</h3>
            <span className="text-[11px] bg-teal-50 text-teal-500 border border-teal-200 rounded-full px-2 py-0.5 font-semibold">
              {tasks.completed}/{tasks.assigned} done
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-teal-50 rounded-full h-1.5 mb-4">
            <div
              className="bg-teal-400 h-1.5 rounded-full transition-all"
              style={{ width: tasks.completionRate }}
            />
          </div>

          <div className="space-y-0.5">
            {tasks.recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-2.5 border-b border-teal-50 last:border-b-0"
              >
                <div className="flex-1 min-w-0 pr-3">
                  <p className="text-sm font-medium text-teal-800 truncate">{task.title}</p>
                  <p className="text-[11px] text-teal-400 mt-0.5">Due: {task.dueDate}</p>
                </div>
                <span
                  className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    task.status === "completed"
                      ? "bg-teal-100 text-teal-600 border border-teal-200"
                      : task.status === "in-progress"
                      ? "bg-cyan-100 text-cyan-600 border border-cyan-200"
                      : "bg-amber-100 text-amber-600 border border-amber-200"
                  }`}
                >
                  {task.status.replace("-", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="bg-white border border-teal-100 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-teal-800">Quick Info</h3>

          {[
            {
              label: "Leave Balance",
              value: `${leaveBalance.total - leaveBalance.taken} days left`,
              sub: `${leaveBalance.taken} taken`,
              icon: <FiCalendar className="text-teal-400" />,
            },
            {
              label: "Performance Rating",
              value: `${performance.rating} / 5.0`,
              sub: performance.rank,
              icon: <FiStar className="text-teal-400" />,
            },
            {
              label: "Last Salary",
              value: `₹${salary.netSalary.toLocaleString()}`,
              sub: `on ${salary.lastSalaryDate}`,
              icon: <FiDollarSign className="text-teal-400" />,
            },
            {
              label: "Attendance Rate",
              value: attendance.attendancePercentage,
              sub: `${attendance.absentThisMonth} absent this month`,
              icon: <FiAward className="text-teal-400" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-teal-200 flex items-center justify-center flex-shrink-0 text-base">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-teal-400 font-medium">{item.label}</p>
                <p className="text-sm font-bold text-teal-700 leading-tight">{item.value}</p>
              </div>
              <span className="text-[10px] text-teal-400 flex-shrink-0 hidden sm:block">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Actions ─────────────────────────────────────────────────────── */}
      <div className="bg-white border border-teal-100 rounded-2xl shadow-sm p-4">
        <h3 className="text-sm font-bold text-teal-800 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {actions.map((a, i) => (
            <button
              key={i}
              className={`flex flex-col items-center justify-center gap-1.5 py-3 sm:py-4 bg-teal-50 border border-teal-100 rounded-xl ${a.bg} hover:border-teal-300 transition-all duration-150`}
            >
              {a.icon}
              <span className="text-[11px] sm:text-xs font-medium text-teal-600">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default StaffPersonalDashboard;