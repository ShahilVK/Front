
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../Api/Axios_Instance";
import {
  ShoppingCart,
  Heart,
  Package,
  User,
  Edit,
  Lock,
  Camera,
  X,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/Navbar";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-white/20 ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-xl text-gray-800 tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-white py-10 text-center text-sm text-gray-400 border-t border-gray-100 mt-auto">
    <div className="flex flex-col items-center gap-2">
       <p className="font-medium text-gray-500">TekTrov Inc.</p>
       <p>© {new Date().getFullYear()} All rights reserved. Crafted for excellence.</p>
    </div>
  </footer>
);

const CountCard = ({ icon, title, count, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 group cursor-default relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 duration-500"></div>
    
    <div className="relative z-10 flex items-center justify-between mb-4">
      <div className={`p-3.5 rounded-2xl ${colorClass} bg-opacity-10 text-opacity-100 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
        {React.cloneElement(icon, { size: 26, className: colorClass.replace("bg-", "text-") })}
      </div>
      <span className="text-4xl font-extrabold text-gray-800 tracking-tight">
        {count}
      </span>
    </div>
    <h3 className="relative z-10 text-gray-400 font-semibold text-xs uppercase tracking-widest pl-1">{title}</h3>
  </div>
);

function Profile() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [editFormData, setEditFormData] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fetchCounts = async () => {
    try {
      const [cartRes, wishlistRes, ordersRes] = await Promise.all([
        api.get("/cart"),
        api.get("/wishlist"),
        api.get("/orders/My-Orders"),
      ]);

      setCartCount(cartRes.data.data?.length || 0);
      setWishlistCount(wishlistRes.data.data?.length || 0);
      setOrdersCount(ordersRes.data.data?.length || 0);
    } catch (err) {
      console.error("Failed to load counts", err);
    }
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/users/my-profile");
      setUser(res.data.data);
      setEditFormData({
        name: res.data.data.name,
        email: res.data.data.email,
      });
    } catch {
      toast.error("Could not load user profile.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCounts();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const t = toast.loading("Updating profile...");
    try {
      await api.patch("/users/my-profile", editFormData);
      toast.success("Profile updated successfully!", { id: t });
      setIsEditModalOpen(false);
      fetchUserData();
    } catch {
      toast.error("Update failed", { id: t });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error("New passwords do not match");
    }

    const t = toast.loading("Updating security settings...");

    try {
      await api.put("/users/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });

      toast.success("Password changed successfully", { id: t });
      setIsPasswordModalOpen(false);

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Password change failed",
        { id: t }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  if (!user) return <div>Please login</div>;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 font-sans">
      <Navbar />
      <Toaster position="top-center" toastOptions={{ className: 'text-sm font-medium shadow-xl' }} />

      <main className="flex-grow pt-28 px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto w-full">
        
        <div className="relative mb-32">
            <div className="h-64 w-full bg-[#0a0a0a] rounded-[2rem] shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-gray-800 to-transparent rounded-full blur-3xl opacity-40 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gray-800 to-transparent rounded-full blur-3xl opacity-30 -ml-20 -mb-20"></div>
                
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            </div>

            <div className="absolute top-32 left-0 right-0 px-4 md:px-8">
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
                    
                    <div className="relative group shrink-0">
                        <div className="w-36 h-36 rounded-full p-1.5 bg-white shadow-xl ring-1 ring-gray-100">
                            <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
                                {user.image ? (
                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={64} className="text-gray-400" />
                                )}
                            </div>
                        </div>
                        <button className="absolute bottom-2 right-2 bg-black text-white p-2.5 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 border-[3px] border-white cursor-pointer z-10">
                            <Camera size={18} />
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1 min-w-0">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight truncate">{user.name}</h1>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mt-2">
                             <p className="text-gray-500 font-medium text-lg truncate">{user.email}</p>
                             {user.role === 'admin' && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100">
                                    <ShieldCheck size={14} /> Admin
                                </span>
                             )}
                        </div>
                        <div className="mt-5 flex justify-center md:justify-start gap-2">
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest border border-emerald-100 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                                Active Member
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-2">
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group"
                        >
                            <Edit size={18} className="text-gray-400 group-hover:text-white transition-colors" /> 
                            <span>Edit Profile</span>
                        </button>
                        <button
                            onClick={() => setIsPasswordModalOpen(true)}
                            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                        >
                            <Lock size={18} /> 
                            <span>Security</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1 bg-black rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CountCard 
                    title="Cart Items" 
                    count={cartCount} 
                    icon={<ShoppingCart />} 
                    colorClass="bg-blue-600" 
                />
                <CountCard 
                    title="Wishlist" 
                    count={wishlistCount} 
                    icon={<Heart />} 
                    colorClass="bg-rose-500" 
                />
                <CountCard 
                    title="Total Orders" 
                    count={ordersCount} 
                    icon={<Package />} 
                    colorClass="bg-amber-500" 
                />
            </div>
        </div>

      </main>

      <Footer />

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Personal Details">
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Full Name</label>
            <input
              className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-400 outline-none transition-all placeholder:text-gray-400 font-medium"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Email Address</label>
            <input
              className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-400 outline-none transition-all placeholder:text-gray-400 font-medium"
              value={editFormData.email}
              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
              placeholder="name@example.com"
            />
          </div>
          <button className="w-full mt-4 bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] tracking-wide">
            Save Changes
          </button>
        </form>
      </Modal>

      <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} title="Security Settings">
        <form onSubmit={handleChangePassword} className="space-y-5">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3 items-start">
            <div className="mt-0.5 p-1 bg-orange-100 rounded-full text-orange-600">
                <Lock size={12} strokeWidth={3} /> 
            </div>
            <p className="text-sm text-orange-800 font-medium leading-relaxed">
               Please ensure your new password is at least 8 characters long and includes special characters for maximum security.
            </p>
          </div>
          
          <div className="space-y-4 pt-2">
             <input
                type="password"
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-400 outline-none transition-all placeholder:text-gray-400 font-medium tracking-wide"
                placeholder="Current Password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
            />

             <input
                type="password"
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-400 outline-none transition-all placeholder:text-gray-400 font-medium tracking-wide"
                placeholder="New Password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                required
            />

            <input
                type="password"
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-400 outline-none transition-all placeholder:text-gray-400 font-medium tracking-wide"
                placeholder="Confirm New Password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                required
            />
          </div>

          <button className="w-full mt-4 bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] tracking-wide">
            Update Password
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Profile;