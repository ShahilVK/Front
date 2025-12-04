
import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";


export const AuthContext = createContext(null);

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = async (newUser) => {
    try {
      const existingUserCheck = await api.get(`/users?email=${newUser.email}`);
      if (existingUserCheck.data.length > 0) {
        toast.error("An account with this email already exists.");
        return;
      }
      const userData = { ...newUser, role: "user", cart: [], wishlist: [], orders: [] };
      const response = await api.post("/users", userData);
      const createdUser = response.data;
      setUser(createdUser);
      localStorage.setItem("user", JSON.stringify(createdUser));
      toast.success("Signup Successful! Welcome!");
      navigate("/");
    } catch (e) {
      console.error("Signup failed:", e);
      toast.error("Signup failed. Please try again.");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.get(`/users?email=${email}`);
      const users = response.data;

      if (users.length === 0 || users[0].password !== password) {
        toast.error("Invalid email or password.");
        return;
      }

      const loggedInUser = users[0];

      // Check if the user's account is blocked
      if (loggedInUser.isBlocked) {
        toast.error("Your account has been blocked. Please contact support.");
        return; // Prevent login
      }

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      
      if (loggedInUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (e) {
      console.error("Login failed:", e);
      toast.error("Login failed. Please try again.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

