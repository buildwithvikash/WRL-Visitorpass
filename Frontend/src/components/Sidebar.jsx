import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import { useSelector } from "react-redux";

// Define menu configurations
const MENU_CONFIG = [
  {
    key: "visitor",
    icon: FaUserShield,
    label: "Visitor",
    items: [
      {
        path: "/visitor/dashboard",
        label: "Dashboard",
        roles: ["admin", "security", "hr"],
      },
      {
        path: "/visitor/generate-pass",
        label: "Generate Pass",
        roles: ["admin", "security", "hr"],
      },
      {
        path: "/visitor/in-out",
        label: "In / Out",
        roles: ["admin", "security", "hr"],
      },
      {
        path: "/visitor/reports",
        label: "Reports",
        roles: ["admin", "security", "hr"],
      },
      {
        path: "/visitor/history",
        label: "History",
        roles: ["admin", "security", "hr"],
      }
    ],
  },
];

const Sidebar = ({ isSidebarExpanded, toggleSidebar }) => {
  const userRole = useSelector((state) => state.auth.user?.role || "");

  const canAccess = (allowedRoles) =>
    allowedRoles.includes(userRole) || userRole === "admin";

  const [expandedMenus, setExpandedMenus] = useState(
    MENU_CONFIG.reduce((acc, menu) => ({ ...acc, [menu.key]: false }), {})
  );

  const location = useLocation();

  const toggleMenu = (menu) => {
    setExpandedMenus((prevState) => {
      // Create a new state object with all menus collapsed
      const newState = Object.keys(prevState).reduce(
        (acc, key) => ({
          ...acc,
          [key]: false,
        }),
        {}
      );

      // Toggle the selected menu
      newState[menu] = !prevState[menu];
      return newState;
    });
  };

  const isActive = (path) =>
    location.pathname === path ? "bg-blue-500 text-white" : "text-gray-300";

  const renderMenuItems = (menu) => {
    return (
      <ul className="ml-6 mt-2 space-y-2 max-h-80 overflow-y-auto">
        {menu.items.map((item, index) => {
          if (item.roles && !canAccess(item.roles)) return null; // Hide restricted items

          return (
            <li key={index}>
              <Link
                to={item.path}
                className={`block p-2 rounded-lg hover:bg-gray-700 transition ${isActive(
                  item.path
                )}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderMenuSection = (menu) => {
    const MenuIcon = menu.icon;

    return (
      <li key={menu.key}>
        <div
          className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition"
          onClick={() => toggleMenu(menu.key)}
        >
          <div className="flex items-center">
            <MenuIcon className="mr-3" />
            {isSidebarExpanded && (
              <span className="font-semibold">{menu.label}</span>
            )}
          </div>
          {isSidebarExpanded &&
            (expandedMenus[menu.key] ? <FaChevronUp /> : <FaChevronDown />)}
        </div>
        {isSidebarExpanded && expandedMenus[menu.key] && renderMenuItems(menu)}
      </li>
    );
  };

  return (
    <aside
      className={`fixed min-h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out ${
        isSidebarExpanded ? "w-64" : "w-16"
      } p-4 shadow-xl flex flex-col`}
    >
      <div className="shrink-0">
        {/* Title */}
        <div className="flex justify-between mb-4">
          {isSidebarExpanded ? (
            <>
              <h1 className="text-2xl font-playfair">Dashboard</h1>
              <button
                className="text-gray-300 hover:text-white focus:outline-none text-2xl cursor-pointer"
                onClick={toggleSidebar}
              >
                {isSidebarExpanded ? <FaTimes /> : <FaBars />}
              </button>
            </>
          ) : (
            <button
              className="text-gray-300 hover:text-white focus:outline-none text-2xl cursor-pointer"
              onClick={toggleSidebar}
            >
              {isSidebarExpanded ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>

        <ul className="space-y-4 overflow-y-auto overflow-x-hidden max-h-full">
          {MENU_CONFIG.map(renderMenuSection)}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
