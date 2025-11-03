import React, { useState, useEffect } from 'react';
import {
  FiTrendingUp,
  FiAward,
  FiTarget,
  FiBarChart2,
  FiPieChart,
  FiCalendar,
  FiClock,
  FiUser,
  FiCheckCircle,
  FiStar,
  FiActivity,
  FiDownload,
  FiArrowUp,
  FiArrowDown,
  FiEye
} from 'react-icons/fi';

const PerformancePage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [performanceStats, setPerformanceStats] = useState({});
  const [productivityData, setProductivityData] = useState([]);
  const [taskDistribution, setTaskDistribution] = useState([]);
  const [recentAchievements, setRecentAchievements] = useState([]);
  const [teamComparison, setTeamComparison] = useState([]);

  // Static performance data
  const performanceData = {
    overallScore: 87,
    tasksCompleted: 156,
    avgCompletionTime: 2.3,
    onTimeRate: 94,
    efficiency: 112,
    productivityTrend: [
      { month: 'Jan', score: 78, tasks: 32 },
      { month: 'Feb', score: 82, tasks: 35 },
      { month: 'Mar', score: 85, tasks: 38 },
      { month: 'Apr', score: 87, tasks: 42 },
      { month: 'May', score: 90, tasks: 45 },
      { month: 'Jun', score: 87, tasks: 41 }
    ],
    taskBreakdown: [
      { type: 'Completed', count: 156, color: 'bg-green-500' },
      { type: 'In Progress', count: 12, color: 'bg-blue-500' },
      { type: 'Pending', count: 8, color: 'bg-yellow-500' },
      { type: 'Overdue', count: 3, color: 'bg-red-500' }
    ],
    priorityPerformance: [
      { priority: 'High', completed: 45, total: 48, rate: 94 },
      { priority: 'Medium', completed: 78, total: 82, rate: 95 },
      { priority: 'Low', completed: 33, total: 38, rate: 87 }
    ],
    achievements: [
      { id: 1, title: 'Early Bird', description: 'Completed 10+ tasks before deadline', icon: '🏆', date: '2024-06-15', points: 50 },
      { id: 2, title: 'Efficiency Master', description: 'Maintained 120%+ efficiency for 2 weeks', icon: '⚡', date: '2024-06-10', points: 75 },
      { id: 3, title: 'Task Champion', description: 'Completed 50 tasks in a month', icon: '🎯', date: '2024-06-05', points: 100 },
      { id: 4, title: 'Quality Star', description: 'Zero revisions needed for 20 tasks', icon: '⭐', date: '2024-05-28', points: 60 }
    ],
    teamStats: [
      { name: 'You', score: 87, tasks: 156, efficiency: 112, trend: 'up' },
      { name: 'Alex Chen', score: 82, tasks: 142, efficiency: 105, trend: 'up' },
      { name: 'Priya Sharma', score: 79, tasks: 138, efficiency: 98, trend: 'down' },
      { name: 'Mike Johnson', score: 85, tasks: 148, efficiency: 108, trend: 'up' },
      { name: 'Sarah Wilson', score: 91, tasks: 162, efficiency: 118, trend: 'up' }
    ],
    weeklyPerformance: [
      { day: 'Mon', productivity: 85, tasks: 8 },
      { day: 'Tue', productivity: 92, tasks: 10 },
      { day: 'Wed', productivity: 88, tasks: 9 },
      { day: 'Thu', productivity: 95, tasks: 11 },
      { day: 'Fri', productivity: 82, tasks: 7 },
      { day: 'Sat', productivity: 65, tasks: 4 },
      { day: 'Sun', productivity: 45, tasks: 2 }
    ]
  };

  useEffect(() => {
    loadPerformanceData();
  }, [timeRange]);

  const loadPerformanceData = () => {
    setPerformanceStats({
      overallScore: performanceData.overallScore,
      tasksCompleted: performanceData.tasksCompleted,
      avgCompletionTime: performanceData.avgCompletionTime,
      onTimeRate: performanceData.onTimeRate,
      efficiency: performanceData.efficiency
    });
    setProductivityData(performanceData.productivityTrend);
    setTaskDistribution(performanceData.taskBreakdown);
    setRecentAchievements(performanceData.achievements);
    setTeamComparison(performanceData.teamStats);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <FiArrowUp className="text-green-500" /> : 
      <FiArrowDown className="text-red-500" />;
  };

  const exportReport = () => {
    alert('Performance report exported successfully!');
  };

  // Calculate total tasks for percentage calculation
  const totalTasks = taskDistribution.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiActivity className="text-blue-600 mr-3" />
              Performance Analytics
            </h1>
            <p className="text-gray-600 mt-2">Track your productivity, efficiency, and performance metrics</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button 
              onClick={exportReport}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <FiDownload className="text-lg" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Overall Performance Score */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Overall Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(performanceStats.overallScore)} mt-2`}>
                  {performanceStats.overallScore}/100
                </p>
                <p className="text-xs text-gray-500 mt-1">Performance Rating</p>
              </div>
              <div className={`p-3 rounded-full ${getScoreBg(performanceStats.overallScore)} bg-opacity-10`}>
                <FiAward className={`text-2xl ${getScoreColor(performanceStats.overallScore)}`} />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className={`h-2 rounded-full ${getScoreBg(performanceStats.overallScore)}`}
                style={{ width: `${performanceStats.overallScore}%` }}
              ></div>
            </div>
          </div>

          {/* Tasks Completed */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Tasks Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{performanceStats.tasksCompleted}</p>
                <p className="text-xs text-gray-500 mt-1">Total Completed</p>
              </div>
              <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                <FiCheckCircle className="text-2xl text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <FiTrendingUp className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12% from last month</span>
            </div>
          </div>

          {/* Average Completion Time */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Avg. Completion</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{performanceStats.avgCompletionTime}d</p>
                <p className="text-xs text-gray-500 mt-1">Per Task</p>
              </div>
              <div className="p-3 rounded-full bg-purple-500 bg-opacity-10">
                <FiClock className="text-2xl text-purple-500" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <FiTrendingUp className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">-0.5 days improvement</span>
            </div>
          </div>

          {/* Efficiency Score */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Efficiency</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{performanceStats.efficiency}%</p>
                <p className="text-xs text-gray-500 mt-1">Vs Estimated</p>
              </div>
              <div className="p-3 rounded-full bg-orange-500 bg-opacity-10">
                <FiTarget className="text-2xl text-orange-500" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <FiTrendingUp className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">+8% better than target</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Productivity Trend Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiTrendingUp className="text-blue-500 mr-2" />
                  Productivity Trend
                </h2>
                <span className="text-sm text-gray-500">Last 6 Months</span>
              </div>
              
              <div className="flex items-end justify-between h-48 mt-8">
                {productivityData.map((month, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div className="flex flex-col justify-end h-32 w-full bg-gray-100 rounded-t-lg relative">
                      <div 
                        className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500"
                        style={{ height: `${month.score}%` }}
                      ></div>
                      <div className="absolute -bottom-6 text-center w-full">
                        <div className="text-sm font-medium text-gray-700">{month.score}</div>
                        <div className="text-xs text-gray-500">{month.month}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Task Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FiPieChart className="text-purple-500 mr-2" />
              Task Distribution
            </h2>
            
            <div className="space-y-4">
              {taskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-gray-700">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ 
                          width: `${totalTasks > 0 ? (item.count / totalTasks) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-8">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Priority Performance</h3>
              <div className="space-y-3">
                {performanceData.priorityPerformance.map((priority, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 capitalize">{priority.priority}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            priority.priority === 'high' ? 'bg-red-500' :
                            priority.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${priority.rate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-12">
                        {priority.rate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Performance */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FiCalendar className="text-green-500 mr-2" />
              Weekly Performance
            </h2>
            
            <div className="space-y-4">
              {performanceData.weeklyPerformance.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-12">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          day.productivity >= 90 ? 'bg-green-500' : 
                          day.productivity >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${day.productivity}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-right">
                    <span className="text-sm text-gray-600 w-16">{day.productivity}%</span>
                    <span className="text-sm text-gray-500 w-8">{day.tasks} tasks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Comparison */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FiUser className="text-indigo-500 mr-2" />
                Team Comparison
              </h2>
              <span className="text-sm text-gray-500">This Month</span>
            </div>
            
            <div className="space-y-4">
              {teamComparison.map((member, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                  member.name === 'You' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <span className={`font-medium ${
                        member.name === 'You' ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {member.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(member.trend)}
                        <span className="text-xs text-gray-500">{member.efficiency}% efficiency</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">{member.score}</div>
                    <div className="text-xs text-gray-500">{member.tasks} tasks</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FiStar className="text-yellow-500 mr-2" />
              Recent Achievements
            </h2>
            <span className="text-sm text-gray-500">{recentAchievements.length} achievements</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {new Date(achievement.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs font-medium text-orange-600">
                        +{achievement.points} pts
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <FiEye className="mr-2" />
              Performance Insights
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiTrendingUp className="mr-2 mt-1 text-green-300" />
                <span>Your productivity has increased by 15% over the last quarter</span>
              </li>
              <li className="flex items-start">
                <FiTarget className="mr-2 mt-1 text-blue-300" />
                <span>You consistently exceed efficiency targets by 8-12%</span>
              </li>
              <li className="flex items-start">
                <FiClock className="mr-2 mt-1 text-yellow-300" />
                <span>Average task completion time improved by 18% this month</span>
              </li>
              <li className="flex items-start">
                <FiAward className="mr-2 mt-1 text-red-300" />
                <span>Ranked #2 in team performance for this quarter</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <FiStar className="mr-2" />
              Recommendations
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                <span>Focus on completing high-priority tasks in the morning for better efficiency</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                <span>Take regular breaks to maintain consistent productivity throughout the week</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                <span>Consider delegating low-priority tasks to focus on strategic work</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                <span>Your peak performance hours are between 10 AM - 12 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;