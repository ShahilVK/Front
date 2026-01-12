
// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import api from "../Api/Axios_Instance";
// import { AuthContext } from "../context/AuthContext";
// import toast, { Toaster } from "react-hot-toast";
// import { motion } from "framer-motion";
// import { Trash2, Plus, Minus } from "lucide-react";

// function Cart() {
//   const { user } = useContext(AuthContext);
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   const fetchCart = async () => {
//     if (!user) return;
//     try {
//       const res = await api.get(`/users/${user.id}`);
//       setCartItems(res.data.cart || []);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, [user]);
  
//   // ✨ 1. New function to update quantity
//   const updateQuantity = async (id, newQuantity) => {
//     if (newQuantity < 1) return; // Prevent quantity from being less than 1

//     try {
//         const updatedCart = cartItems.map(item => 
//             item.id === id ? { ...item, quantity: newQuantity } : item
//         );
//         setCartItems(updatedCart); // Optimistically update UI
//         await api.patch(`/users/${user.id}`, { cart: updatedCart });
//         window.dispatchEvent(new CustomEvent("cartUpdated"));
//     } catch (err) {
//         console.error("Error updating quantity:", err);
//         toast.error("Failed to update cart.");
//         fetchCart(); // Revert to server state on error
//     }
//   };


//   const removeFromCart = async (id) => {
//     try {
//       const updatedCart = cartItems.filter((item) => item.id !== id);
//       setCartItems(updatedCart);
//       await api.patch(`/users/${user.id}`, { cart: updatedCart });
//       toast.success("Item removed from cart.");
//       window.dispatchEvent(new CustomEvent("cartUpdated"));
//     } catch (err) {
//       console.error("Error removing from cart:", err);
//       toast.error("Failed to remove item.");
//     }
//   };

//   const grandTotal = cartItems.reduce(
//     (acc, item) => acc + parseFloat(String(item.price).replace(/[^\d.]/g, "")) * (item.quantity || 1),
//     0
//   );

//   const handleCheckout = () => navigate("/payment");

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="flex-grow pt-24 pb-12">
//         <Toaster position="top-right" />
//         <div className="max-w-6xl mx-auto px-4">
//           <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>

//           {cartItems.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-lg shadow-md">
//               <p className="text-xl text-gray-600 mb-4">Your cart is empty 🛒</p>
//               <button
//                 onClick={() => navigate("/product")}
//                 className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-transform transform hover:scale-105"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           ) : (
//             // ✨ 2. New two-column layout
//             <div className="grid lg:grid-cols-3 gap-8 items-start">
//               {/* Cart Items List */}
//               <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md space-y-4">
//                 {cartItems.map((item) => (
//                   <motion.div
//                     key={item.id}
//                     layout
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 last:border-b-0"
//                   >
//                     <div className="flex items-center gap-4 mb-4 sm:mb-0">
//                       <img src={item.image} alt={item.name} className="w-24 h-24 object-contain rounded border p-1" />
//                       <div className="flex-1">
//                         <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
//                         <p className="text-gray-500 text-sm">{item.category}</p>
//                         <p className="text-red-500 font-bold mt-1">₹{item.price}</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-4">
//                         {/* ✨ 3. New quantity selector */}
//                         <div className="flex items-center border rounded-lg">
//                             <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100 rounded-l-lg transition"><Minus size={16} /></button>
//                             <span className="text-lg font-semibold px-4">{item.quantity || 1}</span>
//                             <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100 rounded-r-lg transition"><Plus size={16} /></button>
//                         </div>

//                         <p className="text-lg font-bold text-gray-800 w-24 text-right">
//                           ₹{(parseFloat(String(item.price).replace(/[^\d.]/g, "")) * (item.quantity || 1)).toFixed(2)}
//                         </p>

//                         <button
//                           onClick={() => removeFromCart(item.id)}
//                           className="ml-4 p-2 text-red-500 hover:bg-red-100 rounded-full transition"
//                         >
//                           <Trash2 size={20} />
//                         </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* ✨ 4. New Order Summary Card */}
//               <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold border-b pb-4 mb-4">Order Summary</h2>
//                 <div className="space-y-3 text-gray-600">
//                     <div className="flex justify-between">
//                         <span>Subtotal</span>
//                         <span className="font-semibold">₹{grandTotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span>Shipping</span>
//                         <span className="font-semibold">FREE</span>
//                     </div>
//                     <div className="border-t pt-4 mt-4 flex justify-between font-bold text-gray-800 text-lg">
//                         <span>Grand Total</span>
//                         <span>₹{grandTotal.toFixed(2)}</span>
//                     </div>
//                 </div>
//                 <button
//                     onClick={handleCheckout}
//                     className="w-full mt-6 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-transform transform hover:scale-105"
//                 >
//                     Proceed to Checkout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Cart;




// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import api from "../Api/Axios_Instance";
// import { AuthContext } from "../context/AuthContext";
// import toast, { Toaster } from "react-hot-toast";
// import { motion } from "framer-motion";
// import { Trash2, Plus, Minus } from "lucide-react";

// function Cart() {
//   const { user } = useContext(AuthContext);
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   const fetchCart = async () => {
//     if (!user) return;
//     try {
//       const res = await api.get(`/users/${user.id}`);
//       setCartItems(res.data.cart || []);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, [user]);

//   // ✨ Helper: update stock in products table
//   const updateProductStock = async (productId, change) => {
//     try {
//       const res = await api.get(`/products/${productId}`);
//       const currentStock = res.data.stock ?? 0;
//       const newStock = currentStock - change; // decrease when adding qty
//       if (newStock < 0) {
//         toast.error("Not enough stock available.");
//         return false;
//       }
//       await api.patch(`/products/${productId}`, { stock: newStock });
//       return true;
//     } catch (err) {
//       console.error("Error updating stock:", err);
//       return false;
//     }
//   };

//   // ✨ 1. Update quantity (sync with stock)
//   const updateQuantity = async (id, newQuantity) => {
//     if (newQuantity < 1) return;

//     try {
//       const product = await api.get(`/products/${id}`);
//       const stock = product.data.stock ?? 0;

//       if (newQuantity > stock + (cartItems.find(i => i.id === id)?.quantity || 0)) {
//         toast.error("Not enough stock available!");
//         return;
//       }

//       const updatedCart = cartItems.map((item) =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       );

//       setCartItems(updatedCart);
//       await api.patch(`/users/${user.id}`, { cart: updatedCart });
//       window.dispatchEvent(new CustomEvent("cartUpdated"));
//     } catch (err) {
//       console.error("Error updating quantity:", err);
//       toast.error("Failed to update cart.");
//       fetchCart();
//     }
//   };

//   // ✨ 2. Remove item (restore stock)
//   const removeFromCart = async (id) => {
//     try {
//       const itemToRemove = cartItems.find((item) => item.id === id);

//       // restore stock when removing
//       if (itemToRemove) {
//         const productRes = await api.get(`/products/${id}`);
//         const currentStock = productRes.data.stock ?? 0;
//         await api.patch(`/products/${id}`, {
//           stock: currentStock + (itemToRemove.quantity || 1),
//         });
//       }

//       const updatedCart = cartItems.filter((item) => item.id !== id);
//       setCartItems(updatedCart);
//       await api.patch(`/users/${user.id}`, { cart: updatedCart });

//       toast.success("Item removed from cart.");
//       window.dispatchEvent(new CustomEvent("cartUpdated"));
//     } catch (err) {
//       console.error("Error removing from cart:", err);
//       toast.error("Failed to remove item.");
//     }
//   };

//   const grandTotal = cartItems.reduce(
//     (acc, item) =>
//       acc +
//       parseFloat(String(item.price).replace(/[^\d.]/g, "")) *
//         (item.quantity || 1),
//     0
//   );

//   const handleCheckout = async () => {
//     try {
//       // Reduce stock permanently after checkout
//       for (const item of cartItems) {
//         await updateProductStock(item.id, item.quantity || 1);
//       }

//       // Empty cart
//       await api.patch(`/users/${user.id}`, { cart: [] });
//       setCartItems([]);
//       toast.success("Checkout successful!");
//       navigate("/payment");
//     } catch (err) {
//       console.error("Checkout failed:", err);
//       toast.error("Checkout failed.");
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="flex-grow pt-24 pb-12">
//         <Toaster position="top-right" />
//         <div className="max-w-6xl mx-auto px-4">
//           <h1 className="text-3xl font-bold mb-8 text-gray-800">
//             Your Shopping Cart
//           </h1>

//           {cartItems.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-lg shadow-md">
//               <p className="text-xl text-gray-600 mb-4">Your cart is empty 🛒</p>
//               <button
//                 onClick={() => navigate("/product")}
//                 className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-transform transform hover:scale-105"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           ) : (
//             <div className="grid lg:grid-cols-3 gap-8 items-start">
//               {/* Cart Items List */}
//               <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md space-y-4">
//                 {cartItems.map((item) => (
//                   <motion.div
//                     key={item.id}
//                     layout
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 last:border-b-0"
//                   >
//                     <div className="flex items-center gap-4 mb-4 sm:mb-0">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-24 h-24 object-contain rounded border p-1"
//                       />
//                       <div className="flex-1">
//                         <h2 className="text-lg font-semibold text-gray-800">
//                           {item.name}
//                         </h2>
//                         <p className="text-gray-500 text-sm">{item.category}</p>
//                         <p className="text-red-500 font-bold mt-1">
//                           ₹{item.price}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       {/* Quantity Selector */}
//                       <div className="flex items-center border rounded-lg">
//                         <button
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity - 1)
//                           }
//                           className="p-2 hover:bg-gray-100 rounded-l-lg transition"
//                         >
//                           <Minus size={16} />
//                         </button>
//                         <span className="text-lg font-semibold px-4">
//                           {item.quantity || 1}
//                         </span>
//                         <button
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity + 1)
//                           }
//                           className="p-2 hover:bg-gray-100 rounded-r-lg transition"
//                         >
//                           <Plus size={16} />
//                         </button>
//                       </div>

//                       <p className="text-lg font-bold text-gray-800 w-24 text-right">
//                         ₹
//                         {(
//                           parseFloat(
//                             String(item.price).replace(/[^\d.]/g, "")
//                           ) * (item.quantity || 1)
//                         ).toFixed(2)}
//                       </p>

//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="ml-4 p-2 text-red-500 hover:bg-red-100 rounded-full transition"
//                       >
//                         <Trash2 size={20} />
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Order Summary */}
//               <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold border-b pb-4 mb-4">
//                   Order Summary
//                 </h2>
//                 <div className="space-y-3 text-gray-600">
//                   <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span className="font-semibold">
//                       ₹{grandTotal.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Shipping</span>
//                     <span className="font-semibold">FREE</span>
//                   </div>
//                   <div className="border-t pt-4 mt-4 flex justify-between font-bold text-gray-800 text-lg">
//                     <span>Grand Total</span>
//                     <span>₹{grandTotal.toFixed(2)}</span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleCheckout}
//                   className="w-full mt-6 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-transform transform hover:scale-105"
//                 >
//                   Proceed to Checkout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Cart;


import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import api from "../Api/Axios_Instance";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ImageOff } from "lucide-react";

// ✅ Backend URL
const API_BASE_URL = "https://localhost:7155"; 

function Cart() {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    if (!user) return;
    try {
      const res = await api.get("/cart");
      
      const items = Array.isArray(res.data) 
        ? res.data 
        : (res.data.data || res.data.items || []);

      console.log("🛒 Cart Data from Backend:", items);

      setCartItems(items);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error("Could not load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

 

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.put(`/cart/${productId}`, { quantity });
      // Optimistic Update
      setCartItems(prev => prev.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      ));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      setCartItems(prev => prev.filter(item => item.productId !== productId));
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Removed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove");
    }
  };

  const grandTotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  // ✅ Helper to construct valid image URL
  const constructImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http") || path.startsWith("blob:")) return path; 
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <Toaster position="top-right" />
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <p className="text-xl text-gray-600 mb-4">Your cart is empty 🛒</p>
              <button
                onClick={() => navigate("/product")}
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md space-y-4">
                {cartItems.map((item) => {
                  
                  // ✅ FIX: Check ALL possible property names
                  const rawPath = 
                    item.imageUrl || 
                    item.ImageUrl ||  // PascalCase (Common in C#)
                    item.image || 
                    item.Image ||
                    item.productImage || 
                    null;

                  const finalImageSrc = constructImageUrl(rawPath);

                  return (
                    <motion.div
                      key={item.productId || item.id}
                      layout
                      className="flex flex-col sm:flex-row justify-between border-b pb-4"
                    >
                      <div className="flex items-center gap-4">
                        {/* Image Container */}
                        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center relative border border-gray-200">
                           {finalImageSrc ? (
                            <img
                              src={finalImageSrc}
                              alt={item.productName || "Product"}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                console.warn("Image failed to load:", finalImageSrc);
                                e.target.style.display = "none"; 
                                e.target.parentElement.querySelector('.fallback-icon').style.display = "flex";
                              }}
                            />
                          ) : null}
                          
                          {/* Fallback Icon */}
                          <div 
                             className="fallback-icon flex flex-col items-center justify-center text-gray-400 absolute inset-0 bg-gray-100"
                             style={{ display: finalImageSrc ? 'none' : 'flex' }}
                          >
                             <ImageOff size={24} />
                             <span className="text-[10px]">No Image</span>
                          </div>
                        </div>

                        <div>
                          <h2 className="font-semibold text-lg">{item.productName || "Unknown Product"}</h2>
                          <p className="text-red-500 font-bold">₹{item.price}</p>
                        </div>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <p className="font-bold min-w-[80px] text-right">
                          ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </p>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 p-2 hover:bg-red-50 rounded-full transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-6 text-lg">
                  <span>Total Amount</span>
                  <span className="font-bold text-red-600">₹{grandTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => navigate("/payment")}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition shadow-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Cart;