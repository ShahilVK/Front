

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { CheckCircle } from "lucide-react";
// import api from "../Api/Axios_Instance";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// function OrderSuccess() {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLatestOrder = async () => {
//       try {
//         const res = await api.get("/orders/My-Orders");
//         const orders = res.data.data || [];

//         if (orders.length === 0) {
//           navigate("/orders");
//           return;
//         }

//         // ✅ latest order (most recent)
//         setOrder(orders[0]);
//       } catch (err) {
//         console.error("Failed to fetch order", err);
//         navigate("/orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLatestOrder();
//   }, [navigate]);

//   if (loading) {
//     return <div className="text-center py-24">Loading order details...</div>;
//   }

//   if (!order) {
//     return (
//       <div className="text-center py-24">
//         <p className="text-gray-600">Order not found</p>
//         <Link to="/orders" className="text-red-500 underline">
//           View Orders
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <Navbar />

//       <main className="flex-grow flex items-center justify-center py-12 pt-24">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8"
//         >
//           <div className="text-center">
//             <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
//             <h1 className="mt-4 text-3xl font-extrabold">
//               Order Successful!
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Your order has been placed successfully.
//             </p>
//           </div>

//           {/* ITEMS */}
//           <div className="my-8 divide-y">
//             {order.items.map((item) => (
//               <div key={item.productId} className="flex justify-between py-4">
//                 <div>
//                   <p className="font-semibold">{item.productName}</p>
//                   <p className="text-sm text-gray-500">
//                     Qty: {item.quantity}
//                   </p>
//                 </div>
//                 <p className="font-semibold">
//                   ₹{(item.price * item.quantity).toFixed(2)}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* TOTAL */}
//           <div className="border-t pt-4 flex justify-between text-xl font-bold">
//             <span>Total Paid</span>
//             <span>₹{order.totalAmount}</span>
//           </div>

//           {/* ACTIONS */}
//           <div className="flex gap-4 mt-8 justify-center">
//             <Link
//               to="/orders"
//               className="bg-gray-200 px-6 py-3 rounded-lg font-semibold"
//             >
//               View My Orders
//             </Link>
//             <Link
//               to="/product"
//               className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </motion.div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default OrderSuccess;





import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, ShoppingBag, Package, ChevronRight, FileText, Truck, Calendar } from "lucide-react";
import api from "../Api/Axios_Instance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function OrderSuccess() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const res = await api.get("/orders/My-Orders");
        const orders = res.data.data || [];

        if (orders.length === 0) {
          navigate("/orders");
          return;
        }

        // ✅ latest order (most recent)
        setOrder(orders[0]);
      } catch (err) {
        console.error("Failed to fetch order", err);
        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestOrder();
  }, [navigate]);

  // --- Animation Variants ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const drawCheck = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  // --- Helper to safely get ID ---
  const getOrderId = () => {
    const id = order?._id || order?.id;
    if (!id) return "CONFIRMED";
    return String(id).slice(-6).toUpperCase();
  };

  // --- Loading State UI ---
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400 font-medium tracking-widest text-xs uppercase animate-pulse">Verifying Order...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // --- Error/Empty State UI ---
  if (!order) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="text-center max-w-md w-full bg-white p-12 rounded-[2rem] shadow-2xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Order Not Found</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">We couldn't locate the details for this order. It may have been moved or deleted.</p>
            <Link
              to="/orders"
              className="w-full bg-black text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Browse Orders <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-24 px-4 sm:px-6 relative">
        {/* Premium Background Mesh Gradient */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-50/60 via-purple-50/40 to-transparent -z-10 pointer-events-none" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-emerald-50/50 to-transparent blur-3xl -z-10 pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          
          {/* LEFT COLUMN: Main Success Message */}
          <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-10 pt-4">
            
            {/* Animated Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-200 ring-8 ring-white">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <motion.path 
                  variants={drawCheck} 
                  d="M20 6L9 17l-5-5" 
                />
              </svg>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tighter leading-[1.1]">
                Order successfully <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">confirmed.</span>
              </h1>
              <p className="text-xl text-gray-500 font-light leading-relaxed max-w-lg">
                Your payment was successful. We are now preparing your package for shipment.
              </p>
            </div>

            {/* Status Timeline (Simplified) */}
            <div className="flex gap-6 pt-4 border-t border-gray-100">
               <div className="flex items-center gap-3">
                   <div className="p-2.5 bg-gray-100 rounded-full">
                       <FileText className="w-5 h-5 text-gray-600" />
                   </div>
                   <div className="text-sm">
                       <p className="font-semibold text-gray-900">Order #{getOrderId()}</p>
                       <p className="text-gray-500">Confirmed</p>
                   </div>
               </div>
               <div className="w-px h-10 bg-gray-200"></div>
               <div className="flex items-center gap-3">
                   <div className="p-2.5 bg-gray-100 rounded-full">
                       <Truck className="w-5 h-5 text-gray-600" />
                   </div>
                   <div className="text-sm">
                       <p className="font-semibold text-gray-900">Est. Delivery</p>
                       <p className="text-gray-500">3-5 Business Days</p>
                   </div>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                to="/product"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-base font-medium rounded-full overflow-hidden transition-all hover:bg-gray-800 hover:shadow-2xl hover:shadow-gray-900/20 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" /> Continue Shopping
                </span>
              </Link>
              <Link
                to="/orders"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 border border-gray-200 text-base font-medium rounded-full hover:bg-gray-50 transition-all hover:border-gray-300 active:scale-95"
              >
                Track Order
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: The "Premium Receipt" */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 relative">
            
            {/* Receipt Card Container */}
            <div className="relative bg-white shadow-2xl shadow-gray-200/50 rounded-t-3xl overflow-hidden w-full max-w-md mx-auto transform transition-transform hover:-translate-y-1 duration-300">
              
              {/* Receipt Header (Patterned) */}
              <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Receipt</p>
                        <h3 className="text-2xl font-bold tracking-tight">Payment Paid</h3>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Check className="w-5 h-5 text-emerald-400" />
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-4xl font-bold tracking-tight">₹{order.totalAmount}</p>
                </div>
              </div>

\              <div className="p-8 pb-12 bg-white relative">
                
\                <div className="space-y-6 mb-8">
                  {order.items?.map((item, index) => (
                    <div key={item.productId || index} className="flex items-start justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 text-gray-400">
                             <span className="text-xs font-bold">{item.quantity}x</span>
                         </div>
                         <div>
                             <p className="font-semibold text-gray-900 text-sm">{item.productName}</p>
                             <p className="text-xs text-gray-500 mt-0.5">Item Price: ₹{item.price}</p>
                         </div>
                      </div>
                      <p className="font-medium text-gray-900 text-sm">₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

\                <div className="border-t border-dashed border-gray-200 my-6"></div>

\                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Tax & Fees</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                </div>

\                <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {new Date().toLocaleDateString()}</span>
                        <span>VISA **** 4242</span>
                    </div>
                </div>
              </div>

\              <div 
                className="absolute bottom-0 left-0 w-full h-4 bg-white" 
                style={{ 
                    clipPath: "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)",
                    transform: "translateY(99%)"
                }}
              ></div>
            </div>
            
\            <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 blur-xl rounded-[50%] -z-10"></div>
          </motion.div>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default OrderSuccess;
