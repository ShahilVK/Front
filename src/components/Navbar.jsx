
// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Menu, X, User } from "lucide-react";
// import { AuthContext } from "../context/AuthContext";
// import { useWishlist } from "../context/WishlistContext";
// import api from "../Api/Axios_Instance";
// import { AnimatePresence, motion } from "framer-motion";

// const navLinks = [
//   { id: 1, name: "Home", link: "/" },
//   { id: 2, name: "Shop", link: "/product" },
//   { id: 3, name: "About", link: "/about" },
//   { id: 4, name: "Contact", link: "/contact" },
// ];

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ get current path
//   const { user, logout } = useContext(AuthContext);
//   const { wishlist } = useWishlist();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Fetch cart count from DB
//   useEffect(() => {
//     const fetchCartCount = async () => {
//       if (user) {
//         try {
//           const res = await api.get("/users/My Profile");
//           setCartCount(res.data.data.cart?.length || 0);
//         } catch (err) {
//           console.error(err);
//         }
//       } else {
//         setCartCount(0);
//       }
//     };

//     fetchCartCount();
//     window.addEventListener("cartUpdated", fetchCartCount);
//     return () => window.removeEventListener("cartUpdated", fetchCartCount);
//   }, [user]);

//   return (
//     <nav className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-md shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <h1
//           onClick={() => navigate("/")}
//           className="text-2xl sm:text-3xl font-bold text-red-500 cursor-pointer hover:scale-105 transition duration-200"
//         >
//           TekTrov
//         </h1>

//         {/* Desktop Links */}
//         <div className="hidden lg:flex gap-6">
//           {navLinks.map((link) => {
//             const isActive = location.pathname === link.link;
//             return (
//               <button
//                 key={link.id}
//                 onClick={() => navigate(link.link)}
//                 className={`relative font-semibold transition-all duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 after:rounded-full after:transition-all after:duration-300 
//                   ${isActive ? "text-red-500 after:w-full" : "text-gray-800 hover:text-red-500 hover:after:w-full"}`}
//               >
//                 {link.name}
//               </button>
//             );
//           })}
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4 sm:gap-6 relative">
//           {/* Wishlist */}
//           <div
//             className="relative cursor-pointer"
//             onClick={() => navigate("/wishlist")}
//           >
//             <img
//               className="w-6 sm:w-7 hover:animate-bounce"
//               src="/assets/love1.svg"
//               alt="Wishlist"
//             />
//             {wishlist.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
//                 {wishlist.length}
//               </span>
//             )}
//           </div>

//           {/* Cart */}
//           <div
//             className="relative cursor-pointer"
//             onClick={() => navigate("/cart")}
//           >
//             <img
//               className="w-6 sm:w-7 hover:animate-bounce"
//               src="/assets/cart.svg"
//               alt="Cart"
//             />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
//                 {cartCount}
//               </span>
//             )}
//           </div>

//           {/* Login/Profile */}
//           {!user ? (
//             <img
//               onClick={() => navigate("/login")}
//               className="w-6 sm:w-8 cursor-pointer hover:scale-110 transition duration-200"
//               src="/assets/login.svg"
//               alt="Login"
//             />
//           ) : (
//             <div className="hidden sm:flex items-center gap-3 relative">
//               {/* User Icon with Dropdown */}
//               <div className="relative">
//                 <User
//                   onClick={() => setDropdownOpen((prev) => !prev)}
//                   className="w-6 h-6 text-gray-700 cursor-pointer hover:text-red-500 transition duration-200"
//                 />
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50">
//                     <button
//                       onClick={() => {
//                         navigate("/profile");
//                         setDropdownOpen(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
//                     >
//                       My Profile
//                     </button>
//                     <button
//                       onClick={() => {
//                         navigate("/orders");
//                         setDropdownOpen(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
//                     >
//                       My Orders
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Logout */}
//               <button
//                 onClick={logout}
//                 className="px-3 sm:px-4 py-1 sm:py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
//               >
//                 Logout
//               </button>
//             </div>
//           )}

//           {/* Mobile Menu Icon */}
//           <button
//             className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition duration-200"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg overflow-hidden"
//           >
//             <ul className="flex flex-col items-center gap-2 py-4">
//               {navLinks.map((link) => (
//                 <li key={link.id}>
//                   <button
//                     onClick={() => {
//                       navigate(link.link);
//                       setMenuOpen(false);
//                     }}
//                     className={`block px-4 py-2 font-semibold transition duration-200 ${
//                       location.pathname === link.link
//                         ? "text-red-500"
//                         : "text-gray-800 hover:text-red-500"
//                     }`}
//                   >
//                     {link.name}
//                   </button>
//                 </li>
//               ))}

//               {/* Profile/Orders/Logout buttons for mobile */}
//               {user && (
//                 <li className="sm:hidden flex flex-col items-center gap-2 pt-4 w-full px-6">
//                   <button
//                     onClick={() => {
//                       navigate("/profile");
//                       setMenuOpen(false);
//                     }}
//                     className="w-full px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg"
//                   >
//                     My Profile
//                   </button>
//                   <button
//                     onClick={() => {
//                       navigate("/orders");
//                       setMenuOpen(false);
//                     }}
//                     className="w-full px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg"
//                   >
//                     My Orders
//                   </button>
//                   <button
//                     onClick={() => {
//                       logout();
//                       setMenuOpen(false);
//                     }}
//                     className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               )}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

// export default Navbar;



// import React, { useState, useContext, useEffect, useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Menu, X, User } from "lucide-react";
// import { AuthContext } from "../context/AuthContext";
// import { useWishlist } from "../context/WishlistContext";
// import api from "../Api/Axios_Instance";
// import { AnimatePresence, motion } from "framer-motion";

// const navLinks = [
//   { id: 1, name: "Home", link: "/" },
//   { id: 2, name: "Shop", link: "/product" },
//   { id: 3, name: "About", link: "/about" },
//   { id: 4, name: "Contact", link: "/contact" },
// ];

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout } = useContext(AuthContext);
//   const { wishlist } = useWishlist();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // ✅ PRO FIX: Defined as a useCallback to prevent memory leaks/loops
//   const updateCartCount = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setCartCount(0);
//         return;
//       }

//       const res = await api.get("/cart");
      
//       // Handle different backend response structures safely
//       const items = res.data?.data || res.data || [];
      
//       if (!Array.isArray(items)) {
//         setCartCount(0);
//         return;
//       }

//       const totalQty = items.reduce(
//         (sum, item) => sum + (item.quantity || 1),
//         0
//       );

//       console.log("🛒 Navbar Updated: ", totalQty); // Check Console F12
//       setCartCount(totalQty);
//     } catch (err) {
//       console.error("Navbar Cart Error:", err);
//     }
//   }, []);

//   useEffect(() => {
//     // 1. Initial Fetch
//     updateCartCount();

//     // 2. Listen for 'cartUpdated' event (Dispatched from Cart/Product pages)
//     window.addEventListener("cartUpdated", updateCartCount);

//     // 3. Cleanup listener
//     return () => {
//       window.removeEventListener("cartUpdated", updateCartCount);
//     };
//   }, [updateCartCount, user]); // Re-run if User changes

//   return (
//     <nav className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-md shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <h1
//           onClick={() => navigate("/")}
//           className="text-2xl sm:text-3xl font-bold text-red-500 cursor-pointer hover:scale-105 transition duration-200"
//         >
//           TekTrov
//         </h1>

//         {/* Desktop Links */}
//         <div className="hidden lg:flex gap-6">
//           {navLinks.map((link) => {
//             const isActive = location.pathname === link.link;
//             return (
//               <button
//                 key={link.id}
//                 onClick={() => navigate(link.link)}
//                 className={`relative font-semibold transition-all duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 after:rounded-full after:transition-all after:duration-300 
//                   ${
//                     isActive
//                       ? "text-red-500 after:w-full"
//                       : "text-gray-800 hover:text-red-500 hover:after:w-full"
//                   }`}
//               >
//                 {link.name}
//               </button>
//             );
//           })}
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4 sm:gap-6 relative">
//           {/* Wishlist */}
//           <div
//             className="relative cursor-pointer"
//             onClick={() => navigate("/wishlist")}
//           >
//             <img
//               className="w-6 sm:w-7 hover:animate-bounce"
//               src="/assets/love1.svg"
//               alt="Wishlist"
//             />
//             {wishlist.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
//                 {wishlist.length}
//               </span>
//             )}
//           </div>

//           {/* Cart Icon */}
//           <div
//             className="relative cursor-pointer"
//             onClick={() => navigate("/cart")}
//           >
//             <img
//               className="w-6 sm:w-7 hover:animate-bounce"
//               src="/assets/cart.svg"
//               alt="Cart"
//             />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
//                 {cartCount}
//               </span>
//             )}
//           </div>

//           {/* Login/Profile */}
//           {!user ? (
//             <img
//               onClick={() => navigate("/login")}
//               className="w-6 sm:w-8 cursor-pointer hover:scale-110 transition duration-200"
//               src="/assets/login.svg"
//               alt="Login"
//             />
//           ) : (
//             <div className="hidden sm:flex items-center gap-3 relative">
//               <div className="relative">
//                 <User
//                   onClick={() => setDropdownOpen((prev) => !prev)}
//                   className="w-6 h-6 text-gray-700 cursor-pointer hover:text-red-500 transition duration-200"
//                 />
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50">
//                     <button
//                       onClick={() => {
//                         navigate("/profile");
//                         setDropdownOpen(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
//                     >
//                       My Profile
//                     </button>
//                     <button
//                       onClick={() => {
//                         navigate("/orders");
//                         setDropdownOpen(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
//                     >
//                       My Orders
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <button
//                 onClick={logout}
//                 className="px-3 sm:px-4 py-1 sm:py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
//               >
//                 Logout
//               </button>
//             </div>
//           )}

//           {/* Mobile Menu Icon */}
//           <button
//             className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition duration-200"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg overflow-hidden"
//           >
//             <ul className="flex flex-col items-center gap-2 py-4">
//               {navLinks.map((link) => (
//                 <li key={link.id}>
//                   <button
//                     onClick={() => {
//                       navigate(link.link);
//                       setMenuOpen(false);
//                     }}
//                     className={`block px-4 py-2 font-semibold transition duration-200 ${
//                       location.pathname === link.link
//                         ? "text-red-500"
//                         : "text-gray-800 hover:text-red-500"
//                     }`}
//                   >
//                     {link.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import api from "../Api/Axios_Instance";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Shop", link: "/product" },
  { id: 3, name: "About", link: "/about" },
  { id: 4, name: "Contact", link: "/contact" },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const { wishlist } = useWishlist();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);



  const updateCartCount = useCallback(async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartCount(0); 
    }

    const res = await api.get("/cart");

    let items = [];

    if (Array.isArray(res.data)) {
      items = res.data;
    } else if (Array.isArray(res.data?.data)) {
      items = res.data.data;
    } else if (Array.isArray(res.data?.items)) {
      items = res.data.items;
    }

    const total = items.reduce(
      (acc, item) => acc + (item.quantity || item.Quantity || 1),
      0
    );

    setCartCount(total);

  } catch (err) {
    console.error("Navbar cart error:", err);
    setCartCount(0);
  }
}, []);


  useEffect(() => {
    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [updateCartCount, user]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl sm:text-3xl font-bold text-red-500 cursor-pointer hover:scale-105 transition duration-200"
        >
          TekTrov
        </h1>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.link;
            return (
              <button
                key={link.id}
                onClick={() => navigate(link.link)}
                className={`relative font-semibold transition-all duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 after:rounded-full after:transition-all after:duration-300 
                  ${
                    isActive
                      ? "text-red-500 after:w-full"
                      : "text-gray-800 hover:text-red-500 hover:after:w-full"
                  }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6 relative">
          {/* Wishlist */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/wishlist")}
          >
            <img
              className="w-6 sm:w-7 hover:animate-bounce"
              src="/assets/love1.svg"
              alt="Wishlist"
            />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <img
              className="w-6 sm:w-7 hover:animate-bounce"
              src="/assets/cart.svg"
              alt="Cart"
            />
            {/* Logic: Only show badge if count > 0 */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </div>

          {/* Login/Profile */}
          {!user ? (
            <img
              onClick={() => navigate("/login")}
              className="w-6 sm:w-8 cursor-pointer hover:scale-110 transition duration-200"
              src="/assets/login.svg"
              alt="Login"
            />
          ) : (
            <div className="hidden sm:flex items-center gap-3 relative">
              <div className="relative">
                <User
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-6 h-6 text-gray-700 cursor-pointer hover:text-red-500 transition duration-200"
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/orders");
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      My Orders
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={logout}
                className="px-3 sm:px-4 py-1 sm:py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-2 py-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      navigate(link.link);
                      setMenuOpen(false);
                    }}
                    className={`block px-4 py-2 font-semibold transition duration-200 ${
                      location.pathname === link.link
                        ? "text-red-500"
                        : "text-gray-800 hover:text-red-500"
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;