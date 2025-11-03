import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ isCollapsed, isMobile }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://credenhealth.onrender.com/api/staff/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("staffToken");
      alert("Logout successful");
      window.location.href = "/staff-login";
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const staffElements = [
    {
      icon: <i className="ri-dashboard-fill text-white"></i>,
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <i className="ri-user-fill text-white"></i>,
      name: "My Profile",
      path: "/myprofile",
    },
    {
      icon: <i className="ri-time-fill text-white"></i>,
      name: "Attendance",
      dropdown: [
        { name: "Punch In/Out", path: "/punch" },
        { name: "Attendance History", path: "/attendance" },
        { name: "Monthly Report", path: "/report" },
      ],
    },
    {
      icon: <i className="ri-task-fill text-white"></i>,
      name: "Tasks",
      dropdown: [
        { name: "My Tasks", path: "/mytasks" },
        { name: "Task History", path: "/taskhistory" },
        { name: "Performance", path: "/myperformance" },
      ],
    },
    {
      icon: <i className="ri-calendar-event-fill text-white"></i>,
      name: "Leave",
      dropdown: [
        { name: "Apply Leave", path: "/applyleave" },
        { name: "Leave Balance", path: "/leavebalance" },
        { name: "Leave History", path: "/leavehistory" },
      ],
    },
    {
      icon: <i className="ri-money-dollar-circle-fill text-white"></i>,
      name: "Salary",
      dropdown: [
        { name: "Salary Slips", path: "/salaryslip" },
      ],
    },
    {
      icon: <i className="ri-bar-chart-fill text-white"></i>,
      name: "Performance",
      dropdown: [
        { name: "Performance Report", path: "/performancereport" },
        { name: "KPI Metrics", path: "/kpi" },
        { name: "Goals", path: "/goals" },
      ],
    },
    {
      icon: <i className="ri-team-fill text-white"></i>,
      name: "Team",
      dropdown: [
        { name: "Team Members", path: "/teammembers" },
        { name: "Team Projects", path: "/teamprojects" },
      ],
    },
    {
      icon: <i className="ri-file-text-fill text-white"></i>,
      name: "Documents",
      dropdown: [
        { name: "My Documents", path: "/mydocuments" },
        { name: "Upload Documents", path: "/upload-documents" },
      ],
    },
    {
      icon: <i className="ri-settings-3-fill text-white"></i>,
      name: "Settings",
      dropdown: [
        { name: "Profile Settings", path: "/profile-settings" },
        { name: "Change Password", path: "/change-password" },
        { name: "Notifications", path: "/staff-notifications" },
      ],
    },
    {
      icon: <i className="ri-logout-box-fill text-white"></i>,
      name: "Logout",
      action: handleLogout,
    },
  ];

  return (
    <div
      className={`transition-all duration-300 ${
        isMobile ? (isCollapsed ? "w-0" : "w-64") : isCollapsed ? "w-16" : "w-64"
      } h-screen overflow-y-scroll no-scrollbar flex flex-col bg-gradient-to-b from-blue-800 to-purple-800`}
    >
      {/* Header */}
      <div className="sticky top-0 p-4 font-bold text-white flex justify-center text-xl bg-blue-900">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <i className="ri-user-fill text-blue-600 text-lg"></i>
          </div>
          {(!isCollapsed || isMobile) && <span>Staff Portal</span>}
        </div>
      </div>
      
      <div className="border-b-2 border-blue-600 my-2"></div>
      {/* Navigation Menu */}
      <nav className={`flex flex-col ${isCollapsed && !isMobile ? "items-center" : ""} space-y-2 mt-2 flex-1`}>
        {staffElements.map((item, idx) => (
          <div key={idx} className="px-2">
            {item.dropdown ? (
              <>
                <div
                  className={`flex items-center py-3 font-semibold text-sm text-white rounded-lg hover:bg-blue-700 hover:text-yellow-300 duration-300 cursor-pointer ${
                    isCollapsed && !isMobile ? "justify-center px-3" : "px-4"
                  }`}
                  onClick={() => toggleDropdown(item.name)}
                >
                  <span className="text-xl">{item.icon}</span>
                  {(!isCollapsed || isMobile) && (
                    <>
                      <span className="ml-4 flex-1">{item.name}</span>
                      <FaChevronDown
                        className={`text-xs transform transition-transform ${
                          openDropdown === item.name ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </>
                  )}
                </div>
                {openDropdown === item.name && (!isCollapsed || isMobile) && (
                  <ul className="ml-6 text-sm text-white space-y-1 py-2">
                    {item.dropdown.map((subItem, subIdx) => (
                      <li key={subIdx}>
                        <Link
                          to={subItem.path}
                          className="flex items-center space-x-2 py-2 px-4 font-medium cursor-pointer hover:text-white rounded transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span className="text-yellow-300 text-xs">•</span>
                          <span className="text-sm">{subItem.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center py-3 font-semibold text-sm text-white rounded-lg hover:bg-blue-700 hover:text-yellow-300 duration-300 cursor-pointer ${
                  isCollapsed && !isMobile ? "justify-center px-3" : "px-4"
                }`}
                onClick={item.action ? item.action : null}
              >
                <span className="text-xl">{item.icon}</span>
                {(!isCollapsed || isMobile) && (
                  <span className="ml-4">{item.name}</span>
                )}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Footer - Only show when not collapsed */}
      {(!isCollapsed || isMobile) && (
        <div className="p-4 border-t border-blue-600">
          <div className="text-center text-white text-xs opacity-75">
            <p>© 2024 Company Name</p>
            <p className="mt-1">Staff Portal v1.0</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
