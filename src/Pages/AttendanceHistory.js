import React, { useState, useEffect } from 'react';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiCoffee,
  FiSun,
  FiAlertTriangle
} from 'react-icons/fi';

const AttendanceHistory = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const recordsPerPage = 8;

  // Sample static data with warnings - FIXED: Added warnings array to all records
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        date: '2024-01-15',
        day: 'Mon',
        punchIn: '09:00 AM',
        punchOut: '06:15 PM',
        totalHours: '9.25',
        breakTime: '45m',
        effectiveHours: '8.5',
        status: 'present',
        efficiency: '92%',
        breaks: [
          { type: 'lunch', start: '01:00 PM', end: '01:45 PM', duration: '45m' }
        ],
        location: 'Office',
        warnings: [] // Fixed: Added empty array
      },
      {
        id: 2,
        date: '2024-01-14',
        day: 'Sun',
        punchIn: '--',
        punchOut: '--',
        totalHours: '0',
        breakTime: '0m',
        effectiveHours: '0',
        status: 'holiday',
        efficiency: '0%',
        breaks: [],
        location: '--',
        warnings: [] // Fixed: Added empty array
      },
      {
        id: 3,
        date: '2024-01-13',
        day: 'Sat',
        punchIn: '--',
        punchOut: '--',
        totalHours: '0',
        breakTime: '0m',
        effectiveHours: '0',
        status: 'weekend',
        efficiency: '0%',
        breaks: [],
        location: '--',
        warnings: [] // Fixed: Added empty array
      },
      {
        id: 4,
        date: '2024-01-12',
        day: 'Fri',
        punchIn: '09:15 AM',
        punchOut: '06:30 PM',
        totalHours: '9.25',
        breakTime: '1h',
        effectiveHours: '8.25',
        status: 'present',
        efficiency: '89%',
        breaks: [
          { type: 'tea', start: '11:00 AM', end: '11:15 AM', duration: '15m' },
          { type: 'lunch', start: '01:00 PM', end: '01:45 PM', duration: '45m' }
        ],
        location: 'Office',
        warnings: ['Late punch-in'] // Fixed: Added array
      },
      {
        id: 5,
        date: '2024-01-11',
        day: 'Thu',
        punchIn: '08:45 AM',
        punchOut: '05:45 PM',
        totalHours: '9',
        breakTime: '30m',
        effectiveHours: '8.5',
        status: 'present',
        efficiency: '94%',
        breaks: [
          { type: 'lunch', start: '12:30 PM', end: '01:00 PM', duration: '30m' }
        ],
        location: 'WFH',
        warnings: ['Early punch-out'] // Fixed: Added array
      },
      {
        id: 6,
        date: '2024-01-10',
        day: 'Wed',
        punchIn: '09:30 AM',
        punchOut: '04:30 PM',
        totalHours: '7',
        breakTime: '30m',
        effectiveHours: '6.5',
        status: 'half-day',
        efficiency: '93%',
        breaks: [
          { type: 'lunch', start: '01:00 PM', end: '01:30 PM', duration: '30m' }
        ],
        location: 'Office',
        warnings: ['Late punch-in', 'Short working hours'] // Fixed: Added array
      },
      {
        id: 7,
        date: '2024-01-09',
        day: 'Tue',
        punchIn: '10:00 AM',
        punchOut: '07:00 PM',
        totalHours: '9',
        breakTime: '1h',
        effectiveHours: '8',
        status: 'present',
        efficiency: '89%',
        breaks: [
          { type: 'tea', start: '11:30 AM', end: '11:45 AM', duration: '15m' },
          { type: 'lunch', start: '01:30 PM', end: '02:15 PM', duration: '45m' }
        ],
        location: 'Client',
        warnings: ['Late punch-in', 'Long break time'] // Fixed: Added array
      },
      {
        id: 8,
        date: '2024-01-08',
        day: 'Mon',
        punchIn: '--',
        punchOut: '--',
        totalHours: '0',
        breakTime: '0m',
        effectiveHours: '0',
        status: 'absent',
        efficiency: '0%',
        breaks: [],
        location: '--',
        warnings: ['Unauthorized absence'] // Fixed: Added array
      }
    ];

    setAttendanceData(sampleData);
    setFilteredData(sampleData);
  }, []);

  // Filter and search functionality - FIXED: Added safe warnings access
  useEffect(() => {
    let result = attendanceData;

    // Search filter
    if (searchTerm) {
      result = result.filter(item =>
        item.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date.includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.warnings && item.warnings.some(warning => 
          warning.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(item => item.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);

      result = result.filter(item => {
        const itemDate = new Date(item.date);
        switch (dateFilter) {
          case 'this-week':
            return itemDate >= oneWeekAgo;
          case 'last-week':
            return itemDate >= twoWeeksAgo && itemDate < oneWeekAgo;
          case 'this-month':
            return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear();
          default:
            return true;
        }
      });
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, attendanceData]);

  // Sorting functionality
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
  };

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'present':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'absent':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'half-day':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'weekend':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'holiday':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <FiCheckCircle className="text-green-500 text-sm" />;
      case 'absent':
        return <FiXCircle className="text-red-500 text-sm" />;
      case 'half-day':
        return <FiAlertCircle className="text-yellow-500 text-sm" />;
      default:
        return <FiCalendar className="text-gray-500 text-sm" />;
    }
  };

  const getBreakIcons = (breaks) => {
    if (!breaks || breaks.length === 0) return null;
    
    return (
      <div className="flex space-x-1" title={`${breaks.length} breaks`}>
        {breaks.map((breakItem, index) => (
          <span key={index}>
            {breakItem.type === 'tea' ? 
              <FiCoffee className="text-yellow-500 text-xs" /> : 
              <FiSun className="text-orange-500 text-xs" />
            }
          </span>
        ))}
      </div>
    );
  };

  // FIXED: Added safe warnings access with null checks
  const getWarningBadge = (warnings) => {
    // Safe check for warnings array
    const warningList = warnings || [];
    
    if (warningList.length === 0) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
          <FiCheckCircle className="text-green-500 mr-1 text-xs" />
          Clean
        </span>
      );
    }

    return (
      <div className="relative group">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 cursor-pointer">
          <FiAlertTriangle className="text-red-500 mr-1 text-xs" />
          {warningList.length} warning{warningList.length > 1 ? 's' : ''}
        </span>
        
        {/* Warning Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
          <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
            <div className="font-semibold mb-1">Warnings:</div>
            {warningList.map((warning, index) => (
              <div key={index} className="flex items-center space-x-1">
                <FiAlertTriangle className="text-red-400 text-xs" />
                <span>{warning}</span>
              </div>
            ))}
          </div>
          <div className="w-3 h-3 bg-gray-800 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>
    );
  };

  // FIXED: Safe calculation for summary cards
  const presentRecords = attendanceData.filter(d => d.status === 'present');
  const absentRecords = attendanceData.filter(d => d.status === 'absent');
  const warningRecords = attendanceData.filter(d => d.warnings && d.warnings.length > 0);

  const totalHours = presentRecords.reduce((acc, curr) => {
    return acc + (parseFloat(curr.effectiveHours) || 0);
  }, 0).toFixed(0);

  const avgEfficiency = presentRecords.length > 0 
    ? Math.round(presentRecords.reduce((acc, curr) => {
        const efficiency = parseFloat(curr.efficiency) || 0;
        return acc + efficiency;
      }, 0) / presentRecords.length) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-800">Attendance History</h1>
          <p className="text-gray-600 text-sm">Track your attendance records and warnings</p>
        </div>

        {/* Summary Cards - FIXED: Used safe calculated values */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          <div className="bg-white rounded-lg shadow p-3 text-center">
            <div className="text-lg font-bold text-green-600">{presentRecords.length}</div>
            <div className="text-xs text-gray-600">Present</div>
          </div>
          <div className="bg-white rounded-lg shadow p-3 text-center">
            <div className="text-lg font-bold text-red-600">{absentRecords.length}</div>
            <div className="text-xs text-gray-600">Absent</div>
          </div>
          <div className="bg-white rounded-lg shadow p-3 text-center">
            <div className="text-lg font-bold text-blue-600">{totalHours}</div>
            <div className="text-xs text-gray-600">Hours</div>
          </div>
          <div className="bg-white rounded-lg shadow p-3 text-center">
            <div className="text-lg font-bold text-purple-600">{avgEfficiency}%</div>
            <div className="text-xs text-gray-600">Efficiency</div>
          </div>
          <div className="bg-white rounded-lg shadow p-3 text-center">
            <div className="text-lg font-bold text-orange-600">{warningRecords.length}</div>
            <div className="text-xs text-gray-600">With Warnings</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search by date, location or warnings..."
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                className="border border-gray-300 rounded px-2 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="half-day">Half Day</option>
              </select>

              <select
                className="border border-gray-300 rounded px-2 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="this-week">This Week</option>
                <option value="last-week">Last Week</option>
                <option value="this-month">This Month</option>
              </select>

              <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1">
                <FiDownload className="text-sm" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th 
                    className="px-3 py-2 text-left font-medium cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center space-x-1">
                      <FiCalendar className="text-xs" />
                      <span>Date</span>
                      {sortConfig.key === 'date' && (
                        <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-2 py-2 text-left font-medium">Day</th>
                  <th className="px-2 py-2 text-left font-medium">Time</th>
                  <th className="px-2 py-2 text-left font-medium">Hours</th>
                  <th className="px-2 py-2 text-left font-medium">Breaks</th>
                  <th className="px-2 py-2 text-left font-medium">Effective</th>
                  <th className="px-2 py-2 text-left font-medium">Eff %</th>
                  <th className="px-2 py-2 text-left font-medium">Location</th>
                  <th className="px-2 py-2 text-left font-medium">Status</th>
                  <th className="px-2 py-2 text-left font-medium">Warnings</th>
                  <th className="px-2 py-2 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <div className="font-medium text-gray-900">{record.date}</div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="text-gray-700">{record.day}</div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-1">
                          <FiCheckCircle className="text-green-500 text-xs" />
                          <span className="text-xs text-gray-600">{record.punchIn}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiXCircle className="text-red-500 text-xs" />
                          <span className="text-xs text-gray-600">{record.punchOut}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="font-medium">{record.totalHours}h</div>
                      <div className="text-xs text-gray-500">{record.breakTime}</div>
                    </td>
                    <td className="px-2 py-2">
                      {getBreakIcons(record.breaks)}
                    </td>
                    <td className="px-2 py-2">
                      <div className="font-medium text-blue-600">{record.effectiveHours}h</div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-12 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full" 
                            style={{ width: record.efficiency }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{record.efficiency}</span>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                        {record.location}
                      </span>
                    </td>
                    <td className="px-2 py-2">
                      <span className={`inline-flex items-center space-x-1 ${getStatusBadge(record.status)}`}>
                        {getStatusIcon(record.status)}
                        <span className="capitalize text-xs">{record.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-2 py-2">
                      {getWarningBadge(record.warnings)}
                    </td>
                    <td className="px-2 py-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                        <FiEye className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {currentRecords.length === 0 && (
              <div className="text-center py-8">
                <FiCalendar className="text-2xl text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No records found</p>
                <p className="text-gray-400 text-xs">Adjust your filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredData.length > 0 && (
            <div className="px-3 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                <div className="text-xs text-gray-700">
                  Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length}
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 text-xs"
                  >
                    <FiChevronLeft className="text-sm" />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-2 py-1 rounded text-xs ${
                          currentPage === pageNumber
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 text-xs"
                  >
                    <FiChevronRight className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;