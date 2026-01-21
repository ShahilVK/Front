// import React, { useEffect, useState, useContext, useMemo } from "react";
// import {useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Heart,
//   Search,
//   ShoppingCart,
//   Filter,
//   Eye,
//   Star,
//   TrendingUp,
//   Shield,
// } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// import api from "../Api/Axios_Instance";
// import { AuthContext } from "../context/AuthContext";
// import { useWishlist } from "../context/WishlistContext";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import ProductDetail from "../components/ProductDetail";

// function Product() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [sortBy, setSortBy] = useState("default");
//   const [isLoading, setIsLoading] = useState(true);
//   const [hoveredProduct, setHoveredProduct] = useState(null);
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [cartProductIds, setCartProductIds] = useState(new Set());

//   const { wishlist, toggleWishlist } = useWishlist();
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setIsLoading(true);
//         const res = debouncedSearch
//           ? await api.get(
//               `/products/search?query=${encodeURIComponent(debouncedSearch)}`,
//             )
//           : await api.get("/products");

//         setProducts(res.data.data || []);
//       } catch (err) {
//         setProducts([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [debouncedSearch]);

//   useEffect(() => {
//     const fetchCartProducts = async () => {
//       if (!user) return;

//       try {
//         const res = await api.get("/cart");
//         const items = res.data?.data || [];
//         setCartProductIds(new Set(items.map((i) => i.productId)));
//       } catch {
//         setCartProductIds(new Set());
//       }
//     };

//     fetchCartProducts();

//     const handler = () => fetchCartProducts();
//     window.addEventListener("cartUpdated", handler);

//     return () => window.removeEventListener("cartUpdated", handler);
//   }, [user]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchTerm.trim().toLowerCase());
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   const categories = [
//     "All",
//     "Headphones",
//     "Earbuds",
//     "Speakers",
//     "Watches",
//     "Power Bank",
//   ];

//   const displayedProducts = useMemo(() => {
//     if (!Array.isArray(products)) return [];

//     let items = [...products];

//     const parsePrice = (price) =>
//       parseFloat(String(price).replace(/[^\d.]/g, ""));

//     if (sortBy === "price-asc")
//       items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));

//     if (sortBy === "price-desc")
//       items.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

//     if (sortBy === "rating")
//       items.sort((a, b) => (b.rating || 0) - (a.rating || 0));

//     if (sortBy === "popular")
//       items.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

//     if (selectedCategory !== "All") {
//       items = items.filter(
//         (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase(),
//       );
//     }

//     return items;
//   }, [products, selectedCategory, debouncedSearch, sortBy]);

//   const handleAddToCart = async (product) => {
//     try {
//       if (product.stock <= 0) {
//         return toast.error("Product is out of stock");
//       }

//       await api.post(`/cart/${product.id}`);
//       window.dispatchEvent(new Event("cartUpdated"));
//       toast.success("Added to cart!");
//     } catch (error) {
//       console.error("Add to cart error:", error);

//       if (error.response?.status === 500) {
//         toast.error("Product is out of stock");
//       } else {
//         toast.error("Failed to add to cart");
//       }
//     }
//   };

//   const generateStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         size={14}
//         className={
//           index < Math.floor(rating || 0)
//             ? "text-amber-500 fill-amber-500"
//             : "text-gray-300"
//         }
//       />
//     ));
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariant = {
//     hidden: { opacity: 0, y: 20, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   const ProductSkeleton = () => (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
//       <div className="w-full h-56 bg-gray-300"></div>
//       <div className="p-4 space-y-3">
//         <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//         <div className="h-4 bg-gray-300 rounded w-1/2"></div>
//         <div className="h-6 bg-gray-300 rounded w-1/3"></div>
//         <div className="h-10 bg-gray-300 rounded mt-4"></div>
//       </div>
//     </div>
//   );

//   const getProductImage = (product) =>
//     product.imageUrl || product.image || null;


//   const saveRecentlyViewed = (product) => {
//   const key = "recentlyViewedProducts";
//   const stored = JSON.parse(localStorage.getItem(key)) || [];

//   // remove duplicate
//   const filtered = stored.filter((p) => p.id !== product.id);

//   // add to top
//   const updated = [product, ...filtered].slice(0, 6);

//   localStorage.setItem(key, JSON.stringify(updated));
// };


//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <Navbar />
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 3000,
//           style: {
//             background: "#363636",
//             color: "#fff",
//             borderRadius: "12px",
//             fontSize: "14px",
//             fontWeight: "500",
//           },
//         }}
//       />
//       <main className="flex-grow pt-20">
//         {!selectedProduct ? (
//           <>
//             <section className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-20 sm:py-28 overflow-hidden">
//               <div className="absolute inset-0 bg-black/40"></div>
//               <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8 }}
//                 >
//                   <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                     Discover Premium Tech
//                   </h1>
//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.3 }}
//                     className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
//                   >
//                     Elevate your experience with our curated collection of
//                     high-quality accessories
//                   </motion.p>
//                 </motion.div>
//               </div>
//             </section>

//             {/* Filters + Search Section */}
//             <div className="max-w-7xl mx-auto px-4 py-12 -mt-8 relative z-20">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 mb-12"
//               >
//                 <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center">
//                   <div className="relative flex-1">
//                     <Search
//                       className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                       size={20}
//                     />

//                     <input
//                       type="text"
//                       placeholder="Search products by name..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full p-4 pl-12 pr-10 border-0 bg-white/70 backdrop-blur-sm rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
//                     />

//                     {searchTerm && (
//                       <button
//                         onClick={() => setSearchTerm("")}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         ✕
//                       </button>
//                     )}
//                   </div>

//                   {/* Categories */}
//                   <div className="flex-1 flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
//                     {categories.map((cat) => (
//                       <button
//                         key={cat}
//                         onClick={() => {
//                           setSelectedCategory(cat);
//                           setSearchTerm("");
//                           // setDebouncedSearch("");
//                         }}
//                         className={`px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
//                           selectedCategory === cat
//                             ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
//                             : "bg-white/70 text-gray-700 hover:bg-white hover:shadow-md border border-white/50"
//                         }`}
//                       >
//                         {cat}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Sort Dropdown */}
//                   <div className="relative w-full lg:w-64">
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="appearance-none w-full p-4 pr-12 bg-white/70 backdrop-blur-sm border-0 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 font-semibold text-gray-700"
//                     >
//                       <option value="default">Sort by: Featured</option>
//                       <option value="price-asc">Price: Low to High</option>
//                       <option value="price-desc">Price: High to Low</option>
//                       <option value="rating">Top Rated</option>
//                       <option value="popular">Most Popular</option>
//                     </select>
//                     <Filter
//                       className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//                       size={20}
//                     />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Products Grid */}
//               <div className="mb-16">
//                 {/* Results Header */}
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
//                 >
//                   <div>
//                     <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//                       {selectedCategory === "All"
//                         ? "All Products"
//                         : selectedCategory}
//                     </h2>
//                     <p className="text-gray-600">
//                       {displayedProducts.length}{" "}
//                       {displayedProducts.length === 1 ? "product" : "products"}{" "}
//                       found
//                     </p>
//                   </div>

//                   <div className="flex gap-4 mt-4 sm:mt-0">
//                     <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 px-3 py-2 rounded-lg">
//                       <TrendingUp size={16} className="text-green-500" />
//                       <span>Quality Guaranteed</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 px-3 py-2 rounded-lg">
//                       <Shield size={16} className="text-blue-500" />
//                       <span>Secure Payment</span>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {isLoading ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
//                     {Array.from({ length: 8 }).map((_, index) => (
//                       <ProductSkeleton key={index} />
//                     ))}
//                   </div>
//                 ) : (
//                   <motion.div
//                     variants={staggerContainer}
//                     initial="hidden"
//                     animate="visible"
//                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
//                   >
//                     <AnimatePresence>
//                       {displayedProducts.length > 0 ? (
//                         displayedProducts.map((product) => (
//                           <motion.div
//                             key={product.id}
//                             variants={itemVariant}
//                             layout
//                             className="bg-white group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden border border-gray-100 hover:border-purple-200 relative"
//                             onMouseEnter={() => setHoveredProduct(product.id)}
//                             onMouseLeave={() => setHoveredProduct(null)}
//                           >
//                             {/* Product Badges */}
//                             <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
//                               {product.isNew && (
//                                 <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
//                                   NEW
//                                 </span>
//                               )}
//                               {product.discount && (
//                                 <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
//                                   -{product.discount}%
//                                 </span>
//                               )}
//                             </div>

//                             {/* Product Image */}
//                             <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
//                               <div className="w-full h-56 flex items-center justify-center p-6 relative">
//                                 {getProductImage(product) ? (
//                                   <img
//                                     src={getProductImage(product)}
//                                     alt={product.name}
//                                     className="object-contain h-full w-full"
//                                   />
//                                 ) : (
//                                   <div className="flex items-center justify-center h-full w-full text-gray-400 text-sm">
//                                     No Image
//                                   </div>
//                                 )}
//                               </div>

//                               {/* Hover Actions */}
//                               <motion.div
//                                 className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
//                                 initial={{ opacity: 0 }}
//                                 whileHover={{ opacity: 1 }}
//                                 transition={{ duration: 0.3 }}
//                               >
//                                 <motion.button
//                                   onClick={() => setSelectedProduct(product)}
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   className="p-3 bg-white text-gray-800 rounded-full hover:bg-purple-600 hover:text-white transition-all shadow-lg"
//                                 >
//                                   <Eye size={20} />
//                                 </motion.button>
//                                 <motion.button
//                                   onClick={() => toggleWishlist(product)}
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   className={`p-3 rounded-full hover:bg-purple-600 hover:text-white transition-all shadow-lg ${
//                                     wishlist.some(
//                                       (item) => item.id === product.id,
//                                     )
//                                       ? "bg-red-500 text-white"
//                                       : "bg-white text-gray-800"
//                                   }`}
//                                 >
//                                   <Heart
//                                     size={20}
//                                     fill={
//                                       wishlist.some(
//                                         (item) => item.id === product.id,
//                                       )
//                                         ? "currentColor"
//                                         : "none"
//                                     }
//                                   />
//                                 </motion.button>
//                               </motion.div>
//                             </div>

//                             {/* Product Info */}
//                             <div className="p-5 flex flex-col flex-grow">
//                               <div className="flex items-center justify-between mb-2">
//                                 <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide bg-purple-50 px-2 py-1 rounded-full">
//                                   {product.category}
//                                 </span>
//                                 <div className="flex items-center gap-1">
//                                   {generateStars(product.rating || 4.5)}
//                                   <span className="text-xs text-gray-500 ml-1">
//                                     ({product.reviews || 24})
//                                   </span>
//                                 </div>
//                               </div>

//                               <h3
//                                 onClick={() => setSelectedProduct(product)}
//                                 className="text-lg font-bold text-gray-900 cursor-pointer line-clamp-2 hover:text-purple-600 transition-colors mb-2 leading-tight"
//                               >
//                                 {product.name}
//                               </h3>

//                               <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
//                                 {product.description ||
//                                   "Premium quality product with excellent features and durability."}
//                               </p>

//                               <div className="flex items-center justify-between mt-auto">
//                                 <div className="flex flex-col">
//                                   <span className="text-2xl font-bold text-gray-900">
//                                     ₹{product.price}
//                                   </span>
//                                   {product.originalPrice && (
//                                     <span className="text-sm text-gray-500 line-through">
//                                       ₹{product.originalPrice}
//                                     </span>
//                                   )}
//                                 </div>

                      
//                                 {cartProductIds.has(product.id) ? (
//                                   <motion.button
//                                     onClick={() => navigate("/cart")}
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2
//       bg-green-600 text-white"
//                                   >
//                                     <ShoppingCart size={18} />
//                                     Go to Cart
//                                   </motion.button>
//                                 ) : (
//                                   <motion.button
//                                     disabled={product.stock <= 0}
//                                     onClick={() => handleAddToCart(product)}
//                                     whileHover={
//                                       product.stock > 0 ? { scale: 1.05 } : {}
//                                     }
//                                     whileTap={
//                                       product.stock > 0 ? { scale: 0.95 } : {}
//                                     }
//                                     className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2
//       ${
//         product.stock <= 0
//           ? "bg-gray-400 cursor-not-allowed"
//           : "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
//       }`}
//                                   >
//                                     <ShoppingCart size={18} />
//                                     {product.stock <= 0
//                                       ? "Out of Stock"
//                                       : "Add"}
//                                   </motion.button>
//                                 )}
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))
//                       ) : (
//                         <motion.div
//                           initial={{ opacity: 0, scale: 0.9 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           className="col-span-full text-center py-16"
//                         >
//                           <div className="max-w-md mx-auto">
//                             <Search
//                               size={64}
//                               className="mx-auto text-gray-300 mb-4"
//                             />
//                             <h3 className="text-2xl font-bold text-gray-700 mb-2">
//                               No products found
//                             </h3>
//                             <button
//                               onClick={() => {
//                                 setSearchTerm("");
//                                 setSelectedCategory("All");
//                                 setSortBy("default");
//                               }}
//                               className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
//                             >
//                               Reset Filters
//                             </button>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 )}
//               </div>
//             </div>
//           </>
//         ) : (
//           <ProductDetail
//             product={selectedProduct}
//             onBack={() => setSelectedProduct(null)}
//           />
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Product;














import React, { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Search,
  ShoppingCart,
  Filter,
  Eye,
  Star,
  Zap,
  ArrowRight,
  Sparkles,
  ChevronDown
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import api from "../Api/Axios_Instance";
import { AuthContext } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductDetail from "../components/ProductDetail";

function Product() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [cartProductIds, setCartProductIds] = useState(new Set());

  const { wishlist, toggleWishlist } = useWishlist();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- Logic remains unchanged ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = debouncedSearch
          ? await api.get(
              `/products/search?query=${encodeURIComponent(debouncedSearch)}`
            )
          : await api.get("/products");

        setProducts(res.data.data || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearch]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!user) return;
      try {
        const res = await api.get("/cart");
        const items = res.data?.data || [];
        setCartProductIds(new Set(items.map((i) => i.productId)));
      } catch {
        setCartProductIds(new Set());
      }
    };
    fetchCartProducts();
    const handler = () => fetchCartProducts();
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const categories = [
    "All",
    "Headphones",
    "Earbuds",
    "Speakers",
    "Watches",
    "Power Bank",
  ];

  const displayedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    let items = [...products];
    const parsePrice = (price) =>
      parseFloat(String(price).replace(/[^\d.]/g, ""));

    if (sortBy === "price-asc")
      items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === "price-desc")
      items.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    if (sortBy === "rating")
      items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sortBy === "popular")
      items.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

    if (selectedCategory !== "All") {
      items = items.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    return items;
  }, [products, selectedCategory, debouncedSearch, sortBy]);

  const handleAddToCart = async (product) => {
    try {
      if (product.stock <= 0) {
        return toast.error("Product is out of stock");
      }
      await api.post(`/cart/${product.id}`);
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      if (error.response?.status === 500) {
        toast.error("Product is out of stock");
      } else {
        toast.error("Failed to add to cart");
      }
    }
  };

  const generateStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={10}
        fill="currentColor"
        className={`${
          index < Math.floor(rating || 0)
            ? "text-black"
            : "text-gray-200"
        }`}
      />
    ));
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 40, damping: 20 },
    },
  };

  const ProductSkeleton = () => (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="w-full aspect-[4/5] bg-gray-100 rounded-3xl"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-100 rounded w-2/3"></div>
        <div className="h-4 bg-gray-100 rounded w-1/3"></div>
      </div>
    </div>
  );

  const getProductImage = (product) =>
    product.imageUrl || product.image || null;

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] font-sans selection:bg-black selection:text-white">
      <Navbar />
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "shadow-2xl font-medium",
          style: {
            background: "#000",
            color: "#fff",
            borderRadius: "99px",
            padding: "12px 24px",
            fontSize: "13px",
            letterSpacing: "-0.01em",
          },
        }}
      />

      <main className="flex-grow pt-24 pb-32">
        {!selectedProduct ? (
          <>
            {/* --- Ultra-Premium Hero Section (Height Reduced) --- */}
            <section className="relative px-4 sm:px-6 mb-12">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  // Adjusted padding from p-12/28 to p-8/16 for medium height
                  className="bg-[#050505] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center shadow-2xl"
                >
                  {/* Grain Texture Overlay */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-soft-light"></div>
                  
                  {/* Subtle Glows */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-purple-900/20 to-transparent rounded-full blur-[80px] pointer-events-none"></div>

                  <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-2 mb-6"
                    >
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      <span className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase">
                        Season 04 Collection
                      </span>
                    </motion.div>

                    <motion.h1
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      // Reduced font size for medium scale
                      className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-8 tracking-tighter leading-[0.95]"
                    >
                      Design <span className="text-white/30 italic font-serif">meets</span> <br />
                      Future.
                    </motion.h1>

                    <motion.div
                       initial={{ y: 20, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ delay: 0.6 }}
                       className="flex flex-col sm:flex-row gap-4"
                    >
                      <button 
                        onClick={() => {
                          document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-white text-black px-8 py-3 rounded-full font-medium text-sm hover:scale-105 transition-transform duration-300"
                      >
                        Shop Latest
                      </button>
                      <button className="px-8 py-3 rounded-full font-medium text-sm text-white border border-white/20 hover:bg-white/10 transition-colors duration-300 backdrop-blur-md">
                        View Lookbook
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* --- "Invisible" Floating Filter Bar (Width Increased) --- */}
            <div className="sticky top-6 z-40 px-4 mb-16 pointer-events-none">
              {/* CHANGE: Increased max-w-2xl to max-w-5xl */}
              <div className="max-w-6xl mx-auto pointer-events-auto w-full">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] rounded-full p-2 flex items-center justify-between gap-1 transition-all hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:scale-[1.01]"
                >
                  <div className="relative group flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-transparent border-none text-sm font-medium placeholder-gray-400 focus:ring-0 rounded-full transition-all"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="h-6 w-[1px] bg-gray-200"></div>

                  <div className="flex items-center overflow-x-auto no-scrollbar max-w-[200px] md:max-w-none px-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setSearchTerm("");
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                          selectedCategory === cat
                            ? "bg-black text-white"
                            : "text-gray-500 hover:bg-gray-100 hover:text-black"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                   <div className="h-6 w-[1px] bg-gray-200 hidden md:block"></div>

                  <div className="relative hidden md:block">
                     <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-transparent pl-4 pr-8 py-3 text-xs font-semibold cursor-pointer focus:ring-0 border-none text-gray-700 hover:text-black transition-colors"
                     >
                        <option value="default">Featured</option>
                        <option value="price-asc">Price: Low</option>
                        <option value="price-desc">Price: High</option>
                        <option value="rating">Rated</option>
                     </select>
                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* --- Gallery Grid Section (Size Adjusted) --- */}
            {/* Reduced max-width to 7xl for "medium" container size */}
            <div id="products-grid" className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <h2 className="text-3xl font-semibold text-black tracking-tight mb-2">
                    {selectedCategory === "All" ? "New Arrivals" : selectedCategory}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Refined selection for the modern aesthetic.
                  </p>
                </div>
                <div className="text-xs font-medium border border-gray-200 rounded-full px-4 py-2 text-gray-600">
                   {displayedProducts.length} Items
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  // Reduced vertical gap from gap-y-20 to gap-y-12 for a tighter medium layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
                >
                  <AnimatePresence>
                    {displayedProducts.length > 0 ? (
                      displayedProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          layout
                          variants={itemVariant}
                          className="group cursor-pointer"
                          onMouseEnter={() => setHoveredProduct(product.id)}
                          onMouseLeave={() => setHoveredProduct(null)}
                          onClick={() => setSelectedProduct(product)}
                        >
                          {/* Image Container - mb-4 for tighter spacing */}
                          <div className="relative aspect-[4/5] bg-[#F5F5F7] rounded-[24px] overflow-hidden mb-4">
                            {/* Hover Actions - Clean Floating Pill */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full px-2 py-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[0.23,1,0.32,1]">
                               <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleWishlist(product);
                                }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                  wishlist.some((item) => item.id === product.id)
                                    ? "text-red-500 bg-red-50"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                              >
                                <Heart
                                  size={18}
                                  fill={
                                    wishlist.some((item) => item.id === product.id)
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              </button>
                              <div className="w-[1px] h-4 bg-gray-200"></div>
                              <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProduct(product);
                                }}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                              >
                                <Eye size={18} />
                              </button>
                            </div>

                            {/* Main Image */}
                            <div className="absolute inset-0 p-8 flex items-center justify-center">
                              {getProductImage(product) ? (
                                <motion.img
                                  layoutId={`product-image-${product.id}`}
                                  src={getProductImage(product)}
                                  alt={product.name}
                                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-[0.23,1,0.32,1] group-hover:scale-110"
                                />
                              ) : (
                                <div className="text-gray-300 text-xs tracking-widest uppercase">No Preview</div>
                              )}
                            </div>

                            {/* Badges - Ultra Minimal */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              {product.isNew && (
                                <span className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                  <Sparkles size={10} className="text-yellow-500" /> New
                                </span>
                              )}
                              {product.discount && (
                                <span className="bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                  -{product.discount}%
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Info */}
                          <div className="space-y-3 px-1">
                             <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-base font-medium text-black leading-tight mb-1 group-hover:text-gray-600 transition-colors">
                                    {product.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                                    {product.category}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star size={12} className="text-black" fill="currentColor" />
                                    <span className="text-xs font-bold">{product.rating || 4.5}</span>
                                </div>
                             </div>

                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-black">
                                    ₹{product.price}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-xs text-gray-400 line-through">
                                        ₹{product.originalPrice}
                                        </span>
                                    )}
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    disabled={product.stock <= 0}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        cartProductIds.has(product.id) ? navigate("/cart") : handleAddToCart(product);
                                    }}
                                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                                        cartProductIds.has(product.id)
                                        ? "bg-black text-white shadow-lg shadow-black/20"
                                        : product.stock <= 0
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-white border border-gray-200 text-black hover:bg-black hover:text-white hover:border-transparent"
                                    }`}
                                >
                                    {cartProductIds.has(product.id)
                                        ? "In Cart"
                                        : product.stock <= 0
                                            ? "Sold Out"
                                            : "Add to Bag"}
                                </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      // Empty State
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full py-32 text-center"
                      >
                         <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-6">
                            <Search size={24} className="text-gray-400" />
                         </div>
                        <h3 className="text-lg font-medium text-black mb-2">No products found</h3>
                        <p className="text-gray-500 mb-8 text-sm">Adjust your filters to find what you're looking for.</p>
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("All");
                          }}
                          className="text-black text-sm font-semibold hover:underline underline-offset-4"
                        >
                          Clear all filters
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </>
        ) : (
           <motion.div
             initial={{opacity: 0, scale: 0.98, filter: "blur(10px)"}}
             animate={{opacity: 1, scale: 1, filter: "blur(0px)"}}
             exit={{opacity: 0, scale: 0.98, filter: "blur(10px)"}}
             transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
             className="fixed inset-0 z-50 overflow-y-auto bg-white"
           >
              <ProductDetail
                product={selectedProduct}
                onBack={() => setSelectedProduct(null)}
              />
           </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Product;














