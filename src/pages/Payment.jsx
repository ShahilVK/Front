import React, { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../Api/Axios_Instance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [totalAmount, setTotalAmount] = useState(0);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowItem = location.state?.buyNowItem || null;

  const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};




  useEffect(() => {
    if (!user) return;

    if (buyNowItem) {
      setCartItems([
        {...buyNowItem, imageUrl: buyNowItem.imageUrl || buyNowItem.image || "",},]);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        setCartItems(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        toast.error("Failed to load cart");
      }
    };

    fetchCart();
  }, [user, buyNowItem]);


 useEffect(() => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * Number(item.price),
    0
  );
  setTotalAmount(Math.round(total)); // ✅ NUMBER
}, [cartItems]);

  const handleInputChange = (e) =>
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });



const handlePayment = async () => {
  const { name, phone, address } = billingInfo;

  if (!name || !phone || !address) {
    return toast.error("Please fill all billing details");
  }

  try {
    const paymentRes = await api.post(
      "/payments/razorpay/create-order",
      { amount: totalAmount }
    );

    const { razorpayOrderId, amount } = paymentRes.data.data;

    const loaded = await loadRazorpay();
    if (!loaded) return toast.error("Razorpay SDK failed");

    const options = {
      key: "rzp_test_S4s58ea2F8PpWT",
      amount: amount * 100,
      currency: "INR",
      name: "TekTrov",
      description: "Order Payment",
      order_id: razorpayOrderId,

      handler: async function (response) {

        let orderId;

        if (buyNowItem) {
          const res = await api.post("/orders/Direct Order", {
            productId: buyNowItem.productId,
            quantity: buyNowItem.quantity,
            fullName: name,
            phoneNumber: phone,
            addressLine: address,
            city: "NA",
            state: "NA",
            postalCode: "000000",
            country: "India",
          });
          orderId = res.data.data;
        } else {
          const res = await api.post("/orders/Order-Inside-Cart", {
            fullName: name,
            phoneNumber: phone,
            addressLine: address,
            city: "NA",
            state: "NA",
            postalCode: "000000",
            country: "India",
          });
          orderId = res.data.data;
        }

        toast.success("Payment successful!");
        window.dispatchEvent(new Event("cartUpdated"));
        navigate("/ordersuccess");
      },

      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled");
        }
      },

      theme: { color: "#facc15" },
    };

    new window.Razorpay(options).open();

  } catch (err) {
    console.error(err);
    toast.error("Payment failed");
  }
};





  const getProductImage = (item) => {
    return item.imageUrl || item.image || "";
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 mt-16">
        <Toaster position="top-right" />
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Checkout
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white shadow-lg rounded-xl p-6 space-y-6">
            <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">
              Billing Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={billingInfo.name}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={billingInfo.email}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={billingInfo.phone}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={billingInfo.address}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg col-span-1 md:col-span-2 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">
              Payment Method
            </h3>
            <div className="flex flex-col gap-3">
              {["card", "upi", "Cash On Delivery"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <input
                    type="radio"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-yellow-500"
                  />
                  {method === "card"
                    ? "Credit / Debit Card"
                    : method.charAt(0).toUpperCase() + method.slice(1)}
                </label>
              ))}
            </div>
            <button
              onClick={handlePayment}
              className="w-full mt-4 bg-yellow-500 text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition-all shadow-md"
            >
              Pay ₹{totalAmount} Now
            </button>
          </div>
          <div className="w-full md:w-2/5 bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">
              Order Summary
            </h3>
            <div className="space-y-4 mt-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    {getProductImage(item) ? (
                      <img
                        src={getProductImage(item)}
                        alt={item.productName || "Product"}
                        className="w-16 h-16 object-contain rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-xs text-gray-400 rounded">
                        No Image
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-gray-800">{item.productName}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ₹
                    {(
                      item.quantity *
                      parseFloat(String(item.price).replace(/[^\d.]/g, ""))
                    ).toFixed(2)}
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
