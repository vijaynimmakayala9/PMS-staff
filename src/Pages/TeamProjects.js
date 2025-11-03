import React, { useState } from 'react';
import {
  FiFolder,
  FiPlus,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiUsers,
  FiFlag,
  FiBarChart2,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
  FiEye,
  FiDownload,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPause
} from 'react-icons/fi';

const TeamProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'E-commerce Platform Redesign',
      description: 'Complete redesign of the company e-commerce platform with modern UI/UX',
      status: 'in-progress',
      priority: 'high',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      progress: 65,
      teamMembers: 8,
      budget: '$125,000',
      tasks: {
        total: 48,
        completed: 31,
        pending: 17
      },
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      manager: 'Priya Sharma'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Build a cross-platform mobile application for customer engagement',
      status: 'planning',
      priority: 'high',
      startDate: '2024-03-01',
      endDate: '2024-09-15',
      progress: 20,
      teamMembers: 6,
      budget: '$95,000',
      tasks: {
        total: 36,
        completed: 7,
        pending: 29
      },
      technologies: ['React Native', 'Firebase', 'Redux'],
      manager: 'Rajesh Kumar'
    },
    {
      id: 3,
      name: 'Data Analytics Dashboard',
      description: 'Develop an interactive dashboard for business intelligence and analytics',
      status: 'completed',
      priority: 'medium',
      startDate: '2023-11-10',
      endDate: '2024-02-28',
      progress: 100,
      teamMembers: 4,
      budget: '$75,000',
      tasks: {
        total: 28,
        completed: 28,
        pending: 0
      },
      technologies: ['Python', 'D3.js', 'PostgreSQL', 'Tableau'],
      manager: 'Mike Johnson'
    },
    {
      id: 4,
      name: 'CRM System Upgrade',
      description: 'Upgrade and migrate the existing CRM system to latest version',
      status: 'on-hold',
      priority: 'medium',
      startDate: '2024-02-01',
      endDate: '2024-07-15',
      progress: 35,
      teamMembers: 5,
      budget: '$85,000',
      tasks: {
        total: 42,
        completed: 15,
        pending: 27
      },
      technologies: ['Salesforce', 'Apex', 'Integration APIs'],
      manager: 'Amit Verma'
    },
    {
      id: 5,
      name: 'AI Chatbot Implementation',
      description: 'Implement AI-powered chatbot for customer support automation',
      status: 'in-progress',
      priority: 'high',
      startDate: '2024-03-20',
      endDate: '2024-08-10',
      progress: 45,
      teamMembers: 7,
      budget: '$110,000',
      tasks: {
        total: 52,
        completed: 23,
        pending: 29
      },
      technologies: ['Python', 'TensorFlow', 'NLP', 'Dialogflow'],
      manager: 'Neha Gupta'
    },
    {
      id: 6,
      name: 'Website Performance Optimization',
      description: 'Optimize website performance and improve core web vitals',
      status: 'in-progress',
      priority: 'low',
      startDate: '2024-04-01',
      endDate: '2024-05-30',
      progress: 80,
      teamMembers: 3,
      budget: '$35,000',
      tasks: {
        total: 18,
        completed: 14,
        pending: 4
      },
      technologies: ['Next.js', 'CDN', 'Lighthouse', 'Webpack'],
      manager: 'Anjali Singh'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FiCheckCircle className="text-green-500" />;
      case 'in-progress': return <FiBarChart2 className="text-blue-500" />;
      case 'planning': return <FiClock className="text-yellow-500" />;
      case 'on-hold': return <FiPause className="text-orange-500" />;
      default: return <FiFolder className="text-gray-500" />;
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

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const exportProjects = () => {
    alert('Projects data exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiFolder className="text-blue-600 mr-3" />
              Team Projects
            </h1>
            <p className="text-gray-600 mt-2">Manage and track all team projects and their progress</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <FiPlus className="text-lg" />
              <span>New Project</span>
            </button>
            <button 
              onClick={exportProjects}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <FiDownload className="text-lg" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-800">{projects.length}</div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {projects.filter(p => p.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-red-600">
              {projects.filter(p => p.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by name or description..."
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
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
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
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(project.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority} priority
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FiMoreVertical />
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <h3 className="font-semibold text-gray-800 text-lg mb-2">{project.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-800">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(project.progress)} transition-all duration-500`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-800">{project.tasks.completed}/{project.tasks.total}</div>
                  <div className="text-xs text-gray-500">Tasks</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">{project.teamMembers}</div>
                  <div className="text-xs text-gray-500">Team</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">{project.budget}</div>
                  <div className="text-xs text-gray-500">Budget</div>
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <FiCalendar className="text-gray-400 text-sm" />
                  <span className="text-xs text-gray-500">
                    {new Date(project.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Project Manager</div>
                  <div className="text-sm font-medium text-gray-800">{project.manager}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1">
                  <FiEye className="text-sm" />
                  <span>View</span>
                </button>
                <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-1">
                  <FiEdit className="text-sm" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FiFolder className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto">
              <FiPlus className="text-lg" />
              <span>Create New Project</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamProjects;