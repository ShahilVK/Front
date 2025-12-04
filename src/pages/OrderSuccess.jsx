
import React, { useContext, createContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingCart, Heart } from "lucide-react";

// --- Helper Components & Contexts (Included to make the file self-contained) ---

const AuthContext = createContext(null);
const WishlistContext = createContext({ wishlist: [] });
const useWishlist = () => useContext(WishlistContext);

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 onClick={() => navigate("/")} className="text-2xl sm:text-3xl font-bold text-red-500 cursor-pointer">
          TekTrov
        </h1>
        {/* Simplified Navbar for this component */}
        <div className="flex items-center gap-4">
            <Heart className="w-6 h-6 text-gray-700"/>
            <ShoppingCart className="w-6 h-6 text-gray-700"/>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => <footer className="bg-slate-900 text-white p-6 text-center">Copyright © {new Date().getFullYear()} TekTrov</footer>;


// --- Main OrderSuccess Component ---

function OrderSuccess() {
  const location = useLocation();
  // The logic to get the order from the previous page's state remains the same
  const order = location.state?.order || null;

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Order Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the details for your recent order.</p>
        <Link to="/orders" className="text-red-500 underline font-semibold">
          View Your Order History
        </Link>
      </div>
    );
  }

  // Helper to safely parse price strings
  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[^\d.]/g, '')) || 0;
    }
    return 0;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="max-w-2xl w-full mx-auto p-8 bg-white shadow-xl rounded-2xl"
        >
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
              Order Successful!
            </h1>
            <p className="mt-2 text-gray-600">
              Thank you, <span className="font-semibold">{order.billing.name}</span>! <br />
              Your order has been placed and a confirmation is on its way.
            </p>
          </div>

          {/* Order Details */}
          <div className="my-8 border-t border-b border-gray-200 divide-y divide-gray-200">
            {order.items.map((item, index) => {
              const itemPrice = parsePrice(item.price);
              const lineItemTotal = (item.quantity || 1) * itemPrice;
              return (
                <div key={index} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-lg border p-1 bg-gray-50"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ₹{lineItemTotal.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.total}</span>
            </div>
            <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>FREE</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-2 mt-2">
              <span>Total Paid:</span>
              <span>₹{order.total}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              to="/orders"
              className="w-full sm:w-auto text-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              View My Orders
            </Link>
            <Link
              to="/product"
              className="w-full sm:w-auto text-center bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
