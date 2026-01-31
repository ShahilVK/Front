
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../Api/Axios_Instance";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();




useEffect(() => {
  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      return;
    }

    try {
      const res = await api.get("/wishlist");
      const wishlistItems = res.data.data || [];

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
     toast.success("Removed from wishlist");
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
