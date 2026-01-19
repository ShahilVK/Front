// import React, { useContext } from "react";
// import Navbar from "../components/Navbar";
// import { useWishlist } from "../context/WishlistContext";
// import Footer from "../components/Footer";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { HeartCrack, ShoppingCart, Trash2 } from "lucide-react";
// import toast from "react-hot-toast";
// import api from "../Api/Axios_Instance";
// import { AuthContext } from "../context/AuthContext";

// function Wishlist() {
//   const { wishlist, removeFromWishlist } = useWishlist();
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleAddToCart = async (product) => {
//     if (!user) {
//       return navigate("/login"); // must login
//     }

//     try {
//       const res = await api.get(`/users/${user.id}`);
//       let cart = res.data.cart || [];

//       const existingItem = cart.find((item) => item.id === product.id);
//       if (existingItem) {
//         cart = cart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         cart.push({ ...product, quantity: 1 });
//       }

//       await api.patch(`/users/${user.id}`, { cart });
//       toast.success(`${product.name} added to cart!`);
//       window.dispatchEvent(new CustomEvent("cartUpdated")); // refresh cart badge
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       toast.error("Failed to add item to cart.");
//     }
//   };

//   const staggerContainer = {
//     hidden: {},
//     visible: { transition: { staggerChildren: 0.1 } },
//   };

//   const itemVariant = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />

//       <main className="flex-grow pt-24 pb-12">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex justify-between items-center mb-8"
//           >
//             <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
//             {wishlist.length > 0 && (
//               <p className="text-gray-500">
//                 {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
//               </p>
//             )}
//           </motion.div>

//           {wishlist.length === 0 ? (
//             // ✨ Empty state
//             <div className="text-center py-16 bg-white rounded-lg shadow-md">
//               <HeartCrack size={48} className="mx-auto text-gray-300 mb-4" />
//               <h2 className="text-xl font-semibold text-gray-700">
//                 Your Wishlist is Empty
//               </h2>
//               <p className="text-gray-500 mt-2 mb-6">
//                 Looks like you haven't added anything yet. Let's change that!
//               </p>
//               <Link
//                 to="/product"
//                 className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-transform transform hover:scale-105"
//               >
//                 Discover Products
//               </Link>
//             </div>
//           ) : (
//             <motion.div
//               variants={staggerContainer}
//               initial="hidden"
//               animate="visible"
//               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//             >
//               <AnimatePresence>
//                 {wishlist.map((product) => {
//                   const outOfStock =
//                     product.stock === 0 || product.stock === null;

//                   return (
//                     <motion.div
//                       key={product.id}
//                       layout
//                       variants={itemVariant}
//                       exit={{ opacity: 0, scale: 0.8 }}
//                       className="bg-white group rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
//                     >
//                       <div className="relative">
//                         <div className="w-full h-56 bg-gray-100 flex items-center justify-center p-4">
//                           <img
//                             src={product.imageUrl}
//                             alt={product.productName}
//                             className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
//                           />
//                         </div>
//                         {/* Remove button */}
//                         <button
//                           onClick={() => removeFromWishlist(product.id)}
//                           className="absolute top-2 right-2 p-2 bg-white/50 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
//                         >
//                           <Trash2 size={20} />
//                         </button>
//                       </div>

//                       <div className="p-4 flex flex-col flex-grow">
//                         <h2 className="text-lg font-semibold text-gray-800 truncate">
//                           {product.productName}
//                         </h2>
//                         <p className="text-red-500 font-bold mt-1 mb-2">
//                           ₹{product.price}
//                         </p>
//                         <p
//                           className={`text-sm font-medium ${
//                             outOfStock ? "text-red-500" : "text-green-600"
//                           }`}
//                         >
//                           {outOfStock
//                             ? "Out of Stock"
//                             : `In Stock: ${product.stock}`}
//                         </p>

//                         {/* ✅ Disable Add to Cart if out of stock */}
//                         <button
//                           onClick={() => handleAddToCart(product)}
//                           disabled={outOfStock}
//                           className={`w-full mt-auto py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
//                             outOfStock
//                               ? "bg-gray-400 cursor-not-allowed text-white"
//                               : "bg-gray-800 text-white hover:bg-gray-700"
//                           }`}
//                         >
//                           <ShoppingCart size={18} />
//                           {outOfStock ? "Out of Stock" : "Add to Cart"}
//                         </button>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Wishlist;



import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { useWishlist } from "../context/WishlistContext";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../Api/Axios_Instance";
import { AuthContext } from "../context/AuthContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- Logic Remains Exactly the Same ---
  const handleAddToCart = async (product) => {
    if (!user) {
      return navigate("/login");
    }

    try {
      const res = await api.get(`/users/${user.id}`);
      let cart = res.data.cart || [];

      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        cart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      await api.patch(`/users/${user.id}`, { cart });
      toast.success(`${product.name} added to cart!`);
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart.");
    }
  };

  // --- Premium Animation Variants ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const containerVar = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] font-sans text-gray-900">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6 sm:px-12">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Header Section - Minimalist & Bold */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
          >
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-gray-400 uppercase mb-2">
                Your Collection
              </p>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900">
                Wishlist
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
               {wishlist.length > 0 && (
                 <div className="px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-medium text-gray-600">
                    {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
                 </div>
               )}
            </div>
          </motion.div>

          {/* Content Area */}
          {wishlist.length === 0 ? (
            // ✨ Ultra-Minimal Empty State
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-[400px] flex flex-col items-center justify-center text-center border-t border-gray-200"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                <ShoppingBag size={32} strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-light mb-3">Your wishlist is empty</h2>
              <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                You haven't saved any items yet. Browse our exclusive collection to find your next favorite.
              </p>
              <Link
                to="/product"
                className="group relative inline-flex items-center justify-center px-8 py-3 bg-black text-white rounded-full overflow-hidden transition-transform hover:scale-105"
              >
                <span className="font-medium mr-2">Explore Products</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ) : (
            // ✨ Premium Masonry-style Grid
            <motion.div
              variants={containerVar}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
            >
              <AnimatePresence mode="popLayout">
                {wishlist.map((product) => {
                  const outOfStock = product.stock === 0 || product.stock === null;
                  const lowStock = product.stock > 0 && product.stock <= 5;

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      variants={fadeInUp}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                      className="group flex flex-col relative"
                    >
                      {/* Image Container - Clean, No borders, subtle hover zoom */}
                      <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-[#F0F0F0]">
                        
                        {/* Remove Button - Top Right, Glassmorphism */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            removeFromWishlist(product.id);
                          }}
                          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-gray-500 hover:text-red-600 hover:bg-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 duration-300"
                        >
                          <X size={18} />
                        </button>

                        {/* Stock Badge - Minimal */}
                        {outOfStock && (
                          <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                            Sold Out
                          </div>
                        )}

                        <img
                          src={product.imageUrl}
                          alt={product.productName}
                          className={`w-full h-full object-contain p-8 mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-110 ${outOfStock ? 'grayscale opacity-70' : ''}`}
                        />

                        {/* Quick Add Overlay (Desktop) */}
                        {!outOfStock && (
                            <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 hidden lg:block">
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="w-full py-3 bg-white text-black font-medium text-sm rounded-xl shadow-lg hover:bg-black hover:text-white transition-colors"
                                >
                                    Quick Add
                                </button>
                            </div>
                        )}
                      </div>

                      {/* Product Details - Minimal & Airy */}
                      <div className="mt-5 flex flex-col gap-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium text-gray-900 line-clamp-1 group-hover:underline decoration-1 underline-offset-4">
                            {product.productName}
                          </h3>
                          <span className="text-lg font-semibold tracking-tight">
                             ₹{product.price.toLocaleString()}
                          </span>
                        </div>

                        {/* Status Indicator */}
                        <div className="flex items-center gap-2 mt-1">
                            {outOfStock ? (
                                <span className="flex items-center gap-1.5 text-xs font-medium text-red-500 uppercase tracking-wide">
                                    <AlertCircle size={12} /> Out of Stock
                                </span>
                            ) : lowStock ? (
                                <span className="flex items-center gap-1.5 text-xs font-medium text-orange-500 uppercase tracking-wide">
                                    <AlertCircle size={12} /> Low Inventory
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 uppercase tracking-wide">
                                    <CheckCircle2 size={12} /> In Stock
                                </span>
                            )}
                        </div>

                        {/* Mobile Add Button (Always visible on small screens) */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={outOfStock}
                          className="mt-4 w-full py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 hover:border-black hover:bg-black hover:text-white transition-all lg:hidden"
                        >
                          {outOfStock ? "Unavailable" : "Add to Cart"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Wishlist;