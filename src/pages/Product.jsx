

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
      await api.post(`/cart/${product.id}`,{
        quantity: 1,
      });
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














