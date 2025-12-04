
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);

  // This registration logic remains the same
  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
        // You can add a toast notification for validation if you like
        return;
    }
    signup({ name, email, password });
    // The signup function in your AuthContext will handle navigation
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
            <h1 className="text-4xl font-bold text-red-500">
                TekTrov
            </h1>
            <p className="text-gray-500 mt-2">Create your account to get started.</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-6">
          {/* ✨ 2. New input fields with icons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                </span>
                <input
                    type="text"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="enter your name"
                    required
                />
            </div>
          </div>

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
            Create Account
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-red-500 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Register;