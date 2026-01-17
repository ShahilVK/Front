

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