import React, { useState } from 'react';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiFileText,
  FiSend,
  FiX,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    duration: '',
    reason: '',
    contact: '',
    handoverTo: ''
  });

  const [showPreview, setShowPreview] = useState(false);

  const leaveTypes = [
    { value: 'casual', label: 'Casual Leave', balance: 7 },
    { value: 'sick', label: 'Sick Leave', balance: 8 },
    { value: 'earned', label: 'Earned Leave', balance: 7 },
    { value: 'optional', label: 'Optional Holiday', balance: 2 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setFormData(prev => ({ ...prev, duration: diffDays }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const confirmApplication = () => {
    alert('Leave application submitted successfully!');
    setShowPreview(false);
    setFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      duration: '',
      reason: '',
      contact: '',
      handoverTo: ''
    });
  };

  const getLeaveBalance = (type) => {
    const leave = leaveTypes.find(l => l.value === type);
    return leave ? leave.balance : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <FiCalendar className="text-blue-600 mr-3" />
            Apply for Leave
          </h1>
          <p className="text-gray-600 mt-2">Fill out the form below to submit your leave application</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <form onSubmit={handleSubmit}>
                {/* Leave Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave Type *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {leaveTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          formData.leaveType === type.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, leaveType: type.value }))}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">{type.label}</h3>
                            <p className="text-sm text-gray-600">Balance: {type.balance} days</p>
                          </div>
                          {formData.leaveType === type.value && (
                            <FiCheck className="text-blue-500 text-lg" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        onBlur={calculateDuration}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        onBlur={calculateDuration}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Leave Days</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {formData.duration || 0} days
                      </span>
                    </div>
                    {formData.leaveType && formData.duration > getLeaveBalance(formData.leaveType) && (
                      <div className="flex items-center mt-2 text-red-600 text-sm">
                        <FiAlertCircle className="mr-2" />
                        <span>Insufficient balance! You only have {getLeaveBalance(formData.leaveType)} days left.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reason */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Leave *
                  </label>
                  <div className="relative">
                    <FiFileText className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      placeholder="Please provide a detailed reason for your leave..."
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Contact and Handover */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Handover To
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="handoverTo"
                        value={formData.handoverTo}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Colleague name"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
                >
                  <FiSend className="text-lg" />
                  <span>Submit Leave Application</span>
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiClock className="text-blue-500 mr-2" />
                Quick Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Application ID</span>
                  <span className="font-medium">L-2024-001</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Submitted Date</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Reporting Manager</span>
                  <span className="font-medium">Priya Sharma</span>
                </div>
              </div>
            </div>

            {/* Leave Policy */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Leave Policy</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <FiCheck className="mr-2 mt-1 text-green-300" />
                  <span>Apply at least 3 days in advance for planned leaves</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="mr-2 mt-1 text-green-300" />
                  <span>Sick leave requires medical certificate for 3+ days</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="mr-2 mt-1 text-green-300" />
                  <span>Maximum 10 consecutive days allowed</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="mr-2 mt-1 text-green-300" />
                  <span>Holidays falling during leave are not counted</span>
                </li>
              </ul>
            </div>

            {/* Help Card */}
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">Need Help?</h3>
              <p className="text-orange-700 text-sm mb-3">
                Contact HR for immediate assistance with your leave application.
              </p>
              <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm">
                Contact HR Department
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Confirm Leave Application</h3>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="text-lg" />
                </button>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Leave Type:</span>
                  <span className="font-medium capitalize">{formData.leaveType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{formData.duration} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dates:</span>
                  <span className="font-medium">{formData.startDate} to {formData.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Handover To:</span>
                  <span className="font-medium">{formData.handoverTo || 'Not specified'}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmApplication}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FiCheck className="text-lg" />
                  <span>Confirm & Submit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyLeave;