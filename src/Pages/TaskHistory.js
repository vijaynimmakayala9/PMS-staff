import React, { useState, useEffect } from 'react';
import {
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiTrendingUp,
  FiAward,
  FiTarget,
  FiPieChart,
  FiBarChart2,
  FiDownload,
  FiFilter
} from 'react-icons/fi';

const TaskHistory = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [completionStats, setCompletionStats] = useState({});
  const [recentCompletions, setRecentCompletions] = useState([]);
  const [productivityTrend, setProductivityTrend] = useState([]);

  // Static task history data
  const taskHistoryData = [
    {
      id: 1,
      title: 'Complete Monthly Sales Report',
      description: 'Prepare and submit the monthly sales performance report',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-01-20',
      assignedDate: '2024-01-15',
      completedDate: '2024-01-19',
      estimatedHours: 8,
      actualHours: 6.5,
      assigner: 'Manager - Priya Patel',
      category: 'Reporting',
      efficiency: 123
    },
    {
      id: 2,
      title: 'Customer Feedback Analysis',
      description: 'Analyze recent customer feedback and prepare suggestions',
      status: 'completed',
      priority: 'medium',
      dueDate: '2024-01-24',
      assignedDate: '2024-01-20',
      completedDate: '2024-01-23',
      estimatedHours: 6,
      actualHours: 5.5,
      assigner: 'Manager - Priya Patel',
      category: 'Analysis',
      efficiency: 109
    },
    {
      id: 3,
      title: 'Social Media Campaign',
      description: 'Create and schedule social media posts for product launch',
      status: 'completed',
      priority: 'medium',
      dueDate: '2024-01-28',
      assignedDate: '2024-01-22',
      completedDate: '2024-01-26',
      estimatedHours: 10,
      actualHours: 8,
      assigner: 'Marketing - Neha Singh',
      category: 'Marketing',
      efficiency: 125
    },
    {
      id: 4,
      title: 'Vendor Contract Review',
      description: 'Review and finalize contracts with new vendors',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-01-19',
      assignedDate: '2024-01-12',
      completedDate: '2024-01-18',
      estimatedHours: 7,
      actualHours: 9,
      assigner: 'Legal - Arjun Mehta',
      category: 'Legal',
      efficiency: 78
    },
    {
      id: 5,
      title: 'Team Training Documentation',
      description: 'Prepare training materials for new team members',
      status: 'completed',
      priority: 'low',
      dueDate: '2024-01-30',
      assignedDate: '2024-01-25',
      completedDate: '2024-01-28',
      estimatedHours: 5,
      actualHours: 4,
      assigner: 'HR - Anjali Sharma',
      category: 'Training',
      efficiency: 125
    },
    {
      id: 6,
      title: 'Website Performance Audit',
      description: 'Conduct performance audit and optimization',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-01-22',
      assignedDate: '2024-01-18',
      completedDate: '2024-01-21',
      estimatedHours: 12,
      actualHours: 10,
      assigner: 'Tech - Rajesh Kumar',
      category: 'Technical',
      efficiency: 120
    },
    {
      id: 7,
      title: 'Client Proposal Draft',
      description: 'Draft proposal for new client acquisition',
      status: 'completed',
      priority: 'medium',
      dueDate: '2024-01-25',
      assignedDate: '2024-01-20',
      completedDate: '2024-01-24',
      estimatedHours: 8,
      actualHours: 9.5,
      assigner: 'Sales - Meera Joshi',
      category: 'Sales',
      efficiency: 84
    },
    {
      id: 8,
      title: 'Budget Review Meeting',
      description: 'Quarterly budget review and planning session',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-01-31',
      assignedDate: '2024-01-28',
      completedDate: '2024-01-30',
      estimatedHours: 6,
      actualHours: 5,
      assigner: 'Finance - Amit Verma',
      category: 'Finance',
      efficiency: 120
    }
  ];

  useEffect(() => {
    calculateStats();
    getRecentCompletions();
    generateProductivityTrend();
  }, [timeRange]);

  const calculateStats = () => {
    const completedTasks = taskHistoryData;
    const totalTasks = completedTasks.length;
    
    // Calculate average efficiency
    const avgEfficiency = completedTasks.reduce((acc, task) => acc + task.efficiency, 0) / totalTasks;
    
    // Calculate average completion time
    const avgCompletionTime = completedTasks.reduce((acc, task) => {
      const assigned = new Date(task.assignedDate);
      const completed = new Date(task.completedDate);
      const days = (completed - assigned) / (1000 * 60 * 60 * 24);
      return acc + days;
    }, 0) / totalTasks;

    // Calculate on-time completion rate
    const onTimeTasks = completedTasks.filter(task => 
      new Date(task.completedDate) <= new Date(task.dueDate)
    ).length;
    const onTimeRate = (onTimeTasks / totalTasks) * 100;

    // Calculate productivity score
    const productivityScore = completedTasks.reduce((acc, task) => {
      return acc + Math.min(task.efficiency, 150);
    }, 0) / totalTasks;

    setCompletionStats({
      totalTasks,
      avgEfficiency: Math.round(avgEfficiency),
      avgCompletionTime: Math.round(avgCompletionTime * 10) / 10,
      onTimeRate: Math.round(onTimeRate),
      productivityScore: Math.round(productivityScore)
    });
  };

  const getRecentCompletions = () => {
    const completions = taskHistoryData
      .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
      .slice(0, 6);
    
    setRecentCompletions(completions);
  };

  const generateProductivityTrend = () => {
    // Generate mock weekly productivity data
    const trends = [
      { week: 'Week 1', productivity: 85, tasks: 12 },
      { week: 'Week 2', productivity: 92, tasks: 15 },
      { week: 'Week 3', productivity: 78, tasks: 10 },
      { week: 'Week 4', productivity: 110, tasks: 18 },
      { week: 'Current', productivity: 105, tasks: 14 }
    ];
    setProductivityTrend(trends);
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 110) return 'text-green-500';
    if (efficiency >= 90) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getEfficiencyBadge = (efficiency) => {
    if (efficiency >= 110) return 'bg-green-100 text-green-800';
    if (efficiency >= 90) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getEfficiencyText = (efficiency) => {
    if (efficiency >= 110) return 'Excellent';
    if (efficiency >= 90) return 'Good';
    return 'Needs Improvement';
  };

  const exportHistory = () => {
    // Simulate export functionality
    alert('Task history exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiTrendingUp className="text-green-600 mr-3" />
              Task History & Analytics
            </h1>
            <p className="text-gray-600 mt-2">Track your productivity and completion patterns over time</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
            <button 
              onClick={exportHistory}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <FiDownload className="text-lg" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-semibold">Productivity Score</p>
                <p className="text-3xl font-bold text-green-800 mt-2">{completionStats.productivityScore || 0}</p>
                <p className="text-xs text-green-600 mt-1">Overall Efficiency</p>
              </div>
              <div className="bg-green-200 p-3 rounded-full">
                <FiAward className="text-green-600 text-2xl" />
              </div>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2 mt-4">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(completionStats.productivityScore || 0, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-semibold">Tasks Completed</p>
                <p className="text-3xl font-bold text-blue-800 mt-2">{completionStats.totalTasks || 0}</p>
                <p className="text-xs text-blue-600 mt-1">Total Completed</p>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <FiCheckCircle className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-semibold">Avg. Completion Time</p>
                <p className="text-3xl font-bold text-purple-800 mt-2">{completionStats.avgCompletionTime || 0}d</p>
                <p className="text-xs text-purple-600 mt-1">Per Task</p>
              </div>
              <div className="bg-purple-200 p-3 rounded-full">
                <FiClock className="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-semibold">On-Time Delivery</p>
                <p className="text-3xl font-bold text-orange-800 mt-2">{completionStats.onTimeRate || 0}%</p>
                <p className="text-xs text-orange-600 mt-1">Meeting Deadlines</p>
              </div>
              <div className="bg-orange-200 p-3 rounded-full">
                <FiTarget className="text-orange-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Completions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiCheckCircle className="text-green-500 mr-2" />
                  Recently Completed Tasks
                </h2>
                <span className="text-sm text-gray-500">{recentCompletions.length} tasks</span>
              </div>
              
              <div className="space-y-4">
                {recentCompletions.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-green-50 hover:border-green-200 transition-all duration-300">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`p-2 rounded-full ${getEfficiencyBadge(task.efficiency)}`}>
                        <FiCheckCircle className={`text-lg ${getEfficiencyColor(task.efficiency)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{task.title}</h3>
                        <p className="text-sm text-gray-600 truncate">{task.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500 flex items-center">
                            <FiCalendar className="mr-1" />
                            {new Date(task.completedDate).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">{task.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getEfficiencyBadge(task.efficiency)}`}>
                        {task.efficiency}% Efficiency
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {task.actualHours}h / {task.estimatedHours}h
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Productivity Trends */}
          <div className="space-y-8">
            {/* Weekly Productivity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <FiBarChart2 className="text-blue-500 mr-2" />
                Weekly Productivity
              </h3>
              <div className="space-y-4">
                {productivityTrend.map((week, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{week.week}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            week.productivity >= 100 ? 'bg-green-500' : 
                            week.productivity >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(week.productivity, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-12">
                        {week.productivity}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Efficiency Distribution */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <FiPieChart className="text-purple-500 mr-2" />
                Efficiency Distribution
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Excellent (110%+)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-green-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">45%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Good (90-109%)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-yellow-200 rounded-full h-3">
                      <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">35%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Needs Improvement</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-red-200 rounded-full h-3">
                      <div className="bg-red-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">20%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-3">Performance Insights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <FiCheckCircle className="mr-2 text-green-300" />
                  You're 23% more productive than last month
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="mr-2 text-green-300" />
                  Best performance: Social Media Campaign (125%)
                </li>
                <li className="flex items-center">
                  <FiClock className="mr-2 text-yellow-300" />
                  Average completion time improved by 2 days
                </li>
                <li className="flex items-center">
                  <FiTarget className="mr-2 text-blue-300" />
                  92% of tasks completed before deadline
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskHistory;