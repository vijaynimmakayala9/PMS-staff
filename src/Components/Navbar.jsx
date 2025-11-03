import { MdNotificationsNone } from "react-icons/md";
import { RiMenu2Line, RiMenu3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsCollapsed, isCollapsed }) => {
  const navigate = useNavigate();

  const totalNotifications = 5; // Dummy count

  const handleNotificationsClick = () => {
    navigate("/notifications");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white sticky top-0 w-full h-16 px-6 flex items-center shadow-xl z-50 border-b border-white/20">
      {/* Sidebar toggle button - More stylish */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)} 
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm mr-4 group"
      >
        {isCollapsed ? (
          <RiMenu2Line className="text-xl text-white/90 group-hover:text-white transition-colors" />
        ) : (
          <RiMenu3Line className="text-xl text-white/90 group-hover:text-white transition-colors" />
        )}
      </button>

      {/* Notifications - Enhanced design */}
      <button
        onClick={handleNotificationsClick}
        className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm group cursor-pointer select-none"
        title="Notifications"
      >
        <div className="relative">
          <MdNotificationsNone className="text-xl text-white/90 group-hover:text-white transition-colors" />
          {totalNotifications > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse">
              {totalNotifications}
            </span>
          )}
        </div>
        {!isCollapsed && (
          <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
            Notifications
          </span>
        )}
      </button>

      {/* Spacer to push brand to right */}
      <div className="flex-grow"></div>

      {/* Brand Section - Gradient Text with modern design */}
      <div className="flex items-center gap-3">
        {/* Modern brand logo container */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
          {/* Simplified logo container */}
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          
          {/* Brand name with gradient text */}
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              EMPLOYEE
            </span>
            <span className="text-white/70 text-xs -mt-1">Portal</span>
          </div>
        </div>

        {/* User profile placeholder */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg border-2 border-white/30 cursor-pointer hover:scale-105 transition-transform duration-300">
          <span className="text-white font-semibold text-sm">A</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;