import { MdNotificationsNone } from "react-icons/md";
import { RiMenu2Line, RiMenu3Line } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";

/* Converts a raw path segment → readable label
   e.g. "teammembers" → "Teammembers", "staff-history" → "Staff History" */
const toLabel = (segment) =>
  segment
    .replace(/-/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase split
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

const Navbar = ({ setIsCollapsed, isCollapsed, isMobile }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const totalNotifications = 5;

  // Split pathname into segments, drop empty & pure numeric/UUID dynamic params
  const segments = pathname
    .replace(/^\//, "")
    .split("/")
    .filter((s) => s && !/^\d+$/.test(s) && !/^[0-9a-f-]{20,}$/i.test(s));

  const section = segments.length > 1 ? toLabel(segments[segments.length - 2]) : "Portal";
  const label   = segments.length > 0 ? toLabel(segments[segments.length - 1]) : "Home";

  return (
    <nav className="sticky top-0 z-30 w-full bg-white border-b border-teal-100 shadow-sm flex-shrink-0">
      <div className="flex items-center h-14 px-3 sm:px-5 gap-2 sm:gap-3">

        {/* ── Hamburger / Toggle ── */}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal-50 border border-teal-200
            text-teal-500 hover:bg-teal-100 hover:border-teal-400 hover:text-teal-600
            transition-all duration-150 flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          {isCollapsed || isMobile
            ? <RiMenu2Line className="text-[18px]" />
            : <RiMenu3Line className="text-[18px]" />}
        </button>

        {/* ── Vertical Divider ── */}
        <div className="w-px h-6 bg-teal-100 flex-shrink-0 hidden sm:block" />

        {/* ── Dynamic Breadcrumb ── */}
        <div className="hidden sm:flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
          <span className="text-xs text-teal-400 font-medium truncate">{section}</span>
          <span className="text-teal-200 text-xs flex-shrink-0">/</span>
          <span className="text-xs font-semibold text-teal-700 truncate">{label}</span>
        </div>

        {/* ── Spacer ── */}
        <div className="flex-1 min-w-0" />

        {/* ── Search (md and up) ── */}
        {/* <button className="hidden md:flex items-center gap-2 h-8 px-3 bg-teal-50 border border-teal-200
          rounded-full text-xs text-teal-400 hover:border-teal-400 hover:bg-teal-100
          hover:text-teal-600 transition-all duration-150 flex-shrink-0">
          <i className="ri-search-line text-sm" />
          <span>Search…</span>
          <span className="ml-1 hidden lg:inline text-[10px] text-teal-300 border border-teal-200
            rounded px-1 py-0.5 leading-none font-mono">
            ⌘K
          </span>
        </button> */}

        {/* ── Notification Bell ── */}
        <button
          onClick={() => navigate("/notifications")}
          className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-teal-50 border border-teal-200
            text-teal-500 hover:bg-teal-100 hover:border-teal-400 hover:text-teal-600
            transition-all duration-150 flex-shrink-0"
          title="Notifications"
        >
          <MdNotificationsNone className="text-[20px]" />
          {totalNotifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 border-2 border-white rounded-full
              flex items-center justify-center text-[9px] font-bold text-white leading-none">
              {totalNotifications}
            </span>
          )}
        </button>

        {/* ── Vertical Divider ── */}
        <div className="w-px h-6 bg-teal-100 flex-shrink-0" />

        {/* ── Avatar ── */}
        <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-500
          border-2 border-teal-200 flex items-center justify-center cursor-pointer flex-shrink-0
          hover:border-teal-400 hover:shadow-md transition-all duration-150">
          <span className="text-white text-sm font-bold select-none">A</span>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;