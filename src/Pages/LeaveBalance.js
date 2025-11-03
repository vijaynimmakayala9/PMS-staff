import React, { useState } from 'react';
import {
  FiCalendar,
  FiClock,
  FiPlus,
  FiMinus,
  FiTrendingUp,
  FiAward,
  FiRefreshCw
} from 'react-icons/fi';

const LeaveBalance = () => {
  const [leaveData, setLeaveData] = useState({
    casual: { total: 12, used: 5, remaining: 7 },
    sick: { total: 10, used: 2, remaining: 8 },
    earned: { total: 15, used: 8, remaining: 7 },
    maternity: { total: 180, used: 0, remaining: 180 },
    paternity: { total: 15, used: 0, remaining: 15 },
    optional: { total: 3, used: 1, remaining: 2 }
  });

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'from-red-500 to-red-600';
    if (percentage >= 60) return 'from-orange-500 to-orange-600';
    return 'from-green-500 to-green-600';
  };

  const getUsagePercentage = (used, total) => {
    return (used / total) * 100;
  };

  const LeaveCard = ({ type, data, icon, color }) => {
    const usagePercentage = getUsagePercentage(data.used, data.total);
    
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 capitalize">{type} Leave</h3>
              <p className="text-sm text-gray-600">Balance: {data.remaining} days</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">{data.remaining}</div>
            <div className="text-sm text-gray-500">of {data.total}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Used: {data.used} days</span>
            <span className="text-gray-600">{Math.round(usagePercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(usagePercentage)} transition-all duration-500`}
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
            View History
          </button>
          <button className="flex-1 bg-green-50 text-green-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
            Apply Leave
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiCalendar className="text-blue-600 mr-3" />
              Leave Balance
            </h1>
            <p className="text-gray-600 mt-2">Manage your leave balances and track usage</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <FiRefreshCw className="text-lg" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Available</p>
                <p className="text-3xl font-bold mt-2">32 days</p>
                <p className="text-sm opacity-90 mt-1">Across all types</p>
              </div>
              <FiTrendingUp className="text-2xl opacity-90" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Used This Year</p>
                <p className="text-3xl font-bold mt-2">16 days</p>
                <p className="text-sm opacity-90 mt-1">50% of total</p>
              </div>
              <FiClock className="text-2xl opacity-90" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Pending Requests</p>
                <p className="text-3xl font-bold mt-2">2</p>
                <p className="text-sm opacity-90 mt-1">Awaiting approval</p>
              </div>
              <FiAward className="text-2xl opacity-90" />
            </div>
          </div>
        </div>

        {/* Leave Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LeaveCard 
            type="casual" 
            data={leaveData.casual}
            icon={<FiCalendar className="text-blue-500 text-xl" />}
            color="bg-blue-500"
          />
          
          <LeaveCard 
            type="sick" 
            data={leaveData.sick}
            icon={<FiClock className="text-green-500 text-xl" />}
            color="bg-green-500"
          />
          
          <LeaveCard 
            type="earned" 
            data={leaveData.earned}
            icon={<FiTrendingUp className="text-orange-500 text-xl" />}
            color="bg-orange-500"
          />
          
          <LeaveCard 
            type="maternity" 
            data={leaveData.maternity}
            icon={<FiAward className="text-pink-500 text-xl" />}
            color="bg-pink-500"
          />
          
          <LeaveCard 
            type="paternity" 
            data={leaveData.paternity}
            icon={<FiPlus className="text-purple-500 text-xl" />}
            color="bg-purple-500"
          />
          
          <LeaveCard 
            type="optional" 
            data={leaveData.optional}
            icon={<FiMinus className="text-indigo-500 text-xl" />}
            color="bg-indigo-500"
          />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Leave Usage Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">68%</div>
              <div className="text-sm text-gray-600">Casual Leave Used</div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">42%</div>
              <div className="text-sm text-gray-600">Overall Efficiency</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-gray-600">Leaves This Quarter</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <div className="text-sm text-gray-600">Approval Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveBalance;