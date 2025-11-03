import React, { useState } from 'react';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiBriefcase,
  FiDollarSign,
  FiAward,
  FiEdit3,
  FiSave,
  FiX
} from 'react-icons/fi';

const StaffMyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    personal: {
      name: "Raj Sharma",
      employeeId: "EMP001",
      email: "raj.sharma@company.com",
      phone: "+91-9876543210",
      address: "123 Main Street, Mumbai, Maharashtra - 400001",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      bloodGroup: "B+"
    },
    professional: {
      department: "Sales",
      position: "Senior Executive",
      manager: "Priya Patel",
      joinDate: "2022-01-15",
      workSchedule: "Mon-Fri, 9:00 AM - 6:00 PM",
      employeeType: "Full Time",
      workLocation: "Mumbai Office"
    },
    employment: {
      salary: 67000,
      bankAccount: "XXXX XXXX 1234",
      pfNumber: "PF/2022/001",
      uanNumber: "123456789012",
      insuranceNumber: "INS-456789"
    },
    skills: ["Sales Strategy", "Client Management", "CRM Software", "Team Leadership", "Market Analysis"]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the data
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const handleInputChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your personal and professional information</p>
          </div>
          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <FiEdit3 className="text-lg" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                >
                  <FiSave className="text-lg" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-lg"
                >
                  <FiX className="text-lg" />
                  <span>Cancel</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4 shadow-lg">
                  {profileData.personal.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{profileData.personal.name}</h2>
                <p className="text-gray-600">{profileData.professional.position}</p>
                <p className="text-blue-600 font-medium">{profileData.professional.department}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <FiAward className="text-blue-600 text-xl mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Performance</p>
                  <p className="font-bold text-gray-800">92%</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <FiCalendar className="text-green-600 text-xl mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p className="font-bold text-gray-800">95%</p>
                </div>
              </div>

              {/* Employee ID */}
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">Employee ID</p>
                <p className="font-bold text-gray-800 text-lg">{profileData.personal.employeeId}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiUser className="text-blue-600 mr-3" />
                  Personal Information
                </h3>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.personal.name}
                      onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium text-lg">{profileData.personal.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex items-center space-x-3">
                    <FiMail className="text-gray-400" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.personal.email}
                        onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profileData.personal.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="text-gray-400" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.personal.phone}
                        onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profileData.personal.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.personal.dateOfBirth}
                      onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.personal.dateOfBirth}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="flex items-start space-x-3">
                    <FiMapPin className="text-gray-400 mt-1" />
                    {isEditing ? (
                      <textarea
                        value={profileData.personal.address}
                        onChange={(e) => handleInputChange('personal', 'address', e.target.value)}
                        rows="3"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profileData.personal.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center mb-6">
                <FiBriefcase className="text-green-600 mr-3" />
                Professional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <p className="text-gray-900 font-medium">{profileData.professional.department}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <p className="text-gray-900 font-medium">{profileData.professional.position}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
                  <p className="text-gray-900 font-medium">{profileData.professional.manager}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                  <p className="text-gray-900 font-medium">{profileData.professional.joinDate}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Work Schedule</label>
                  <p className="text-gray-900 font-medium">{profileData.professional.workSchedule}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                  <p className="text-gray-900 font-medium">{profileData.professional.employeeType}</p>
                </div>
              </div>
            </div>

            {/* Skills & Employment Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skills */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Employment Details */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center mb-6">
                  <FiDollarSign className="text-yellow-600 mr-3" />
                  Employment Details
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Salary</span>
                    <span className="font-bold text-green-600">₹{profileData.employment.salary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Bank Account</span>
                    <span className="font-medium">{profileData.employment.bankAccount}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">PF Number</span>
                    <span className="font-medium">{profileData.employment.pfNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">UAN Number</span>
                    <span className="font-medium">{profileData.employment.uanNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffMyProfile;