
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



//   const updateCartCount = useCallback(async () => {
//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setCartCount(0); 
//     }

//     const res = await api.get("/cart");

//     let items = [];

//     if (Array.isArray(res.data)) {
//       items = res.data;
//     } else if (Array.isArray(res.data?.data)) {
//       items = res.data.data;
//     } else if (Array.isArray(res.data?.items)) {
//       items = res.data.items;
//     }

//     const total = items.reduce(
//       (acc, item) => acc + (item.quantity || item.Quantity || 1),
//       0
//     );

//     setCartCount(total);

//   } catch (err) {
//     console.error("Navbar cart error:", err);
//     setCartCount(0);
//   }
// }, []);


//   useEffect(() => {
//     updateCartCount();

//     window.addEventListener("cartUpdated", updateCartCount);

//     return () => {
//       window.removeEventListener("cartUpdated", updateCartCount);
//     };
//   }, [updateCartCount, user]);

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
//             {/* Logic: Only show badge if count > 0 */}
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
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
import { 
  Menu, 
  X, 
  User, 
  Heart, 
  ShoppingBag, 
  LogOut, 
  LogIn, 
  ChevronDown 
} from "lucide-react";
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

  // --- Logic remains unchanged ---
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
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* --- Logo --- */}
          <div 
            onClick={() => navigate("/")}
            className="flex-shrink-0 cursor-pointer group"
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              TekTrov
            </h1>
          </div>

          {/* --- Desktop Links --- */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.link;
              return (
                <button
                  key={link.id}
                  onClick={() => navigate(link.link)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 relative group py-2
                    ${isActive ? "text-red-600" : "text-gray-600 hover:text-red-500"}`}
                >
                  {link.name}
                  {/* Premium animated underline */}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 ease-out
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} 
                  />
                </button>
              );
            })}
          </div>

          {/* --- Right Section (Icons) --- */}
          <div className="flex items-center gap-5 sm:gap-6">
            
            {/* Wishlist */}
            <div
              className="relative cursor-pointer group"
              onClick={() => navigate("/wishlist")}
            >
              <Heart className={`w-6 h-6 transition-colors duration-300 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : 'text-gray-700 group-hover:text-red-500'}`} />
              
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </div>

            {/* Cart */}
            <div
              className="relative cursor-pointer group"
              onClick={() => navigate("/cart")}
            >
              <ShoppingBag className="w-6 h-6 text-gray-700 transition-colors duration-300 group-hover:text-red-500" />
              
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Separator for Desktop */}
            <div className="hidden sm:block h-6 w-px bg-gray-300 mx-1"></div>

            {/* Login / Profile */}
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            ) : (
              <div className="hidden sm:flex items-center relative">
                <button 
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 focus:outline-none group"
                >
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center border border-red-100 group-hover:border-red-200 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1 z-50"
                    >
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors"
                      >
                        <User className="w-4 h-4 mr-2" /> My Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate("/orders");
                          setDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" /> My Orders
                      </button>
                      <div className="h-px bg-gray-100 my-1"></div>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Drawer --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      navigate(link.link);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors
                      ${location.pathname === link.link
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-red-500"
                      }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              
              {/* Mobile Auth Actions */}
              <li className="pt-2 mt-2 border-t border-gray-100">
                 {!user ? (
                    <button
                      onClick={() => {
                        navigate("/login");
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium active:scale-95 transition-transform"
                    >
                      <LogIn className="w-4 h-4" /> Login
                    </button>
                 ) : (
                    <div className="space-y-2">
                      <button onClick={() => { navigate("/profile"); setMenuOpen(false); }} className="w-full flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                        <User className="w-4 h-4 mr-3" /> Profile
                      </button>
                       <button onClick={() => { navigate("/orders"); setMenuOpen(false); }} className="w-full flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                        <ShoppingBag className="w-4 h-4 mr-3" /> Orders
                      </button>
                      <button onClick={logout} className="w-full flex items-center px-4 py-3 rounded-lg text-red-500 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-3" /> Logout
                      </button>
                    </div>
                 )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;