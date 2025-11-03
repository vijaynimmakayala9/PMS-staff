import React, { useState } from 'react';
import {
  FiTrendingUp,
  FiBarChart2,
  FiTarget,
  FiAward,
  FiCalendar,
  FiDownload,
  FiFilter,
  FiEye,
  FiUsers,
  FiStar,
  FiActivity
} from 'react-icons/fi';

const PerformanceReport = () => {
  const [timeRange, setTimeRange] = useState('quarter');
  const [selectedMetric, setSelectedMetric] = useState('overall');

  const performanceData = {
    overallScore: 87,
    metrics: {
      productivity: 92,
      quality: 88,
      efficiency: 85,
      teamwork: 90,
      innovation: 82
    },
    trend: [
      { month: 'Jan', score: 78, productivity: 80, quality: 76 },
      { month: 'Feb', score: 82, productivity: 85, quality: 79 },
      { month: 'Mar', score: 85, productivity: 88, quality: 82 },
      { month: 'Apr', score: 87, productivity: 90, quality: 84 },
      { month: 'May', score: 90, productivity: 92, quality: 88 },
      { month: 'Jun', score: 87, productivity: 89, quality: 85 }
    ],
    achievements: [
      { id: 1, title: 'Top Performer', description: 'Ranked #1 in team for Q2', date: '2024-06-30', points: 100 },
      { id: 2, title: 'Quality Champion', description: 'Zero defects in deliverables', date: '2024-06-15', points: 75 },
      { id: 3, title: 'Team Player', description: 'Recognized for collaboration', date: '2024-05-28', points: 50 }
    ],
    comparison: {
      teamAverage: 79,
      companyAverage: 75,
      yourRank: 2,
      totalEmployees: 45
    }
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

  const exportReport = () => {
    alert('Performance report exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiActivity className="text-blue-600 mr-3" />
              Performance Report
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive analysis of your work performance and achievements</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button 
              onClick={exportReport}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <FiDownload className="text-lg" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overall Score Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Overall Performance Score</h2>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{performanceData.overallScore}/100</div>
                  <div className="text-sm text-gray-500">Current Rating</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(performanceData.metrics).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className={`text-2xl font-bold ${getScoreColor(value)}`}>{value}</div>
                    <div className="text-sm text-gray-600 capitalize mt-1">{key}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${getScoreBg(value)}`}
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Trend */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Performance Trend</h2>
              <div className="flex items-end justify-between h-48">
                {performanceData.trend.map((month, index) => (
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

            {/* Recent Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FiAward className="text-yellow-500 mr-2" />
                Recent Achievements
              </h2>
              <div className="space-y-4">
                {performanceData.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-yellow-100 rounded-full">
                        <FiStar className="text-yellow-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">+{achievement.points}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(achievement.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Comparison Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Comparison</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Your Score</span>
                  <span className="font-bold text-blue-600">{performanceData.overallScore}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Team Average</span>
                  <span className="font-bold text-gray-600">{performanceData.comparison.teamAverage}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Company Average</span>
                  <span className="font-bold text-gray-600">{performanceData.comparison.companyAverage}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Your Rank</span>
                    <span className="font-bold text-green-600">
                      #{performanceData.comparison.yourRank} of {performanceData.comparison.totalEmployees}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Key Strengths</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FiTrendingUp className="mr-2 text-green-300" />
                  <span>Consistently exceeds productivity targets</span>
                </li>
                <li className="flex items-center">
                  <FiUsers className="mr-2 text-green-300" />
                  <span>Excellent team collaboration skills</span>
                </li>
                <li className="flex items-center">
                  <FiTarget className="mr-2 text-green-300" />
                  <span>Strong problem-solving abilities</span>
                </li>
                <li className="flex items-center">
                  <FiStar className="mr-2 text-green-300" />
                  <span>High quality of work delivery</span>
                </li>
              </ul>
            </div>

            {/* Improvement Areas */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Areas for Improvement</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Documentation consistency</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Cross-team communication</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Innovation initiative</span>
                </li>
              </ul>
            </div>

            {/* Manager Feedback */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Manager's Feedback</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm italic">
                  "Excellent performance this quarter! Your productivity and quality metrics are outstanding. 
                  Continue focusing on innovation and cross-team collaboration to reach the next level."
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-600">- Priya Sharma</span>
                  <span className="text-xs text-gray-500">Reporting Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReport;