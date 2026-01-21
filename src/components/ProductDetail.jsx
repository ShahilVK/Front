

// import React, { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import api from "../Api/Axios_Instance";
// import { motion } from "framer-motion";
// import {
//   ChevronLeft,
//   Minus,
//   Plus,
//   ShoppingCart,
//   Zap,
//   Star,
// } from "lucide-react";

// function ProductDetail({ product, onBack }) {
//   const [count, setCount] = useState(1);
//   const { user } = useContext(AuthContext);
//   const [cartQuantity, setCartQuantity] = useState(0);

//   const navigate = useNavigate();

//   const basePrice =
//     parseFloat(String(product.price).replace(/[^\d.]/g, "")) || 0;
//   const totalPrice = (basePrice * count).toFixed(2);



//   useEffect(() => {
//   const fetchCartQty = async () => {
//     if (!user) return;

//     try {
//       const res = await api.get("/cart");
//       const items = res.data.data || [];

//       const existingItem = items.find(
//         (item) => item.productId === product.id
//       );

//       setCartQuantity(existingItem?.quantity || 0);
//     } catch (err) {
//       console.error("Failed to load cart quantity", err);
//     }
//   };

//   fetchCartQty();
// }, [product.id, user]);



//   const addToCart = async () => {
//   if (!user) return navigate("/login");

//   try {
//     const availableStock = product.stock - cartQuantity;

//     if (availableStock <= 0) {
//       return toast.error("Product is out of stock!");
//     }

//     if (count > availableStock) {
//       return toast.error(
//         `Only ${availableStock} item(s) left in stock`
//       );
//     }

//     await api.post(`/cart/${product.id}`, {
//       quantity: count,
//     });

//     toast.success(`${product.name} added to cart!`);
//     window.dispatchEvent(new CustomEvent("cartUpdated"));

//     setCartQuantity((prev) => prev + count);
//   } catch (err) {
//     console.error("Error adding to cart:", err);
//     toast.error("Failed to add item to cart.");
//   }
// };


//   /* ✅ FIXED: BUY NOW (NO STOCK REDUCTION HERE) */
//   const handleBuyNow = () => {
//     if (!user) return navigate("/login");

//     if (product.stock <= 0) {
//       return toast.error("Out of stock!");
//     }

//     if (count > product.stock) {
//       return toast.error("Not enough stock available.");
//     }

//     navigate("/payment", {
//       state: {
//         buyNowItem: {
//           productId: product.id,
//           productName: product.name,
//           price: product.price,
//           image: product.image || product.imageUrl,
//           quantity: count,
//         },
//       },
//     });
//   };

//   const getProductImage = (product) => product.imageUrl || product.image || "";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 20 }}
//       className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto my-8"
//     >
//       <Toaster position="top-right" />

//       <button
//         onClick={onBack}
//         className="flex items-center gap-2 mb-6 text-red-500 hover:text-red-700 font-semibold"
//       >
//         <ChevronLeft size={20} /> Back to Products
//       </button>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* IMAGE */}
//         <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-xl p-4">
//           <motion.img
//             initial={{ scale: 0.8 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5 }}
//             src={getProductImage(product)}
//             alt={product.name}
//             className="object-contain h-80 w-full"
//           />
//         </div>

//         {/* DETAILS */}
//         <div className="flex-1 space-y-4">
//           <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
//             {product.category || "Featured"}
//           </span>

//           <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>

//           {/* RATING + STOCK */}
//           <div className="flex items-center gap-4">
//             <div className="flex text-yellow-400">
//               <Star fill="currentColor" size={20} />
//               <Star fill="currentColor" size={20} />
//               <Star fill="currentColor" size={20} />
//               <Star fill="currentColor" size={20} />
//               <Star size={20} />
//             </div>

//             <span
//               className={`font-semibold ${
//                 product.stock > 0 ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {product.stock > 0
//                 ? `In Stock (${product.stock} left)`
//                 : "Out of Stock"}
//             </span>
//           </div>

//           <p className="text-gray-500 text-sm">
//             {product.smallDescription ||
//               "Experience premium quality and design with this top-rated accessory."}
//           </p>

//           <p className="text-4xl font-bold text-gray-900">
//             ₹{basePrice.toFixed(2)}
//           </p>

//           {/* QUANTITY */}
//           <div className="flex items-center gap-4">
//             <label className="font-semibold text-gray-700">Quantity:</label>
//             <div className="flex items-center border rounded-lg">
//               <button
//                 onClick={() => setCount((p) => Math.max(1, p - 1))}
//                 disabled={count <= 1}
//                 className="p-3 disabled:opacity-50"
//               >
//                 <Minus size={16} />
//               </button>
//               <span className="px-4 text-xl">{count}</span>
//               <button
//                 onClick={() => setCount((p) => p + 1)}
//                 disabled={count >= product.stock}
//                 className="p-3 disabled:opacity-50"
//               >
//                 <Plus size={16} />
//               </button>
//             </div>
//           </div>

//           <p className="text-2xl font-bold text-red-600">
//             Total: ₹{totalPrice}
//           </p>

//           {/* ACTION BUTTONS */}
//           <div className="flex gap-4 pt-4">
//             <button
//               onClick={addToCart}
//               disabled={product.stock <= 0}
//               className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-lg"
//             >
//               <ShoppingCart size={20} /> Add to Cart
//             </button>

//             <button
//               onClick={handleBuyNow}
//               disabled={product.stock <= 0}
//               className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 rounded-lg"
//             >
//               <Zap size={20} /> Buy Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default ProductDetail;





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
                
                {product.stock <= 0 && (
                    <div className="absolute top-6 left-6 bg-black text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
                        Sold Out
                    </div>
                )}
            </motion.div>
          </div>

          <div className="lg:w-[45%] flex flex-col pt-4 lg:pt-12">
            
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
                        {product.category || "Collection"}
                    </span>
                    <div className="h-px w-8 bg-gray-300"></div>
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

                    {product.stock > 0 && product.stock < 10 && (
                        <p className="text-xs text-red-600 font-medium animate-pulse">
                            Only {product.stock} units remaining
                        </p>
                    )}

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

                    {/* Premium Service Badges */}
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