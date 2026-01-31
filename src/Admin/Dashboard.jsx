import React, { useEffect, useState, useMemo, createContext } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Search,
  Sun,
  Moon,
  X,
  Home,
  Box,
  Settings,
  LogOut,
  FileDown,
  Edit,
  UserX,
  UserCheck,
  Trash2,
  ChevronLeft,
} from "lucide-react";
import api from "../Api/Axios_Instance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const AuthContext = createContext(null);

const Footer = () => (
  <footer className="bg-white dark:bg-gray-800 p-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 mt-auto ">
          © {new Date().getFullYear()} TekTrov. All rights reserved.    {" "}
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
  };
  return (
    <div
      className={`bg-gray-900 text-white flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`p-6 text-xl font-bold border-b border-gray-700 flex items-center gap-2 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <Box className="text-indigo-400" />         {" "}
        {!isCollapsed && <span>Admin</span>}
      </div>
             {" "}
      <nav className="flex-1 mt-4 space-y-2">
                 {" "}
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center py-3 transition-colors mx-3 px-3 rounded-lg ${
              isCollapsed ? "justify-center" : ""
            } ${
              (location.pathname.startsWith(item.path) &&
                item.path !== "/dashboard") ||
              location.pathname === item.path
                ? "bg-gray-800"
                : "hover:bg-gray-700/50"
            }`}
            title={item.name}
          >
                         {" "}
            <span className={!isCollapsed ? "mr-3" : ""}>{item.icon}</span>     
                   {" "}
            {!isCollapsed && (
              <span className="text-sm font-medium">{item.name}</span>
            )}
                       {" "}
          </Link>
        ))}
               {" "}
      </nav>
             {" "}
      <div className="p-4 border-t border-gray-700">
                 {" "}
        <button
          onClick={handleLogout}
          className={`flex items-center w-full text-left hover:bg-gray-800 p-3 rounded-lg transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Logout"
        >
                     {" "}
          <LogOut size={20} className={!isCollapsed ? "mr-3" : ""} />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>} 
                 {" "}
        </button>
               {" "}
      </div>
           {" "}
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center gap-6 border-l-4"
    style={{ borderColor: color }}
  >
       {" "}
    <div
      className={`p-3 rounded-full`}
      style={{ backgroundColor: `${color}20` }}
    >
            {React.cloneElement(icon, { color: color, size: 28 })}   {" "}
    </div>
       {" "}
    <div>
           {" "}
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
        {title}
      </p>
           {" "}
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {value}
      </p>
         {" "}
    </div>
     {" "}
  </div>
);

const UsersTable = ({ users, onEdit, onBlock, onDelete }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
      Customers
    </h2>

    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">
              User
            </th>
            <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">
              Status
            </th>
            <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">
              Orders
            </th>
            <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {(users || []).map((u) => (
            <tr
              key={u.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                    {u.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-100">
                      {u.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {u.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    u.isBlocked
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {u.isBlocked ? "Blocked" : "Active"}
                </span>
              </td>

              <td className="p-3 text-center font-medium text-gray-700 dark:text-gray-300">
                {u.orders?.length || 0}
              </td>

              <td className="p-3 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(u)}
                    className="p-2 text-gray-400 hover:bg-blue-100 hover:text-blue-500 rounded-full transition"
                  >
                    <Edit size={16} />
                  </button>

                  {/* <button
                    onClick={() => onBlock(u)}
                    className="p-2 text-gray-400 hover:bg-yellow-100 hover:text-yellow-500 rounded-full transition"
                  > */}
                  <button
  onClick={() => onBlock(u)}
  disabled={u.role === "Admin"}
  className={`p-2 rounded-full transition ${
    u.role === "Admin"
      ? "text-gray-300 cursor-not-allowed"
      : "text-gray-400 hover:bg-yellow-100 hover:text-yellow-500"
  }`}
  title={u.role === "Admin" ? "Admin cannot be blocked" : "Toggle block"}
>

                    {u.isBlocked ? (
                      <UserCheck size={16} />
                    ) : (
                      <UserX size={16} />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const UserEditModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user);
  useEffect(() => {
    setFormData(user);
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  if (!user) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                 {" "}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
                       {" "}
        <form onSubmit={handleSubmit} className="p-6">
                             {" "}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Edit User
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
            >
              <X size={24} />
            </button>
          </div>
                             {" "}
          <div className="space-y-4">
                                   {" "}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
                                   {" "}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
                                   {" "}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
                               {" "}
          </div>
                             {" "}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
                         {" "}
        </form>
                   {" "}
      </div>
             {" "}
    </div>
  );
};

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const fetchData = async () => {
    try {
      const [usersRes, ordersRes, productsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/orders"),
        api.get("/admin/products"), // until admin-products is created
      ]);

      setUsers(usersRes.data.data);
      setOrders(ordersRes.data.data);
      setProducts(productsRes.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await api.delete(`/Admin/users/${userId}`);
      toast.success("User deleted successfully.");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  const handleToggleBlockUser = async (user) => {

      if (user.role === "Admin") {
    toast.error("Admin accounts cannot be blocked");
    return;
  }
    try {
      await api.patch(`/admin/users/${user.id}/block-toggle`);
      toast.success(user.isBlocked ? "User unblocked" : "User blocked");
      fetchData();
    } catch {
      toast.error("Failed to update user");
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await api.patch(`/users/${updatedUser.id}`, {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
      toast.success("User updated successfully.");
      setShowEditModal(false);
      setSelectedUser(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const { filteredUsers, stats, chartData, salesByCategory } = useMemo(() => {
    /* ---------------- SAFETY ---------------- */
    if (!users || !orders) {
      return {
        filteredUsers: [],
        stats: { revenue: "0.00", sales: 0, customers: 0, products: 0 },
        chartData: { labels: [], datasets: [] },
        salesByCategory: { labels: [], datasets: [] },
      };
    }

    const filtered = searchTerm
      ? users.filter(
          (u) =>
            u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : users;

    const customerUsers = users.filter((u) => u.role === "User");


    const validOrders = orders.filter(
  (o) => o.status !== "Cancelled"
);

    let totalRevenue = 0;


    validOrders.forEach((order) => {
  if (!Array.isArray(order.items)) return;

  order.items.forEach((item) => {
    const price = Number(item.price ?? 0);
    const qty = Number(item.quantity ?? 1);

    if (!isNaN(price)) {
      totalRevenue += price * qty;
    }
  });
});


    const stats = {
      revenue: totalRevenue.toFixed(2),
      sales: validOrders.length, // ✅ FIXED
      customers: customerUsers.length,
      products: products.length,
    };

    /* ---------------- REVENUE TREND ---------------- */
    const revenueByDate = {};

    orders.filter(o => o.status !== "Cancelled").forEach((order) => {
      const rawDate = order.createdAt || order.orderDate || order.date;

      if (!rawDate || !Array.isArray(order.items)) return;

      const dateKey = new Date(rawDate).toISOString().split("T")[0];

      order.items.forEach((item) => {
        const price = Number(item.price ?? item.product?.price ?? 0);
        const qty = Number(item.quantity ?? 1);

        if (!isNaN(price)) {
          revenueByDate[dateKey] = (revenueByDate[dateKey] || 0) + price * qty;
        }
      });
    });

    const sortedDates = Object.keys(revenueByDate).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    const chartData = {
      labels: sortedDates.map((d) =>
        new Date(d).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        })
      ),
      datasets: [
        {
          label: "Daily Revenue",
          data: sortedDates.map((d) => revenueByDate[d]),
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59,130,246,0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    };

    /* ---------------- SALES BY CATEGORY ---------------- */
    const categorySales = {};

    orders.forEach((order) => {
      if (!Array.isArray(order.items)) return;

      order.items.forEach((item) => {
        const category =
          item.product?.category || item.category || "Uncategorized";

        const price = Number(item.price ?? item.product?.price ?? 0);
        const qty = Number(item.quantity ?? 1);

        if (!isNaN(price)) {
          categorySales[category] =
            (categorySales[category] || 0) + price * qty;
        }
      });
    });

    const salesByCategory = {
      labels: Object.keys(categorySales),
      datasets: [
        {
          label: "Sales",
          data: Object.values(categorySales),
          backgroundColor: [
            "#EF4444",
            "#F59E0B",
            "#10B981",
            "#3B82F6",
            "#8B5CF6",
          ],
        },
      ],
    };

    return {
      filteredUsers: filtered,
      stats,
      chartData,
      salesByCategory,
    };
  }, [users, orders, products, searchTerm]);

  return (
    <AuthContext.Provider value={{ user: { name: "Admin" } }}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Toaster position="top-right" />
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onMouseEnter={() => setIsSidebarCollapsed(false)}
          onMouseLeave={() => setIsSidebarCollapsed(true)}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Admin Dashboard
              </h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                >
                  {darkMode ? (
                    <Sun className="text-yellow-400" />
                  ) : (
                    <Moon className="text-gray-700" />
                  )}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Revenue"
                value={`₹${stats.revenue}`}
                icon={<DollarSign />}
                color="#10B981"
              />
              <StatCard
                title="Total Sales"
                value={stats.sales}
                icon={<ShoppingCart />}
                color="#3B82F6"
              />
              <StatCard
                title="Total Customers"
                value={stats.customers}
                icon={<Users />}
                color="#8B5CF6"
              />
              <StatCard
                title="Total Products"
                value={stats.products}
                icon={<Package />}
                color="#F59E0B"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
              <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                  Revenue Trend
                </h2>
                <div className="h-80">
                  <Line
                    data={chartData}
                    options={{
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                    }}
                  />
                </div>
              </div>
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                  Sales by Category
                </h2>
                <div className="h-80">
                  <Pie
                    data={salesByCategory}
                    options={{
                      maintainAspectRatio: false,
                      plugins: { legend: { position: "right" } },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search customers by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <UsersTable
              users={filteredUsers}
              onEdit={handleOpenEditModal}
              onBlock={handleToggleBlockUser}
              onDelete={handleDeleteUser}
            />
          </div>
          <Footer />
        </main>
        {showEditModal && (
          <UserEditModal
            user={selectedUser}
            onClose={() => setShowEditModal(false)}
            onSave={handleUpdateUser}
          />
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default Dashboard;
