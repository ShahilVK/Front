

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../Api/Axios_Instance';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import { ChevronDown, Package, Check, UserCircle } from 'lucide-react'; // For icons

// A visual component to track order status
const OrderStatusTracker = ({ status }) => {
  const statuses = ['Processing', 'Shipped', 'Delivered'];
  const currentStatusIndex = statuses.indexOf(status);

  return (
    <div className="flex justify-between items-center w-full px-4 pt-4">
      {statuses.map((s, index) => {
        const isActive = index <= currentStatusIndex;
        return (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStatusIndex ? <Check size={18} /> : <Package size={18} />}
              </div>
              <p className={`mt-2 text-xs font-semibold ${isActive ? 'text-green-600' : 'text-gray-500'}`}>{s}</p>
            </div>
            {index < statuses.length - 1 && (
              <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${isActive ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.id) {
      const fetchOrders = async () => {
        try {
          const response = await api.get(`/users/${user.id}`);
          const userOrders = (response.data.orders || []).map(order => ({
            ...order,
            status: ['Processing', 'Shipped', 'Delivered'][Math.floor(Math.random() * 3)],
          }));
          setOrders(userOrders.slice().reverse());
        } catch (error) {
          console.error("Failed to fetch orders", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  if (loading) {
    return <div className="text-center py-20">Loading your orders...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-10">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* ✨ New Feature: Personalized header with User Name and Email */}
        <div className="flex items-center gap-4 mb-8">
            <UserCircle size={48} className="text-gray-500" />
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    {user?.name}'s Orders
                </h1>
                <p className="text-gray-600">{user?.email}</p>
            </div>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
            <Link to="/product" className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition font-semibold">
              Start Shopping
            </Link>
          </div>
        ) : (
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              return (
                <motion.div 
                  key={order.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <div 
                    className="p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 border-b border-gray-200"
                    onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-lg">Order <span className="text-yellow-600 uppercase">#{order.id.substring(0, 8)}</span></p>
                        <p className="text-sm text-gray-500">Placed on {formatDate(order.date)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="font-bold text-xl text-gray-800">₹{order.total}</span>
                         <ChevronDown className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <OrderStatusTracker status={order.status} />
                        <div className="p-4">
                          {/* ✨ New Feature: Clear display of product image and details */}
                          <div className="space-y-4">
                            {(order.items || []).map((item) => (
                              <div key={item.id} className="flex items-start gap-4 p-2 rounded-lg">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded border p-1" />
                                <div className="flex-grow">
                                  <p className="font-bold text-gray-800">{item.name}</p>
                                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  <p className="text-sm font-semibold text-gray-700">₹{item.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;