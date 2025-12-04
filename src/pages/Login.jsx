
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // This login logic remains unchanged
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
        // You might want to add a toast notification here
        return;
    }
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-blue-100 p-4">
      {/* ✨ 1. Animated form card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-500 cursor-pointer" onClick={() => navigate('/')}>
                TekTrov
            </h1>
            <p className="text-gray-500 mt-2">Welcome back! Please sign in to your account.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {/* ✨ 2. New input fields with icons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                    type="email"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter your email address"
                    required
                />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                    type="password"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                />
            </div>
          </div>

          {/* ✨ 3. New styled button with gradient */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white p-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-red-500 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;