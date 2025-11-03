import React, { useState, useEffect } from 'react';
import {
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiPlus,
  FiFilter,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiCalendar,
  FiFlag,
  FiUser,
  FiBarChart2,
  FiDownload,
  FiRefreshCw,
  FiTrendingUp,
  FiAward,
  FiTarget,
  FiPieChart
} from 'react-icons/fi';

// Task History Component
const TaskHistory = ({ tasks }) => {
  const [timeRange, setTimeRange] = useState('month');
  const [completionStats, setCompletionStats] = useState({});
  const [recentCompletions, setRecentCompletions] = useState([]);

  useEffect(() => {
    calculateStats();
    getRecentCompletions();
  }, [tasks, timeRange]);

  const calculateStats = () => {
    const completedTasks = tasks.filter(task => task.status === 'completed');
    
    // Calculate completion rate
    const totalTasks = tasks.length;
    const completedCount = completedTasks.length;
    const completionRate = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

    // Calculate average completion time
    const avgCompletionTime = completedTasks.reduce((acc, task) => {
      const assigned = new Date(task.assignedDate);
      const completed = new Date(task.completedDate);
      const days = (completed - assigned) / (1000 * 60 * 60 * 24);
      return acc + days;
    }, 0) / (completedCount || 1);

    // Calculate productivity score
    const productivityScore = completedTasks.reduce((acc, task) => {
      const efficiency = task.actualHours && task.estimatedHours 
        ? (task.estimatedHours / task.actualHours) * 100 
        : 100;
      return acc + Math.min(efficiency, 150); // Cap at 150%
    }, 0) / (completedCount || 1);

    setCompletionStats({
      totalTasks,
      completedCount,
      completionRate: Math.round(completionRate),
      avgCompletionTime: Math.round(avgCompletionTime * 10) / 10,
      productivityScore: Math.round(productivityScore)
    });
  };

  const getRecentCompletions = () => {
    const completions = tasks
      .filter(task => task.status === 'completed')
      .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
      .slice(0, 10);
    
    setRecentCompletions(completions);
  };

  const getEfficiencyColor = (estimated, actual) => {
    if (!actual || !estimated) return 'text-gray-500';
    const efficiency = (estimated / actual) * 100;
    if (efficiency >= 120) return 'text-green-500';
    if (efficiency >= 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getEfficiencyBadge = (estimated, actual) => {
    if (!actual || !estimated) return 'bg-gray-100 text-gray-800';
    const efficiency = (estimated / actual) * 100;
    if (efficiency >= 120) return 'bg-green-100 text-green-800';
    if (efficiency >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getEfficiencyText = (estimated, actual) => {
    if (!actual || !estimated) return 'N/A';
    const efficiency = (estimated / actual) * 100;
    if (efficiency >= 120) return 'Excellent';
    if (efficiency >= 80) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <FiTrendingUp className="text-green-600 mr-2" />
            Task Completion History
          </h2>
          <p className="text-gray-600">Track your productivity and completion patterns</p>
        </div>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4 lg:mt-0"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last 3 Months</option>
          <option value="year">Last Year</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Completion Rate</p>
              <p className="text-2xl font-bold text-green-800">{completionStats.completionRate || 0}%</p>
            </div>
            <FiTarget className="text-green-500 text-xl" />
          </div>
          <div className="w-full bg-green-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionStats.completionRate || 0}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Tasks Completed</p>
              <p className="text-2xl font-bold text-blue-800">{completionStats.completedCount || 0}</p>
            </div>
            <FiCheckCircle className="text-blue-500 text-xl" />
          </div>
          <p className="text-xs text-blue-600 mt-1">out of {completionStats.totalTasks || 0} total</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Avg. Completion</p>
              <p className="text-2xl font-bold text-purple-800">{completionStats.avgCompletionTime || 0}d</p>
            </div>
            <FiClock className="text-purple-500 text-xl" />
          </div>
          <p className="text-xs text-purple-600 mt-1">days per task</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Productivity Score</p>
              <p className="text-2xl font-bold text-orange-800">{completionStats.productivityScore || 0}</p>
            </div>
            <FiAward className="text-orange-500 text-xl" />
          </div>
          <p className="text-xs text-orange-600 mt-1">efficiency rating</p>
        </div>
      </div>

      {/* Recent Completions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiCheckCircle className="text-green-500 mr-2" />
          Recently Completed Tasks
        </h3>
        
        {recentCompletions.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <FiCheckCircle className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No completed tasks yet</p>
            <p className="text-gray-400 text-sm">Complete some tasks to see your history here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentCompletions.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <FiCheckCircle className="text-green-500 text-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 truncate">{task.title}</h4>
                      <p className="text-sm text-gray-600 truncate">{task.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <FiCalendar className="text-gray-400" />
                      <span>Completed: {new Date(task.completedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <FiClock className="text-gray-400" />
                      <span>
                        Time: <span className={getEfficiencyColor(task.estimatedHours, task.actualHours)}>
                          {task.actualHours}h / {task.estimatedHours}h
                        </span>
                      </span>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEfficiencyBadge(task.estimatedHours, task.actualHours)}`}>
                    {getEfficiencyText(task.estimatedHours, task.actualHours)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completion Trends */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiPieChart className="text-blue-500 mr-2" />
          Completion Trends
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Priority Completion */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3">Completion by Priority</h4>
            <div className="space-y-3">
              {['high', 'medium', 'low'].map(priority => {
                const priorityTasks = tasks.filter(t => t.priority === priority);
                const completedPriorityTasks = priorityTasks.filter(t => t.status === 'completed').length;
                const completionRate = priorityTasks.length > 0 ? (completedPriorityTasks / priorityTasks.length) * 100 : 0;
                
                return (
                  <div key={priority} className="flex items-center justify-between">
                    <span className="capitalize text-sm text-gray-600">{priority} priority</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            priority === 'high' ? 'bg-red-500' :
                            priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-10">{Math.round(completionRate)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Completion */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3">This Month's Progress</h4>
            <div className="flex items-end justify-between h-24">
              {[1, 2, 3, 4].map(week => {
                const weekTasks = tasks.filter(t => {
                  // Simple mock data for demonstration
                  return Math.random() > 0.3;
                });
                const completedCount = weekTasks.filter(t => t.status === 'completed').length;
                const height = (completedCount / Math.max(1, weekTasks.length)) * 60;
                
                return (
                  <div key={week} className="flex flex-col items-center space-y-2">
                    <div className="flex flex-col justify-end h-16 w-8 bg-gray-200 rounded-t">
                      <div 
                        className="bg-green-500 rounded-t transition-all duration-500"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">Week {week}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main MyTasks Component
const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium', dueDate: '' });

  // Sample tasks data with completed dates
  const sampleTasks = [
    {
      id: 1,
      title: 'Complete Monthly Sales Report',
      description: 'Prepare and submit the monthly sales performance report with analysis and insights',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-01-20',
      assignedDate: '2024-01-15',
      completedDate: '2024-01-19',
      estimatedHours: 8,
      actualHours: 6.5,
      assigner: 'Manager - Priya Patel',
      category: 'Reporting'
    },
    {
      id: 2,
      title: 'Client Meeting Preparation',
      description: 'Prepare presentation and documents for upcoming client meeting on Friday',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-01-25',
      assignedDate: '2024-01-18',
      completedDate: null,
      estimatedHours: 6,
      actualHours: 3,
      assigner: 'Team Lead - Raj Kumar',
      category: 'Client Meeting'
    },
    {
      id: 3,
      title: 'Update CRM Database',
      description: 'Update customer records and interactions in the CRM system',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-01-22',
      assignedDate: '2024-01-20',
      completedDate: null,
      estimatedHours: 4,
      actualHours: 0,
      assigner: 'Manager - Priya Patel',
      category: 'Data Management'
    },
    {
      id: 4,
      title: 'Team Training Session',
      description: 'Conduct training session for new team members on sales procedures',
      status: 'pending',
      priority: 'low',
      dueDate: '2024-01-30',
      assignedDate: '2024-01-22',
      completedDate: null,
      estimatedHours: 3,
      actualHours: 0,
      assigner: 'HR - Anjali Sharma',
      category: 'Training'
    },
    {
      id: 5,
      title: 'Q1 Budget Planning',
      description: 'Collaborate with finance team for Q1 budget planning and allocation',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-02-05',
      assignedDate: '2024-01-25',
      completedDate: null,
      estimatedHours: 12,
      actualHours: 4,
      assigner: 'Finance Head - Amit Verma',
      category: 'Planning'
    },
    {
      id: 6,
      title: 'Website Content Update',
      description: 'Update product information and pricing on company website',
      status: 'overdue',
      priority: 'medium',
      dueDate: '2024-01-18',
      assignedDate: '2024-01-10',
      completedDate: null,
      estimatedHours: 5,
      actualHours: 0,
      assigner: 'Marketing - Neha Singh',
      category: 'Content'
    },
    {
      id: 7,
      title: 'Customer Feedback Analysis',
      description: 'Analyze recent customer feedback and prepare improvement suggestions',
      status: 'completed',
      priority: 'medium',
      dueDate: '2024-01-24',
      assignedDate: '2024-01-20',
      completedDate: '2024-01-23',
      estimatedHours: 6,
      actualHours: 5.5,
      assigner: 'Manager - Priya Patel',
      category: 'Analysis'
    },
    {
      id: 8,
      title: 'Inventory Audit',
      description: 'Conduct quarterly inventory audit and prepare report',
      status: 'pending',
      priority: 'low',
      dueDate: '2024-02-10',
      assignedDate: '2024-01-28',
      completedDate: null,
      estimatedHours: 8,
      actualHours: 0,
      assigner: 'Operations - Sanjay Roy',
      category: 'Audit'
    },
    {
      id: 9,
      title: 'Social Media Campaign',
      description: 'Create and schedule social media posts for new product launch',
      status: 'completed',
      priority: 'medium',
      dueDate: '2024-01-28',
      assignedDate: '2024-01-22',
      completedDate: '2024-01-26',
      estimatedHours: 10,
      actualHours: 8,
      assigner: 'Marketing - Neha Singh',
      category: 'Marketing'
    },
    {
      id: 10,
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
      category: 'Legal'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTasks(sampleTasks);
      setFilteredTasks(sampleTasks);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter tasks
  useEffect(() => {
    let result = tasks;

    // Search filter
    if (searchTerm) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(task => task.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(result);
  }, [searchTerm, statusFilter, priorityFilter, tasks]);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : null
            }
          : task
      )
    );
  };

  const handleAddTask = () => {
    if (newTask.title.trim() === '') return;

    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: 'pending',
      assignedDate: new Date().toISOString().split('T')[0],
      completedDate: null,
      actualHours: 0,
      assigner: 'Self Assigned',
      category: 'Personal'
    };

    setTasks(prev => [task, ...prev]);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FiCheckCircle className="text-green-500" />;
      case 'in-progress': return <FiRefreshCw className="text-blue-500" />;
      case 'pending': return <FiClock className="text-yellow-500" />;
      case 'overdue': return <FiAlertCircle className="text-red-500" />;
      default: return <FiClock className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <FiFlag className="text-red-500" />;
      case 'medium': return <FiFlag className="text-yellow-500" />;
      case 'low': return <FiFlag className="text-green-500" />;
      default: return <FiFlag className="text-gray-500" />;
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  // Calculate statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    overdue: tasks.filter(t => t.status === 'overdue' || (t.status !== 'completed' && isOverdue(t.dueDate))).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your tasks...</p>
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
            <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
            <p className="text-gray-600">Manage and track your assigned tasks</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mt-4 lg:mt-0">
            <FiPlus className="text-lg" />
            <span>Add New Task</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
        </div>

        {/* Quick Add Task */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FiPlus className="text-blue-600 mr-2" />
            Quick Add Task
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Task title..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <div className="flex space-x-2">
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
              <button
                onClick={handleAddTask}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <FiPlus className="text-lg" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>

              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <FiDownload className="text-lg" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Task Details</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Priority</th>
                  <th className="px-6 py-4 text-left font-semibold">Due Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Assigned By</th>
                  <th className="px-6 py-4 text-left font-semibold">Time</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-semibold text-gray-800">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mt-2">
                          {task.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className={`border-0 rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(task.status)} focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                        {getPriorityIcon(task.priority)}
                        <span className="ml-1 capitalize">{task.priority}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FiCalendar className="text-gray-400" />
                        <span className={isOverdue(task.dueDate) && task.status !== 'completed' ? 'text-red-600 font-medium' : 'text-gray-700'}>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        {isOverdue(task.dueDate) && task.status !== 'completed' && (
                          <FiAlertCircle className="text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FiUser className="text-gray-400" />
                        <span className="text-sm text-gray-700">{task.assigner}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>Est: {task.estimatedHours}h</div>
                        <div className={task.actualHours > task.estimatedHours ? 'text-red-600' : 'text-green-600'}>
                          Actual: {task.actualHours}h
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                          <FiEdit className="text-lg" />
                        </button>
                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <FiCheckCircle className="text-4xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">No tasks found</p>
                <p className="text-gray-400 text-sm">Try adjusting your filters or create a new task</p>
              </div>
            )}
          </div>
        </div>

        {/* Task History Component */}
        <TaskHistory tasks={tasks} />

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center">
              <FiBarChart2 className="text-blue-600 text-xl mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Task Analytics</span>
            </button>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center">
              <FiDownload className="text-green-600 text-xl mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Export Report</span>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center">
              <FiCalendar className="text-purple-600 text-xl mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Calendar View</span>
            </button>
            <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center">
              <FiFlag className="text-orange-600 text-xl mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Set Priority</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;