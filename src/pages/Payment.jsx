// import React, { useEffect, useState, useContext } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import api from "../Api/Axios_Instance";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const Payment = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [billingInfo, setBillingInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [totalAmount, setTotalAmount] = useState(0);

//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const buyNowItem = location.state?.buyNowItem || null;

//   const loadRazorpay = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };




//   useEffect(() => {
//     if (!user) return;

//     if (buyNowItem) {
//       setCartItems([
//         {...buyNowItem, imageUrl: buyNowItem.imageUrl || buyNowItem.image || "",},]);
//       return;
//     }

//     const fetchCart = async () => {
//       try {
//         const res = await api.get("/cart");
//         setCartItems(res.data.data || []);
//       } catch (err) {
//         console.error("Failed to fetch cart:", err);
//         toast.error("Failed to load cart");
//       }
//     };

//     fetchCart();
//   }, [user, buyNowItem]);


//  useEffect(() => {
//   const total = cartItems.reduce(
//     (acc, item) => acc + item.quantity * Number(item.price),
//     0
//   );
//   setTotalAmount(Math.round(total)); // ✅ NUMBER
// }, [cartItems]);

//   const handleInputChange = (e) =>
//     setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });



// const handlePayment = async () => {
//   const { name, phone, address } = billingInfo;

//   if (!name || !phone || !address) {
//     return toast.error("Please fill all billing details");
//   }

//   try {
//     const paymentRes = await api.post(
//       "/payments/razorpay/create-order",
//       { amount: totalAmount }
//     );

//     const { razorpayOrderId, amount } = paymentRes.data.data;

//     const loaded = await loadRazorpay();
//     if (!loaded) return toast.error("Razorpay SDK failed");

//     const options = {
//       key: "rzp_test_S4s58ea2F8PpWT",
//       amount: amount * 100,
//       currency: "INR",
//       name: "TekTrov",
//       description: "Order Payment",
//       order_id: razorpayOrderId,

//       handler: async function (response) {

//         let orderId;

//         if (buyNowItem) {
//           const res = await api.post("/orders/Direct Order", {
//             productId: buyNowItem.productId,
//             quantity: buyNowItem.quantity,
//             fullName: name,
//             phoneNumber: phone,
//             addressLine: address,
//             city: "NA",
//             state: "NA",
//             postalCode: "000000",
//             country: "India",
//           });
//           orderId = res.data.data;
//         } else {
//           const res = await api.post("/orders/Order-Inside-Cart", {
//             fullName: name,
//             phoneNumber: phone,
//             addressLine: address,
//             city: "NA",
//             state: "NA",
//             postalCode: "000000",
//             country: "India",
//           });
//           orderId = res.data.data;
//         }

//         toast.success("Payment successful!");
//         window.dispatchEvent(new Event("cartUpdated"));
//         navigate("/ordersuccess");
//       },

//       modal: {
//         ondismiss: function () {
//           toast.error("Payment cancelled");
//         }
//       },

//       theme: { color: "#facc15" },
//     };

//     new window.Razorpay(options).open();

//   } catch (err) {
//     console.error(err);
//     toast.error("Payment failed");
//   }
// };





//   const getProductImage = (item) => {
//     return item.imageUrl || item.image || "";
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-7xl mx-auto p-6 mt-16">
//         <Toaster position="top-right" />
//         <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
//           Checkout
//         </h2>
//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="flex-1 bg-white shadow-lg rounded-xl p-6 space-y-6">
//             <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">
//               Billing Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={billingInfo.name}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={billingInfo.email}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone Number"
//                 value={billingInfo.phone}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Address"
//                 value={billingInfo.address}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 p-3 rounded-lg col-span-1 md:col-span-2 focus:ring-2 focus:ring-yellow-500"
//               />
//             </div>
//             <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">
//               Payment Method
//             </h3>
//             <div className="flex flex-col gap-3">
//               {["card", "upi", "Cash On Delivery"].map((method) => (
//                 <label
//                   key={method}
//                   className="flex items-center gap-3 text-gray-700"
//                 >
//                   <input
//                     type="radio"
//                     value={method}
//                     checked={paymentMethod === method}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="accent-yellow-500"
//                   />
//                   {method === "card"
//                     ? "Credit / Debit Card"
//                     : method.charAt(0).toUpperCase() + method.slice(1)}
//                 </label>
//               ))}
//             </div>
//             <button
//               onClick={handlePayment}
//               className="w-full mt-4 bg-yellow-500 text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition-all shadow-md"
//             >
//               Pay ₹{totalAmount} Now
//             </button>
//           </div>
//           <div className="w-full md:w-2/5 bg-white shadow-lg rounded-xl p-6">
//             <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">
//               Order Summary
//             </h3>
//             <div className="space-y-4 mt-4">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.productId}
//                   className="flex justify-between items-center"
//                 >
//                   <div className="flex items-center gap-3">
//                     {getProductImage(item) ? (
//                       <img
//                         src={getProductImage(item)}
//                         alt={item.productName || "Product"}
//                         className="w-16 h-16 object-contain rounded"
//                       />
//                     ) : (
//                       <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-xs text-gray-400 rounded">
//                         No Image
//                       </div>
//                     )}

//                     <div>
//                       <p className="font-semibold text-gray-800">{item.productName}</p>
//                       <p className="text-sm text-gray-600">
//                         Qty: {item.quantity}
//                       </p>
//                     </div>
//                   </div>
//                   <span className="font-semibold text-gray-800">
//                     ₹
//                     {(
//                       item.quantity *
//                       parseFloat(String(item.price).replace(/[^\d.]/g, ""))
//                     ).toFixed(2)}
//                   </span>
//                 </div>
//               ))}
//               <div className="mt-4 border-t pt-4 font-bold text-lg flex justify-between">
//                 <span>Total:</span>
//                 <span>₹{totalAmount}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Payment;






import React, { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../Api/Axios_Instance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck,
  ShoppingBag,
  Check,
  ArrowRight,
  Truck,
  Info
} from "lucide-react";

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

  // --- Logic remains unchanged ---
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
      setCartItems([{ ...buyNowItem, imageUrl: buyNowItem.imageUrl || buyNowItem.image || "" }]);
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
    setTotalAmount(Math.round(total));
  }, [cartItems]);

  const handleInputChange = (e) =>
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });

  const handlePayment = async () => {
  const { name, phone, address } = billingInfo;

  if (!name || !phone || !address) {
    return toast.error("Please fill all billing details");
  }

  try {
    // ✅ CASH ON DELIVERY FLOW (NO RAZORPAY)
    if (paymentMethod === "Cash On Delivery") {
      if (buyNowItem) {
        await api.post("/orders/Direct Order", {
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
      } else {
        await api.post("/orders/Order-Inside-Cart", {
          fullName: name,
          phoneNumber: phone,
          addressLine: address,
          city: "NA",
          state: "NA",
          postalCode: "000000",
          country: "India",
        });
      }

      toast.success("Order placed successfully (Cash on Delivery)");
      window.dispatchEvent(new Event("cartUpdated"));
      navigate("/ordersuccess");
      return; // ⛔ STOP HERE — NO RAZORPAY
    }

    // ✅ ONLINE PAYMENT (RAZORPAY)
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
      handler: async function () {
        if (buyNowItem) {
          await api.post("/orders/Direct Order", {
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
        } else {
          await api.post("/orders/Order-Inside-Cart", {
            fullName: name,
            phoneNumber: phone,
            addressLine: address,
            city: "NA",
            state: "NA",
            postalCode: "000000",
            country: "India",
          });
        }

        toast.success("Payment successful!");
        window.dispatchEvent(new Event("cartUpdated"));
        navigate("/ordersuccess");
      },
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled");
        },
      },
      theme: { color: "#000000" },
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

  const formatPrice = (price) => {
    return parseFloat(String(price).replace(/[^\d.]/g, "")).toFixed(2);
  };

  return (
    <div className="bg-[#f2f4f6] min-h-screen flex flex-col font-sans selection:bg-yellow-100">
      <Navbar />
      
      <div className="flex-grow w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-16">
        <Toaster position="top-center" toastOptions={{ duration: 4000, style: { background: '#333', color: '#fff' } }} />
        
        <div className="mb-10 flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Checkout
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <span className="text-gray-400">Cart</span>
              <ArrowRight className="w-3 h-3 text-gray-300" />
              <span className="text-gray-900">Payment</span>
              <ArrowRight className="w-3 h-3 text-gray-300" />
              <span className="text-gray-400">Confirmation</span>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          <div className="flex-1 w-full space-y-8">
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 md:p-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-black scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-in-out"></div>
               
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black text-white text-xs font-bold">1</span>
                    Shipping Information
                  </h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Full Name</label>
                    <div className="relative group/input">
                       <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within/input:text-black transition-colors" />
                       <input
                         type="text"
                         name="name"
                         placeholder="e.g. Adarsh Sharma"
                         value={billingInfo.name}
                         onChange={handleInputChange}
                         className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-black focus:border-black outline-none transition-all"
                       />
                    </div>
                 </div>

                 {/* Email */}
                 <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Email Address</label>
                    <div className="relative group/input">
                       <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within/input:text-black transition-colors" />
                       <input
                         type="email"
                         name="email"
                         placeholder="name@example.com"
                         value={billingInfo.email}
                         onChange={handleInputChange}
                         className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-black focus:border-black outline-none transition-all"
                       />
                    </div>
                 </div>

                 {/* Phone */}
                 <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Phone Number</label>
                    <div className="relative group/input">
                       <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within/input:text-black transition-colors" />
                       <input
                         type="text"
                         name="phone"
                         placeholder="+91 90000 00000"
                         value={billingInfo.phone}
                         onChange={handleInputChange}
                         className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-black focus:border-black outline-none transition-all"
                       />
                    </div>
                 </div>

                 {/* Address */}
                 <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Delivery Address</label>
                    <div className="relative group/input">
                       <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within/input:text-black transition-colors" />
                       <input
                         type="text"
                         name="address"
                         placeholder="House No, Street, City, State, Pincode"
                         value={billingInfo.address}
                         onChange={handleInputChange}
                         className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-black focus:border-black outline-none transition-all"
                       />
                    </div>
                 </div>
               </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 md:p-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-black scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-in-out"></div>
               
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black text-white text-xs font-bold">2</span>
                    Payment Method
                  </h3>
                  <div className="flex gap-2">
                     <div className="h-6 w-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center"><CreditCard className="w-3 h-3 text-gray-400"/></div>
                     <div className="h-6 w-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center"><Smartphone className="w-3 h-3 text-gray-400"/></div>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: "card", label: "Credit/Debit", icon: <CreditCard className="w-5 h-5"/> },
                    { id: "upi", label: "UPI / GPay", icon: <Smartphone className="w-5 h-5"/> },
                    { id: "Cash On Delivery", label: "Cash on Delivery", icon: <Banknote className="w-5 h-5"/> }
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`
                        relative cursor-pointer rounded-xl p-5 border transition-all duration-200 flex flex-col items-center text-center gap-3
                        ${paymentMethod === method.id 
                          ? "border-black bg-gray-50 text-black shadow-sm" 
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 text-gray-500"}
                      `}
                    >
                      {paymentMethod === method.id && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-black rounded-full flex items-center justify-center">
                           <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <div className={`${paymentMethod === method.id ? "text-black" : "text-gray-400"}`}>
                        {method.icon}
                      </div>
                      <span className="text-sm font-semibold">{method.label}</span>
                    </div>
                  ))}
               </div>
               
               {/* Footer Action */}
               <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
                  <button
                    onClick={handlePayment}
                    className="w-full md:w-auto md:min-w-[300px] bg-black text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-gray-900 hover:scale-[1.01] active:scale-[0.98] transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3"
                  >
                    <Lock className="w-5 h-5 text-yellow-400" />
                    Pay ₹{totalAmount.toLocaleString('en-IN')}
                  </button>
                  <p className="mt-4 text-xs text-gray-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Payments are secure and encrypted.
                  </p>
               </div>
            </div>
          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className="w-full lg:w-[420px] lg:shrink-0">
             <div className="sticky top-24 space-y-6">
                
                {/* Receipt Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                   <div className="bg-gray-50/80 backdrop-blur px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" /> Order Summary
                      </h3>
                      <span className="text-xs font-medium bg-white px-2 py-1 rounded border shadow-sm">
                        {cartItems.length} items
                      </span>
                   </div>

                   <div className="p-6">
                      <div className="space-y-5 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.map((item) => (
                          <div key={item.productId} className="flex gap-4 group">
                            <div className="h-16 w-16 bg-gray-50 rounded-lg border border-gray-100 p-1 flex-shrink-0 group-hover:border-gray-300 transition-colors">
                               {getProductImage(item) ? (
                                  <img src={getProductImage(item)} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                               ) : (
                                  <div className="w-full h-full flex items-center justify-center"><ShoppingBag className="w-4 h-4 text-gray-300"/></div>
                               )}
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                               <p className="text-sm font-semibold text-gray-900 truncate pr-2">{item.productName}</p>
                               <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                            </div>
                            <div className="flex flex-col justify-center text-right">
                               <span className="text-sm font-bold text-gray-900">₹{(item.quantity * formatPrice(item.price)).toFixed(0)}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Calculations */}
                      <div className="mt-6 pt-6 border-t border-dashed border-gray-200 space-y-3">
                         <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                         </div>
                         <div className="flex justify-between text-sm text-gray-600">
                             <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5"/> Shipping</span>
                             <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-0.5 rounded">FREE</span>
                         </div>
                         <div className="flex justify-between text-sm text-gray-600">
                             <span className="flex items-center gap-1.5"><Info className="w-3.5 h-3.5"/> Taxes</span>
                             <span>₹0.00</span>
                         </div>
                      </div>

                      {/* Total */}
                      <div className="mt-6 pt-4 border-t border-gray-900 flex justify-between items-end">
                         <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Due</span>
                         </div>
                         <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            ₹{totalAmount.toLocaleString('en-IN')}
                         </div>
                      </div>
                   </div>
                </div>

                {/* Trust Badges Minimal */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white border border-gray-100 p-4 rounded-xl flex items-center gap-3 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                         <ShieldCheck className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-gray-900">Buyer Protection</p>
                         <p className="text-[10px] text-gray-500">Full refund if delayed</p>
                      </div>
                   </div>
                   <div className="bg-white border border-gray-100 p-4 rounded-xl flex items-center gap-3 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
                         <Lock className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-gray-900">Secure Checkout</p>
                         <p className="text-[10px] text-gray-500">256-bit Encryption</p>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;