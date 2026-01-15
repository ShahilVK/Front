

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./components/Orders"; 
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./Admin/Dashboard";


// Import Components and Hooks
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import AdminProducts from "./Admin/AdminProducts";
import AdminOrders from "./Admin/AdminOrders";
import AdminUsers from "./Admin/Adminusers";
import { AdminSettings } from "./Admin/AdminSettings";
import TopProducts from "./pages/TopProducts";

// --- Route Guards ---

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== "Admin") {
    return <Navigate to="/" />;
  }
  return children;
};


function App() {
  return (
   
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />


        {/* --- Authenticated User Routes --- */}
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/ordersuccess" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} /> {/* <-- 2. ADD THE NEW ROUTE */}
         <Route path="/product/:id" element={<Product />} />
        

        {/* --- Admin Dashboard Route --- */}
        <Route path="/dashboard/*" element={ <AdminRoute> <Dashboard /> </AdminRoute> } />
        <Route path="/adminproducts" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/adminorders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/adminusers" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/adminsettings" element={<AdminRoute><AdminSettings /></AdminRoute>} />

        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;



















