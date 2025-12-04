
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../Api/Axios_Instance";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  // This effect now fetches the LATEST data from the server on login/refresh
  useEffect(() => {
    if (user && user.id) {
      // User is logged in, but the user object from AuthContext might be stale.
      // So, we fetch the fresh user data from the API to get the latest wishlist.
      const fetchLatestWishlist = async () => {
        try {
          const response = await api.get(`/users/${user.id}`);
          if (response.data && response.data.wishlist) {
            setWishlist(response.data.wishlist);
          }
        } catch (error) {
          console.error("Failed to fetch latest wishlist:", error);
        }
      };

      fetchLatestWishlist();
    } else {
      // If no user is logged in, the wishlist must be empty
      setWishlist([]);
    }
  }, [user]); // This still runs whenever the user object changes

  const updateUserWishlistOnServer = async (newWishlist) => {
    // ... (This function remains the same)
    if (!user) return;
    try {
      await api.patch(`/users/${user.id}`, { wishlist: newWishlist });
    } catch (error) {
      console.error("Failed to update wishlist on server:", error);
      toast.error("Could not sync wishlist.");
    }
  };

  const toggleWishlist = async (product) => {
    // ... (This function remains the same)
    if (!user) {
      toast.error("Please log in to manage your wishlist.");
      return;
    }
    const exists = wishlist.find((item) => item.id === product.id);
    let updatedWishlist = exists
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];
    
    setWishlist(updatedWishlist);
    await updateUserWishlistOnServer(updatedWishlist);
  };

  const removeFromWishlist = async (productId) => {
    // ... (This function remains the same)
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    await updateUserWishlistOnServer(updatedWishlist);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);