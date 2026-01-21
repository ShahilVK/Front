
// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { motion } from 'framer-motion';
// import { User, Mail, Lock } from 'lucide-react';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { signup } = useContext(AuthContext);

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (!name || !email || !password) {
//         return;
//     }
//     signup({ name, email, password });
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
//             <h1 className="text-4xl font-bold text-red-500">
//                 TekTrov
//             </h1>
//             <p className="text-gray-500 mt-2">Create your account to get started.</p>
//         </div>
        
//         <form onSubmit={handleRegister} className="space-y-6">
//           {/* ✨ 2. New input fields with icons */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <User className="h-5 w-5 text-gray-400" />
//                 </span>
//                 <input
//                     type="text"
//                     className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="enter your name"
//                     required
//                 />
//             </div>
//           </div>

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
//             Create Account
//           </button>

//           <p className="text-sm text-center text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="font-semibold text-red-500 hover:underline">
//               Login here
//             </Link>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

// export default Register;





import React, { useContext, useState, useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, Loader2, Command } from 'lucide-react';
import gsap from 'gsap';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // 🎨 GSAP "Monochrome" Entrance (Matches Login.js)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Split Screen Animation (Black bar slides in)
      tl.fromTo(".black-accent", 
        { scaleY: 0 }, 
        { scaleY: 1, duration: 1.2, ease: "power4.inOut" }
      );

      // 2. Card Reveal
      tl.fromTo(".register-card", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      );

      // 3. Text Stagger
      tl.fromTo(".mono-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    
    setIsLoading(true);
    try {
        await signup({ name, email, password });
    } catch (error) {
        // Handle error (optional toast could go here)
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen relative flex items-center justify-center overflow-hidden bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* --- Architectural Background --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none">
        {/* Left White Space */}
        <div className="w-1/2 h-full bg-white relative">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
        </div>
        {/* Right Black Accent Bar (Animated) */}
        <div className="w-1/2 h-full bg-[#fafafa] relative overflow-hidden">
             <div className="black-accent absolute top-0 right-0 w-2 h-full bg-black origin-top"></div>
             <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[40vw] h-[40vw] border border-black/5 rounded-full" />
             <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[30vw] h-[30vw] border border-black/5 rounded-full" />
        </div>
      </div>

      {/* --- Main Card --- */}
      <div className="register-card relative z-10 w-full max-w-[440px] p-6">
        
        <div className="bg-white border border-black/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] p-12 relative">
          {/* Top decorative line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-black" />

          {/* Header */}
          <div className="mb-10 mono-item">
            <div 
              onClick={() => navigate('/')} 
              className="w-10 h-10 bg-black text-white flex items-center justify-center mb-6 cursor-pointer hover:bg-black/90 transition-colors"
            >
               <Command size={20} />
            </div>
            <h1 className="text-4xl font-serif font-medium tracking-tight text-black mb-2">TekTrov.</h1>
            <p className="text-gray-400 text-sm font-light tracking-wide uppercase">Create Account</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-8">
            
            {/* Full Name */}
            <div className="mono-item group relative">
              <input
                  type="text"
                  id="name"
                  className="peer w-full bg-transparent border-b border-gray-200 text-black text-lg py-3 pl-0 focus:border-black focus:outline-none transition-all placeholder-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
              />
              <label htmlFor="name" className="absolute left-0 -top-3 text-xs text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black transition-all cursor-text">
                  Full Name
              </label>
              <User className="absolute right-0 top-3 h-5 w-5 text-gray-300 peer-focus:text-black transition-colors" />
            </div>

            {/* Email Address */}
            <div className="mono-item group relative">
              <input
                  type="email"
                  id="email"
                  className="peer w-full bg-transparent border-b border-gray-200 text-black text-lg py-3 pl-0 focus:border-black focus:outline-none transition-all placeholder-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
              />
              <label htmlFor="email" className="absolute left-0 -top-3 text-xs text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black transition-all cursor-text">
                  Email Address
              </label>
              <Mail className="absolute right-0 top-3 h-5 w-5 text-gray-300 peer-focus:text-black transition-colors" />
            </div>

            {/* Password */}
            <div className="mono-item group relative">
              <input
                  type="password"
                  id="password"
                  className="peer w-full bg-transparent border-b border-gray-200 text-black text-lg py-3 pl-0 focus:border-black focus:outline-none transition-all placeholder-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
              />
              <label htmlFor="password" className="absolute left-0 -top-3 text-xs text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black transition-all cursor-text">
                  Password
              </label>
              <Lock className="absolute right-0 top-3 h-5 w-5 text-gray-300 peer-focus:text-black transition-colors" />
            </div>

            {/* Submit Button (Solid Black) */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="mono-item w-full bg-black text-white h-14 flex items-center justify-between px-6 hover:bg-gray-900 transition-all duration-300 group mt-4"
            >
              <span className="font-medium tracking-wide">Get Started</span>
              {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5"/> 
              ) : (
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              )}
            </button>

            <div className="mono-item text-center pt-6">
              <Link to="/login" className="text-sm text-gray-400 hover:text-black transition-colors">
                Already have an account? <span className="text-black font-medium underline underline-offset-4 decoration-1">Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;