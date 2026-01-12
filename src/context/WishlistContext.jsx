
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../Api/Axios_Instance";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();


// useEffect(() => {
//   const fetchWishlist = async () => {
//     if (!user) {
//       setWishlist([]);
//       return;
//     }

//     try {
//       const res = await api.get("/wishlist");
//       const data = res.data.data || [];

//       // ✅ NORMALIZE BACKEND DATA
//       const normalized = data.map((item) => ({
//         id: item.productId,            // 🔥 IMPORTANT
//         productId: item.productId,
//         productName: item.productName,
//         price: item.price,
//         stock: item.stock,
//         imageUrl: item.imageUrl,
//       }));

//       setWishlist(normalized);
//     } catch (err) {
//       console.error("Failed to fetch wishlist:", err);
//       setWishlist([]);
//     }
//   };

//   fetchWishlist();
// }, [user]);

useEffect(() => {
  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      return;
    }

    try {
      const res = await api.get("/wishlist");
      const wishlistItems = res.data.data || [];

      // 🔥 FETCH REAL STOCK FOR EACH PRODUCT
      const withStock = await Promise.all(
        wishlistItems.map(async (item) => {
          try {
            const productRes = await api.get(`/products/${item.productId}`);

            return {
              id: item.productId,
              productId: item.productId,
              productName: item.productName,
              price: item.price,
              imageUrl: item.imageUrl,

              // ✅ REAL STOCK FROM PRODUCT API
              stock: productRes.data.data.stock,
            };
          } catch {
            return {
              id: item.productId,
              productId: item.productId,
              productName: item.productName,
              price: item.price,
              imageUrl: item.imageUrl,
              stock: 0,
            };
          }
        })
      );

      setWishlist(withStock);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      setWishlist([]);
    }
  };

  fetchWishlist();
}, [user]);





  const updateUserWishlistOnServer = async (newWishlist) => {
    
    if (!user) return;
    try {
      await api.patch("/users/My Profile/wishlist", { wishlist });
    } catch (error) {
      console.error("Failed to update wishlist on server:", error);
      toast.error("Could not sync wishlist.");
    }
  };





const toggleWishlist = async (product) => {
  if (!user) {
    toast.error("Please log in to manage your wishlist.");
    return;
  }

  try {
    const response = await api.post(`/wishlist/${product.id}`);
    const added = response.data.data;

    setWishlist((prev) =>
      added
        ? [...prev, product]
        : prev.filter((i) => i.id !== product.id)
    );

    toast.success(
      added ? "Added to wishlist" : "Removed from wishlist"
    );
  } catch (error) {
    toast.error("Wishlist update failed");
  }
};



  const removeFromWishlist = async (productId) => {
  try {
    await api.delete(`/wishlist/${productId}`);
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  } catch (error) {
    toast.error("Failed to remove from wishlist");
  }
};


  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";
// import api from "../Api/Axios_Instance";
// import toast from "react-hot-toast";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const { user } = useAuth();

//   // ✅ 1. Fetch wishlist on load
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     // Only stop if NO token. (We ignore 'user' state here to prevent flickering)
//     if (!token) {
//       setWishlist([]);
//       return;
//     }

//     const fetchLatestWishlist = async () => {
//       try {
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         const response = await api.get("/wishlist", config);
//         setWishlist(response.data.data || []);
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//             // Token is invalid/expired
//             setWishlist([]);
//         } else {
//             console.error("Failed to fetch wishlist:", error);
//         }
//       }
//     };

//     fetchLatestWishlist();
//   }, [user]);

//   // ✅ 2. Toggle wishlist (Fixed Logic)
//   const toggleWishlist = async (product) => {
//     const token = localStorage.getItem("token");

//     // 🔍 Extract Data Safely
//     const productId = product.id || product.productId;
//     const productName = product.name || product.productName;
//     const productPrice = product.price;
//     const productImage = product.imageUrl || product.image || product.productImage || product.Image;

//     // ✅ FIX: Only check for TOKEN. Do not check '!user' here.
//     // The user object might be loading, but if we have a token, we can proceed.
//     if (!token) {
//       toast.error("Please log in to manage your wishlist.");
//       return;
//     }

//     if (!productId) {
//       console.error("Missing Product ID:", product);
//       return;
//     }

//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const res = await api.post(`/wishlist/${productId}`, {}, config);
      
//       const isAdded = res.data.data === true; 

//       if (isAdded) {
//         const newItem = {
//           productId: productId,
//           productName: productName,
//           price: productPrice,
//           imageUrl: productImage, 
//         };

//         setWishlist((prev) => [...prev, newItem]);
//         toast.success("Added to wishlist");
//       } else {
//         setWishlist((prev) =>
//           prev.filter((item) => item.productId !== productId)
//         );
//         toast.success("Removed from wishlist");
//       }
//     } catch (error) {
//       console.error("Wishlist toggle failed:", error);
      
//       if (error.response && error.response.status === 401) {
//         toast.error("Session expired. Please login again.");
//       } else {
//         toast.error("Failed to update wishlist");
//       }
//     }
//   };

//   // ✅ 3. Remove from wishlist
//   const removeFromWishlist = async (productId) => {
//     const token = localStorage.getItem("token");
//     if (!productId || !token) return;

//     try {
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         await api.delete(`/wishlist/${productId}`, config);

//         setWishlist((prev) =>
//           prev.filter((item) => item.productId !== productId)
//         );
//         toast.success("Removed");
//     } catch (error) {
//         console.error("Failed to remove item", error);
//         toast.error("Could not remove item");
//     }
//   };

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, toggleWishlist, removeFromWishlist }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);