import { useState, useEffect } from "react";
import {
  FiUser,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
  FiTrendingUp,
  FiCalendar,
  FiStar,
  FiTarget,
  FiBarChart2,
  FiActivity,
  FiAward,
  FiSettings,
  FiLogOut,
  FiMail,
  FiPhone,
  FiMapPin
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
  ResponsiveContainer
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
        ]
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
        taken: 5
      },
      charts: {
        attendanceData: {
          weekly: [
            { day: "Mon", hours: 8.5 },
            { day: "Tue", hours: 9.0 },
            { day: "Wed", hours: 8.0 },
            { day: "Thu", hours: 7.5 },
            { day: "Fri", hours: 8.5 },
          ]
        },
        performanceData: {
          weekly: [
            { day: "Mon", efficiency: 88 },
            { day: "Tue", efficiency: 92 },
            { day: "Wed", efficiency: 85 },
            { day: "Thu", efficiency: 90 },
            { day: "Fri", efficiency: 95 },
          ]
        }
      }
    };

    setDashboardData(mockData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Welcome, {dashboardData.personalInfo.name}!</h1>
            <p className="text-gray-600 text-sm">Your performance overview</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-600 hover:bg-white rounded transition-colors">
              <FiSettings className="text-lg" />
            </button>
            <button className="p-1 text-gray-600 hover:bg-white rounded transition-colors">
              <FiLogOut className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {dashboardData.personalInfo.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-gray-800">{dashboardData.personalInfo.name}</h2>
            <p className="text-gray-600 text-sm">{dashboardData.personalInfo.position}</p>
            <p className="text-gray-500 text-xs">ID: {dashboardData.personalInfo.employeeId}</p>
          </div>
          <div className="text-right text-xs text-gray-600">
            <p>{dashboardData.personalInfo.department}</p>
            <p>Manager: {dashboardData.personalInfo.manager}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs">Attendance</p>
              <p className="font-bold text-gray-800">{dashboardData.attendance.attendancePercentage}</p>
            </div>
            <FiClock className="text-blue-500 text-lg" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs">Tasks Done</p>
              <p className="font-bold text-gray-800">{dashboardData.tasks.completed}/{dashboardData.tasks.assigned}</p>
            </div>
            <FiCheckCircle className="text-green-500 text-lg" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs">Performance</p>
              <p className="font-bold text-gray-800">{dashboardData.performance.efficiency}%</p>
            </div>
            <FiTrendingUp className="text-purple-500 text-lg" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs">Salary</p>
              <p className="font-bold text-gray-800">₹{dashboardData.salary.netSalary.toLocaleString()}</p>
            </div>
            <FiDollarSign className="text-orange-500 text-lg" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        {/* Work Hours */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">Work Hours</h3>
            <select 
              className="border border-gray-300 rounded text-xs px-2 py-1"
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
            >
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.charts.attendanceData[attendanceFilter]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar 
                  dataKey="hours" 
                  name="Hours"
                  fill="#3b82f6"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">Performance</h3>
            <select 
              className="border border-gray-300 rounded text-xs px-2 py-1"
              value={performanceFilter}
              onChange={(e) => setPerformanceFilter(e.target.value)}
            >
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.charts.performanceData[performanceFilter]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="Efficiency %"
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tasks and Details */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        {/* Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Recent Tasks</h3>
          <div className="space-y-2">
            {dashboardData.tasks.recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                  <p className="text-gray-500 text-xs">Due: {task.dueDate}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Quick Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Leave Balance</span>
              <span className="font-medium text-sm">{dashboardData.leaveBalance.total} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Rating</span>
              <span className="font-medium text-sm">{dashboardData.performance.rating}/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Last Salary</span>
              <span className="font-medium text-sm">{dashboardData.salary.lastSalaryDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-3">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-2">
          <button className="flex flex-col items-center p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
            <FiClock className="text-blue-600 text-sm mb-1" />
            <span className="text-xs text-gray-700">Punch</span>
          </button>
          <button className="flex flex-col items-center p-2 bg-green-50 rounded hover:bg-green-100 transition-colors">
            <FiCalendar className="text-green-600 text-sm mb-1" />
            <span className="text-xs text-gray-700">Leave</span>
          </button>
          <button className="flex flex-col items-center p-2 bg-purple-50 rounded hover:bg-purple-100 transition-colors">
            <FiBarChart2 className="text-purple-600 text-sm mb-1" />
            <span className="text-xs text-gray-700">Report</span>
          </button>
          <button className="flex flex-col items-center p-2 bg-orange-50 rounded hover:bg-orange-100 transition-colors">
            <FiDollarSign className="text-orange-600 text-sm mb-1" />
            <span className="text-xs text-gray-700">Salary</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffPersonalDashboard;