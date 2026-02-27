import React, { useState } from 'react';
import {
  FiUsers,
  FiSearch,
  FiMail,
  FiMapPin,
  FiStar,
  FiMoreVertical,
  FiUserPlus,
  FiDownload,
  FiEdit,
  FiMessageSquare
} from 'react-icons/fi';

const TeamMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const teamMembers = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Project Manager',
      department: 'Management',
      email: 'priya.sharma@company.com',
      phone: '+91 98765 43210',
      location: 'Bangalore',
      joinDate: '2022-03-15',
      avatar: 'PS',
      status: 'active',
      skills: ['Leadership', 'Agile', 'Stakeholder Management'],
      projects: 12,
      performance: 95,
      availability: 'available'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Senior Developer',
      department: 'Technology',
      email: 'rajesh.kumar@company.com',
      phone: '+91 87654 32109',
      location: 'Hyderabad',
      joinDate: '2021-08-22',
      avatar: 'RK',
      status: 'active',
      skills: ['React', 'Node.js', 'AWS', 'MongoDB'],
      projects: 8,
      performance: 88,
      availability: 'busy'
    },
    {
      id: 3,
      name: 'Anjali Singh',
      role: 'UI/UX Designer',
      department: 'Design',
      email: 'anjali.singh@company.com',
      phone: '+91 76543 21098',
      location: 'Mumbai',
      joinDate: '2023-01-10',
      avatar: 'AS',
      status: 'active',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      projects: 6,
      performance: 92,
      availability: 'available'
    },
    {
      id: 4,
      name: 'Mike Johnson',
      role: 'DevOps Engineer',
      department: 'Technology',
      email: 'mike.johnson@company.com',
      phone: '+91 65432 10987',
      location: 'Remote',
      joinDate: '2020-11-05',
      avatar: 'MJ',
      status: 'active',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
      projects: 10,
      performance: 90,
      availability: 'available'
    },
    {
      id: 5,
      name: 'Sneha Patel',
      role: 'QA Engineer',
      department: 'Quality',
      email: 'sneha.patel@company.com',
      phone: '+91 54321 09876',
      location: 'Delhi',
      joinDate: '2022-06-18',
      avatar: 'SP',
      status: 'active',
      skills: ['Automation', 'Selenium', 'Jest', 'Cypress'],
      projects: 7,
      performance: 85,
      availability: 'away'
    },
    {
      id: 6,
      name: 'Amit Verma',
      role: 'Product Manager',
      department: 'Product',
      email: 'amit.verma@company.com',
      phone: '+91 43210 98765',
      location: 'Bangalore',
      joinDate: '2021-12-03',
      avatar: 'AV',
      status: 'active',
      skills: ['Product Strategy', 'Roadmapping', 'Analytics'],
      projects: 9,
      performance: 94,
      availability: 'available'
    },
    {
      id: 7,
      name: 'Neha Gupta',
      role: 'Frontend Developer',
      department: 'Technology',
      email: 'neha.gupta@company.com',
      phone: '+91 32109 87654',
      location: 'Pune',
      joinDate: '2023-03-22',
      avatar: 'NG',
      status: 'active',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
      projects: 5,
      performance: 87,
      availability: 'busy'
    },
    {
      id: 8,
      name: 'Rohit Mehta',
      role: 'Backend Developer',
      department: 'Technology',
      email: 'rohit.mehta@company.com',
      phone: '+91 21098 76543',
      location: 'Chennai',
      joinDate: '2022-09-14',
      avatar: 'RM',
      status: 'on-leave',
      skills: ['Java', 'Spring Boot', 'MySQL', 'Microservices'],
      projects: 6,
      performance: 82,
      availability: 'offline'
    }
  ];

  const departments = ['all', 'Technology', 'Design', 'Management', 'Quality', 'Product'];
  const roles = ['all', 'Developer', 'Designer', 'Manager', 'Engineer'];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'all' || member.department === departmentFilter;
    const matchesRole = roleFilter === 'all' || member.role.toLowerCase().includes(roleFilter.toLowerCase());
    
    return matchesSearch && matchesDept && matchesRole;
  });

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'away': return 'bg-orange-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const exportTeam = () => {
    alert('Team data exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiUsers className="text-blue-600 mr-3" />
              Team Members
            </h1>
            <p className="text-gray-600 mt-2">Manage and connect with your team members</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <FiUserPlus className="text-lg" />
              <span>Add Member</span>
            </button>
            <button 
              onClick={exportTeam}
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
            <div className="text-2xl font-bold text-gray-800">{teamMembers.length}</div>
            <div className="text-sm text-gray-600">Total Members</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {teamMembers.filter(m => m.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {teamMembers.filter(m => m.department === 'Technology').length}
            </div>
            <div className="text-sm text-gray-600">Tech Team</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {teamMembers.reduce((acc, member) => acc + member.projects, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search team members by name, role, or department..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept} className="capitalize">
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>

              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                {roles.map(role => (
                  <option key={role} value={role} className="capitalize">
                    {role === 'all' ? 'All Roles' : role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(member.availability)}`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <FiMoreVertical />
                </button>
              </div>

              {/* Department & Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">{member.department}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                  {member.status.replace('-', ' ')}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FiMail className="text-gray-400" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FiMapPin className="text-gray-400" />
                  <span>{member.location}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {member.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                      +{member.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-800">{member.projects}</div>
                  <div className="text-xs text-gray-500">Projects</div>
                </div>
                <div>
                  <div className={`text-lg font-bold ${getPerformanceColor(member.performance)}`}>
                    {member.performance}%
                  </div>
                  <div className="text-xs text-gray-500">Performance</div>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <FiStar className="text-yellow-500 mr-1" />
                    <span className="text-lg font-bold text-gray-800">4.8</span>
                  </div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1">
                  <FiMessageSquare className="text-sm" />
                  <span>Message</span>
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
        {filteredMembers.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FiUsers className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No team members found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto">
              <FiUserPlus className="text-lg" />
              <span>Add New Member</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMembers;