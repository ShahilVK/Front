
// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { motion } from 'framer-motion';
// import { Mail, Lock } from 'lucide-react';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//         return;
//     }
//     login(email, password);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-blue-100 p-4">
//       {/* ✨ 1. Animated form card */}
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
//       >
//         <div className="text-center mb-8">
//             <h1 className="text-4xl font-bold text-red-500 cursor-pointer" onClick={() => navigate('/')}>
//                 TekTrov
//             </h1>
//             <p className="text-gray-500 mt-2">Welcome back! Please sign in to your account.</p>
//         </div>
        
//         <form onSubmit={handleLogin} className="space-y-6">
//           {/* ✨ 2. New input fields with icons */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//             <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <Mail className="h-5 w-5 text-gray-400" />
//                 </span>
//                 <input
//                     type="email"
//                     className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="enter your email address"
//                     required
//                 />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                 </span>
//                 <input
//                     type="password"
//                     className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="••••••••"
//                     required
//                 />
//             </div>
//           </div>

//           {/* ✨ 3. New styled button with gradient */}
//           <button 
//             type="submit" 
//             className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white p-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform duration-300"
//           >
//             Login
//           </button>

//           <p className="text-sm text-center text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/register" className="font-semibold text-red-500 hover:underline">
//               Register here
//             </Link>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

// export default Login;





import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../Api/Axios_Instance';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // 🔐 Forgot password states
  const [showForgot, setShowForgot] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // 📩 Send OTP
  const sendOtp = async () => {
    try {
      await api.post('/auth/password/send-otp', { email });
      toast.success('OTP sent to your email');
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  // 🔁 Reset password
  const resetPassword = async () => {
    try {
      await api.post('/auth/password/reset', {
        email,
        otp,
        newPassword,
        confirmPassword,
      });

      toast.success('Password reset successful');
      setShowForgot(false);
      setOtpSent(false);
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold text-red-500 cursor-pointer"
            onClick={() => navigate('/')}
          >
            TekTrov
          </h1>
          <p className="text-gray-500 mt-2">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="email"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="password"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* 🔐 Forgot password (ONLY ADDITION, NO UI CHANGE) */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-sm text-red-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white p-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-red-500 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </motion.div>

      {/* 🔐 FORGOT PASSWORD MODAL (SEPARATE, DOES NOT AFFECT UI) */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>

            {!otpSent ? (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded mb-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={sendOtp}
                  className="w-full bg-red-500 text-white p-2 rounded"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  placeholder="OTP"
                  className="w-full p-2 border rounded mb-2"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full p-2 border rounded mb-2"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full p-2 border rounded mb-4"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  onClick={resetPassword}
                  className="w-full bg-green-600 text-white p-2 rounded"
                >
                  Reset Password
                </button>
              </>
            )}

            <button
              onClick={() => setShowForgot(false)}
              className="mt-4 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
