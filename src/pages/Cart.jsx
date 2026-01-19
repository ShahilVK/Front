

// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import api from "../Api/Axios_Instance";
// import { AuthContext } from "../context/AuthContext";
// import toast, { Toaster } from "react-hot-toast";
// import { motion } from "framer-motion";
// import { Trash2, Plus, Minus, ImageOff } from "lucide-react";

// // ✅ Backend URL
// const API_BASE_URL = "https://localhost:7155"; 

// function Cart() {
//   const { user } = useContext(AuthContext);
//   const [cartItems, setCartItems] = useState([]);
//   const [quantityTimers, setQuantityTimers] = useState({});

//   const navigate = useNavigate();

//   const fetchCart = async () => {
//     if (!user) return;
//     try {
//       const res = await api.get("/cart");
      
//  const items =
//   res.data?.data ??
//   res.data?.items ??
//   (Array.isArray(res.data) ? res.data : []);


//       console.log("🛒 Cart Data from Backend:", items);

//       setCartItems(items);
//       window.dispatchEvent(new Event("cartUpdated"));
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       toast.error("Could not load cart");
//     }
//   };


//   useEffect(() => {
//   if (user) {
//     fetchCart();
//   }
// }, [user]);


//   const updateQuantity = (productId, quantity) => {
//   if (quantity < 1) return;

//   setCartItems((prev) =>
//     prev.map((item) =>
//       item.productId === productId
//         ? { ...item, quantity }
//         : item
//     )
//   );

//   if (quantityTimers[productId]) {
//     clearTimeout(quantityTimers[productId]);
//   }

//   const timer = setTimeout(async () => {
//     try {
//       await api.put(`/cart/${productId}`, { quantity });
//       window.dispatchEvent(new Event("cartUpdated"));
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update cart");
//       fetchCart(); // rollback from backend
//     }
//   }, 400);

//   setQuantityTimers((prev) => ({
//     ...prev,
//     [productId]: timer,
//   }));
// };





//   const removeFromCart = async (productId) => {
//     try {
//       await api.delete(`/cart/${productId}`);
//       setCartItems(prev => prev.filter(item => item.productId !== productId));
//       window.dispatchEvent(new Event("cartUpdated"));
//       toast.success("Removed");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to remove");
//     }
//   };

//   const grandTotal = cartItems.reduce(
//     (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
//     0
//   );

//   const constructImageUrl = (path) => {
//     if (!path) return null;
//     if (path.startsWith("http") || path.startsWith("blob:")) return path; 
//     const cleanPath = path.startsWith("/") ? path.substring(1) : path;
//     return `${API_BASE_URL}/${cleanPath}`;
//   };

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
//                 className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           ) : (
//             <div className="grid lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md space-y-4">
//                 {cartItems.map((item) => {
                  
//                   // ✅ FIX: Check ALL possible property names
//                   const rawPath = 
//                     item.imageUrl || 
//                     item.ImageUrl ||  // PascalCase (Common in C#)
//                     item.image || 
//                     item.Image ||
//                     item.productImage || 
//                     null;

//                   const finalImageSrc = constructImageUrl(rawPath);

//                   return (
//                     <motion.div
//                       key={item.productId || item.id}
//                       layout
//                       className="flex flex-col sm:flex-row justify-between border-b pb-4"
//                     >
//                       <div className="flex items-center gap-4">
//                         {/* Image Container */}
//                         <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center relative border border-gray-200">
//                            {finalImageSrc ? (
//                             <img
//                               src={finalImageSrc}
//                               alt={item.productName || "Product"}
//                               className="w-full h-full object-contain"
//                               onError={(e) => {
//                                 console.warn("Image failed to load:", finalImageSrc);
//                                 e.target.style.display = "none"; 
//                                 e.target.parentElement.querySelector('.fallback-icon').style.display = "flex";
//                               }}
//                             />
//                           ) : null}
                          
//                           {/* Fallback Icon */}
//                           <div 
//                              className="fallback-icon flex flex-col items-center justify-center text-gray-400 absolute inset-0 bg-gray-100"
//                              style={{ display: finalImageSrc ? 'none' : 'flex' }}
//                           >
//                              <ImageOff size={24} />
//                              <span className="text-[10px]">No Image</span>
//                           </div>
//                         </div>

//                         <div>
//                           <h2 className="font-semibold text-lg">{item.productName || "Unknown Product"}</h2>
//                           <p className="text-red-500 font-bold">₹{item.price}</p>
//                         </div>
//                       </div>

//                       {/* Quantity & Delete */}
//                       <div className="flex items-center gap-4 mt-4 sm:mt-0">
//                         <div className="flex items-center border rounded">
//                           <button
//                             onClick={() => updateQuantity(item.productId, item.quantity - 1)}
//                             className="p-2 hover:bg-gray-100"
//                           >
//                             <Minus size={16} />
//                           </button>
//                           <span className="px-4 font-medium">{item.quantity}</span>
//                           <button
//                             onClick={() => updateQuantity(item.productId, item.quantity + 1)}
//                             className="p-2 hover:bg-gray-100"
//                           >
//                             <Plus size={16} />
//                           </button>
//                         </div>
                        
//                         <p className="font-bold min-w-[80px] text-right">
//                           ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
//                         </p>

//                         <button
//                           onClick={() => removeFromCart(item.productId)}
//                           className="text-red-500 p-2 hover:bg-red-50 rounded-full transition"
//                         >
//                           <Trash2 size={20} />
//                         </button>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>

//               {/* Order Summary */}
//               <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
//                 <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//                 <div className="flex justify-between mb-6 text-lg">
//                   <span>Total Amount</span>
//                   <span className="font-bold text-red-600">₹{grandTotal.toFixed(2)}</span>
//                 </div>
//                 <button
//                   onClick={() => navigate("/payment")}
//                   className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition shadow-lg"
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
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ImageOff, ShoppingBag, ArrowRight, ShieldCheck, Truck, Package, X } from "lucide-react";

// ✅ Backend URL
const API_BASE_URL = "https://localhost:7155"; 

function Cart() {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [quantityTimers, setQuantityTimers] = useState({});

  const navigate = useNavigate();

  const fetchCart = async () => {
    if (!user) return;
    try {
      const res = await api.get("/cart");
      
      const items =
        res.data?.data ??
        res.data?.items ??
        (Array.isArray(res.data) ? res.data : []);

      console.log("🛒 Cart Data from Backend:", items);

      setCartItems(items);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error("Could not load cart");
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );

    if (quantityTimers[productId]) {
      clearTimeout(quantityTimers[productId]);
    }

    const timer = setTimeout(async () => {
      try {
        await api.put(`/cart/${productId}`, { quantity });
        window.dispatchEvent(new Event("cartUpdated"));
      } catch (err) {
        console.error(err);
        toast.error("Failed to update cart");
        fetchCart(); // rollback from backend
      }
    }, 400);

    setQuantityTimers((prev) => ({
      ...prev,
      [productId]: timer,
    }));
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      setCartItems(prev => prev.filter(item => item.productId !== productId));
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Item removed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  const grandTotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const constructImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http") || path.startsWith("blob:")) return path; 
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F4F5] font-sans selection:bg-black selection:text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-8">
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#000',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              fontSize: '14px',
              fontWeight: '600',
              padding: '12px 24px',
            },
            success: { iconTheme: { primary: '#000', secondary: '#fff' } },
          }} 
        />
        
        <div className="max-w-[1400px] mx-auto">
          {/* Minimal Header */}
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
              Shopping Cart
              <span className="text-gray-400 ml-2 font-light text-3xl">.</span>
            </h1>
            <div className="hidden md:block text-sm font-medium text-gray-500 uppercase tracking-widest">
              {cartItems.length} Items
            </div>
          </div>

          {cartItems.length === 0 ? (
            // Premium Empty State
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-[2rem] p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#f1f1f1_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
              
              <div className="relative z-10 bg-gray-50 p-8 rounded-full mb-8 ring-8 ring-gray-50/50">
                <ShoppingBag size={40} className="text-gray-900" strokeWidth={1.5} />
              </div>
              <h2 className="relative z-10 text-3xl font-bold text-gray-900 mb-4 tracking-tight">Your bag is empty</h2>
              <p className="relative z-10 text-gray-500 mb-10 max-w-md text-lg font-light leading-relaxed">
                The best time to start your collection is now. Explore our latest arrivals.
              </p>
              <button
                onClick={() => navigate("/product")}
                className="relative z-10 group flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Start Shopping
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
              
              {/* Cart Items List */}
              <div className="lg:w-2/3 space-y-6">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => {
                    const rawPath = item.imageUrl || item.ImageUrl || item.image || item.Image || item.productImage || null;
                    const finalImageSrc = constructImageUrl(rawPath);

                    return (
                      <motion.div
                        key={item.productId || item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                        className="group relative bg-white p-6 rounded-[2rem] shadow-[0_2px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 border border-gray-100/50"
                      >
                        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-stretch">
                          
                          {/* Image */}
                          <div className="relative w-40 h-40 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden group-hover:bg-[#f0f0f0] transition-colors duration-500">
                            {finalImageSrc ? (
                              <img
                                src={finalImageSrc}
                                alt={item.productName}
                                className="w-full h-full object-contain p-4 mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.parentElement.querySelector('.fallback-icon').style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div 
                              className="fallback-icon hidden absolute inset-0 flex-col items-center justify-center text-gray-300"
                              style={{ display: finalImageSrc ? 'none' : 'flex' }}
                            >
                              <ImageOff size={24} strokeWidth={1.5} />
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex-1 w-full flex flex-col justify-between py-2">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2 text-center sm:text-left">
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-snug">
                                  {item.productName || "Unknown Product"}
                                </h3>
                                <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">
                                  Price: ₹{item.price}
                                </p>
                              </div>
                              
                              {/* Desktop Delete */}
                              <button
                                onClick={() => removeFromCart(item.productId)}
                                className="hidden sm:flex group/btn items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all duration-300"
                              >
                                <X size={18} />
                              </button>
                            </div>

                            <div className="flex items-center justify-between mt-6 bg-gray-50/50 p-2 rounded-2xl sm:bg-transparent sm:p-0">
                              
                              {/* Luxury Quantity Selector */}
                              <div className="flex items-center bg-white border border-gray-200 rounded-full px-1 py-1 shadow-sm">
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-all disabled:opacity-30"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={14} strokeWidth={3} />
                                </button>
                                <span className="w-12 text-center font-bold text-gray-900 text-sm select-none">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-all"
                                >
                                  <Plus size={14} strokeWidth={3} />
                                </button>
                              </div>

                              {/* Price */}
                              <p className="text-xl font-black text-gray-900 tracking-tight">
                                ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                              </p>
                            </div>

                            {/* Mobile Delete */}
                            <button
                                onClick={() => removeFromCart(item.productId)}
                                className="sm:hidden w-full mt-4 py-3 text-xs font-bold text-red-500 bg-red-50 rounded-xl uppercase tracking-widest"
                            >
                                Remove Item
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Sticky Summary Panel */}
              <div className="lg:w-1/3">
                <div className="sticky top-32">
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden">
                    
                    {/* Decorative Background Blur */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gray-50 blur-3xl opacity-50 pointer-events-none"></div>

                    <h2 className="text-2xl font-black text-gray-900 mb-8 relative z-10">Order Summary</h2>
                    
                    <div className="space-y-5 mb-8 relative z-10">
                      <div className="flex justify-between items-center text-gray-500">
                        <span className="text-sm font-medium">Subtotal</span>
                        <span className="font-bold text-gray-900">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-500">
                        <span className="text-sm font-medium flex items-center gap-2">
                           Shipping
                        </span>
                        <span className="text-xs font-bold bg-black text-white px-2 py-1 rounded-md tracking-wider">FREE</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-500">
                        <span className="text-sm font-medium">Estimated Tax</span>
                        <span className="font-bold text-gray-900">-</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-dashed border-gray-100 pt-6 mb-8 relative z-10">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total</span>
                        <span className="text-4xl font-black text-gray-900 tracking-tighter">
                          ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2 text-right uppercase tracking-widest font-medium">Inclusive of all taxes</p>
                    </div>

                    <button
                      onClick={() => navigate("/payment")}
                      className="relative z-10 w-full group bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.99] overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>

                    {/* Trust Badges */}
                    <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                      <div className="flex flex-col items-center justify-center gap-1 p-3 bg-gray-50 rounded-2xl">
                        <ShieldCheck size={18} className="text-gray-900" strokeWidth={1.5} />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Secure</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 p-3 bg-gray-50 rounded-2xl">
                        <Package size={18} className="text-gray-900" strokeWidth={1.5} />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Returns</span>
                      </div>
                    </div>

                  </div>
                </div>
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