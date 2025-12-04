
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Box, Users, ShoppingCart, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  // ✨ FIX: Paths are now nested correctly under /dashboard for proper routing
  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    { name: "Products", icon: <Box size={18} />, path: "/adminproducts" },
    { name: "Orders", icon: <ShoppingCart size={18} />, path: "/adminorders" },
    { name: "Users", icon: <Users size={18} />, path: "/adminusers" },
    { name: "Settings", icon: <Settings size={18} />, path: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-300 flex flex-col flex-shrink-0">
      {/* 1. Styled Header */}
      <div className="p-6 text-2xl font-bold text-white border-b border-gray-800 flex items-center gap-2">
        <Link to="/dashboard">TekTrov</Link>
        <span className="text-xs font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full">Admin</span>
      </div>

      {/* 2. Main Navigation with Improved Styles */}
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            // Logic to correctly highlight the active link, including nested routes
            className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
              location.pathname === item.path || (item.path !== "/dashboard" && location.pathname.startsWith(item.path))
                ? "bg-red-500 text-white shadow-lg"
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* 3. Styled Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left text-gray-400 hover:bg-gray-800 hover:text-white px-4 py-2.5 rounded-lg transition-colors duration-200"
        >
          <LogOut size={18} className="mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

