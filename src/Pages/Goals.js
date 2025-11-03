import React, { useState } from 'react';
import {
  FiTarget,
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiTrendingUp,
  FiEdit,
  FiTrash2,
  FiFilter,
  FiBarChart2,
  FiAward,
  FiFlag
} from 'react-icons/fi';

const Goals = () => {
  const [filter, setFilter] = useState('all');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'professional',
    targetDate: '',
    priority: 'medium'
  });

  const goalsData = {
    total: 8,
    completed: 3,
    inProgress: 4,
    notStarted: 1,
    goals: [
      {
        id: 1,
        title: 'Complete Advanced React Course',
        description: 'Finish the advanced React patterns and performance optimization course',
        category: 'learning',
        status: 'in-progress',
        progress: 65,
        priority: 'high',
        startDate: '2024-01-15',
        targetDate: '2024-07-30',
        createdAt: '2024-01-10',
        milestones: [
          { id: 1, title: 'Complete basics', completed: true },
          { id: 2, title: 'Advanced patterns', completed: true },
          { id: 3, title: 'Performance optimization', completed: false },
          { id: 4, title: 'Final project', completed: false }
        ]
      },
      {
        id: 2,
        title: 'Lead Team Project Successfully',
        description: 'Successfully deliver the Q3 product launch project on time and within budget',
        category: 'professional',
        status: 'in-progress',
        progress: 45,
        priority: 'high',
        startDate: '2024-03-01',
        targetDate: '2024-09-30',
        createdAt: '2024-02-20',
        milestones: [
          { id: 1, title: 'Project planning', completed: true },
          { id: 2, title: 'Team onboarding', completed: true },
          { id: 3, title: 'Development phase', completed: false },
          { id: 4, title: 'Testing & launch', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Improve Public Speaking Skills',
        description: 'Participate in 5 team presentations and 2 external conferences',
        category: 'personal',
        status: 'not-started',
        progress: 0,
        priority: 'medium',
        startDate: '2024-06-01',
        targetDate: '2024-12-31',
        createdAt: '2024-05-15',
        milestones: [
          { id: 1, title: 'Join Toastmasters', completed: false },
          { id: 2, title: 'Team presentations', completed: false },
          { id: 3, title: 'Conference preparation', completed: false }
        ]
      },
      {
        id: 4,
        title: 'Mentor Junior Developers',
        description: 'Guide and mentor 2 junior developers in the team',
        category: 'professional',
        status: 'completed',
        progress: 100,
        priority: 'medium',
        startDate: '2024-01-01',
        targetDate: '2024-06-30',
        createdAt: '2023-12-15',
        milestones: [
          { id: 1, title: 'Identify mentees', completed: true },
          { id: 2, title: 'Weekly sessions', completed: true },
          { id: 3, title: 'Project guidance', completed: true },
          { id: 4, title: 'Progress review', completed: true }
        ]
      },
      {
        id: 5,
        title: 'Learn Node.js Backend Development',
        description: 'Build 3 full-stack applications using React and Node.js',
        category: 'learning',
        status: 'in-progress',
        progress: 30,
        priority: 'medium',
        startDate: '2024-04-01',
        targetDate: '2024-10-31',
        createdAt: '2024-03-20',
        milestones: [
          { id: 1, title: 'Learn fundamentals', completed: true },
          { id: 2, title: 'Build first app', completed: false },
          { id: 3, title: 'Advanced features', completed: false }
        ]
      },
      {
        id: 6,
        title: 'Achieve AWS Certification',
        description: 'Complete AWS Solutions Architect Associate certification',
        category: 'certification',
        status: 'in-progress',
        progress: 20,
        priority: 'high',
        startDate: '2024-05-01',
        targetDate: '2024-11-30',
        createdAt: '2024-04-10',
        milestones: [
          { id: 1, title: 'Study materials', completed: true },
          { id: 2, title: 'Practice exams', completed: false },
          { id: 3, title: 'Schedule exam', completed: false }
        ]
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FiCheckCircle className="text-green-500" />;
      case 'in-progress': return <FiClock className="text-blue-500" />;
      case 'not-started': return <FiTarget className="text-gray-500" />;
      default: return <FiTarget className="text-gray-500" />;
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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'professional': return 'bg-blue-100 text-blue-800';
      case 'learning': return 'bg-purple-100 text-purple-800';
      case 'personal': return 'bg-green-100 text-green-800';
      case 'certification': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredGoals = goalsData.goals.filter(goal => {
    if (filter === 'all') return true;
    return goal.status === filter;
  });

  const handleAddGoal = (e) => {
    e.preventDefault();
    alert('New goal added successfully!');
    setShowAddGoal(false);
    setNewGoal({
      title: '',
      description: '',
      category: 'professional',
      targetDate: '',
      priority: 'medium'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiTarget className="text-blue-600 mr-3" />
              Goals & Objectives
            </h1>
            <p className="text-gray-600 mt-2">Set, track, and achieve your personal and professional goals</p>
          </div>
          <button 
            onClick={() => setShowAddGoal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mt-4 lg:mt-0"
          >
            <FiPlus className="text-lg" />
            <span>Add New Goal</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-800">{goalsData.total}</div>
            <div className="text-sm text-gray-600">Total Goals</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-l-4 border-green-500">
            <div className="text-2xl font-bold text-green-600">{goalsData.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-blue-600">{goalsData.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-l-4 border-gray-500">
            <div className="text-2xl font-bold text-gray-600">{goalsData.notStarted}</div>
            <div className="text-sm text-gray-600">Not Started</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Goals
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'completed' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'in-progress' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('not-started')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'not-started' 
                  ? 'bg-gray-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Not Started
            </button>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGoals.map((goal) => (
            <div key={goal.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(goal.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {goal.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                    {goal.priority} priority
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                    {goal.category}
                  </span>
                </div>
              </div>

              {/* Goal Title & Description */}
              <h3 className="font-semibold text-gray-800 text-lg mb-2">{goal.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{goal.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-800">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      goal.progress >= 80 ? 'bg-green-500' :
                      goal.progress >= 50 ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Milestones */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Milestones</span>
                  <span className="font-medium text-gray-800">
                    {goal.milestones.filter(m => m.completed).length} / {goal.milestones.length}
                  </span>
                </div>
                <div className="flex space-x-1">
                  {goal.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className={`flex-1 h-1 rounded-full ${
                        milestone.completed ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                      title={milestone.title}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <FiCalendar className="text-gray-400" />
                  <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                </div>
                <div>
                  {goal.status === 'completed' ? 'Completed' : `${Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24))} days left`}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                  Update Progress
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <FiEdit className="text-lg" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <FiTrash2 className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGoals.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FiTarget className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No goals found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or create a new goal</p>
            <button 
              onClick={() => setShowAddGoal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <FiPlus className="text-lg" />
              <span>Create Your First Goal</span>
            </button>
          </div>
        )}

        {/* Add Goal Modal */}
        {showAddGoal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Add New Goal</h3>
                  <button 
                    onClick={() => setShowAddGoal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiPlus className="text-lg transform rotate-45" />
                  </button>
                </div>
                
                <form onSubmit={handleAddGoal}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Goal Title
                      </label>
                      <input
                        type="text"
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your goal..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Describe your goal..."
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          value={newGoal.category}
                          onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="professional">Professional</option>
                          <option value="learning">Learning</option>
                          <option value="personal">Personal</option>
                          <option value="certification">Certification</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority
                        </label>
                        <select
                          value={newGoal.priority}
                          onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Date
                      </label>
                      <input
                        type="date"
                        value={newGoal.targetDate}
                        onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowAddGoal(false)}
                      className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FiPlus className="text-lg" />
                      <span>Create Goal</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;