import React, { useState } from 'react';
import {
  FiTarget,
  FiTrendingUp,
  FiTrendingDown,
  FiBarChart2,
  FiPieChart,
  FiCalendar,
  FiFilter,
  FiDownload,
  FiEye,
  FiArrowUp,
  FiArrowDown,
  FiCheckCircle,
  FiAlertCircle,
  FiClock
} from 'react-icons/fi';

const KPIMetrics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [viewType, setViewType] = useState('grid');

  const kpiData = {
    overview: {
      totalKPIs: 12,
      onTrack: 8,
      atRisk: 3,
      offTrack: 1
    },
    metrics: [
      {
        id: 1,
        name: 'Productivity Rate',
        current: 92,
        target: 90,
        trend: 'up',
        change: 5.2,
        status: 'on-track',
        category: 'Efficiency',
        description: 'Tasks completed vs planned'
      },
      {
        id: 2,
        name: 'Quality Score',
        current: 88,
        target: 85,
        trend: 'up',
        change: 3.1,
        status: 'on-track',
        category: 'Quality',
        description: 'Error-free deliverables'
      },
      {
        id: 3,
        name: 'Project Completion',
        current: 78,
        target: 80,
        trend: 'down',
        change: -2.4,
        status: 'at-risk',
        category: 'Delivery',
        description: 'On-time project delivery'
      },
      {
        id: 4,
        name: 'Customer Satisfaction',
        current: 94,
        target: 90,
        trend: 'up',
        change: 4.7,
        status: 'on-track',
        category: 'Satisfaction',
        description: 'Client feedback score'
      },
      {
        id: 5,
        name: 'Team Collaboration',
        current: 85,
        target: 88,
        trend: 'down',
        change: -1.2,
        status: 'at-risk',
        category: 'Teamwork',
        description: 'Peer feedback rating'
      },
      {
        id: 6,
        name: 'Innovation Index',
        current: 72,
        target: 75,
        trend: 'down',
        change: -3.8,
        status: 'off-track',
        category: 'Innovation',
        description: 'New ideas implemented'
      },
      {
        id: 7,
        name: 'Training Completion',
        current: 95,
        target: 90,
        trend: 'up',
        change: 8.2,
        status: 'on-track',
        category: 'Development',
        description: 'Learning hours completed'
      },
      {
        id: 8,
        name: 'Process Adherence',
        current: 89,
        target: 85,
        trend: 'up',
        change: 2.1,
        status: 'on-track',
        category: 'Compliance',
        description: 'Process compliance rate'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'off-track': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-track': return <FiCheckCircle className="text-green-500" />;
      case 'at-risk': return <FiAlertCircle className="text-yellow-500" />;
      case 'off-track': return <FiClock className="text-red-500" />;
      default: return <FiTarget className="text-gray-500" />;
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <FiArrowUp className="text-green-500" /> : 
      <FiArrowDown className="text-red-500" />;
  };

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'from-green-500 to-green-600';
    if (percentage >= 90) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const exportMetrics = () => {
    alert('KPI metrics exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiTarget className="text-blue-600 mr-3" />
              KPI Metrics Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Track and monitor your key performance indicators</p>
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
            </select>
            <button 
              onClick={exportMetrics}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <FiDownload className="text-lg" />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-800">{kpiData.overview.totalKPIs}</div>
            <div className="text-sm text-gray-600">Total KPIs</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-l-4 border-green-500">
            <div className="text-2xl font-bold text-green-600">{kpiData.overview.onTrack}</div>
            <div className="text-sm text-gray-600">On Track</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-l-4 border-yellow-500">
            <div className="text-2xl font-bold text-yellow-600">{kpiData.overview.atRisk}</div>
            <div className="text-sm text-gray-600">At Risk</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-l-4 border-red-500">
            <div className="text-2xl font-bold text-red-600">{kpiData.overview.offTrack}</div>
            <div className="text-sm text-gray-600">Off Track</div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewType('grid')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewType === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewType === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                List View
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Showing {kpiData.metrics.length} metrics
            </div>
          </div>
        </div>

        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiData.metrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(metric.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status.replace('-', ' ')}
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {metric.category}
                </span>
              </div>

              {/* Metric Name */}
              <h3 className="font-semibold text-gray-800 mb-2">{metric.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{metric.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-800">
                    {metric.current} / {metric.target}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(metric.current, metric.target)}`}
                    style={{ width: `${Math.min((metric.current / metric.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-800">{metric.current}%</div>
                  <div className="text-xs text-gray-500">Current</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700">{metric.target}%</div>
                  <div className="text-xs text-gray-500">Target</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Change</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Performance Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">67%</div>
              <div className="text-sm text-gray-600">KPIs Exceeding Target</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <div className="text-sm text-gray-600">Overall Achievement Rate</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">15%</div>
              <div className="text-sm text-gray-600">Quarter-over-Quarter Growth</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">8.2</div>
              <div className="text-sm text-gray-600">Average Performance Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIMetrics;