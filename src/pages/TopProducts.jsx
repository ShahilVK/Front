import React, { useEffect, useState, useContext } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import api from "../Api/Axios_Instance";
import { AuthContext } from "../context/AuthContext";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data.data.slice(0, 8));
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    if (!user) return navigate("/login");

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

  const handleAddToWishlist = async (e, product) => {
    e.stopPropagation();
    if (!user) return navigate("/login");

    try {
      const res = await api.get(`/users/${user.id}`);
      let wishlist = res.data.wishlist || [];

      const exists = wishlist.some((item) => item.id === product.id);
      if (!exists) wishlist.push(product);

      await api.patch(`/users/${user.id}`, { wishlist });
      toast.success(`${product.name} added to wishlist!`);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      toast.error("Failed to add item to wishlist.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative bg-gradient-to-b from-teal-50/60 via-white to-gray-50 py-24 w-full overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            padding: "16px",
            fontWeight: "600",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          },
        }}
      />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 right-20 w-72 h-72 bg-teal-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-100 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-teal-100 border border-teal-200 text-teal-700 px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-sm"
          >
            <Sparkles size={16} />
            <span>Trending Collection</span>
            <TrendingUp size={16} />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of top-rated electronics.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-red-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Enhanced Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:border-teal-200"
            >
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Featured
              </div>

              {/* Product Image */}
              <div
                className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white p-8 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Enhanced Action buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <motion.button
                  onClick={() => navigate(`/product/${product.id}`)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white rounded-full shadow-xl hover:bg-teal-500 hover:text-white text-gray-700 transition-all"
                >
                  <Eye size={18} />
                </motion.button>
                <motion.button
                  onClick={(e) => handleAddToCart(e, product)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white rounded-full shadow-xl hover:bg-teal-500 hover:text-white text-gray-700 transition-all"
                >
                  <ShoppingCart size={18} />
                </motion.button>
                <motion.button
                  onClick={(e) => handleAddToWishlist(e, product)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white rounded-full shadow-xl hover:bg-red-500 hover:text-white text-gray-700 transition-all"
                >
                  <Heart size={18} />
                </motion.button>
              </div>

              {/* Enhanced Product Info */}
              <div className="p-5 border-t-2 border-gray-100 flex flex-col flex-grow">
                <div className="mb-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full inline-block border border-teal-100"
                  >
                    {product.category}
                  </motion.div>
                </div>

                <h3
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="text-base font-bold text-gray-800 transition truncate flex-grow group-hover:text-teal-600 cursor-pointer mb-3"
                >
                  {product.name}
                </h3>

                {/* Enhanced Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-all ${
                          i < 4
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300 fill-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-gray-500 font-semibold">
                    (24 reviews)
                  </span>
                </div>

                {/* Enhanced Price */}
                <div className="mt-auto">
                  <p className="text-2xl font-extrabold text-gray-900">
                    ₹{product.price}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-1">
                    Free shipping available
                  </p>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-1 bg-gradient-to-r from-teal-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => navigate("/product")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-teal-600 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>View All Products</span>
            <span>→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TopProducts;
