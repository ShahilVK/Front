

import React, { createContext, useState, useEffect, useContext, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";
import { createUserHubConnection } from "../signalr/userHub";




export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [blockedPopup, setBlockedPopup] = useState(false);

   const blockHandledRef = useRef(false);
   const hubRef = useRef(null);


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

   if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      connectUserHub(token);
    }

    setLoading(false);
  }, []);

   useEffect(() => {
    const interceptor = api.interceptors.response.use(
      res => res,
      err => {
        const msg = err.response?.data?.message?.toLowerCase();

        if (
          (err.response?.status === 401 || err.response?.status === 403) &&
          msg?.includes("blocked") &&
          !blockHandledRef.current
        ) {
          blockHandledRef.current = true;
          setBlockedPopup(true);
        }

        return Promise.reject(err);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, []);




  const connectUserHub = (accessToken) => {
    if (hubRef.current) return;

    hubRef.current = createUserHubConnection(accessToken);

    hubRef.current
      .start()
      .then(() => {
        hubRef.current.on("UserBlocked", () => {
          if (!blockHandledRef.current) {
            blockHandledRef.current = true;
            setBlockedPopup(true);
          }
        });
      })
      .catch(console.error);
  };




  
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
      }, 1200); 
    } catch (err) {
      console.error("Signup failed:", err);

      toast.error(
        err.response?.data?.message || "Signup failed. Please check your input."
      );
    }
  };


  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      const { accessToken } = res.data.data;
      localStorage.setItem("accessToken", accessToken);

      const profileRes = await api.get("/users/my-profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const userData = profileRes.data.data;

      const normalizedUser = {
        ...userData,
        role: userData.role?.trim(),
      };

      setUser(normalizedUser);
      localStorage.setItem("user", JSON.stringify(normalizedUser));

      connectUserHub(accessToken);

      

      toast.success("Login successful");

      setTimeout(() => {
        if (normalizedUser.role === "Admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 300);

    } catch (err) {
  console.error("Login failed:", err);

  const message =
    err.response?.data?.message ||
    err.response?.data?.error ||
    "Invalid email or password";

  toast.error(message);
}

  };

const handleBlockedLogout = () => {
  hubRef.current?.stop();
  hubRef.current=null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  setUser(null);
  setBlockedPopup(false);
  blockHandledRef.current = false;
  navigate("/login");
};


  const logout = () => {

    hubRef.current?.stop();
    hubRef.current = null;
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
   <AuthContext.Provider value={{ user, signup, login, logout, blockedPopup }}>
      {children}

      {blockedPopup && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-red-600 mb-3">
              Account Blocked
            </h2>

            <p className="text-gray-600 mb-6">
              Your account has been blocked by the admin.
              Please contact support.
            </p>

            <button
              onClick={handleBlockedLogout}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
