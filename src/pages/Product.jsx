
// import React, { useEffect, useState, useContext, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Heart, Search, ShoppingCart, Filter, Eye } from "lucide-react";
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
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [sortBy, setSortBy] = useState("default");

//   const { wishlist, toggleWishlist } = useWishlist();
//   const { user } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const categoryFromURL = queryParams.get("category");
//     if (categoryFromURL) setSelectedCategory(categoryFromURL);
//   }, [location.search]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await api.get("/products");
//         setProducts(response.data);
//       } catch (err) {
//         setError("Failed to fetch products.");
//       }
//     };
//     fetchProduct();
//   }, []);

//   const categories = ["All", "Headphones", "Earbuds", "Speakers", "Watches", "Power Bank"];

//   const displayedProducts = useMemo(() => {
//     let items = [...products];
//     const parsePrice = (price) => parseFloat(String(price).replace(/[^\d.]/g, ""));
//     if (sortBy === "price-asc") items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
//     if (sortBy === "price-desc") items.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

//     return items.filter(
//       (product) =>
//         (selectedCategory === "All" || product.category === selectedCategory) &&
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [products, selectedCategory, searchTerm, sortBy]);

//   const handleAddToCart = async (product) => {
//     if (!user) return toast.error("Please log in to add items to your cart.");
//     try {
//       const res = await api.get(`/users/${user.id}`);
//       let cart = res.data.cart || [];
//       const existingItem = cart.find((item) => item.id === product.id);
//       if (existingItem) {
//         cart = cart.map((item) =>
//           item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
//         );
//       } else {
//         cart.push({ ...product, quantity: 1 });
//       }
//       await api.patch(`/users/${user.id}`, { cart });
//       toast.success(`${product.name} added to cart!`);
//       window.dispatchEvent(new CustomEvent("cartUpdated"));
//     } catch (err) {
//       toast.error("Failed to add item to cart.");
//     }
//   };

//   const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
//   const itemVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />
//       <Toaster position="top-right" />
//       <main className="flex-grow pt-20">
//         {!selectedProduct ? (
//           <>
//             {/* ✅ Hero Section */}
//             <section
//               className="relative bg-cover bg-center text-white py-16 sm:py-20"
//               style={{
//                 backgroundImage:
//                   "url('https://static.vecteezy.com/system/resources/previews/008/065/616/large_2x/black-headphones-on-dark-wooden-background-in-ear-headphones-for-playing-games-and-listening-to-music-tracks-vintage-style-free-photo.jpg')",
//               }}
//             >
//               <div className="absolute inset-0 bg-black/60"></div>
//               <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
//                 <motion.h1
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-3xl md:text-5xl font-bold mb-3"
//                 >
//                   Shop Our Best Products
//                 </motion.h1>
//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className="text-base md:text-lg text-gray-200"
//                 >
//                   Find the perfect accessories for your tech life.
//                 </motion.p>
//               </div>
//             </section>

//             {/* ✅ Filters + Search */}
//             <div className="max-w-7xl mx-auto px-4 py-10">
//               <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8 flex flex-col md:flex-row gap-4 md:items-center">
//                 {/* Search */}
//                 <div className="relative w-full md:w-1/3">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400"
//                   />
//                 </div>

//                 {/* Categories */}
//                 <div className="flex-grow flex gap-2 overflow-x-auto pb-2 sm:justify-start scrollbar-hide">
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => setSelectedCategory(cat)}
//                       className={`px-4 py-2 text-sm rounded-full font-semibold whitespace-nowrap transition ${
//                         selectedCategory === cat
//                           ? "bg-red-500 text-white shadow"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Sort Dropdown */}
//                 <div className="relative w-full md:w-auto">
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="appearance-none w-full md:w-auto p-3 pr-8 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 font-semibold text-gray-700"
//                   >
//                     <option value="default">Sort by: Default</option>
//                     <option value="price-asc">Price: Low to High</option>
//                     <option value="price-desc">Price: High to Low</option>
//                   </select>
//                   <Filter
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//                     size={18}
//                   />
//                 </div>
//               </div>

//               {/* ✅ Products Grid */}
//               <motion.div
//                 variants={staggerContainer}
//                 initial="hidden"
//                 animate="visible"
//                 className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
//               >
//                 {displayedProducts.length > 0 ? (
//                   displayedProducts.map((product) => (
//                     <motion.div
//                       key={product.id}
//                       variants={itemVariant}
//                       className="bg-white group rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
//                     >
//                       {/* Product Image */}
//                       <div className="relative overflow-hidden">
//                         <div className="w-full h-48 sm:h-56 flex items-center justify-center p-4 bg-white">
//                           <img
//                             src={product.image}
//                             alt={product.name}
//                             className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
//                           />
//                         </div>
//                         {/* Hover Actions */}
//                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <button
//                             onClick={() => setSelectedProduct(product)}
//                             className="p-3 bg-white text-gray-800 rounded-full hover:bg-red-500 hover:text-white transition transform hover:scale-110"
//                           >
//                             <Eye size={20} />
//                           </button>
//                           <button
//                             onClick={() => toggleWishlist(product)}
//                             className={`p-3 bg-white rounded-full hover:bg-red-500 hover:text-white transition transform hover:scale-110 ${
//                               wishlist.some((item) => item.id === product.id)
//                                 ? "text-red-500"
//                                 : "text-gray-800"
//                             }`}
//                           >
//                             <Heart
//                               size={20}
//                               fill={
//                                 wishlist.some((item) => item.id === product.id)
//                                   ? "currentColor"
//                                   : "none"
//                               }
//                             />
//                           </button>
//                         </div>
//                       </div>

//                       {/* Product Info */}
//                       <div className="p-4 flex flex-col flex-grow">
//                         <p className="text-xs text-gray-500 uppercase tracking-wider">
//                           {product.category}
//                         </p>
//                         <h2
//                           onClick={() => setSelectedProduct(product)}
//                           className="text-base font-semibold text-gray-800 truncate cursor-pointer mt-1"
//                         >
//                           {product.name}
//                         </h2>
//                         <p className="text-lg text-red-500 font-bold mt-auto pt-2">
//                           ₹{product.price}
//                         </p>
//                         <button
//                           onClick={() => handleAddToCart(product)}
//                           className="w-full mt-4 bg-amber-600 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
//                         >
//                           <ShoppingCart size={18} /> Add to Cart
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-600 col-span-full">
//                     No products found matching your criteria.
//                   </p>
//                 )}
//               </motion.div>
//             </div>
//           </>
//         ) : (
//           <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Product;









// INterested



import React, { useEffect, useState, useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, ShoppingCart, Filter, Eye, Star, TrendingUp, Clock, Shield } from "lucide-react";
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
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const { wishlist, toggleWishlist } = useWishlist();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromURL = queryParams.get("category");
    if (categoryFromURL) setSelectedCategory(categoryFromURL);
  }, [location.search]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/products");
        setProducts(response.data.data);
      } catch (err) {
        setError("Failed to fetch products.");
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const categories = ["All", "Headphones", "Earbuds", "Speakers", "Watches", "Power Bank"];


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

  return items.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [products, selectedCategory, searchTerm, sortBy]);




const handleAddToCart = async (product) => {
  if (!user) {
    toast.error("Please log in to add items to your cart.");
    return;
  }

  try {
    // ✅ CORRECT BACKEND ENDPOINT
    await api.post(`/cart/${product.id}`);

    toast.success(`${product.name} added to cart`);
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Add to cart failed:", error);
    toast.error("Failed to add item to cart");
  }
};



  const generateStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={index < Math.floor(rating || 0) ? "text-amber-500 fill-amber-500" : "text-gray-300"}
      />
    ));
  };

  const staggerContainer = { 
    hidden: { opacity: 0 }, 
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1 
      } 
    } 
  };

  const itemVariant = { 
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    }, 
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    } 
  };

  // Loading skeleton component
  const ProductSkeleton = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-56 bg-gray-300"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-10 bg-gray-300 rounded mt-4"></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500'
          },
        }}
      />
      <main className="flex-grow pt-20">
        {!selectedProduct ? (
          <>
            {/* ✅ Enhanced Hero Section */}
            <section className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-20 sm:py-28 overflow-hidden">
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Discover Premium Tech
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                  >
                    Elevate your experience with our curated collection of high-quality accessories
                  </motion.p>
                  
                  {/* Stats */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center gap-8 md:gap-16 mt-12"
                  >
                    {[
                      { label: "Products", value: "500+" },
                      { label: "Happy Customers", value: "10K+" },
                      { label: "Ratings", value: "4.8/5" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Animated background elements */}
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              />
            </section>

            {/* ✅ Enhanced Filters + Search Section */}
            <div className="max-w-7xl mx-auto px-4 py-12 -mt-8 relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 mb-12"
              >
                <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search products by name, features..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-4 pl-12 border-0 bg-white/70 backdrop-blur-sm rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-500"
                    />
                  </div>

                  {/* Categories */}
                  <div className="flex-1 flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                          selectedCategory === cat
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                            : "bg-white/70 text-gray-700 hover:bg-white hover:shadow-md border border-white/50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative w-full lg:w-64">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none w-full p-4 pr-12 bg-white/70 backdrop-blur-sm border-0 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 font-semibold text-gray-700"
                    >
                      <option value="default">Sort by: Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                      <option value="popular">Most Popular</option>
                    </select>
                    <Filter
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>
              </motion.div>

              {/* ✅ Enhanced Products Grid */}
              <div className="mb-16">
                {/* Results Header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
                >
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {selectedCategory === "All" ? "All Products" : selectedCategory}
                    </h2>
                    <p className="text-gray-600">
                      {displayedProducts.length} {displayedProducts.length === 1 ? 'product' : 'products'} found
                      {searchTerm && ` for "${searchTerm}"`}
                    </p>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="flex gap-4 mt-4 sm:mt-0">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 px-3 py-2 rounded-lg">
                      <TrendingUp size={16} className="text-green-500" />
                      <span>Quality Guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 px-3 py-2 rounded-lg">
                      <Shield size={16} className="text-blue-500" />
                      <span>Secure Payment</span>
                    </div>
                  </div>
                </motion.div>

                {/* Products Grid */}
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <ProductSkeleton key={index} />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
                  >
                    <AnimatePresence>
                      {displayedProducts.length > 0 ? (
                        displayedProducts.map((product) => (
                          <motion.div
                            key={product.id}
                            variants={itemVariant}
                            layout
                            className="bg-white group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden border border-gray-100 hover:border-purple-200 relative"
                            onMouseEnter={() => setHoveredProduct(product.id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                          >
                            {/* Product Badges */}
                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                              {product.isNew && (
                                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                                  NEW
                                </span>
                              )}
                              {product.discount && (
                                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                                  -{product.discount}%
                                </span>
                              )}
                            </div>

                            {/* Product Image */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                                <div className="w-full h-56 flex items-center justify-center p-6 relative">
                                  <motion.img
                                    src={product.image}
                                    alt={product.name}
                                    className="object-contain h-full w-full transition-transform duration-700"
                                    whileHover={{ scale: 1.1 }}
                                  />
                                </div>
                                
                                {/* Hover Actions */}
                                <motion.div 
                                  className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <motion.button
                                    onClick={() => setSelectedProduct(product)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 bg-white text-gray-800 rounded-full hover:bg-purple-600 hover:text-white transition-all shadow-lg"
                                  >
                                    <Eye size={20} />
                                  </motion.button>
                                  <motion.button
                                    onClick={() => toggleWishlist(product)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`p-3 rounded-full hover:bg-purple-600 hover:text-white transition-all shadow-lg ${
                                      wishlist.some((item) => item.id === product.id)
                                        ? "bg-red-500 text-white"
                                        : "bg-white text-gray-800"
                                    }`}
                                  >
                                    <Heart
                                      size={20}
                                      fill={
                                        wishlist.some((item) => item.id === product.id)
                                          ? "currentColor"
                                          : "none"
                                      }
                                    />
                                  </motion.button>
                                </motion.div>
                              </div>

                            {/* Product Info */}
                            <div className="p-5 flex flex-col flex-grow">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide bg-purple-50 px-2 py-1 rounded-full">
                                  {product.category}
                                </span>
                                <div className="flex items-center gap-1">
                                  {generateStars(product.rating || 4.5)}
                                  <span className="text-xs text-gray-500 ml-1">({product.reviews || 24})</span>
                                </div>
                              </div>
                              
                              <h3
                                onClick={() => setSelectedProduct(product)}
                                className="text-lg font-bold text-gray-900 cursor-pointer line-clamp-2 hover:text-purple-600 transition-colors mb-2 leading-tight"
                              >
                                {product.name}
                              </h3>
                              
                              <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                                {product.description || "Premium quality product with excellent features and durability."}
                              </p>

                              <div className="flex items-center justify-between mt-auto">
                                <div className="flex flex-col">
                                  <span className="text-2xl font-bold text-gray-900">
                                    ₹{product.price}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through">
                                      ₹{product.originalPrice}
                                    </span>
                                  )}
                                </div>
                                
                                <motion.button
                                  onClick={() => handleAddToCart(product)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-amber-500/25 flex items-center gap-2"
                                >
                                  <ShoppingCart size={18} />
                                  Add
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="col-span-full text-center py-16"
                        >
                          <div className="max-w-md mx-auto">
                            <Search size={64} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
                            <p className="text-gray-500 mb-6">
                              We couldn't find any products matching your criteria. Try adjusting your search or filters.
                            </p>
                            <button
                              onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                                setSortBy("default");
                              }}
                              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                            >
                              Reset Filters
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            </div>
          </>
        ) : (
          <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Product;




// import React, { useEffect, useState, useContext, useMemo, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Heart, 
//   Search, 
//   ShoppingCart, 
//   Filter, 
//   Eye, 
//   Star, 
//   TrendingUp, 
//   Clock, 
//   Shield, 
//   Zap,
//   Tag,
//   Grid,
//   List,
//   SlidersHorizontal,
//   X,
//   Sparkles,
//   Crown,
//   Battery,
//   Volume2
// } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// import api from "../Api/Axios_Instance";
// import { AuthContext } from "../context/AuthContext";
// import { useWishlist } from "../context/WishlistContext";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import ProductDetail from "../components/ProductDetail";

// // Custom Icons
// const HeadphonesIcon = ({ size = 20 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//     <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
//     <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
//   </svg>
// );

// const EarbudsIcon = ({ size = 20 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//     <circle cx="12" cy="12" r="3"></circle>
//     <path d="M12 3v3"></path>
//     <path d="M12 18v3"></path>
//     <path d="M3 12h3"></path>
//     <path d="M18 12h3"></path>
//   </svg>
// );

// // Quick View Modal Component
// const QuickViewModal = ({ product, isOpen, onClose, onAddToCart, onAddToWishlist, onViewDetails, isInWishlist }) => {
//   if (!isOpen || !product) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="flex flex-col md:flex-row">
//             {/* Product Image */}
//             <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-64 object-contain"
//               />
//             </div>
            
//             {/* Product Details */}
//             <div className="md:w-1/2 p-6 flex flex-col">
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
//                 <button
//                   onClick={onClose}
//                   className="text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>
              
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="flex items-center gap-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Star
//                       key={star}
//                       size={16}
//                       className={star <= (product.rating || 4) ? "text-amber-500 fill-amber-500" : "text-gray-300"}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-sm text-gray-600">({product.reviews || 24} reviews)</span>
//               </div>
              
//               <p className="text-gray-600 mb-6 line-clamp-3">
//                 {product.description || "Premium quality product with excellent features and durability."}
//               </p>
              
//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-medium text-gray-700">Category:</span>
//                   <span className="text-sm text-gray-600">{product.category}</span>
//                 </div>
//                 {product.features?.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     <span className="text-sm text-gray-600">{feature}</span>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mt-auto space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
//                     {product.originalPrice && (
//                       <span className="text-lg text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
//                     )}
//                   </div>
//                   <button
//                     onClick={() => onAddToWishlist(product)}
//                     className={`p-3 rounded-full border transition-colors ${
//                       isInWishlist
//                         ? "bg-red-500 text-white border-red-500"
//                         : "bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-500"
//                     }`}
//                   >
//                     <Heart
//                       size={20}
//                       fill={isInWishlist ? "currentColor" : "none"}
//                     />
//                   </button>
//                 </div>
                
//                 <div className="flex gap-3">
//                   <button
//                     onClick={onViewDetails}
//                     className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-purple-500 hover:text-purple-600 transition-colors"
//                   >
//                     View Details
//                   </button>
//                   <button
//                     onClick={() => onAddToCart(product)}
//                     className="flex-1 py-3 px-6 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
//                   >
//                     <ShoppingCart size={20} />
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// function Product() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [sortBy, setSortBy] = useState("default");
//   const [isLoading, setIsLoading] = useState(true);
//   const [priceRange, setPriceRange] = useState([0, 50000]);
//   const [ratingFilter, setRatingFilter] = useState(0);
//   const [viewMode, setViewMode] = useState("grid");
//   const [showFilters, setShowFilters] = useState(false);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);
//   const [comparisonProducts, setComparisonProducts] = useState([]);

//   const { wishlist, toggleWishlist } = useWishlist();
//   const { user } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const categories = [
//     { name: "All", icon: Grid, count: 0 },
//     { name: "Headphones", icon: HeadphonesIcon, count: 0 },
//     { name: "Earbuds", icon: EarbudsIcon, count: 0 },
//     { name: "Speakers", icon: Volume2, count: 0 },
//     { name: "Watches", icon: Clock, count: 0 },
//     { name: "Power Bank", icon: Battery, count: 0 },
//   ];

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const categoryFromURL = queryParams.get("category");
//     if (categoryFromURL) setSelectedCategory(categoryFromURL);
//   }, [location.search]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get("/products");
//         const productsData = response.data;
//         setProducts(productsData);
        
//         // Update category counts
//         categories.forEach(cat => {
//           if (cat.name !== "All") {
//             cat.count = productsData.filter(p => p.category === cat.name).length;
//           } else {
//             cat.count = productsData.length;
//           }
//         });
        
//       } catch (err) {
//         setError("Failed to fetch products.");
//         toast.error("Failed to load products");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const displayedProducts = useMemo(() => {
//     let items = [...products];
//     const parsePrice = (price) => {
//       if (typeof price === 'string') {
//         return parseFloat(price.replace(/[^\d.]/g, ""));
//       }
//       return price || 0;
//     };
    
//     // Sorting
//     switch (sortBy) {
//       case "price-asc":
//         items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
//         break;
//       case "price-desc":
//         items.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
//         break;
//       case "rating":
//         items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//         break;
//       case "popular":
//         items.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
//         break;
//       default:
//         break;
//     }

//     // Filtering
//     return items.filter((product) => {
//       const price = parsePrice(product.price);
//       const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
//       const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
//       const matchesRating = (product.rating || 0) >= ratingFilter;

//       return matchesCategory && matchesSearch && matchesPrice && matchesRating;
//     });
//   }, [products, selectedCategory, searchTerm, sortBy, priceRange, ratingFilter]);

//   const handleAddToCart = async (product) => {
//     if (!user) {
//       toast.error("Please log in to add items to your cart.");
//       navigate("/login");
//       return;
//     }
//     try {
//       const res = await api.get(`/users/${user.id}`);
//       let cart = res.data.cart || [];
//       const existingItem = cart.find((item) => item.id === product.id);
//       if (existingItem) {
//         cart = cart.map((item) =>
//           item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
//         );
//       } else {
//         cart.push({ ...product, quantity: 1 });
//       }
//       await api.patch(`/users/${user.id}`, { cart });
//       toast.success(`${product.name} added to cart!`);
//       window.dispatchEvent(new CustomEvent("cartUpdated"));
//     } catch (err) {
//       toast.error("Failed to add item to cart.");
//     }
//   };

//   const handleQuickView = (product) => {
//     setQuickViewProduct(product);
//   };

//   const handleAddToComparison = (product) => {
//     setComparisonProducts(prev => {
//       if (prev.some(p => p.id === product.id)) {
//         return prev.filter(p => p.id !== product.id);
//       }
//       if (prev.length >= 4) {
//         toast.error("Maximum 4 products can be compared");
//         return prev;
//       }
//       return [...prev, product];
//     });
//   };

//   const generateStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         size={14}
//         className={index < Math.floor(rating || 0) ? "text-amber-500 fill-amber-500" : "text-gray-300"}
//       />
//     ));
//   };

//   const getProductFeatures = (product) => {
//     const features = [];
//     if (product.batteryLife) features.push(`${product.batteryLife}h battery`);
//     if (product.waterResistant) features.push("Water resistant");
//     if (product.noiseCancellation) features.push("Noise cancellation");
//     if (product.wireless) features.push("Wireless");
//     return features.slice(0, 2);
//   };

//   // Animation variants
//   const staggerContainer = { 
//     hidden: { opacity: 0 }, 
//     visible: { 
//       opacity: 1, 
//       transition: { 
//         staggerChildren: 0.1 
//       } 
//     } 
//   };

//   const itemVariant = { 
//     hidden: { 
//       opacity: 0, 
//       y: 20,
//       scale: 0.95
//     }, 
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100
//       }
//     } 
//   };

//   // Loading skeleton component
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

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <Navbar />
//       <Toaster 
//         position="top-right" 
//         toastOptions={{
//           duration: 3000,
//           style: {
//             background: '#363636',
//             color: '#fff',
//             borderRadius: '12px',
//             fontSize: '14px',
//             fontWeight: '500'
//           },
//         }}
//       />
      
//       <main className="flex-grow pt-20">
//         {!selectedProduct ? (
//           <>
//             {/* Hero Section */}
//             <section className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-20 sm:py-28 overflow-hidden">
//               <div className="absolute inset-0 bg-black/40"></div>
//               <div className="absolute top-0 left-0 w-full h-full">
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//               </div>
              
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
//                     Elevate your experience with our curated collection of high-quality accessories
//                   </motion.p>
                  
//                   {/* Stats */}
//                   <motion.div 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     className="flex justify-center gap-8 md:gap-16 mt-12"
//                   >
//                     {[
//                       { label: "Products", value: products.length },
//                       { label: "Categories", value: categories.length - 1 },
//                       { label: "Happy Customers", value: "10K+" }
//                     ].map((stat, index) => (
//                       <div key={index} className="text-center">
//                         <div className="text-2xl md:text-3xl font-bold text-white mb-1">
//                           {stat.value}
//                         </div>
//                         <div className="text-sm text-gray-400">{stat.label}</div>
//                       </div>
//                     ))}
//                   </motion.div>
//                 </motion.div>
//               </div>
//             </section>

//             {/* Filters & Search Section */}
//             <div className="max-w-7xl mx-auto px-4 py-12 -mt-8 relative z-20">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 mb-12"
//               >
//                 <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center">
//                   {/* Search */}
//                   <div className="relative flex-1">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                     <input
//                       type="text"
//                       placeholder="Search products by name, features..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full p-4 pl-12 border-0 bg-white/70 backdrop-blur-sm rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-500"
//                     />
//                   </div>

//                   {/* View Mode Toggle */}
//                   <div className="flex items-center gap-2 bg-white/80 rounded-2xl p-2 border border-white/50">
//                     <button
//                       onClick={() => setViewMode("grid")}
//                       className={`p-2 rounded-xl transition-all ${
//                         viewMode === "grid" 
//                           ? "bg-purple-500 text-white shadow-lg" 
//                           : "text-gray-600 hover:text-purple-600"
//                       }`}
//                     >
//                       <Grid size={20} />
//                     </button>
//                     <button
//                       onClick={() => setViewMode("list")}
//                       className={`p-2 rounded-xl transition-all ${
//                         viewMode === "list" 
//                           ? "bg-purple-500 text-white shadow-lg" 
//                           : "text-gray-600 hover:text-purple-600"
//                       }`}
//                     >
//                       <List size={20} />
//                     </button>
//                   </div>

//                   {/* Filter Toggle */}
//                   <button
//                     onClick={() => setShowFilters(!showFilters)}
//                     className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all ${
//                       showFilters
//                         ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
//                         : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-lg border border-white/50"
//                     }`}
//                   >
//                     <SlidersHorizontal size={20} />
//                     Filters
//                     {(priceRange[0] > 0 || priceRange[1] < 50000 || ratingFilter > 0) && (
//                       <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                         !
//                       </span>
//                     )}
//                   </button>

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

//                 {/* Advanced Filters */}
//                 <AnimatePresence>
//                   {showFilters && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       className="mt-6 pt-6 border-t border-gray-200/50"
//                     >
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Price Range */}
//                         <div>
//                           <label className="block text-sm font-semibold text-gray-700 mb-3">
//                             Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
//                           </label>
//                           <div className="space-y-2">
//                             <input
//                               type="range"
//                               min="0"
//                               max="50000"
//                               step="1000"
//                               value={priceRange[1]}
//                               onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                             />
//                             <div className="flex justify-between text-xs text-gray-500">
//                               <span>₹0</span>
//                               <span>₹50,000</span>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Rating Filter */}
//                         <div>
//                           <label className="block text-sm font-semibold text-gray-700 mb-3">
//                             Minimum Rating
//                           </label>
//                           <div className="flex gap-2">
//                             {[0, 3, 4, 5].map((rating) => (
//                               <button
//                                 key={rating}
//                                 onClick={() => setRatingFilter(rating)}
//                                 className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
//                                   ratingFilter === rating
//                                     ? "bg-amber-500 text-white shadow-lg"
//                                     : "bg-white text-gray-700 hover:bg-gray-50 border"
//                                 }`}
//                               >
//                                 <Star size={14} fill={ratingFilter === rating ? "currentColor" : "none"} />
//                                 <span className="text-sm font-medium">
//                                   {rating === 0 ? "Any" : `${rating}+`}
//                                 </span>
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>

//               {/* Categories */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
//               >
//                 {categories.map((category) => {
//                   const IconComponent = category.icon;
//                   return (
//                     <button
//                       key={category.name}
//                       onClick={() => setSelectedCategory(category.name)}
//                       className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 flex-shrink-0 ${
//                         selectedCategory === category.name
//                           ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/25"
//                           : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-lg border border-white/50 backdrop-blur-sm"
//                       }`}
//                     >
//                       <IconComponent size={20} />
//                       <span>{category.name}</span>
//                       <span className={`text-xs px-2 py-1 rounded-full ${
//                         selectedCategory === category.name 
//                           ? "bg-white/20 text-white" 
//                           : "bg-gray-100 text-gray-600"
//                       }`}>
//                         {category.count}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </motion.div>

//               {/* Results Header */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
//               >
//                 <div>
//                   <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//                     {selectedCategory === "All" ? "All Products" : selectedCategory}
//                     <span className="text-purple-600 ml-2">({displayedProducts.length})</span>
//                   </h2>
//                   <p className="text-gray-600">
//                     {displayedProducts.length} {displayedProducts.length === 1 ? 'product' : 'products'} found
//                     {searchTerm && ` for "${searchTerm}"`}
//                   </p>
//                 </div>
                
//                 {/* Quick Stats */}
//                 <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
//                   {comparisonProducts.length > 0 && (
//                     <button
//                       onClick={() => setComparisonProducts([])}
//                       className="flex items-center gap-2 text-sm bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
//                     >
//                       Compare ({comparisonProducts.length})
//                       <X size={16} />
//                     </button>
//                   )}
//                   <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-xl border">
//                     <TrendingUp size={16} className="text-green-500" />
//                     <span>Quality Guaranteed</span>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Products Grid/List View */}
//               {isLoading ? (
//                 <div className={`gap-6 md:gap-8 ${
//                   viewMode === "grid" 
//                     ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
//                     : "space-y-6"
//                 }`}>
//                   {Array.from({ length: 8 }).map((_, index) => (
//                     <ProductSkeleton key={index} />
//                   ))}
//                 </div>
//               ) : (
//                 <motion.div
//                   variants={staggerContainer}
//                   initial="hidden"
//                   animate="visible"
//                   className={viewMode === "grid" 
//                     ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
//                     : "space-y-6"
//                   }
//                 >
//                   <AnimatePresence>
//                     {displayedProducts.length > 0 ? (
//                       displayedProducts.map((product) => (
//                         <motion.div
//                           key={product.id}
//                           variants={itemVariant}
//                           layout
//                           className={`bg-white group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200 relative ${
//                             viewMode === "list" ? "flex" : "flex flex-col"
//                           }`}
//                         >
//                           {/* Product Badges */}
//                           <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
//                             {product.isNew && (
//                               <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
//                                 NEW
//                               </span>
//                             )}
//                             {product.discount && (
//                               <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
//                                 -{product.discount}%
//                               </span>
//                             )}
//                           </div>

//                           {/* Comparison Checkbox */}
//                           <div className="absolute top-3 right-3 z-10">
//                             <button
//                               onClick={() => handleAddToComparison(product)}
//                               className={`p-2 rounded-full transition-all ${
//                                 comparisonProducts.some(p => p.id === product.id)
//                                   ? "bg-blue-500 text-white shadow-lg"
//                                   : "bg-white/90 text-gray-600 hover:bg-blue-50 hover:text-blue-500 shadow-md"
//                               }`}
//                             >
//                               <Tag size={16} />
//                             </button>
//                           </div>

//                           {/* Product Image */}
//                           <div className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-white ${
//                             viewMode === "list" ? "w-48 flex-shrink-0" : "w-full h-56"
//                           }`}>
//                             <div className={`flex items-center justify-center p-6 relative ${
//                               viewMode === "list" ? "h-full" : "h-56"
//                             }`}>
//                               <motion.img
//                                 src={product.image}
//                                 alt={product.name}
//                                 className="object-contain h-full w-full transition-transform duration-700"
//                                 whileHover={{ scale: 1.1 }}
//                               />
//                             </div>
                            
//                             {/* Hover Actions */}
//                             <motion.div 
//                               className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
//                               initial={{ opacity: 0 }}
//                               whileHover={{ opacity: 1 }}
//                               transition={{ duration: 0.3 }}
//                             >
//                               <motion.button
//                                 onClick={() => handleQuickView(product)}
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 className="p-3 bg-white text-gray-800 rounded-full hover:bg-purple-600 hover:text-white transition-all shadow-lg"
//                               >
//                                 <Eye size={20} />
//                               </motion.button>
//                               <motion.button
//                                 onClick={() => toggleWishlist(product)}
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 className={`p-3 rounded-full hover:bg-purple-600 hover:text-white transition-all shadow-lg ${
//                                   wishlist.some((item) => item.id === product.id)
//                                     ? "bg-red-500 text-white"
//                                     : "bg-white text-gray-800"
//                                 }`}
//                               >
//                                 <Heart
//                                   size={20}
//                                   fill={
//                                     wishlist.some((item) => item.id === product.id)
//                                       ? "currentColor"
//                                       : "none"
//                                   }
//                                 />
//                               </motion.button>
//                             </motion.div>
//                           </div>

//                           {/* Product Info */}
//                           <div className={`flex flex-col flex-grow ${
//                             viewMode === "list" ? "p-6 flex-1" : "p-5"
//                           }`}>
//                             <div className="flex items-center justify-between mb-2">
//                               <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide bg-purple-50 px-2 py-1 rounded-full">
//                                 {product.category}
//                               </span>
//                               <div className="flex items-center gap-1">
//                                 {generateStars(product.rating || 4.5)}
//                                 <span className="text-xs text-gray-500 ml-1">({product.reviews || 24})</span>
//                               </div>
//                             </div>
                            
//                             <h3
//                               onClick={() => handleQuickView(product)}
//                               className={`font-bold text-gray-900 cursor-pointer hover:text-purple-600 transition-colors mb-2 leading-tight ${
//                                 viewMode === "list" ? "text-xl" : "text-lg line-clamp-2"
//                               }`}
//                             >
//                               {product.name}
//                             </h3>
                            
//                             <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
//                               {product.description || "Premium quality product with excellent features and durability."}
//                             </p>

//                             {/* Product Features */}
//                             {viewMode === "list" && (
//                               <div className="flex flex-wrap gap-2 mb-4">
//                                 {getProductFeatures(product).map((feature, index) => (
//                                   <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                                     {feature}
//                                   </span>
//                                 ))}
//                               </div>
//                             )}

//                             <div className="flex items-center justify-between mt-auto">
//                               <div className="flex flex-col">
//                                 <span className="text-2xl font-bold text-gray-900">
//                                   ₹{product.price}
//                                 </span>
//                                 {product.originalPrice && (
//                                   <span className="text-sm text-gray-500 line-through">
//                                     ₹{product.originalPrice}
//                                   </span>
//                                 )}
//                               </div>
                              
//                               <motion.button
//                                 onClick={() => handleAddToCart(product)}
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-amber-500/25 flex items-center gap-2"
//                               >
//                                 <ShoppingCart size={18} />
//                                 Add to Cart
//                               </motion.button>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))
//                     ) : (
//                       <motion.div 
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="col-span-full text-center py-16"
//                       >
//                         <div className="max-w-md mx-auto">
//                           <Search size={64} className="mx-auto text-gray-300 mb-4" />
//                           <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
//                           <p className="text-gray-500 mb-6">
//                             We couldn't find any products matching your criteria. Try adjusting your search or filters.
//                           </p>
//                           <button
//                             onClick={() => {
//                               setSearchTerm("");
//                               setSelectedCategory("All");
//                               setSortBy("default");
//                               setPriceRange([0, 50000]);
//                               setRatingFilter(0);
//                             }}
//                             className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
//                           >
//                             Reset Filters
//                           </button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               )}
//             </div>
//           </>
//         ) : (
//           <ProductDetail 
//             product={selectedProduct} 
//             onBack={() => setSelectedProduct(null)}
//           />
//         )}
//       </main>

//       {/* Quick View Modal */}
//       <QuickViewModal
//         product={quickViewProduct}
//         isOpen={!!quickViewProduct}
//         onClose={() => setQuickViewProduct(null)}
//         onAddToCart={handleAddToCart}
//         onAddToWishlist={toggleWishlist}
//         onViewDetails={(product) => {
//           setQuickViewProduct(null);
//           setSelectedProduct(product);
//         }}
//         isInWishlist={wishlist.some(item => item.id === quickViewProduct?.id)}
//       />

//       <Footer />
//     </div>
//   );
// }

// export default Product;








// GEmini
// import React, { useEffect, useState, useContext, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Heart, Search, ShoppingCart, Filter, Eye, Star, TrendingUp, Shield, Package, X } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// import api from "../Api/Axios_Instance";
// import { AuthContext } from "../context/AuthContext";
// import { useWishlist } from "../context/WishlistContext";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import ProductDetail from "../components/ProductDetail";

// function Product() {
//   // --- State & Context (Logic Unchanged) ---
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [sortBy, setSortBy] = useState("default");
//   const [isLoading, setIsLoading] = useState(true);
//   const [hoveredProduct, setHoveredProduct] = useState(null);

//   const { wishlist, toggleWishlist } = useWishlist();
//   const { user } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // --- Effects (Logic Unchanged) ---
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const categoryFromURL = queryParams.get("category");
//     if (categoryFromURL) setSelectedCategory(categoryFromURL);
//   }, [location.search]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get("/products");
//         setProducts(response.data);
//       } catch (err) {
//         setError("Failed to fetch products.");
//         toast.error("Failed to load products");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProduct();
//   }, []);

//   // --- Helpers & Logic (Logic Unchanged) ---
//   const categories = ["All", "Headphones", "Earbuds", "Speakers", "Watches", "Power Bank"];

//   const displayedProducts = useMemo(() => {
//     let items = [...products];
//     const parsePrice = (price) => parseFloat(String(price).replace(/[^\d.]/g, ""));
    
//     if (sortBy === "price-asc") items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
//     if (sortBy === "price-desc") items.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
//     if (sortBy === "rating") items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//     if (sortBy === "popular") items.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

//     return items.filter(
//       (product) =>
//         (selectedCategory === "All" || product.category === selectedCategory) &&
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [products, selectedCategory, searchTerm, sortBy]);

//   const handleAddToCart = async (product) => {
//     if (!user) return toast.error("Please log in to add items to your cart.");
//     try {
//       const res = await api.get(`/users/${user.id}`);
//       let cart = res.data.cart || [];
//       const existingItem = cart.find((item) => item.id === product.id);
//       if (existingItem) {
//         cart = cart.map((item) =>
//           item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
//         );
//       } else {
//         cart.push({ ...product, quantity: 1 });
//       }
//       await api.patch(`/users/${user.id}`, { cart });
//       toast.success(`${product.name} added to cart!`);
//       window.dispatchEvent(new CustomEvent("cartUpdated"));
//     } catch (err) {
//       toast.error("Failed to add item to cart.");
//     }
//   };

//   const generateStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         size={14}
//         className={index < Math.floor(rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}
//       />
//     ));
//   };

//   // --- Animations ---
//   const staggerContainer = { 
//     hidden: { opacity: 0 }, 
//     visible: { opacity: 1, transition: { staggerChildren: 0.05 } } 
//   };

//   const itemVariant = { 
//     hidden: { opacity: 0, y: 10 }, 
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } 
//   };

//   // --- Components ---
//   const ProductSkeleton = () => (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//       <div className="w-full h-64 bg-gray-100 animate-pulse"></div>
//       <div className="p-5 space-y-3">
//         <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse"></div>
//         <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div>
//         <div className="flex justify-between mt-4">
//           <div className="h-6 bg-gray-100 rounded w-1/4 animate-pulse"></div>
//           <div className="h-8 bg-gray-100 rounded w-1/4 animate-pulse"></div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 font-sans selection:bg-purple-100 selection:text-purple-900">
//       <Navbar />
//       <Toaster 
//         position="top-center" 
//         toastOptions={{
//           style: {
//             background: '#1f2937',
//             color: '#fff',
//             borderRadius: '8px',
//           },
//         }}
//       />

//       <main className="flex-grow pt-20">
//         <AnimatePresence mode="wait">
//           {!selectedProduct ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="w-full"
//             >
//               {/* Hero Section - Compact & Modern */}
//               <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-gray-900 overflow-hidden">
//                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-40"></div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                
//                 <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
//                   <motion.h1 
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
//                   >
//                     Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Audio & Tech</span>
//                   </motion.h1>
//                   <motion.p 
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.1 }}
//                     className="text-lg text-gray-300 max-w-2xl mx-auto"
//                   >
//                     Premium gear curated for the modern professional and audiophile.
//                   </motion.p>
//                 </div>
//               </section>

//               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
                
//                 {/* Sticky Filter Bar */}
//                 <div className="sticky top-20 z-30 mb-8">
//                   <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 p-4">
//                     <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                      
//                       {/* Search */}
//                       <div className="relative w-full lg:w-96 group">
//                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" size={20} />
//                         <input
//                           type="text"
//                           placeholder="Search essentials..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="w-full h-12 pl-11 pr-4 bg-gray-50 border-transparent focus:bg-white rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all text-gray-900 placeholder-gray-500 font-medium"
//                         />
//                          {searchTerm && (
//                           <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                             <X size={16} />
//                           </button>
//                         )}
//                       </div>

//                       {/* Categories - Horizontal Scroll */}
//                       <div className="w-full lg:flex-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
//                         <div className="flex gap-2">
//                           {categories.map((cat) => (
//                             <button
//                               key={cat}
//                               onClick={() => setSelectedCategory(cat)}
//                               className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
//                                 selectedCategory === cat
//                                   ? "bg-purple-600 text-white shadow-md shadow-purple-200"
//                                   : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                               }`}
//                             >
//                               {cat}
//                             </button>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Sort */}
//                       <div className="w-full lg:w-auto min-w-[200px] relative">
//                         <select
//                           value={sortBy}
//                           onChange={(e) => setSortBy(e.target.value)}
//                           className="w-full h-12 pl-4 pr-10 appearance-none bg-gray-50 hover:bg-white border-transparent focus:ring-2 focus:ring-purple-100 focus:border-purple-500 rounded-xl cursor-pointer text-gray-700 font-medium transition-all"
//                         >
//                           <option value="default">Sort: Featured</option>
//                           <option value="price-asc">Price: Low to High</option>
//                           <option value="price-desc">Price: High to Low</option>
//                           <option value="rating">Highest Rated</option>
//                           <option value="popular">Most Popular</option>
//                         </select>
//                         <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Results Count & Badges */}
//                 <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-6 px-2">
//                    <div>
//                     <h2 className="text-xl font-bold text-gray-900">
//                       {selectedCategory === "All" ? "All Collection" : selectedCategory}
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Showing {displayedProducts.length} results
//                     </p>
//                    </div>
//                    <div className="flex gap-3 mt-4 sm:mt-0">
//                      <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
//                        <Shield size={14} /> Official Warranty
//                      </div>
//                      <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
//                        <Package size={14} /> Fast Delivery
//                      </div>
//                    </div>
//                 </div>

//                 {/* Product Grid */}
//                 {isLoading ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                     {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
//                   </div>
//                 ) : (
//                   <motion.div
//                     variants={staggerContainer}
//                     initial="hidden"
//                     animate="visible"
//                     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//                   >
//                     <AnimatePresence mode="popLayout">
//                       {displayedProducts.length > 0 ? (
//                         displayedProducts.map((product) => (
//                           <motion.div
//                             layout
//                             key={product.id}
//                             variants={itemVariant}
//                             className="group relative bg-white rounded-2xl border border-gray-100 hover:border-purple-100 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col overflow-hidden"
//                             onMouseEnter={() => setHoveredProduct(product.id)}
//                             onMouseLeave={() => setHoveredProduct(null)}
//                           >
//                             {/* Tags */}
//                             <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//                               {product.isNew && (
//                                 <span className="px-2.5 py-1 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-md">New</span>
//                               )}
//                               {product.discount && (
//                                 <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md">-{product.discount}%</span>
//                               )}
//                             </div>

//                             {/* Wishlist Button (Always Visible on Mobile, Hover on Desktop) */}
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 toggleWishlist(product);
//                               }}
//                               className={`absolute top-4 right-4 z-10 p-2.5 rounded-full shadow-sm transition-all duration-300 ${
//                                 wishlist.some((item) => item.id === product.id)
//                                   ? "bg-red-50 text-red-500"
//                                   : "bg-white text-gray-400 hover:text-gray-900 hover:bg-gray-50"
//                               }`}
//                             >
//                               <Heart size={18} fill={wishlist.some(i => i.id === product.id) ? "currentColor" : "none"} />
//                             </button>

//                             {/* Image Section */}
//                             <div className="relative aspect-square bg-gray-50 p-6 flex items-center justify-center overflow-hidden">
//                               <motion.img
//                                 src={product.image}
//                                 alt={product.name}
//                                 className="w-full h-full object-contain mix-blend-multiply"
//                                 whileHover={{ scale: 1.05 }}
//                                 transition={{ duration: 0.5 }}
//                               />
                              
//                               {/* Quick View Overlay */}
//                               <div className={`absolute inset-0 bg-black/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
//                                 <motion.button
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   onClick={() => setSelectedProduct(product)}
//                                   className="bg-white text-gray-900 px-6 py-2.5 rounded-full font-semibold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
//                                 >
//                                   <Eye size={16} /> Quick View
//                                 </motion.button>
//                               </div>
//                             </div>

//                             {/* Details */}
//                             <div className="p-5 flex flex-col flex-grow">
//                               <div className="mb-2 flex items-center justify-between">
//                                 <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">
//                                   {product.category}
//                                 </span>
//                                 <div className="flex items-center gap-1">
//                                   <Star size={12} className="text-yellow-400 fill-yellow-400" />
//                                   <span className="text-xs font-medium text-gray-500">{product.rating || 4.5}</span>
//                                 </div>
//                               </div>

//                               <h3 
//                                 onClick={() => setSelectedProduct(product)}
//                                 className="text-base font-bold text-gray-900 mb-1 cursor-pointer hover:text-purple-600 transition-colors line-clamp-1"
//                               >
//                                 {product.name}
//                               </h3>
                              
//                               <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10 leading-relaxed">
//                                 {product.description || "High-performance tech designed for your lifestyle."}
//                               </p>

//                               <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
//                                 <div>
//                                   <div className="flex items-baseline gap-2">
//                                     <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
//                                     {product.originalPrice && (
//                                       <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
//                                     )}
//                                   </div>
//                                 </div>

//                                 <motion.button
//                                   whileTap={{ scale: 0.95 }}
//                                   onClick={() => handleAddToCart(product)}
//                                   className="bg-gray-900 text-white p-2.5 rounded-xl hover:bg-purple-600 transition-colors shadow-lg shadow-gray-900/10"
//                                 >
//                                   <ShoppingCart size={18} />
//                                 </motion.button>
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))
//                       ) : (
//                         <div className="col-span-full py-20 text-center">
//                           <div className="inline-flex bg-gray-100 p-6 rounded-full mb-4">
//                             <Search size={32} className="text-gray-400" />
//                           </div>
//                           <h3 className="text-lg font-bold text-gray-900">No matches found</h3>
//                           <p className="text-gray-500 mb-6">We couldn't find any products for "{searchTerm}".</p>
//                           <button
//                             onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
//                             className="text-purple-600 font-semibold hover:text-purple-700"
//                           >
//                             Clear all filters
//                           </button>
//                         </div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
//           ) : (
//              <motion.div
//                initial={{ opacity: 0, y: 20 }}
//                animate={{ opacity: 1, y: 0 }}
//                exit={{ opacity: 0, y: -20 }}
//                className="container mx-auto px-4 pb-20"
//              >
//                 <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
//              </motion.div>
//           )}
//         </AnimatePresence>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Product;










