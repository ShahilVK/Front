
import React, { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../Api/Axios_Instance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [billingInfo, setBillingInfo] = useState({ name: "", email: "", phone: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [totalAmount, setTotalAmount] = useState(0);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowItem = location.state?.buyNowItem || null;

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      try {
        const res = await api.get(`/users/${user.id}`);
        let cart = res.data.cart || [];
        // Add Buy Now item temporarily
        if (buyNowItem) {
          const exists = cart.find((item) => item.id === buyNowItem.id);
          cart = exists
            ? cart.map((item) =>
                item.id === buyNowItem.id
                  ? { ...item, quantity: item.quantity + buyNowItem.quantity }
                  : item
              )
            : [buyNowItem, ...cart];
        }
        setCartItems(cart);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
    fetchCart();
  }, [user, buyNowItem]);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.quantity * (parseFloat(String(item.price).replace(/[^\d.]/g, "")) || 0),
      0
    );
    setTotalAmount(total.toFixed(2));
  }, [cartItems]);

  const handleInputChange = (e) =>
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });

  const handlePayment = async () => {
    const { name, email, phone, address } = billingInfo;
    if (!name || !email || !phone || !address) {
      return toast.error("Please fill all billing details!");
    }
    if (cartItems.length === 0) {
      return toast.error("Your cart is empty!");
    }

    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);

    const newOrder = {
      id: uniqueId,
      date: new Date().toISOString(),
      items: cartItems,
      total: totalAmount,
      billing: billingInfo,
      paymentMethod,
      status: "Processing",
    };

    try {
      const userResponse = await api.get(`/users/${user.id}`);
      const existingOrders = userResponse.data.orders || [];
      const updatedOrders = [...existingOrders, newOrder];

      await api.patch(`/users/${user.id}`, {
        orders: updatedOrders,
        cart: [],
      });

      toast.success("Payment successful!");
      window.dispatchEvent(new CustomEvent("cartUpdated"));

      // ✅ Navigate and pass order via state
      navigate("/ordersuccess", { state: { order: newOrder } });
    } catch (error) {
      console.error("Failed to process payment:", error);
      toast.error("There was an issue placing your order.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 mt-16">
        <Toaster position="top-right" />
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Checkout</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Billing & Payment */}
          <div className="flex-1 bg-white shadow-lg rounded-xl p-6 space-y-6">
            <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">Billing Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Full Name" value={billingInfo.name} onChange={handleInputChange} className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"/>
              <input type="email" name="email" placeholder="Email Address" value={billingInfo.email} onChange={handleInputChange} className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"/>
              <input type="text" name="phone" placeholder="Phone Number" value={billingInfo.phone} onChange={handleInputChange} className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"/>
              <input type="text" name="address" placeholder="Address" value={billingInfo.address} onChange={handleInputChange} className="border border-gray-300 p-3 rounded-lg col-span-1 md:col-span-2 focus:ring-2 focus:ring-yellow-500"/>
            </div>
            <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">Payment Method</h3>
            <div className="flex flex-col gap-3">
              {["card", "upi", "Cash On Delivery"].map((method) => (
                <label key={method} className="flex items-center gap-3 text-gray-700">
                  <input type="radio" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-yellow-500"/>
                  {method === "card" ? "Credit / Debit Card" : method.charAt(0).toUpperCase() + method.slice(1)}
                </label>
              ))}
            </div>
            <button onClick={handlePayment} className="w-full mt-4 bg-yellow-500 text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition-all shadow-md">Pay ₹{totalAmount} Now</button>
          </div>
          {/* Order Summary */}
          <div className="w-full md:w-2/5 bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">Order Summary</h3>
            <div className="space-y-4 mt-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded"/>
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ₹{(item.quantity * parseFloat(String(item.price).replace(/[^\d.]/g, ""))).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="mt-4 border-t pt-4 font-bold text-lg flex justify-between">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;







