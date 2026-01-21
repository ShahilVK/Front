

// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import api from "../Api/Axios_Instance";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, Package, Check, UserCircle } from "lucide-react";

// /* ---------------- ORDER STATUS TRACKER ---------------- */
// const OrderStatusTracker = ({ status }) => {
//   const statuses = ["Processing", "Shipped", "Delivered"];
//   const currentStatusIndex = statuses.indexOf(status);



//   return (
//     <div className="flex justify-between items-center w-full px-4 pt-4">
//       {statuses.map((s, index) => {
//         const isActive = index <= currentStatusIndex;
//         return (
//           <React.Fragment key={s}>
//             <div className="flex flex-col items-center text-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
//                   isActive
//                     ? "bg-green-500 text-white"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 {index < currentStatusIndex ? (
//                   <Check size={18} />
//                 ) : (
//                   <Package size={18} />
//                 )}
//               </div>
//               <p
//                 className={`mt-2 text-xs font-semibold ${
//                   isActive ? "text-green-600" : "text-gray-500"
//                 }`}
//               >
//                 {s}
//               </p>
//             </div>
//             {index < statuses.length - 1 && (
//               <div
//                 className={`flex-1 h-1 mx-2 transition-all duration-300 ${
//                   isActive ? "bg-green-500" : "bg-gray-200"
//                 }`}
//               />
//             )}
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// };

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedOrderId, setExpandedOrderId] = useState(null);
//   const { user } = useAuth();

//   const [cancellingOrderId, setCancellingOrderId] = useState(null);


//   const API_BASE_URL = "https://localhost:7155";

//   const buildImageUrl = (url) => {
//     if (!url) return "/assets/no-image.png";
//     if (url.startsWith("http")) return url;
//     return `${API_BASE_URL}/${url.replace(/^\/+/, "")}`;
//   };


//   const handleCancelOrder = async (orderId) => {
//   if (!window.confirm("Are you sure you want to cancel this order?")) return;

//   try {
//     setCancellingOrderId(orderId);

//     await api.post(`/orders/${orderId}/cancel`);

//     setOrders(prev =>
//       prev.map(o =>
//         o.id === orderId ? { ...o, status: "Cancelled" } : o
//       )
//     );
//   } catch (err) {
//     alert(
//       err?.response?.data?.message ||
//       "Unable to cancel order"
//     );
//   } finally {
//     setCancellingOrderId(null);
//   }
// };


//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await api.get("/orders/My-Orders");

//         const ordersFromApi = response.data.data || [];

//         const normalizedOrders = ordersFromApi.map((order) => ({
//           id: order.id,
//           date: order.orderDate,
//           total: order.totalAmount,
//           status: order.status,
//           items: order.items.map((item) => ({
//             id: item.productId,
//             name: item.productName,
//             price: item.price,
//             quantity: item.quantity,
//             image: buildImageUrl(item.imageUrl),
//           })),
//         }));

//         setOrders(normalizedOrders);
//       } catch (error) {
//         console.error("Failed to fetch orders", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   if (loading) {
//     return <div className="text-center py-20">Loading your orders...</div>;
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen pt-10">
//       <Navbar />

//       <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         {/* HEADER */}
//         <div className="flex items-center gap-4 mb-8">
//           <UserCircle size={48} className="text-gray-500" />
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               {user?.name}'s Orders
//             </h1>
//             <p className="text-gray-600">{user?.email}</p>
//           </div>
//         </div>

//         {orders.length === 0 ? (
//           <div className="text-center bg-white p-10 rounded-lg shadow-md">
//             <p className="text-gray-600 mb-4">
//               You haven't placed any orders yet.
//             </p>
//             <Link
//               to="/product"
//               className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition font-semibold"
//             >
//               Start Shopping
//             </Link>
//           </div>
//         ) : (
//           <motion.div
//             className="space-y-4"
//             initial="hidden"
//             animate="visible"
//             variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
//           >
//             {[...orders] 
//             .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//             .map((order) => {
//               const isExpanded = expandedOrderId === order.id;
//               return (
//                 <motion.div
//                   key={order.id}
//                   className="bg-white rounded-lg shadow-md overflow-hidden"
//                   variants={{
//                     hidden: { opacity: 0, y: 20 },
//                     visible: { opacity: 1, y: 0 },
//                   }}
//                 >
//                   <div
//                     className="p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 border-b border-gray-200"
//                     onClick={() =>
//                       setExpandedOrderId(isExpanded ? null : order.id)
//                     }
//                   >
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="font-bold text-lg">
//                           Order{" "}
//                           <span className="text-yellow-600 uppercase">
//                             #{String(order.id).substring(0, 8)}
//                           </span>
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Placed on {formatDate(order.date)}
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <span className="font-bold text-xl text-gray-800">
//                           ₹{order.total}
//                         </span>
//                         <ChevronDown
//                           className={`transform transition-transform duration-300 ${
//                             isExpanded ? "rotate-180" : ""
//                           }`}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <AnimatePresence>
//                     {isExpanded && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         className="overflow-hidden"
//                       >
//                         <OrderStatusTracker status={order.status} />
//                         {order.status === "Pending" && (
//                           <div className="px-4 pt-3 flex justify-end">
//                             <button
//                               onClick={() => handleCancelOrder(order.id)}
//                               disabled={cancellingOrderId === order.id}
//                               className={`px-4 py-2 rounded-lg text-sm font-semibold transition
//         ${
//           cancellingOrderId === order.id
//             ? "bg-gray-300 cursor-not-allowed"
//             : "bg-red-500 hover:bg-red-600 text-white"
//         }`}
//                             >
//                               {cancellingOrderId === order.id
//                                 ? "Cancelling..."
//                                 : "Cancel Order"}
//                             </button>
//                           </div>
//                         )}

//                         <div className="p-4">
//                           <div className="space-y-4">
//                             {(order.items || []).map((item) => (
//                               <div
//                                 key={item.id}
//                                 className="flex items-start gap-4 p-2 rounded-lg"
//                               >
//                                 <img
//                                   src={item.image}
//                                   alt={item.name}
//                                   className="w-20 h-20 object-contain rounded border p-1"
//                                 />
//                                 <div className="flex-grow">
//                                   <p className="font-bold text-gray-800">
//                                     {item.name}
//                                   </p>
//                                   <p className="text-sm text-gray-500">
//                                     Qty: {item.quantity}
//                                   </p>
//                                   <p className="text-sm font-semibold text-gray-700">
//                                     ₹{item.price}
//                                   </p>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Orders;







import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../Api/Axios_Instance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Package, 
  Check, 
  ShoppingBag, 
  Calendar, 
  CreditCard,
  XCircle,
  AlertCircle,
  ArrowRight,
  Loader2,
  Receipt,
  HelpCircle,
  Clock,
  MapPin,
  Box,
  ShieldCheck,
  Truck // <--- Added this missing import
} from "lucide-react";

const transitionLuxury = { duration: 0.6, ease: [0.33, 1, 0.68, 1] };

const OrderStatusTracker = ({ status }) => {
  const statuses = ["Processing", "Shipped", "Delivered"];
  
  if (status === "Cancelled") {
    return (
      <div className="w-full p-1 rounded-2xl bg-gradient-to-b from-red-50 to-white border border-red-100 shadow-sm mb-8">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-red-50/50">
            <div className="bg-white p-2 rounded-full text-red-600 shadow-sm border border-red-100">
                <XCircle size={20} />
            </div>
            <div>
            <p className="text-sm font-bold text-red-900 tracking-tight">Order Terminated</p>
            <p className="text-xs text-red-700/80 font-medium">Refund processed to original payment method.</p>
            </div>
        </div>
      </div>
    );
  }

  const currentStatusIndex = statuses.indexOf(status);
  const activeIndex = currentStatusIndex === -1 ? 0 : currentStatusIndex; 

  return (
    <div className="w-full py-8">
      <div className="relative flex items-center justify-between px-2">
        <div className="absolute top-[15px] left-0 w-full h-[3px] bg-gray-100 rounded-full overflow-hidden">
             <div className="w-full h-full bg-gray-200/50" />
        </div>
        
        <motion.div 
          className="absolute top-[15px] left-0 h-[3px] bg-gradient-to-r from-gray-900 to-gray-700 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          initial={{ width: 0 }}
          animate={{ width: `${(activeIndex / (statuses.length - 1)) * 100}%` }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
        />

        {statuses.map((s, index) => {
          const isCompleted = index <= activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <div key={s} className="relative flex flex-col items-center z-10 group cursor-default">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isCompleted ? "#18181B" : "#FFFFFF", // Zinc-900 vs White
                  borderColor: isCompleted ? "#18181B" : "#E4E4E7"
                }}
                transition={{ duration: 0.4 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center border-[2px] shadow-sm ${isCompleted ? 'shadow-gray-300' : ''}`}
              >
                {isCompleted && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Check size={14} strokeWidth={3} className="text-white" />
                  </motion.div>
                )}
              </motion.div>
              
              <div className="absolute top-10 flex flex-col items-center">
                 <p className={`text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-500 ${isCompleted ? "text-gray-900" : "text-gray-400"}`}>
                  {s}
                </p>
                {isCurrent && (
                    <motion.span 
                        layoutId="pulse-dot"
                        className="mt-1 w-1 h-1 rounded-full bg-emerald-500"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Delivered: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100", dot: "bg-emerald-500" },
    Shipped: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100", dot: "bg-blue-500" },
    Processing: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100", dot: "bg-amber-500" },
    Pending: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400" },
    Cancelled: { bg: "bg-red-50", text: "text-red-700", border: "border-red-100", dot: "bg-red-500" },
  };

  const style = styles[status] || styles.Pending;

  return (
    <div className={`pl-2 pr-3 py-1 rounded-full border ${style.bg} ${style.border} inline-flex items-center gap-2 shadow-sm`}>
      <span className="relative flex h-2 w-2">
        {status !== 'Delivered' && status !== 'Cancelled' && (
             <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.dot}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${style.dot}`}></span>
      </span>
      <span className={`text-[10px] font-bold uppercase tracking-widest ${style.text}`}>{status}</span>
    </div>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  
  const { user } = useAuth();
  const API_BASE_URL = "https://localhost:7155";

  const buildImageUrl = (url) => {
    if (!url) return "/assets/no-image.png";
    if (url.startsWith("http")) return url;
    return `${API_BASE_URL}/${url.replace(/^\/+/, "")}`;
  };

  const handleCancelOrder = async (orderId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setCancellingOrderId(orderId);
      await api.post(`/orders/${orderId}/cancel`);
      setOrders(prev =>
        prev.map(o => o.id === orderId ? { ...o, status: "Cancelled" } : o)
      );
    } catch (err) {
      alert(err?.response?.data?.message || "Unable to cancel order");
    } finally {
      setCancellingOrderId(null);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders/My-Orders");
        const ordersFromApi = response.data.data || [];
        const normalizedOrders = ordersFromApi.map((order) => ({
          id: order.id,
          date: order.orderDate,
          total: order.totalAmount,
          status: order.status,
          items: order.items.map((item) => ({
            id: item.productId,
            name: item.productName,
            price: item.price,
            quantity: item.quantity,
            image: buildImageUrl(item.imageUrl),
          })),
        }));
        setOrders(normalizedOrders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6 p-4 bg-white rounded-2xl shadow-xl shadow-gray-200 border border-gray-100"
            >
                <Package size={32} className="text-gray-900" strokeWidth={1.5} />
            </motion.div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">Loading Secure Data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex flex-col font-sans text-slate-900 selection:bg-slate-900 selection:text-white relative">
      {/* Subtle Texture Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} 
      />

      <Navbar />

      <div className="flex-grow w-full max-w-6xl mx-auto py-16 px-4 sm:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Order History</h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base font-medium">
              Manage your transactions and track your deliveries.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-white px-5 py-2.5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
                 <div className="bg-gray-100 p-1.5 rounded-lg">
                    <Box size={14} className="text-gray-600" />
                 </div>
                 <span className="text-sm font-semibold text-gray-700">
                    {orders.length} <span className="text-gray-400 font-normal">Orders</span>
                 </span>
             </div>
          </div>
        </div>

        {/* ORDERS LIST */}
        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionLuxury}
            className="bg-white rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-100/50 p-20 text-center"
          >
            <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-gray-100">
              <ShoppingBag size={28} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">No orders found</h3>
            <p className="text-sm text-gray-500 mt-2 mb-8 max-w-xs mx-auto">Your purchase history is empty. Start shopping to populate your dashboard.</p>
            <Link
              to="/product"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 active:scale-95"
            >
              Start Shopping <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {[...orders]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((order) => {
                const isExpanded = expandedOrderId === order.id;
                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={transitionLuxury}
                    className={`bg-white rounded-2xl border overflow-hidden transition-all duration-500 ease-out ${
                      isExpanded 
                        ? "border-gray-300 shadow-2xl shadow-gray-200/50 ring-1 ring-black/5" 
                        : "border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300"
                    }`}
                  >
                    {/* CARD HEADER */}
                    <div
                      className="p-6 md:p-8 cursor-pointer relative"
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                    >
                      {/* Active Indicator Strip */}
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: isExpanded ? "100%" : "0%" }}
                        className="absolute left-0 top-0 w-1.5 bg-gray-900"
                      />

                      <div className="flex flex-col md:flex-row md:items-center gap-8">
                        
                        {/* Icon */}
                        <div className="hidden md:flex w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 items-center justify-center text-gray-600 shadow-sm">
                           {order.status === 'Delivered' ? <Package size={24} strokeWidth={1.5} /> : <Truck size={24} strokeWidth={1.5} />}
                        </div>

                        {/* Order Info Grid */}
                        <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 items-center">
                           <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Order ID</p>
                              <p className="text-base font-bold text-gray-900 font-mono tracking-tight">#{String(order.id).substring(0, 8)}</p>
                           </div>
                           
                           <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Date</p>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-gray-700">{formatDate(order.date)}</p>
                              </div>
                           </div>

                           <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Total</p>
                              <p className="text-base font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
                           </div>

                           <div className="flex items-center justify-between md:justify-start gap-4">
                              <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 md:hidden">Status</p>
                                <StatusBadge status={order.status} />
                              </div>
                              <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 md:hidden ${isExpanded ? "rotate-180" : ""}`} />
                           </div>
                        </div>

                        {/* Desktop Chevron */}
                        <div className="hidden md:block">
                           <div className={`p-3 rounded-xl border border-transparent transition-all duration-300 ${isExpanded ? "bg-gray-100 border-gray-200" : "bg-white hover:bg-gray-50"}`}>
                              <ChevronDown size={18} className={`transition-transform duration-500 text-gray-500 ${isExpanded ? "rotate-180 text-gray-900" : ""}`} />
                           </div>
                        </div>

                      </div>
                    </div>

                    {/* EXPANDABLE DETAILS */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={transitionLuxury}
                          className="border-t border-gray-100 bg-gray-50/50 backdrop-blur-xl"
                        >
                          <div className="p-6 md:p-8">
                            
                            {/* Tracker */}
                            <div className="mb-10 max-w-4xl mx-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                        <Clock size={14} className="text-gray-400" /> Timeline
                                    </h4>
                                </div>
                                <OrderStatusTracker status={order.status} />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                {/* Items Table */}
                                <div className="lg:col-span-2">
                                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Order Items</h4>
                                            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md">{order.items.length} ITEMS</span>
                                        </div>
                                        <div className="divide-y divide-gray-50">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="p-5 flex items-center gap-5 hover:bg-gray-50/50 transition-colors">
                                                    <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 p-2 flex-shrink-0 shadow-sm flex items-center justify-center">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <p className="text-sm font-bold text-gray-900 truncate mb-1">{item.name}</p>
                                                        <p className="text-xs text-gray-500 font-medium">Quantity: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar / Actions */}
                                <div className="space-y-6">
                                    {/* Payment Card */}
                                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl shadow-gray-900/10 relative overflow-hidden">
                                        {/* Decorative gloss */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-[0.03] rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none" />
                                        
                                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Method</h4>
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className="bg-white/10 p-1.5 rounded-md backdrop-blur-sm">
                                                <CreditCard size={16} className="text-white" />
                                            </div>
                                            <span className="text-sm font-medium">Credit Card</span>
                                        </div>
                                        <p className="text-xs text-gray-400 font-mono pl-10">•••• •••• •••• 4242</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-3">
                                        <button className="flex items-center justify-center gap-3 w-full bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-[0.98]">
                                            <Receipt size={16} className="text-gray-400" /> Download Invoice
                                        </button>
                                        <button className="flex items-center justify-center gap-3 w-full bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-[0.98]">
                                            <HelpCircle size={16} className="text-gray-400" /> Support
                                        </button>
                                        
                                        {order.status === "Pending" && (
                                            <button
                                                onClick={(e) => handleCancelOrder(order.id, e)}
                                                disabled={cancellingOrderId === order.id}
                                                className={`flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-[0.98] mt-2
                                                    ${cancellingOrderId === order.id 
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" 
                                                        : "bg-white border border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 hover:shadow-red-100/50"
                                                    }
                                                `}
                                            >
                                                {cancellingOrderId === order.id ? <Loader2 size={16} className="animate-spin" /> : "Cancel Order"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;