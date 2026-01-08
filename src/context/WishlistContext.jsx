
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";
// import api from "../Api/Axios_Instance";
// import toast from "react-hot-toast";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user && user.id) {
//       const fetchLatestWishlist = async () => {
//         try {
//           const response = await api.get("Wishlist");
//           if (response.data && response.data.wishlist) {
//             setWishlist(response.data.wishlist);
//           }
//         } catch (error) {
//           console.error("Failed to fetch latest wishlist:", error);
//         }
//       };

//       fetchLatestWishlist();
//     } else {
//       setWishlist([]);
//     }
//   }, [user]); 

//   const updateUserWishlistOnServer = async (newWishlist) => {
    
//     if (!user) return;
//     try {
//       await api.patch("/users/My Profile/wishlist", { wishlist });
//     } catch (error) {
//       console.error("Failed to update wishlist on server:", error);
//       toast.error("Could not sync wishlist.");
//     }
//   };

//   const toggleWishlist = async (product) => {
//     if (!user) {
//       toast.error("Please log in to manage your wishlist.");
//       return;
//     }
//     const exists = wishlist.find((item) => item.id === product.id);
//     let updatedWishlist = exists
//       ? wishlist.filter((item) => item.id !== product.id)
//       : [...wishlist, product];
    
//     setWishlist(updatedWishlist);
//     await updateUserWishlistOnServer(updatedWishlist);
//   };

//   const removeFromWishlist = async (productId) => {
//     const updatedWishlist = wishlist.filter((item) => item.id !== productId);
//     setWishlist(updatedWishlist);
//     await updateUserWishlistOnServer(updatedWishlist);
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);





import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../Api/Axios_Instance";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  // ✅ Fetch wishlist after login
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }

    const fetchLatestWishlist = async () => {
      try {
        const response = await api.get("/wishlist");
        setWishlist(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch latest wishlist:", error);
      }
    };

    fetchLatestWishlist();
  }, [user]);

  // ❌ PATCH REMOVED (backend does not support it)

  // ✅ Toggle wishlist (ADD / REMOVE)
  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error("Please log in to manage your wishlist.");
      return;
    }

    try {
      const res = await api.post(`/wishlist/${product.id}`);
      const added = res.data.data;

      if (added) {
        const wishlistItem = {
          productId: product.id,
          productName: product.name,
          price: product.price,
          imageUrl: product.image || product.imageUrl,
        };

        setWishlist((prev) => [...prev, wishlistItem]);
        toast.success("Added to wishlist");
      } else {
        setWishlist((prev) =>
          prev.filter((item) => item.productId !== product.id)
        );
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
      toast.error("Wishlist update failed");
    }
  };

  // ✅ Remove from wishlist
 const removeFromWishlist = async (productId) => {
  if (!productId) {
    console.error("Invalid productId:", productId);
    return;
  }

  await api.delete(`/wishlist/${productId}`);

  setWishlist((prev) =>
    prev.filter((item) => item.productId !== productId)
  );
};



  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
