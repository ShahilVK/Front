
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
import { Heart, Search, ShoppingCart, Filter, Eye, Star, TrendingUp, Shield } from "lucide-react";
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
        setProducts(response.data.data || response.data || []);
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
  try {

    await api.post(`/cart/${product.id}`); 

     window.dispatchEvent(new Event("cartUpdated"));
    
    toast.success("Added to cart!");
    
  } catch (error) {
    console.error("Add to cart error:", error);
    toast.error("Failed to add to cart");
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
      transition: { staggerChildren: 0.1 } 
    } 
  };

  const itemVariant = { 
    hidden: { opacity: 0, y: 20, scale: 0.95 }, 
    visible: { 
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring", stiffness: 100 }
    } 
  };

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

  const getProductImage = (product) =>
    product.imageUrl || product.image || null;

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
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-20 sm:py-28 overflow-hidden">
              <div className="absolute inset-0 bg-black/40"></div>
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
                </motion.div>
              </div>
            </section>

            {/* Filters + Search Section */}
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
                      placeholder="Search products..."
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
                    <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>
              </motion.div>

              {/* Products Grid */}
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
                    </p>
                  </div>
                  
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
                                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">NEW</span>
                              )}
                              {product.discount && (
                                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">-{product.discount}%</span>
                              )}
                            </div>

                            {/* Product Image */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                                <div className="w-full h-56 flex items-center justify-center p-6 relative">
                                 {getProductImage(product) ? (
                                    <img
                                      src={getProductImage(product)}
                                      alt={product.name}
                                      className="object-contain h-full w-full"
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center h-full w-full text-gray-400 text-sm">
                                      No Image
                                    </div>
                                  )}
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
                                      fill={wishlist.some((item) => item.id === product.id) ? "currentColor" : "none"}
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



// import React, { useEffect, useState, useContext, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Heart, Search, ShoppingCart, Filter, Eye, Star } from "lucide-react";
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
//   const [isLoading, setIsLoading] = useState(true);
//   const [hoveredProduct, setHoveredProduct] = useState(null);

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
//         setIsLoading(true);
//         const response = await api.get("/products");
//         setProducts(response.data.data);
//       } catch (err) {
//         setError("Failed to fetch products.");
//         toast.error("Failed to load products");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProduct();
//   }, []);

//   const categories = ["All", "Headphones", "Earbuds", "Speakers", "Watches", "Power Bank"];

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

//     return items.filter(
//       (product) =>
//         (selectedCategory === "All" || product.category === selectedCategory) &&
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [products, selectedCategory, searchTerm, sortBy]);

//   const handleAddToCart = async (product) => {
//     if (!user) {
//       toast.error("Please log in to add items to your cart.");
//       return;
//     }

//     try {
//       await api.post(`/cart/${product.id}`);
//       toast.success(`${product.name} added to cart`);
//       window.dispatchEvent(new Event("cartUpdated"));
//     } catch (error) {
//       console.error("Add to cart failed:", error);
//       toast.error("Failed to add item to cart");
//     }
//   };

//   const generateStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         size={14}
//         className={index < Math.floor(rating || 0) ? "text-orange-500 fill-orange-500" : "text-gray-300"}
//       />
//     ));
//   };

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

//   const ProductSkeleton = () => (
//     <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
//       <div className="w-full h-56 bg-gray-200"></div>
//       <div className="p-4 space-y-3">
//         <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//         <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//         <div className="h-6 bg-gray-200 rounded w-1/3"></div>
//         <div className="h-10 bg-gray-200 rounded mt-4"></div>
//       </div>
//     </div>
//   );

//   const getProductImage = (product) =>
//     product.imageUrl || product.image || "";

//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       <Navbar />
//       <Toaster 
//         position="top-right" 
//         toastOptions={{
//           duration: 3000,
//           style: {
//             background: '#fff',
//             color: '#333',
//             border: '1px solid #f97316',
//             borderRadius: '8px',
//             fontSize: '14px',
//             fontWeight: '500'
//           },
//         }}
//       />
//       <main className="flex-grow pt-20">
//         {!selectedProduct ? (
//           <>
//             {/* Simple Hero Section */}
//             <section className="bg-orange-500 text-white py-16">
//               <div className="max-w-7xl mx-auto px-4 text-center">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <h1 className="text-4xl md:text-5xl font-bold mb-3">
//                     Premium Tech Products
//                   </h1>
//                   <p className="text-lg md:text-xl text-orange-50 max-w-2xl mx-auto">
//                     Quality accessories at great prices
//                   </p>
//                 </motion.div>
//               </div>
//             </section>

//             {/* Clean Filters Section */}
//             <div className="max-w-7xl mx-auto px-4 py-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
//               >
//                 <div className="flex flex-col lg:flex-row gap-4">
//                   {/* Search */}
//                   <div className="relative flex-1">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                     <input
//                       type="text"
//                       placeholder="Search products..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
//                     />
//                   </div>

//                   {/* Categories */}
//                   <div className="flex gap-2 overflow-x-auto pb-2">
//                     {categories.map((cat) => (
//                       <button
//                         key={cat}
//                         onClick={() => setSelectedCategory(cat)}
//                         className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
//                           selectedCategory === cat
//                             ? "bg-orange-500 text-white"
//                             : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                         }`}
//                       >
//                         {cat}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Sort */}
//                   <div className="relative w-full lg:w-56">
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="appearance-none w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors font-medium"
//                     >
//                       <option value="default">Sort: Featured</option>
//                       <option value="price-asc">Price: Low to High</option>
//                       <option value="price-desc">Price: High to Low</option>
//                       <option value="rating">Top Rated</option>
//                       <option value="popular">Most Popular</option>
//                     </select>
//                     <Filter
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//                       size={18}
//                     />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Products Section */}
//               <div className="mb-12">
//                 {/* Header */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="flex justify-between items-center mb-6"
//                 >
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">
//                       {selectedCategory === "All" ? "All Products" : selectedCategory}
//                     </h2>
//                     <p className="text-gray-600 text-sm mt-1">
//                       {displayedProducts.length} {displayedProducts.length === 1 ? 'product' : 'products'} 
//                       {searchTerm && ` for "${searchTerm}"`}
//                     </p>
//                   </div>
//                 </motion.div>

//                 {/* Products Grid */}
//                 {isLoading ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {Array.from({ length: 8 }).map((_, index) => (
//                       <ProductSkeleton key={index} />
//                     ))}
//                   </div>
//                 ) : (
//                   <motion.div
//                     variants={staggerContainer}
//                     initial="hidden"
//                     animate="visible"
//                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//                   >
//                     <AnimatePresence>
//                       {displayedProducts.length > 0 ? (
//                         displayedProducts.map((product) => (
//                           <motion.div
//                             key={product.id}
//                             variants={itemVariant}
//                             layout
//                             className="bg-white group rounded-lg shadow hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-200"
//                             onMouseEnter={() => setHoveredProduct(product.id)}
//                             onMouseLeave={() => setHoveredProduct(null)}
//                           >
//                             {/* Badges */}
//                             <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
//                               {product.isNew && (
//                                 <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
//                                   NEW
//                                 </span>
//                               )}
//                               {product.discount && (
//                                 <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
//                                   -{product.discount}%
//                                 </span>
//                               )}
//                             </div>

//                             {/* Image */}
//                             <div className="relative overflow-hidden bg-gray-50">
//                               <div className="w-full h-56 flex items-center justify-center p-4">
//                                 <img
//                                   src={getProductImage(product)}
//                                   alt={product.name}
//                                   className="object-contain h-full w-full"
//                                 />
//                               </div>
                              
//                               {/* Hover Actions */}
//                               <motion.div 
//                                 className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
//                                 initial={{ opacity: 0 }}
//                                 whileHover={{ opacity: 1 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 <motion.button
//                                   onClick={() => setSelectedProduct(product)}
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   className="p-2 bg-white text-gray-800 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
//                                 >
//                                   <Eye size={20} />
//                                 </motion.button>
//                                 <motion.button
//                                   onClick={() => toggleWishlist(product)}
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   className={`p-2 rounded-full transition-colors ${
//                                     wishlist.some((item) => item.id === product.id)
//                                       ? "bg-red-500 text-white"
//                                       : "bg-white text-gray-800 hover:bg-orange-500 hover:text-white"
//                                   }`}
//                                 >
//                                   <Heart
//                                     size={20}
//                                     fill={
//                                       wishlist.some((item) => item.id === product.id)
//                                         ? "currentColor"
//                                         : "none"
//                                     }
//                                   />
//                                 </motion.button>
//                               </motion.div>
//                             </div>

//                             {/* Info */}
//                             <div className="p-4 flex flex-col flex-grow">
//                               <div className="flex items-center justify-between mb-2">
//                                 <span className="text-xs font-semibold text-orange-600 uppercase">
//                                   {product.category}
//                                 </span>
//                                 <div className="flex items-center gap-1">
//                                   {generateStars(product.rating || 4.5)}
//                                   <span className="text-xs text-gray-500 ml-1">({product.reviews || 24})</span>
//                                 </div>
//                               </div>
                              
//                               <h3
//                                 onClick={() => setSelectedProduct(product)}
//                                 className="text-base font-semibold text-gray-900 cursor-pointer line-clamp-2 hover:text-orange-600 transition-colors mb-2"
//                               >
//                                 {product.name}
//                               </h3>
                              
//                               <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow">
//                                 {product.description || "Premium quality product with excellent features."}
//                               </p>

//                               <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
//                                 <div className="flex flex-col">
//                                   <span className="text-xl font-bold text-gray-900">
//                                     ₹{product.price}
//                                   </span>
//                                   {product.originalPrice && (
//                                     <span className="text-sm text-gray-500 line-through">
//                                       ₹{product.originalPrice}
//                                     </span>
//                                   )}
//                                 </div>
                                
//                                 <motion.button
//                                   onClick={() => handleAddToCart(product)}
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
//                                 >
//                                   <ShoppingCart size={16} />
//                                   Add
//                                 </motion.button>
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
//                             <Search size={48} className="mx-auto text-gray-300 mb-3" />
//                             <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
//                             <p className="text-gray-500 mb-4">
//                               Try adjusting your search or filters.
//                             </p>
//                             <button
//                               onClick={() => {
//                                 setSearchTerm("");
//                                 setSelectedCategory("All");
//                                 setSortBy("default");
//                               }}
//                               className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
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
//           <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Product;