// import React, { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import api from "../Api/Axios_Instance";
// import {ShoppingCart,Heart,Package,User,X,FileText,Edit,Trash2,} from "lucide-react";
// import Navbar from "../components/Navbar";

// const Modal = ({ children, isOpen, onClose }) => {
//   if (!isOpen) return null;
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// const Footer = () => (
//   <footer className="bg-white p-4 text-center text-sm text-gray-500 border-t mt-12">
//     © {new Date().getFullYear()} TekTrov. All rights reserved.
//   </footer>
// );

// function Profile() {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editFormData, setEditFormData] = useState({ name: "", email: "" });

//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

//   const getLoggedInUserId = () => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         return JSON.parse(storedUser).id;
//       }
//       return "pdwh";
//     } catch {
//       return "pdwh";
//     }
//   };

//   const userId = getLoggedInUserId();

//   const fetchUserData = async () => {
//     if (!userId) {
//       setIsLoading(false);
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const res = await api.get(`/users/${userId}`);
//       setUser(res.data);
//       setEditFormData({ name: res.data.name, email: res.data.email });
//     } catch (err) {
//       console.error("Failed to fetch user data:", err);
//       toast.error("Could not load user profile.");
//       setUser(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, [userId]);

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     const loadingToast = toast.loading("Updating profile...");
//     try {
//       await api.patch(`/users/${userId}`, editFormData);
//       toast.success("Profile updated successfully!", { id: loadingToast });
//       setIsEditModalOpen(false);
//       fetchUserData();
//     } catch (err) {
//       toast.error("Failed to update profile.", { id: loadingToast });
//     }
//   };

//   const handleRemoveFromCart = async (itemId) => {
//     const newCart = user.cart.filter((item) => item.id !== itemId);
//     try {
//       await api.patch(`/users/${userId}`, { cart: newCart });
//       toast.success("Item removed from cart.");
//       fetchUserData();
//     } catch {
//       toast.error("Failed to remove item.");
//     }
//   };

//   const handleRemoveFromWishlist = async (itemId) => {
//     const newWishlist = user.wishlist.filter((item) => item.id !== itemId);
//     try {
//       await api.patch(`/users/${userId}`, { wishlist: newWishlist });
//       toast.success("Item removed from wishlist.");
//       fetchUserData();
//     } catch {
//       toast.error("Failed to remove item.");
//     }
//   };

//   const handleViewDetails = (order) => {
//     setSelectedOrder(order);
//     setIsDetailsModalOpen(true);
//   };

//   const renderSkeleton = () => (
//     <div className="max-w-6xl mx-auto mt-24 p-6 space-y-10 animate-pulse">
//       <div className="bg-gray-200 rounded-2xl p-6 h-36"></div>
//       <div className="grid md:grid-cols-3 gap-6">
//         <div className="bg-gray-200 rounded-xl p-6 h-60"></div>
//         <div className="bg-gray-200 rounded-xl p-6 h-60"></div>
//         <div className="bg-gray-200 rounded-xl p-6 h-60"></div>
//       </div>
//     </div>
//   );

//   if (isLoading)
//     return <div className="bg-gray-50 min-h-screen pt-20">{renderSkeleton()}</div>;

//   if (!user) {
//     return (
//       <>
//         <Navbar user={null} />
//         <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//           <p className="text-xl text-gray-600 font-semibold mb-4">
//             Please log in to view your profile.
//           </p>
//           <p className="text-sm text-gray-400">
//             (Showing data for a demo user by default)
//           </p>
//         </div>
//       </>
//     );
//   }

//   const { cart = [], wishlist = [], orders = [] } = user;
//   const parsePrice = (price) =>
//     parseFloat(String(price).replace(/[^\d.]/g, "")) || 0;

//   return (
//     <>
//       <Toaster position="top-right" />
//       <Navbar
//         user={user}
//         onLogout={() => {
//           localStorage.removeItem("user");
//           setUser(null);
//         }}
//       />
//       <div className="bg-gray-50 min-h-screen">
//         <div className="max-w-6xl mx-auto pt-24 p-6 space-y-10">
//           {/* Profile Header */}
//           <div className="bg-gradient-to-r from-red-500 to-red-400 shadow-lg rounded-2xl p-6 flex items-center gap-6">
//             <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
//               <User size={48} className="text-white" />
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold text-white">{user.name}</h2>
//               <p className="text-red-200 font-medium">{user.email}</p>
//               <span className="text-red-700 bg-white/80 px-3 py-1 text-sm font-semibold rounded-full mt-2 inline-block">
//                 Role: {user.role}
//               </span>
//             </div>
//           </div>

//           {/* Cart / Wishlist / Orders */}
//           <div className="grid md:grid-cols-3 gap-6">
//             {/* Cart */}
//             <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition relative flex flex-col">
//               <div className="flex items-center gap-3 mb-4">
//                 <ShoppingCart className="text-red-500" />
//                 <h3 className="text-xl font-bold text-gray-800">My Cart</h3>
//               </div>
//               {cart.length === 0 ? (
//                 <p className="text-gray-500 flex-1 flex items-center justify-center">
//                   No items in your cart.
//                 </p>
//               ) : (
//                 <ul className="space-y-3 max-h-52 overflow-y-auto pr-2">
//                   {cart.map((item) => (
//                     <li
//                       key={item.id}
//                       className="flex items-center gap-3 border-b pb-2 last:border-0"
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-12 h-12 object-contain rounded-md"
//                       />
//                       <div className="flex-1">
//                         <p className="font-semibold text-sm">{item.name}</p>
//                         <p className="text-xs text-gray-500">
//                           Qty: {item.quantity || 1}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => handleRemoveFromCart(item.id)}
//                         className="p-1 text-gray-400 hover:text-red-500"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               <span className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold">
//                 {cart.length}
//               </span>
//             </div>

//             {/* Wishlist */}
//             <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition relative flex flex-col">
//               <div className="flex items-center gap-3 mb-4">
//                 <Heart className="text-red-500" />
//                 <h3 className="text-xl font-bold text-gray-800">My Wishlist</h3>
//               </div>
//               {wishlist.length === 0 ? (
//                 <p className="text-gray-500 flex-1 flex items-center justify-center">
//                   No items in your wishlist.
//                 </p>
//               ) : (
//                 <ul className="space-y-3 max-h-52 overflow-y-auto pr-2">
//                   {wishlist.map((item) => (
//                     <li
//                       key={item.id}
//                       className="flex items-center gap-3 border-b pb-2 last:border-0"
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-12 h-12 object-contain rounded-md"
//                       />
//                       <div className="flex-1">
//                         <p className="font-semibold text-sm">{item.name}</p>
//                         <p className="text-xs text-gray-500">{item.price}</p>
//                       </div>
//                       <button
//                         onClick={() => handleRemoveFromWishlist(item.id)}
//                         className="p-1 text-gray-400 hover:text-red-500"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               <span className="absolute top-4 right-4 bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold">
//                 {wishlist.length}
//               </span>
//             </div>

//             {/* Orders */}
//             <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition relative flex flex-col">
//               <div className="flex items-center gap-3 mb-4">
//                 <Package className="text-red-500" />
//                 <h3 className="text-xl font-bold text-gray-800">My Orders</h3>
//               </div>
//               {orders.length === 0 ? (
//                 <p className="text-gray-500 flex-1 flex items-center justify-center">
//                   You haven't placed any orders.
//                 </p>
//               ) : (
//                 <ul className="space-y-2 max-h-52 overflow-y-auto pr-2">
//                   {orders.map((order) => (
//                     <li
//                       key={order.id}
//                       className="border p-2 rounded-md hover:bg-gray-50 transition flex justify-between items-center"
//                     >
//                       <div>
//                         <p className="text-sm font-semibold text-gray-700">
//                           ID: {order.id}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {new Date(order.date).toLocaleDateString()}
//                         </p>
//                         <p className="text-sm font-bold text-red-600">
//                           ₹{order.total}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => handleViewDetails(order)}
//                         className="p-2 text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-full transition"
//                       >
//                         <FileText size={16} />
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               <span className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold">
//                 {orders.length}
//               </span>
//             </div>
//           </div>

//           {/* Edit Profile Button */}
//           <div className="flex justify-center mt-8">
//             <button
//               onClick={() => setIsEditModalOpen(true)}
//               className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-lg active:scale-95"
//             >
//               <Edit size={18} /> Edit Profile
//             </button>
//           </div>
//         </div>
//         <Footer />
//       </div>

//       {/* Edit Modal */}
//       <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
//         <form onSubmit={handleUpdateProfile} className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
//             <button
//               type="button"
//               onClick={() => setIsEditModalOpen(false)}
//               className="text-gray-500 hover:text-gray-800"
//             >
//               <X size={24} />
//             </button>
//           </div>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={editFormData.name}
//                 onChange={handleEditInputChange}
//                 className="mt-1 block w-full p-2 border rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={editFormData.email}
//                 onChange={handleEditInputChange}
//                 className="mt-1 block w-full p-2 border rounded-md"
//                 required
//               />
//             </div>
//           </div>
//           <div className="mt-6 flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={() => setIsEditModalOpen(false)}
//               className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Order Details Modal */}
//       <Modal
//         isOpen={isDetailsModalOpen}
//         onClose={() => setIsDetailsModalOpen(false)}
//       >
//         {selectedOrder && (
//           <div className="p-6">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   Order Details
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   Order #{selectedOrder.id}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setIsDetailsModalOpen(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="mt-4 border-t border-b py-4 grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="font-semibold text-gray-600">Billing Name</p>
//                 <p className="text-gray-800">
//                   {selectedOrder.billing?.name || user.name}
//                 </p>
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-600">Billing Address</p>
//                 <p className="text-gray-500">
//                   {selectedOrder.billing?.address || "N/A"}
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <h4 className="font-semibold mb-2 text-gray-700">
//                 Items Ordered
//               </h4>
//               <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
//                 {selectedOrder.items?.map((item, index) => (
//                   <div
//                     key={item.id + index}
//                     className="flex items-center gap-4"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 rounded-md object-cover shadow-sm"
//                     />
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-800">{item.name}</p>
//                       <p className="text-sm text-gray-500">
//                         Qty: {item.quantity}
//                       </p>
//                     </div>
//                     <p className="font-medium text-gray-700">
//                       ₹{Number(parsePrice(item.price) * item.quantity).toFixed(
//                         2
//                       )}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="mt-4 pt-4 border-t flex justify-between items-center font-bold text-lg">
//               <span className="text-gray-600">Order Total</span>
//               <span className="text-red-600">
//                 ₹{Number(selectedOrder.total).toFixed(2)}
//               </span>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </>
//   );
// }

// export default Profile;

// import React, { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import api from "../Api/Axios_Instance";
// import {
//   ShoppingCart,
//   Heart,
//   Package,
//   User,
//   X,
//   FileText,
//   Edit,
//   Trash2,
// } from "lucide-react";
// import Navbar from "../components/Navbar";

// const Modal = ({ children, isOpen, onClose }) => {
//   if (!isOpen) return null;
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-lg shadow-xl w-full max-w-md"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// const Footer = () => (
//   <footer className="bg-white p-4 text-center text-sm text-gray-500 border-t mt-12">
//     © {new Date().getFullYear()} TekTrov. All rights reserved.
//   </footer>
// );

// function Profile() {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editFormData, setEditFormData] = useState({ name: "", email: "" });

//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

//   const fetchUserData = async () => {
//     setIsLoading(true);
//     try {
//       const res = await api.get("/users/My Profile"); // ✅ FIX
//       setUser(res.data.data);
//       setEditFormData({
//         name: res.data.data.name,
//         email: res.data.data.email,
//       });
//     } catch (err) {
//       console.error("Failed to fetch user data:", err);
//       toast.error("Could not load user profile.");
//       setUser(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     const loadingToast = toast.loading("Updating profile...");
//     try {
//       await api.patch("/users/My Profile", editFormData); // ✅ FIX
//       toast.success("Profile updated successfully!", { id: loadingToast });
//       setIsEditModalOpen(false);
//       fetchUserData();
//     } catch {
//       toast.error("Failed to update profile.", { id: loadingToast });
//     }
//   };

// const handleRemoveFromCart = async (productId) => {
//   try {
//     await api.delete(`/cart/${productId}`);
//     toast.success("Item removed from cart.");
//     fetchUserData();
//     window.dispatchEvent(new Event("cartUpdated"));
//   } catch (err) {
//     toast.error("Failed to remove item.");
//   }
// };

// const handleRemoveFromWishlist = async (productId) => {
//   try {
//     await api.delete(`/wishlist/${productId}`);
//     toast.success("Item removed from wishlist.");
//     fetchUserData();
//   } catch (err) {
//     toast.error("Failed to remove item.");
//   }
// };

//   const handleViewDetails = (order) => {
//     setSelectedOrder(order);
//     setIsDetailsModalOpen(true);
//   };

//   if (isLoading) {
//     return (
//       <div className="bg-gray-50 min-h-screen pt-20 text-center">
//         Loading profile...
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <>
//         <Navbar />
//         <div className="flex items-center justify-center h-screen bg-gray-50">
//           <p className="text-xl text-gray-600 font-semibold">
//             Please log in to view your profile.
//           </p>
//         </div>
//       </>
//     );
//   }

//   const { cart = [], wishlist = [], orders = [] } = user;

//   return (
//     <>
//       <Toaster position="top-right" />
//       <Navbar />

//       <div className="bg-gray-50 min-h-screen">
//         <div className="max-w-6xl mx-auto pt-24 p-6 space-y-10">
//           {/* PROFILE HEADER */}
//           <div className="bg-gradient-to-r from-red-500 to-red-400 rounded-2xl p-6 flex items-center gap-6">
//             <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
//               <User size={48} className="text-white" />
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold text-white">{user.name}</h2>
//               <p className="text-red-200">{user.email}</p>
//             </div>
//           </div>

//           {/* CART / WISHLIST / ORDERS */}
//           <div className="grid md:grid-cols-3 gap-6">
//             {/* CART */}
//             <div className="bg-white shadow-lg rounded-xl p-6">
//               <h3 className="text-xl font-bold flex items-center gap-2">
//                 <ShoppingCart /> My Cart
//               </h3>
//               <ul className="mt-4 space-y-3">
//                 {cart.map((item) => (
//                   <li key={item.productId} className="flex justify-between">
//                     <span>{item.productName}</span>
//                     <button onClick={() => handleRemoveFromCart(item.productId)}>
//                       <Trash2 size={14} />
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* WISHLIST */}
//             <div className="bg-white shadow-lg rounded-xl p-6">
//               <h3 className="text-xl font-bold flex items-center gap-2">
//                 <Heart /> My Wishlist
//               </h3>
//               <ul className="mt-4 space-y-3">
//                 {wishlist.map((item) => (
//                   <li key={item.productId} className="flex justify-between">
//                     <span>{item.productName}</span>
//                     <button
//                       onClick={() => handleRemoveFromWishlist(item.productId)}
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* ORDERS */}
//             <div className="bg-white shadow-lg rounded-xl p-6">
//               <h3 className="text-xl font-bold flex items-center gap-2">
//                 <Package /> My Orders
//               </h3>
//               <ul className="mt-4 space-y-3">
//                 {orders.map((order) => (
//                   <li key={order.id} className="flex justify-between">
//                     <span>Order #{order.id}</span>
//                     <button onClick={() => handleViewDetails(order)}>
//                       <FileText size={14} />
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* EDIT PROFILE */}
//           <div className="flex justify-center">
//             <button
//               onClick={() => setIsEditModalOpen(true)}
//               className="px-6 py-3 bg-red-600 text-white rounded-lg"
//             >
//               <Edit size={18} /> Edit Profile
//             </button>
//           </div>
//         </div>
//         <Footer />
//       </div>

//       {/* EDIT MODAL */}
//       <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
//         <form onSubmit={handleUpdateProfile} className="p-6">
//           <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
//           <input
//             name="name"
//             value={editFormData.name}
//             onChange={handleEditInputChange}
//             className="w-full border p-2 mb-3"
//           />
//           <input
//             name="email"
//             value={editFormData.email}
//             onChange={handleEditInputChange}
//             className="w-full border p-2 mb-3"
//           />
//           <button className="bg-red-600 text-white px-4 py-2 rounded">
//             Save
//           </button>
//         </form>
//       </Modal>
//     </>
//   );
// }

// export default Profile;

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../Api/Axios_Instance";
import {
  ShoppingCart,
  Heart,
  Package,
  User,
  FileText,
  Edit,
  Trash2,
  Lock, // ✅ NEW
} from "lucide-react";
import Navbar from "../components/Navbar";

/* ---------------- MODAL ---------------- */
const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-white p-4 text-center text-sm text-gray-500 border-t mt-12">
    © {new Date().getFullYear()} TekTrov. All rights reserved.
  </footer>
);

function Profile() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // ✅ NEW

  const [editFormData, setEditFormData] = useState({ name: "", email: "" });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
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

  /* ---------------- UPDATE PROFILE ---------------- */
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const t = toast.loading("Updating profile...");
    try {
      await api.patch("/users/my-profile", editFormData);
      toast.success("Profile updated!", { id: t });
      setIsEditModalOpen(false);
      fetchUserData();
    } catch {
      toast.error("Update failed", { id: t });
    }
  };

  /* ---------------- CHANGE PASSWORD ---------------- */
const handleChangePassword = async (e) => {
  e.preventDefault();
  const t = toast.loading("Changing password...");

  try {
    await api.put("/users/change-password", {
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
      confirmPassword: passwordForm.confirmPassword,
    });

    toast.success("Password changed successfully", { id: t });
    setIsPasswordModalOpen(false);

    const [passwordForm, setPasswordForm] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",   // ✅ MUST EXIST
});

  } catch (err) {
    toast.error(
      err.response?.data?.message || "Password change failed",
      { id: t }
    );
  }
};


  const handleRemoveFromCart = async (productId) => {
    await api.delete(`/cart/${productId}`);
    toast.success("Item removed from cart");
    fetchCounts(); // ✅ refresh count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemoveFromWishlist = async (productId) => {
    await api.delete(`/wishlist/${productId}`);
    toast.success("Item removed from wishlist");
    fetchCounts(); // ✅ refresh count
  };

  if (isLoading) {
    return <div className="pt-24 text-center">Loading profile...</div>;
  }

  if (!user) {
    return <div>Please login</div>;
  }

  const { cart = [], wishlist = [], orders = [] } = user;

 

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <div className="bg-gray-50 min-h-screen pt-24 p-6">
        {/* PROFILE HEADER */}
        <div className="bg-gradient-to-r from-red-500 to-red-400 rounded-2xl p-6 flex items-center gap-6">
          <User size={48} className="text-white" />
          <div>
            <h2 className="text-3xl font-bold text-white">{user.name}</h2>
            <p className="text-red-200">{user.email}</p>
          </div>
        </div>

        {/* ✅ COUNTS */}

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <CountCard title="Cart" count={cartCount} />
          <CountCard title="Wishlist" count={wishlistCount} />
          <CountCard title="Orders" count={ordersCount} />
        </div>
   

        {/* ACTION BUTTONS */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg flex gap-2"
          >
            <Edit size={16} /> Edit Profile
          </button>

          <button // ✅ NEW
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-black text-white px-6 py-3 rounded-lg flex gap-2"
          >
            <Lock size={16} /> Change Password
          </button>
        </div>
      </div>

      <Footer />

      {/* EDIT PROFILE MODAL */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <form onSubmit={handleUpdateProfile} className="p-6">
          <h2 className="font-bold mb-4">Edit Profile</h2>
          <input
            className="input"
            value={editFormData.name}
            onChange={(e) =>
              setEditFormData({ ...editFormData, name: e.target.value })
            }
          />
          <input
            className="input mt-3"
            value={editFormData.email}
            onChange={(e) =>
              setEditFormData({ ...editFormData, email: e.target.value })
            }
          />
          <button className="btn-red w-full mt-4">Save</button>
        </form>
      </Modal>

      {/* CHANGE PASSWORD MODAL */}

     <Modal
  isOpen={isPasswordModalOpen}
  onClose={() => setIsPasswordModalOpen(false)}
>
  <form onSubmit={handleChangePassword} className="p-6">
    <h2 className="font-bold mb-4">Change Password</h2>

    <input
      type="password"
      className="input"
      placeholder="Current Password"
      value={passwordForm.currentPassword}
      onChange={(e) =>
        setPasswordForm({
          ...passwordForm,
          currentPassword: e.target.value,
        })
      }
      required
    />

    <input
      type="password"
      className="input mt-3"
      placeholder="New Password"
      value={passwordForm.newPassword}
      onChange={(e) =>
        setPasswordForm({
          ...passwordForm,
          newPassword: e.target.value,
        })
      }
      required
    />

    <input
      type="password"
      className="input mt-3"
      placeholder="Confirm New Password"
      value={passwordForm.confirmPassword}
      onChange={(e) =>
        setPasswordForm({
          ...passwordForm,
          confirmPassword: e.target.value,
        })
      }
      required
    />

    <button className="btn-dark w-full mt-4">
      Update Password
    </button>
  </form>
</Modal>


    </>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */
const CountCard = ({ icon, title, count }) => (
  <div className="bg-white shadow rounded-xl p-6 text-center">
    <div className="flex justify-center mb-2">{icon}</div>
    <h3 className="font-bold">{title}</h3>
    <p className="text-2xl font-extrabold text-red-500">{count}</p>
  </div>
);

const ListCard = ({ title, children }) => (
  <div className="bg-white shadow rounded-xl p-6">
    <h3 className="font-bold mb-3">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const Row = ({ text, onRemove }) => (
  <div className="flex justify-between">
    <span>{text}</span>
    <button onClick={onRemove}>
      <Trash2 size={14} />
    </button>
  </div>
);

export default Profile;
