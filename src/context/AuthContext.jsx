import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const signup = async (newUser) => {
    const name = newUser.name.trim();
    const email = newUser.email.trim().toLowerCase();
    const password = newUser.password;

    const nameRegex = /^[A-Za-z]{3,50}$/;
    const emailRegex = /^[a-z0-9]+([._%+-][a-z0-9]+)*@[a-z0-9-]+\.com$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])(?!.*\s)(?!.*(.)\1\1).{8,50}$/;

    if (!nameRegex.test(name)) {
      return toast.error("Name must contain only letters (no spaces)");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email must be a valid .com email");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must contain uppercase, lowercase, number & special character"
      );
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Signup successful! Please login.");

      setTimeout(() => {
        navigate("/login");
      }, 1200); // ⏱️ allow toast to show
    } catch (err) {
      console.error("Signup failed:", err);

      toast.error(
        err.response?.data?.message || "Signup failed. Please check your input."
      );
    }
  };

  // const login = async (email, password) => {
  //   try {
  //     const res = await api.post("/auth/login", {
  //       email,
  //       password,
  //     });

  //     const { accessToken } = res.data.data;

  //     localStorage.setItem("accessToken", accessToken);

  //     const profileRes = await api.get("/users/My-Profile");

  //     setUser(profileRes.data.data);
  //     localStorage.setItem("user", JSON.stringify(profileRes.data.data));

  //     toast.success("Login Successfull");

  //     // setTimeout(() => {
  //     //   navigate("/");
  //     // }, 1200); // ⏱️ allow toast to show
  //      setTimeout(() => {
  //     if (userData.role === "Admin") {
  //       navigate("/dashboard");      // ✅ ADMIN DASHBOARD
  //     } else {
  //       navigate("/");               // ✅ USER HOME
  //     }
  //   }, 800);

  //   } catch (err) {
  //     console.error("Login failed:", err);
  //     toast.error(err.response?.data?.message || "Invalid email or password");
  //   }
  // };

  

const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    const { accessToken } = res.data.data;
    
    // 1. Store token
    localStorage.setItem("accessToken", accessToken);

    const profileRes = await api.get("/users/my-profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = profileRes.data.data;

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    if(userData.role==="Admin"){
      navigate("/dashboard")
    }
    else{
      navigate("/")
    }

    toast.success("Login successful");

  } catch (err) {
    console.error("Login failed:", err);
    toast.error(err.response?.data?.message || "Login failed");
  }
};


  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
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
