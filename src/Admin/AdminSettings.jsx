

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import api from "../Api/Axios_Instance";
import { 
    Home, Box, ShoppingCart, Users, Settings, LogOut, 
    User, Sun, Lock, Eye, EyeOff
} from "lucide-react";



const Footer = () => (
    <footer className="bg-white dark:bg-gray-800 p-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 mt-auto">
      © {new Date().getFullYear()} TekTrov. All rights reserved.
    </footer>
);

const Sidebar = ({ isCollapsed, onMouseEnter, onMouseLeave }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const menuItems = [
      { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
      { name: "Products", icon: <Box size={20} />, path: "/adminproducts" },
      { name: "Orders", icon: <ShoppingCart size={20} />, path: "/adminorders" },
      { name: "Users", icon: <Users size={20} />, path: "/adminusers" },
      { name: "Settings", icon: <Settings size={20} />, path: "/adminsettings" },
    ];
    const handleLogout = () => {
      localStorage.removeItem("user");
      navigate("/login");
      toast.success("Logged out successfully.");
    };
    return (
        <div 
            className={`bg-gray-900 text-white flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className={`p-6 text-xl font-bold border-b border-gray-700 flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
                <Box className="text-indigo-400" />
                {!isCollapsed && <span>Admin</span>}
            </div>
            <nav className="flex-1 mt-4 space-y-2">
              {menuItems.map((item) => (
                <Link 
                    key={item.name} 
                    to={item.path} 
                    className={`flex items-center py-3 transition-colors mx-3 px-3 rounded-lg ${isCollapsed ? 'justify-center' : ''} ${location.pathname.startsWith(item.path) ? "bg-gray-800" : "hover:bg-gray-700/50"}`}
                    title={item.name}
                >
                  <span className={!isCollapsed ? 'mr-3' : ''}>{item.icon}</span>
                  {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
              <button onClick={handleLogout} className={`flex items-center w-full text-left hover:bg-gray-800 p-3 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`} title="Logout">
                <LogOut size={20} className={!isCollapsed ? 'mr-3' : ''} /> 
                {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
              </button>
            </div>
      </div>
    );
};

// --- Main AdminSettings Component ---
export function AdminSettings() {
  const adminId = "pdwh"; // In a real app, this would come from auth context

  const [adminUser, setAdminUser] = useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  // Appearance State
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const fetchAdminData = async () => {
        try {
            const res = await api.get(`/users/${adminId}`);
            setAdminUser({ name: res.data.name, email: res.data.email });
        } catch (error) {
            toast.error("Could not load admin details.");
        }
    };
    fetchAdminData();
  }, [adminId]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAdminUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Saving profile...");
    try {
        await api.patch(`/users/${adminId}`, { name: adminUser.name, email: adminUser.email });
        toast.success("Profile updated successfully!", { id: loadingToast });
    } catch {
        toast.error("Failed to update profile.", { id: loadingToast });
    }
  };
  
  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
        return toast.error("New passwords do not match.");
    }
    if (passwordData.new.length < 8) {
        return toast.error("Password must be at least 8 characters long.");
    }
    // In a real app, you would verify the current password against the backend
    const loadingToast = toast.loading("Changing password...");
    try {
        await api.patch(`/users/${adminId}`, { password: passwordData.new });
        toast.success("Password changed successfully!", { id: loadingToast });
        setPasswordData({ current: '', new: '', confirm: '' });
    } catch {
        toast.error("Failed to change password.", { id: loadingToast });
    }
  };


  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster position="top-right" />
      <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onMouseEnter={() => setIsSidebarCollapsed(false)}
          onMouseLeave={() => setIsSidebarCollapsed(true)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Settings</h1>
          
          <div className="max-w-4xl mx-auto space-y-8">

            {/* Profile Settings Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <div className="p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3"><User /> Profile Settings</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your personal information.</p>
                </div>
                <form onSubmit={handleProfileSave}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" name="name" value={adminUser.name} onChange={handleProfileChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input type="email" name="email" value={adminUser.email} onChange={handleProfileChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 text-right rounded-b-xl">
                        <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Save Changes</button>
                    </div>
                </form>
            </div>

            {/* Change Password Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <div className="p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3"><Lock /> Change Password</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your password regularly to keep your account secure.</p>
                </div>
                <form onSubmit={handlePasswordSave}>
                    <div className="p-6 space-y-4">
                         <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                            <input type={showCurrentPass ? 'text' : 'password'} name="current" value={passwordData.current} onChange={handlePasswordChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} className="absolute right-3 top-8 text-gray-400 hover:text-gray-600">{showCurrentPass ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                            <input type={showNewPass ? 'text' : 'password'} name="new" value={passwordData.new} onChange={handlePasswordChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                             <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 top-8 text-gray-400 hover:text-gray-600">{showNewPass ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                            <input type={showNewPass ? 'text' : 'password'} name="confirm" value={passwordData.confirm} onChange={handlePasswordChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 text-right rounded-b-xl">
                        <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Update Password</button>
                    </div>
                </form>
            </div>

             {/* Appearance Settings Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <div className="p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3"><Sun /> Appearance</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customize the look and feel of your dashboard.</p>
                </div>
                <div className="p-6 flex justify-between items-center">
                    <div >
                        <p className="font-medium text-gray-800 dark:text-white">Dark Mode</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark themes.</p>
                    </div>
                    <button onClick={() => setDarkMode(!darkMode)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}>
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminSettings;

