import React, { useEffect, useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../Api/Axios_Instance";
import {
  Trash2,
  Edit2,
  Search,
  X,
  Plus,
  Package,
  ChevronLeft,
  ChevronRight,
  Home,
  Box,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

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
        <Box className="text-indigo-400" />
        {!isCollapsed && <span>Admin</span>}
      </div>
      <nav className="flex-1 mt-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center py-3 transition-colors mx-3 px-3 rounded-lg ${
              isCollapsed ? "justify-center" : ""
            } ${
              location.pathname.startsWith(item.path)
                ? "bg-gray-800"
                : "hover:bg-gray-700/50"
            }`}
            title={item.name}
          >
            <span className={!isCollapsed ? "mr-3" : ""}>{item.icon}</span>
            {!isCollapsed && (
              <span className="text-sm font-medium">{item.name}</span>
            )}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full text-left hover:bg-gray-800 p-3 rounded-lg transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Logout"
        >
          <LogOut size={20} className={!isCollapsed ? "mr-3" : ""} />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

// --- Main AdminProducts Component ---
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductData, setNewProductData] = useState({
    name: "",
    price: "",
    image: "", // image URL
    imageFile: null, // image file
    category: "",
    stock: "",
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const parsePrice = (price) =>
    parseFloat(String(price).replace(/[^\d.]/g, "")) || 0;
  const formatPrice = (price) => `₹${Number(price).toFixed(2)}`;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRequest = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await api.delete(`/admin/products/${productToDelete.id}`);

      toast.success(`Product "${productToDelete.name}" deleted successfully!`);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    } finally {
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct({ ...product, price: parsePrice(product.price) });
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    await api.put(`/admin/products/${editingProduct.id}/stock`, {
      stock: Number(editingProduct.stock),
    });

    toast.success("Stock updated successfully");
    setEditingProduct(null);
    fetchProducts();
  };

  const handleOpenAddModal = () => {
    setNewProductData({
      name: "",
      price: "",
      image: "",
      category: "",
      stock: "",
    });
    setIsAddModalOpen(true);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", newProductData.name);
      formData.append("price", Number(newProductData.price));
      formData.append("category", newProductData.category);
      formData.append("stock", Number(newProductData.stock));

      // ✅ Send file OR image URL
      if (newProductData.imageFile) {
        formData.append("image", newProductData.imageFile);
      } else if (newProductData.image) {
        formData.append("imageUrl", newProductData.image);
      }

      await api.post("/admin/products/Admin-add-products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product added successfully");
      setIsAddModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to add product");
      console.error(err);
    }
  };

  const { currentProducts, totalPages } = useMemo(() => {
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    const pages = Math.ceil(filtered.length / productsPerPage);
    const paginated = filtered.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );
    return { currentProducts: paginated, totalPages: pages };
  }, [products, search, currentPage, productsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderSkeletonLoader = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
             
      <div className="space-y-4 animate-pulse">
                   {" "}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
                               {" "}
            <div className="h-14 w-14 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                               {" "}
            <div className="flex-1 space-y-2">
                                     {" "}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                     {" "}
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                 {" "}
            </div>
                           {" "}
          </div>
        ))}
               
      </div>
         {" "}
    </div>
  );

  const getStockStatus = (stock) => {
    if (stock === 0)
      return {
        text: "Out of Stock",
        className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      };
    if (stock <= 10)
      return {
        text: `Low Stock (${stock})`,
        className:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      };
    return {
      text: `In Stock (${stock})`,
      className:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Toaster position="top-right" containerClassName="text-sm" />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onMouseEnter={() => setIsSidebarCollapsed(false)}
        onMouseLeave={() => setIsSidebarCollapsed(true)}
      />
           {" "}
      <div className="flex-1 flex flex-col overflow-hidden">
               {" "}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                   {" "}
          <div className="flex justify-between items-center mb-6">
                       {" "}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Manage Products
            </h1>
                       {" "}
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all active:scale-95"
            >
                            <Plus size={20} /> Add Product            {" "}
            </button>
                     {" "}
          </div>
                   {" "}
          <div className="relative mb-6 w-full max-w-sm">
                       {" "}
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
                       {" "}
            <input
              type="text"
              placeholder="Search products by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2.5 pl-10 pr-10 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                       {" "}
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
                     {" "}
          </div>
                               {" "}
          {isLoading ? (
            renderSkeletonLoader()
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-x-auto">
                           {" "}
        <table className="w-full text-left">
  <thead className="bg-gray-50 dark:bg-gray-700">
    <tr>
      <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">
        Product
      </th>
      <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">
        Stock
      </th>
      <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">
        Price
      </th>
      <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">
        Category
      </th>
      <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 text-center">
        Actions
      </th>
    </tr>
  </thead>

  <tbody>
    {currentProducts.length === 0 ? (
      <tr>
        <td
          colSpan={5}
          className="text-center py-10 text-gray-500 dark:text-gray-400"
        >
          <div className="flex flex-col items-center gap-2">
            <Package size={40} />
            <span className="font-medium">No products found.</span>
            {search && (
              <span className="text-sm">Try adjusting your search.</span>
            )}
          </div>
        </td>
      </tr>
    ) : (
      currentProducts.map((p) => (
        <tr
          key={p.id}
          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
        >
          <td className="p-3">
            <div className="flex items-center gap-3">
              <img
                src={p.imageUrl || "/placeholder.png"}
                alt={p.name}
                className="w-14 h-14 object-cover rounded-md"
              />
              <span className="font-bold text-gray-800 dark:text-gray-100">
                {p.name}
              </span>
            </div>
          </td>

          <td className="p-3">
            {(() => {
              const status = getStockStatus(p.stock);
              return (
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${status.className}`}
                >
                  {status.text}
                </span>
              );
            })()}
          </td>

          <td className="p-3 font-medium text-gray-700 dark:text-gray-300">
            {formatPrice(parsePrice(p.price))}
          </td>

          <td className="p-3 text-gray-600 dark:text-gray-400">
            {p.category}
          </td>

          <td className="p-3 text-center">
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleOpenEditModal(p)}
                className="p-2 text-gray-400 hover:bg-blue-100 hover:text-blue-500 rounded-full transition active:scale-90"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDeleteRequest(p)}
                className="p-2 text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-full transition active:scale-90"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

              {totalPages > 1 && (
                <div className="p-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                                            <ChevronLeft size={16} /> Previous  
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                                            Next <ChevronRight size={16} />     
                                 {" "}
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
              <Footer />     {" "}
      </div>
           {" "}
      <Modal
        isOpen={isAddModalOpen || !!editingProduct}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProduct(null);
        }}
      >
        <form
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          className="p-6"
        >
          {!editingProduct && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Image (Upload)
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewProductData((prev) => ({
                    ...prev,
                    imageFile: e.target.files[0],
                  }))
                }
                className="mt-1 block w-full p-2 border rounded-md
                 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          )}
                       {" "}
          <div className="flex justify-between items-center mb-4">
                             {" "}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
                             {" "}
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingProduct(null);
              }}
              className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
            >
              <X size={24} />
            </button>
                         {" "}
          </div>
                       {" "}
          <div className="space-y-4">
                             {" "}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={
                  editingProduct ? editingProduct.name : newProductData.name
                }
                onChange={
                  editingProduct ? handleEditInputChange : handleAddInputChange
                }
                className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
                             {" "}
            <div className="grid grid-cols-2 gap-4">
                                 {" "}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={
                    editingProduct ? editingProduct.price : newProductData.price
                  }
                  onChange={
                    editingProduct
                      ? handleEditInputChange
                      : handleAddInputChange
                  }
                  className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                  step="0.01"
                />
              </div>
                                 {" "}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={
                    editingProduct ? editingProduct.stock : newProductData.stock
                  }
                  onChange={
                    editingProduct
                      ? handleEditInputChange
                      : handleAddInputChange
                  }
                  className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
                               {" "}
            </div>
                             {" "}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={
                  editingProduct
                    ? editingProduct.category
                    : newProductData.category
                }
                onChange={
                  editingProduct ? handleEditInputChange : handleAddInputChange
                }
                className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            {!editingProduct && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={newProductData.image}
                  onChange={handleAddInputChange}
                  placeholder="Optional image URL"
                  className="mt-1 block w-full p-2 border rounded-md
                 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            )}
            {/*                   <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label><input type="text" name="image" value={editingProduct ? editingProduct.image : newProductData.image} onChange={editingProduct ? handleEditInputChange : handleAddInputChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required/></div> */}
                         {" "}
          </div>
                       {" "}
          <div className="mt-6 flex justify-end gap-3">
                             {" "}
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingProduct(null);
              }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-gray-100 text-gray-800 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
                             {" "}
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-md ${
                editingProduct
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {editingProduct ? "Save Changes" : "Add Product"}
            </button>
                         {" "}
          </div>
                   {" "}
        </form>
             {" "}
      </Modal>
           {" "}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
               {" "}
        <div className="p-6">
                     {" "}
          <div className="text-center">
                             
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                   <Trash2 className="h-6 w-6 text-red-600" /> 
                             
            </div>
                             
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Delete Product
            </h3>
                             
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                   <p>Are you sure you want to delete</p>       
                           
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                "{productToDelete?.name}"?
              </p>
                                   <p>This action cannot be undone.</p>         
                     
            </div>
                       {" "}
          </div>
                     {" "}
          <div className="mt-6 grid grid-cols-2 gap-3">
                             
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
                             
            <button
              type="button"
              onClick={confirmDeleteProduct}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
                       {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </Modal>
         {" "}
    </div>
  );
};

export default AdminProducts;
