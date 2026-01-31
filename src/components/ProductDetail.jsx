

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../Api/Axios_Instance";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Star,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  ArrowRight,
} from "lucide-react";

function ProductDetail({ product, onBack }) {
  const [count, setCount] = useState(1);
  const { user } = useContext(AuthContext);
  const [cartQuantity, setCartQuantity] = useState(0);

  const navigate = useNavigate();

  const basePrice =
    parseFloat(String(product.price).replace(/[^\d.]/g, "")) || 0;
  const totalPrice = (basePrice * count).toFixed(2);

  useEffect(() => {
    const fetchCartQty = async () => {
      if (!user) return;

      try {
        const res = await api.get("/cart");
        const items = res.data.data || [];

        const existingItem = items.find(
          (item) => item.productId === product.id
        );

        setCartQuantity(existingItem?.quantity || 0);
      } catch (err) {
        console.error("Failed to load cart quantity", err);
      }
    };

    fetchCartQty();
  }, [product.id, user]);

  const addToCart = async () => {
    if (!user) return navigate("/login");

    try {
      const availableStock = product.stock - cartQuantity;

      if (availableStock <= 0) {
        return toast.error("Product is out of stock!");
      }

      if (count > availableStock) {
        return toast.error(`Only ${availableStock} item(s) left in stock`);
      }

      await api.post(`/cart/${product.id}`, {
        quantity: count,
      });

      toast.success(`${product.name} added to cart!`);
      window.dispatchEvent(new CustomEvent("cartUpdated"));

      setCartQuantity((prev) => prev + count);
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart.");
    }
  };

  const handleBuyNow = () => {
    if (!user) return navigate("/login");

    if (product.stock <= 0) {
      return toast.error("Out of stock!");
    }

    if (count > product.stock) {
      return toast.error("Not enough stock available.");
    }

    navigate("/payment", {
      state: {
        buyNowItem: {
          productId: product.id,
          productName: product.name,
          price: product.price,
          image: product.image || product.imageUrl,
          quantity: count,
        },
      },
    });
  };

  const getProductImage = (product) => product.imageUrl || product.image || "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans selection:bg-black selection:text-white"
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "0px",
            fontFamily: "sans-serif",
          },
        }}
      />

      <nav className="w-full px-6 py-6 lg:px-12 flex justify-between items-center sticky top-0 z-40 bg-[#FDFDFD]/80 backdrop-blur-md">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-sm font-medium tracking-wide uppercase hover:text-gray-600 transition-colors"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <div className="flex gap-4">
            <Share2 size={20} className="cursor-pointer hover:text-gray-500 transition-colors" />
            <Heart size={20} className="cursor-pointer hover:text-red-500 transition-colors" />
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* LEFT: IMAGE */}
          <div className="lg:w-[55%] relative">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative aspect-square lg:aspect-[4/5] w-full bg-[#F3F3F3] rounded-[2px] overflow-hidden group"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/40 blur-3xl rounded-full pointer-events-none" />
                
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain p-12 lg:p-20 transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Overlay Badge for Sold Out */}
                {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <div className="bg-black text-white text-sm font-bold px-6 py-3 uppercase tracking-[0.2em]">
                            Sold Out
                        </div>
                    </div>
                )}
            </motion.div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="lg:w-[45%] flex flex-col pt-4 lg:pt-12">
            
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                {/* Header Row: Category + STOCK BADGE */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
                            {product.category || "Collection"}
                        </span>
                        <div className="h-px w-8 bg-gray-300"></div>
                    </div>

                    {/* ✅ UPDATED PREMIUM STOCK DISPLAY */}
                    <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${
                        product.stock > 0 
                        ? (product.stock < 10 ? "border-amber-200 bg-amber-50 text-amber-700" : "border-emerald-200 bg-emerald-50 text-emerald-700") 
                        : "border-gray-200 bg-gray-50 text-gray-400"
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? (product.stock < 10 ? "bg-amber-500" : "bg-emerald-500") : "bg-gray-400"} ${product.stock > 0 ? "animate-pulse" : ""}`} />
                        {product.stock > 0 
                            ? (product.stock < 10 ? `Low Stock (${product.stock} Left)` : "In Stock") 
                            : "Unavailable"}
                    </div>
                </div>

                <h1 className="text-4xl lg:text-6xl font-medium tracking-tight text-gray-900 mb-4 leading-[1.1]">
                    {product.name}
                </h1>

                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-8">
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-light tracking-tight">₹{basePrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                         <div className="flex text-black">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} fill={i < 4 ? "currentColor" : "none"} size={14} />
                            ))}
                        </div>
                        <span className="text-xs font-medium text-gray-500 underline cursor-pointer hover:text-black">
                            128 Reviews
                        </span>
                    </div>
                </div>

                <div className="mb-10">
                    <p className="text-gray-600 text-lg leading-relaxed font-light">
                        {product.smallDescription || 
                        "Designed with precision and crafted for the modern individual. This piece combines timeless aesthetics with functional excellence, ensuring it stands out in any setting while providing the durability you expect from premium goods."}
                    </p>
                </div>

                <div className="space-y-8">
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold uppercase tracking-wider text-gray-900">Quantity</span>
                        <div className="flex items-center gap-6 border-b border-gray-200 pb-2">
                            <button 
                                onClick={() => setCount((p) => Math.max(1, p - 1))}
                                disabled={count <= 1}
                                className="text-gray-400 hover:text-black disabled:opacity-30 transition-colors"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="text-xl font-light min-w-[2rem] text-center">{count}</span>
                            <button 
                                onClick={() => setCount((p) => p + 1)}
                                disabled={count >= product.stock}
                                className="text-gray-400 hover:text-black disabled:opacity-30 transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Total Estimate</span>
                        <span className="text-xl font-medium text-gray-900">₹{totalPrice}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <button
                            onClick={addToCart}
                            disabled={product.stock <= 0}
                            className="h-14 flex items-center justify-center gap-2 border border-gray-900 text-gray-900 bg-transparent hover:bg-gray-900 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold uppercase tracking-widest"
                        >
                            Add to Cart
                        </button>
                        
                        <button
                            onClick={handleBuyNow}
                            disabled={product.stock <= 0}
                            className="h-14 flex items-center justify-center gap-2 bg-gray-900 text-white border border-gray-900 hover:bg-white hover:text-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold uppercase tracking-widest shadow-xl shadow-gray-200"
                        >
                            Buy Now <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-10">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-50 rounded-full">
                                <Truck size={18} className="text-gray-900" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Express Delivery</h4>
                                <p className="text-xs text-gray-500 mt-1">Ships within 24 hours.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-50 rounded-full">
                                <ShieldCheck size={18} className="text-gray-900" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Authenticity Guaranteed</h4>
                                <p className="text-xs text-gray-500 mt-1">Verified official retailer.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetail;