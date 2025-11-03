import React, { useState, useEffect } from 'react';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiBarChart2,
  FiDownload,
  FiFilter,
  FiCoffee,
  FiSun,
  FiStar,
  FiAward
} from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const MonthlyReport = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monthly report data
  const monthlyData = {
    '2024-01': {
      month: 'January 2024',
      summary: {
        workingDays: 22,
        presentDays: 20,
        absentDays: 1,
        halfDays: 1,
        totalHours: 176.5,
        effectiveHours: 162.3,
        avgEfficiency: 92,
        lateArrivals: 3,
        earlyDepartures: 2
      },
      dailyData: [
        { date: '2024-01-01', day: 'Mon', status: 'holiday', hours: 0, efficiency: 0 },
        { date: '2024-01-02', day: 'Tue', status: 'present', hours: 8.5, efficiency: 94 },
        { date: '2024-01-03', day: 'Wed', status: 'present', hours: 9.0, efficiency: 96 },
        { date: '2024-01-04', day: 'Thu', status: 'present', hours: 8.0, efficiency: 89 },
        { date: '2024-01-05', day: 'Fri', status: 'present', hours: 8.5, efficiency: 92 },
        { date: '2024-01-06', day: 'Sat', status: 'weekend', hours: 0, efficiency: 0 },
        { date: '2024-01-07', day: 'Sun', status: 'weekend', hours: 0, efficiency: 0 },
        { date: '2024-01-08', day: 'Mon', status: 'present', hours: 9.0, efficiency: 95 },
        { date: '2024-01-09', day: 'Tue', status: 'present', hours: 8.5, efficiency: 91 },
        { date: '2024-01-10', day: 'Wed', status: 'half-day', hours: 4.5, efficiency: 88 },
        { date: '2024-01-11', day: 'Thu', status: 'present', hours: 8.0, efficiency: 90 },
        { date: '2024-01-12', day: 'Fri', status: 'present', hours: 8.5, efficiency: 93 },
        { date: '2024-01-13', day: 'Sat', status: 'weekend', hours: 0, efficiency: 0 },
        { date: '2024-01-14', day: 'Sun', status: 'weekend', hours: 0, efficiency: 0 },
        { date: '2024-01-15', day: 'Mon', status: 'present', hours: 9.0, efficiency: 96 },
        { date: '2024-01-16', day: 'Tue', status: 'present', hours: 8.5, efficiency: 92 },
        { date: '2024-01-17', day: 'Wed', status: 'present', hours: 8.0, efficiency: 89 },
        { date: '2024-01-18', day: 'Thu', status: 'present', hours: 8.5, efficiency: 94 },
        { date: '2024-01-19', day: 'Fri', status: 'present', hours: 9.0, efficiency: 97 },
        { date: '2024-01-20', day: 'Sat', status: 'weekend', hours: 0, efficiency: 0 },
        { date: '2024-01-21', day: 'Sun', status: 'weekend', hours: 0, efficiency: 0 },
        { date: '2024-01-22', day: 'Mon', status: 'absent', hours: 0, efficiency: 0 },
        { date: '2024-01-23', day: 'Tue', status: 'present', hours: 8.5, efficiency: 91 },
        { date: '2024-01-24', day: 'Wed', status: 'present', hours: 8.0, efficiency: 88 },
        { date: '2024-01-25', day: 'Thu', status: 'present', hours: 8.5, efficiency: 93 },
        { date: '2024-01-26', day: 'Fri', status: 'present', hours: 9.0, efficiency: 96 },
        { date: '2024-01-27', day: 'Sat', status: 'weekend', hours: 0, efficiency: 0 },
        { date: '2024-01-28', day: 'Sun', status: 'weekend', hours: 0, efficiency: 0 },
        { date: '2024-01-29', day: 'Mon', status: 'present', hours: 8.5, efficiency: 92 },
        { date: '2024-01-30', day: 'Tue', status: 'present', hours: 8.0, efficiency: 90 },
        { date: '2024-01-31', day: 'Wed', status: 'present', hours: 9.0, efficiency: 95 }
      ],
      performance: {
        attendanceRate: 91,
        punctuality: 88,
        productivity: 92,
        consistency: 90
      },
      breaks: {
        totalBreaks: 42,
        teaBreaks: 28,
        lunchBreaks: 14,
        avgBreakTime: '32 mins'
      },
      trends: [
        { week: 'Week 1', hours: 42.5, efficiency: 92 },
        { week: 'Week 2', hours: 38.5, efficiency: 90 },
        { week: 'Week 3', hours: 43.0, efficiency: 94 },
        { week: 'Week 4', hours: 38.5, efficiency: 91 }
      ]
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReportData(monthlyData[selectedMonth]);
      setLoading(false);
    }, 1000);
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setLoading(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-500';
      case 'absent': return 'bg-red-500';
      case 'half-day': return 'bg-yellow-500';
      case 'weekend': return 'bg-blue-400';
      case 'holiday': return 'bg-purple-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'present': return 'Present';
      case 'absent': return 'Absent';
      case 'half-day': return 'Half Day';
      case 'weekend': return 'Weekend';
      case 'holiday': return 'Holiday';
      default: return status;
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Monthly Report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Monthly Attendance Report</h1>
            <p className="text-gray-600">Comprehensive analysis of your monthly performance</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="2024-01">January 2024</option>
              <option value="2023-12">December 2023</option>
              <option value="2023-11">November 2023</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <FiDownload className="text-lg" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{reportData.summary.presentDays}</div>
            <div className="text-sm text-gray-600">Present Days</div>
            <div className="text-xs text-green-500 mt-1">✓ Excellent</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{reportData.summary.absentDays}</div>
            <div className="text-sm text-gray-600">Absent Days</div>
            <div className="text-xs text-red-500 mt-1">Needs Improvement</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{reportData.summary.totalHours}h</div>
            <div className="text-sm text-gray-600">Total Hours</div>
            <div className="text-xs text-blue-500 mt-1">Good Work</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{reportData.summary.avgEfficiency}%</div>
            <div className="text-sm text-gray-600">Efficiency</div>
            <div className="text-xs text-purple-500 mt-1">Outstanding</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{reportData.breaks.totalBreaks}</div>
            <div className="text-sm text-gray-600">Total Breaks</div>
            <div className="text-xs text-orange-500 mt-1">Average</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiTrendingUp className="text-blue-600 mr-2" />
              Weekly Performance Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reportData.trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Hours Worked"
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    name="Efficiency %"
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiBarChart2 className="text-green-600 mr-2" />
              Performance Metrics
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Attendance', value: reportData.performance.attendanceRate },
                  { name: 'Punctuality', value: reportData.performance.punctuality },
                  { name: 'Productivity', value: reportData.performance.productivity },
                  { name: 'Consistency', value: reportData.performance.consistency }
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    name="Score %"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Break Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiCoffee className="text-yellow-600 mr-2" />
              Break Analysis
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Breaks</span>
                <span className="font-semibold">{reportData.breaks.totalBreaks}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tea Breaks</span>
                <span className="font-semibold text-yellow-600">{reportData.breaks.teaBreaks}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Lunch Breaks</span>
                <span className="font-semibold text-orange-600">{reportData.breaks.lunchBreaks}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Break Time</span>
                <span className="font-semibold text-blue-600">{reportData.breaks.avgBreakTime}</span>
              </div>
            </div>
          </div>

          {/* Attendance Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="text-purple-600 mr-2" />
              Attendance Distribution
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Present', value: reportData.summary.presentDays },
                      { name: 'Absent', value: reportData.summary.absentDays },
                      { name: 'Half Days', value: reportData.summary.halfDays },
                      { name: 'Weekends', value: 8 },
                      { name: 'Holidays', value: 1 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {[
                      { name: 'Present', color: '#10b981' },
                      { name: 'Absent', color: '#ef4444' },
                      { name: 'Half Days', color: '#f59e0b' },
                      { name: 'Weekends', color: '#3b82f6' },
                      { name: 'Holidays', color: '#8b5cf6' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Highlights */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiAward className="text-orange-600 mr-2" />
              Monthly Highlights
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <FiStar className="text-green-600 text-xl" />
                <div>
                  <p className="font-semibold text-green-800">Best Week</p>
                  <p className="text-sm text-green-600">Week 3: 43 hours, 94% efficiency</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <FiTrendingUp className="text-blue-600 text-xl" />
                <div>
                  <p className="font-semibold text-blue-800">Consistency Score</p>
                  <p className="text-sm text-blue-600">90% - Excellent consistency</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <FiAlertCircle className="text-yellow-600 text-xl" />
                <div>
                  <p className="font-semibold text-yellow-800">Areas to Improve</p>
                  <p className="text-sm text-yellow-600">Reduce late arrivals (3 this month)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FiCalendar className="text-blue-600 mr-2" />
            Daily Attendance Calendar - {reportData.month}
          </h3>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {reportData.dailyData.map(day => (
              <div
                key={day.date}
                className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center p-1 ${
                  day.status === 'present' ? 'border-green-200 bg-green-50' :
                  day.status === 'absent' ? 'border-red-200 bg-red-50' :
                  day.status === 'half-day' ? 'border-yellow-200 bg-yellow-50' :
                  day.status === 'weekend' ? 'border-blue-200 bg-blue-50' :
                  'border-purple-200 bg-purple-50'
                }`}
              >
                <div className="text-sm font-medium">{day.day}</div>
                <div className="text-xs">{day.date.split('-')[2]}</div>
                {day.hours > 0 && (
                  <div className="text-xs font-semibold mt-1">{day.hours}h</div>
                )}
                <div className={`w-3 h-3 rounded-full mt-1 ${getStatusColor(day.status)}`}></div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Present</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Absent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-600">Half Day</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-sm text-gray-600">Weekend</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600">Holiday</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Report Actions</h3>
              <p className="text-gray-600 text-sm">Download or share your monthly report</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <FiDownload className="text-lg" />
                <span>Download PDF</span>
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <FiDownload className="text-lg" />
                <span>Export Excel</span>
              </button>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <FiUser className="text-lg" />
                <span>Share with Manager</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;