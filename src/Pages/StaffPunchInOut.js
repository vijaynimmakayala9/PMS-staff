import React, { useState, useEffect, useRef } from 'react';
import {
  FiClock,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiDownload,
  FiBarChart2,
  FiCoffee,
  FiSun,
  FiMoon
} from 'react-icons/fi';

const StaffPunchInOut = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [punchStatus, setPunchStatus] = useState('out');
  const [todayRecords, setTodayRecords] = useState([]);
  const [location, setLocation] = useState('Office');
  const [isLoading, setIsLoading] = useState(false);
  const [showIdlePopup, setShowIdlePopup] = useState(false);
  const [idleTime, setIdleTime] = useState(0);
  const [workStats, setWorkStats] = useState({
    totalHours: 0,
    effectiveHours: 0,
    idleTime: 0,
    breakTime: 0,
    teaBreakCount: 0,
    lunchBreakCount: 0
  });

  const idleTimerRef = useRef(null);
  const activityTimerRef = useRef(null);
  const punchInTimeRef = useRef(null);
  const effectiveTimeRef = useRef(0);
  const idleTimeRef = useRef(0);
  const lastActivityTimeRef = useRef(Date.now());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Calculate work time if punched in
      if (punchStatus === 'in' && punchInTimeRef.current) {
        const totalMs = Date.now() - punchInTimeRef.current;
        const effectiveMs = totalMs - idleTimeRef.current;
        
        setWorkStats(prev => ({
          ...prev,
          totalHours: (totalMs / (1000 * 60 * 60)).toFixed(2),
          effectiveHours: (effectiveMs / (1000 * 60 * 60)).toFixed(2),
          idleTime: (idleTimeRef.current / (1000 * 60)).toFixed(0)
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [punchStatus]);

  // Activity tracking for idle detection
  useEffect(() => {
    const handleActivity = () => {
      lastActivityTimeRef.current = Date.now();
      setShowIdlePopup(false);
      setIdleTime(0);
      
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      
      // Set new idle check timer (1 minute)
      idleTimerRef.current = setTimeout(() => {
        setShowIdlePopup(true);
        startIdleTimer();
      }, 60000); // 1 minute
    };

    // Add event listeners
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    // Initial activity
    handleActivity();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (activityTimerRef.current) clearInterval(activityTimerRef.current);
    };
  }, []);

  const startIdleTimer = () => {
    if (activityTimerRef.current) clearInterval(activityTimerRef.current);
    
    activityTimerRef.current = setInterval(() => {
      const idleSeconds = Math.floor((Date.now() - lastActivityTimeRef.current) / 1000) - 60;
      if (idleSeconds > 0) {
        setIdleTime(idleSeconds);
        idleTimeRef.current += 1000; // Add 1 second to idle time
      }
    }, 1000);
  };

  // Mock today's records
  useEffect(() => {
    const mockRecords = [
      { id: 1, type: 'in', time: '09:00 AM', location: 'Office', status: 'completed' },
      { id: 2, type: 'tea_break', time: '11:00 AM', location: 'Pantry', status: 'completed', duration: '15 mins' },
      { id: 3, type: 'lunch_break', time: '01:00 PM', location: 'Cafeteria', status: 'completed', duration: '45 mins' },
      { id: 4, type: 'tea_break', time: '04:00 PM', location: 'Pantry', status: 'completed', duration: '10 mins' },
    ];
    setTodayRecords(mockRecords);
  }, []);

  const handlePunchIn = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const now = new Date();
      const newRecord = {
        id: todayRecords.length + 1,
        type: 'in',
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        location: location,
        status: 'completed',
        timestamp: now.getTime()
      };
      
      setTodayRecords(prev => [newRecord, ...prev]);
      setPunchStatus('in');
      punchInTimeRef.current = now.getTime();
      effectiveTimeRef.current = 0;
      idleTimeRef.current = 0;
      
      setIsLoading(false);
    }, 1000);
  };

  const handlePunchOut = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const now = new Date();
      const newRecord = {
        id: todayRecords.length + 1,
        type: 'out',
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        location: location,
        status: 'completed',
        timestamp: now.getTime()
      };
      
      // Calculate final work session
      if (punchInTimeRef.current) {
        const totalMs = now.getTime() - punchInTimeRef.current;
        const effectiveMs = totalMs - idleTimeRef.current;
        
        setWorkStats(prev => ({
          ...prev,
          totalHours: (totalMs / (1000 * 60 * 60)).toFixed(2),
          effectiveHours: (effectiveMs / (1000 * 60 * 60)).toFixed(2),
          idleTime: (idleTimeRef.current / (1000 * 60)).toFixed(0)
        }));
      }
      
      setTodayRecords(prev => [newRecord, ...prev]);
      setPunchStatus('out');
      punchInTimeRef.current = null;
      
      setIsLoading(false);
    }, 1000);
  };

  const handleBreak = (breakType) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const now = new Date();
      const breakRecord = {
        id: todayRecords.length + 1,
        type: breakType,
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        location: location,
        status: 'completed',
        timestamp: now.getTime()
      };
      
      setTodayRecords(prev => [breakRecord, ...prev]);
      
      // Update break counts
      if (breakType === 'tea_break') {
        setWorkStats(prev => ({ ...prev, teaBreakCount: prev.teaBreakCount + 1 }));
      } else if (breakType === 'lunch_break') {
        setWorkStats(prev => ({ ...prev, lunchBreakCount: prev.lunchBreakCount + 1 }));
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in': return 'bg-green-100 text-green-800 border-green-200';
      case 'out': return 'bg-red-100 text-red-800 border-red-200';
      case 'break': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'in': return 'Working';
      case 'out': return 'Not Working';
      case 'break': return 'On Break';
      default: return 'Unknown';
    }
  };

  const getRecordIcon = (type) => {
    switch (type) {
      case 'in': return <FiCheckCircle className="text-green-500 text-lg" />;
      case 'out': return <FiCheckCircle className="text-red-500 text-lg" />;
      case 'tea_break': return <FiCoffee className="text-yellow-500 text-lg" />;
      case 'lunch_break': return <FiSun className="text-orange-500 text-lg" />;
      default: return <FiClock className="text-gray-500 text-lg" />;
    }
  };

  const getRecordText = (type) => {
    switch (type) {
      case 'in': return 'Punched In - Work Started';
      case 'out': return 'Punched Out - Work Ended';
      case 'tea_break': return 'Tea Break';
      case 'lunch_break': return 'Lunch Break';
      default: return 'Unknown';
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Idle Popup */}
      {showIdlePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-bounce">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAlertCircle className="text-yellow-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Hey there! 👋</h3>
            <p className="text-gray-600 mb-2">You seem to be away from your desk</p>
            <p className="text-gray-500 text-sm mb-4">Idle for: {formatTime(idleTime)}</p>
            <p className="text-lg font-semibold text-blue-600 mb-4">
              Time to get back to work! Your productivity matters! 🚀
            </p>
            <button
              onClick={() => {
                setShowIdlePopup(false);
                setIdleTime(0);
                lastActivityTimeRef.current = Date.now();
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              I'm Back! Let's Work 💪
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Smart Attendance System</h1>
          <p className="text-gray-600 mt-2">Track your work hours with intelligent idle detection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Punch Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Status Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Current Status</h2>
                <div className={`px-4 py-2 rounded-full border-2 font-semibold ${getStatusColor(punchStatus)}`}>
                  {getStatusText(punchStatus)}
                </div>
              </div>

              {/* Current Time */}
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-800 mb-2">
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-lg text-gray-600">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center justify-center space-x-2 mb-6 p-4 bg-gray-50 rounded-xl">
                <FiMapPin className="text-blue-500 text-xl" />
                <span className="text-gray-700 font-medium">Location: </span>
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-none bg-transparent font-semibold text-blue-600 focus:outline-none"
                >
                  <option value="Office">Office</option>
                  <option value="Work From Home">Work From Home</option>
                  <option value="Client Site">Client Site</option>
                </select>
              </div>

              {/* Punch Buttons */}
              <div className="space-y-4">
                {punchStatus === 'out' ? (
                  <button
                    onClick={handlePunchIn}
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      <FiClock className="text-xl" />
                    )}
                    <span>START WORKING 🚀</span>
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleBreak('tea_break')}
                      disabled={isLoading}
                      className="bg-yellow-500 text-white py-4 rounded-xl font-bold hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <FiCoffee className="text-lg" />
                      )}
                      <span>Tea Break</span>
                    </button>
                    
                    <button
                      onClick={() => handleBreak('lunch_break')}
                      disabled={isLoading}
                      className="bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <FiSun className="text-lg" />
                      )}
                      <span>Lunch Break</span>
                    </button>
                    
                    <button
                      onClick={handlePunchOut}
                      disabled={isLoading}
                      className="col-span-2 bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <FiCheckCircle className="text-lg" />
                      )}
                      <span>END WORK DAY</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Work Analytics */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FiBarChart2 className="text-purple-600 mr-3" />
                Work Analytics
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <FiClock className="text-blue-600 text-2xl mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Total Hours</p>
                  <p className="font-bold text-gray-800 text-lg">{workStats.totalHours}h</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <FiUser className="text-green-600 text-2xl mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Effective Hours</p>
                  <p className="font-bold text-gray-800 text-lg">{workStats.effectiveHours}h</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <FiAlertCircle className="text-red-600 text-2xl mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Idle Time</p>
                  <p className="font-bold text-gray-800 text-lg">{workStats.idleTime}m</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <FiCoffee className="text-yellow-600 text-2xl mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Tea Breaks</p>
                  <p className="font-bold text-gray-800 text-lg">{workStats.teaBreakCount}</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <FiSun className="text-orange-600 text-2xl mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Lunch Breaks</p>
                  <p className="font-bold text-gray-800 text-lg">{workStats.lunchBreakCount}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <FiCalendar className="text-purple-600 text-2xl mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Efficiency</p>
                  <p className="font-bold text-gray-800 text-lg">
                    {workStats.totalHours > 0 ? 
                      Math.round((workStats.effectiveHours / workStats.totalHours) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Records */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Complete Timeline */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiCalendar className="text-blue-600 mr-3" />
                  Today's Complete Timeline
                </h3>
                <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <FiDownload className="text-lg" />
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {todayRecords.length > 0 ? (
                  todayRecords.map((record) => (
                    <div key={record.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      {getRecordIcon(record.type)}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{getRecordText(record.type)}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>🕒 {record.time}</span>
                          <span>📍 {record.location}</span>
                          {record.duration && <span>⏱️ {record.duration}</span>}
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        record.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FiClock className="text-4xl mx-auto mb-3 text-gray-300" />
                    <p>No activity recorded today</p>
                    <p className="text-sm">Start working to see your timeline</p>
                  </div>
                )}
              </div>

              {/* Daily Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Daily Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Work Started:</span>
                    <span className="font-medium">
                      {todayRecords.find(r => r.type === 'in')?.time || '--:--'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Breaks:</span>
                    <span className="font-medium">{workStats.teaBreakCount + workStats.lunchBreakCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Productivity:</span>
                    <span className="font-medium text-green-600">
                      {workStats.totalHours > 0 ? 
                        Math.round((workStats.effectiveHours / workStats.totalHours) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Idle Time:</span>
                    <span className="font-medium text-red-600">{workStats.idleTime} minutes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                  <FiBarChart2 className="text-lg" />
                  <span>View Weekly Report</span>
                </button>
                <button className="py-3 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2">
                  <FiDownload className="text-lg" />
                  <span>Export Data</span>
                </button>
                <button className="py-3 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center space-x-2">
                  <FiUser className="text-lg" />
                  <span>My Performance</span>
                </button>
                <button className="py-3 px-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2">
                  <FiCalendar className="text-lg" />
                  <span>Attendance History</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPunchInOut;