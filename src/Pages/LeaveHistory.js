import React, { useState } from 'react';
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2
} from 'react-icons/fi';

const LeaveHistory = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const leaveHistory = [
    {
      id: 'L-2024-001',
      type: 'Casual Leave',
      startDate: '2024-01-15',
      endDate: '2024-01-16',
      duration: 2,
      status: 'approved',
      appliedDate: '2024-01-10',
      approvedDate: '2024-01-11',
      reason: 'Family function',
      approver: 'Priya Sharma',
      balanceAfter: 10
    },
    {
      id: 'L-2024-002',
      type: 'Sick Leave',
      startDate: '2024-02-20',
      endDate: '2024-02-22',
      duration: 3,
      status: 'approved',
      appliedDate: '2024-02-19',
      approvedDate: '2024-02-19',
      reason: 'Medical checkup',
      approver: 'Raj Kumar',
      balanceAfter: 7
    },
    {
      id: 'L-2024-003',
      type: 'Earned Leave',
      startDate: '2024-03-10',
      endDate: '2024-03-15',
      duration: 6,
      status: 'pending',
      appliedDate: '2024-03-01',
      approvedDate: null,
      reason: 'Vacation with family',
      approver: 'Pending',
      balanceAfter: 9
    },
    {
      id: 'L-2024-004',
      type: 'Optional Holiday',
      startDate: '2024-03-25',
      endDate: '2024-03-25',
      duration: 1,
      status: 'rejected',
      appliedDate: '2024-03-20',
      approvedDate: '2024-03-21',
      reason: 'Personal work',
      approver: 'Anjali Singh',
      balanceAfter: 2
    },
    {
      id: 'L-2024-005',
      type: 'Casual Leave',
      startDate: '2024-04-05',
      endDate: '2024-04-05',
      duration: 1,
      status: 'approved',
      appliedDate: '2024-04-01',
      approvedDate: '2024-04-02',
      reason: 'Doctor appointment',
      approver: 'Priya Sharma',
      balanceAfter: 6
    },
    {
      id: 'L-2024-006',
      type: 'Sick Leave',
      startDate: '2024-04-12',
      endDate: '2024-04-13',
      duration: 2,
      status: 'approved',
      appliedDate: '2024-04-11',
      approvedDate: '2024-04-11',
      reason: 'Fever and cold',
      approver: 'Raj Kumar',
      balanceAfter: 5
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <FiCheckCircle className="text-green-500" />;
      case 'rejected': return <FiXCircle className="text-red-500" />;
      case 'pending': return <FiAlertCircle className="text-yellow-500" />;
      default: return <FiClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Casual Leave': return 'bg-blue-100 text-blue-800';
      case 'Sick Leave': return 'bg-green-100 text-green-800';
      case 'Earned Leave': return 'bg-purple-100 text-purple-800';
      case 'Optional Holiday': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLeaves = leaveHistory.filter(leave => {
    const matchesFilter = filter === 'all' || leave.status === filter;
    const matchesSearch = leave.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leave.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: leaveHistory.length,
    approved: leaveHistory.filter(l => l.status === 'approved').length,
    pending: leaveHistory.filter(l => l.status === 'pending').length,
    rejected: leaveHistory.filter(l => l.status === 'rejected').length
  };

  const exportToCSV = () => {
    alert('Leave history exported to CSV successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiCalendar className="text-blue-600 mr-3" />
              Leave History
            </h1>
            <p className="text-gray-600 mt-2">Track all your leave applications and their status</p>
          </div>
          <button 
            onClick={exportToCSV}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mt-4 lg:mt-0"
          >
            <FiDownload className="text-lg" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by leave type or reason..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'approved' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'pending' 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'rejected' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>

        {/* Leave History Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Leave Details</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Duration</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Dates</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Approver</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(leave.type)}`}>
                            {leave.type}
                          </span>
                          <span className="text-sm text-gray-500">{leave.id}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{leave.reason}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Applied: {new Date(leave.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-600">{leave.duration}</div>
                        <div className="text-sm text-gray-500">days</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-800">
                          {new Date(leave.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-gray-500">to</div>
                        <div className="font-medium text-gray-800">
                          {new Date(leave.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(leave.status)}`}>
                        {getStatusIcon(leave.status)}
                        <span className="ml-1 capitalize">{leave.status}</span>
                      </div>
                      {leave.approvedDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(leave.approvedDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{leave.approver}</div>
                      <div className="text-xs text-gray-500">Balance: {leave.balanceAfter}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                          <FiEye className="text-lg" />
                        </button>
                        {leave.status === 'pending' && (
                          <>
                            <button className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors">
                              <FiEdit className="text-lg" />
                            </button>
                            <button className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors">
                              <FiTrash2 className="text-lg" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredLeaves.length === 0 && (
              <div className="text-center py-12">
                <FiCalendar className="text-4xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">No leave applications found</p>
                <p className="text-gray-400 text-sm">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Leave Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">18</div>
              <div className="text-sm text-gray-600">Total Leaves Taken</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">14</div>
              <div className="text-sm text-gray-600">Leaves Approved</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600">2.1</div>
              <div className="text-sm text-gray-600">Avg. Leave Duration</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">78%</div>
              <div className="text-sm text-gray-600">Approval Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;