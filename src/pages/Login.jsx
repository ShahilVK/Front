
import React, { useContext, useState, useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, X, ArrowRight, Loader2, Command } from 'lucide-react';
import toast from 'react-hot-toast';
import gsap from 'gsap';
import api from '../Api/Axios_Instance';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showForgot, setShowForgot] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(".black-accent", 
        { scaleY: 0 }, 
        { scaleY: 1, duration: 1.2, ease: "power4.inOut" }
      );

      tl.fromTo(".login-card", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      );

      tl.fromTo(".mono-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try { await login(email, password); } catch (error) {} finally { setIsLoading(false); }
  };

  const sendOtp = async () => {
    try {
      await api.post('/auth/password/send-otp', { email });
      toast.success('Code sent');
      setOtpSent(true);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const resetPassword = async () => {
    try {
      await api.post('/auth/password/reset', { email, otp, newPassword, confirmPassword });
      toast.success('Password updated');
      setShowForgot(false); setOtpSent(false); setOtp(''); setNewPassword(''); setConfirmPassword('');
    } catch (err) { toast.error(err.response?.data?.message || 'Reset failed'); }
  };

  return (
    <div ref={containerRef} className="min-h-screen relative flex items-center justify-center overflow-hidden bg-white text-black font-sans selection:bg-black selection:text-white">
      
      <div className="absolute inset-0 z-0 flex pointer-events-none">
        <div className="w-1/2 h-full bg-white relative">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
        </div>
        <div className="w-1/2 h-full bg-[#fafafa] relative overflow-hidden">
             <div className="black-accent absolute top-0 right-0 w-2 h-full bg-black origin-top"></div>
             <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[40vw] h-[40vw] border border-black/5 rounded-full" />
             <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[30vw] h-[30vw] border border-black/5 rounded-full" />
        </div>
      </div>

      <div className="login-card relative z-10 w-full max-w-[440px] p-6">
        
        <div className="bg-white border border-black/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] p-12 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-black" />

          <div className="mb-12 mono-item">
            <div 
              onClick={() => navigate('/')} 
              className="w-10 h-10 bg-black text-white flex items-center justify-center mb-6 cursor-pointer hover:bg-black/90 transition-colors"
            >
               <Command size={20} />
            </div>
            <h1 className="text-4xl font-serif font-medium tracking-tight text-black mb-2">TekTrov.</h1>
            <p className="text-gray-400 text-sm font-light tracking-wide uppercase">Workspace Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            
            <div className="mono-item group relative">
              <input
                type="email"
                className="peer w-full bg-transparent border-b border-gray-200 text-black text-lg py-3 pl-0 focus:border-black focus:outline-none transition-all placeholder-transparent"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className="absolute left-0 -top-3 text-xs text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black transition-all cursor-text">
                Email Address
              </label>
              <Mail className="absolute right-0 top-3 h-5 w-5 text-gray-300 peer-focus:text-black transition-colors" />
            </div>

            <div className="mono-item group relative">
              <input
                type="password"
                className="peer w-full bg-transparent border-b border-gray-200 text-black text-lg py-3 pl-0 focus:border-black focus:outline-none transition-all placeholder-transparent"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className="absolute left-0 -top-3 text-xs text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black transition-all cursor-text">
                Password
              </label>
              <Lock className="absolute right-0 top-3 h-5 w-5 text-gray-300 peer-focus:text-black transition-colors" />
            </div>

            <div className="mono-item flex items-center justify-between pt-2">
               <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mono-item w-full bg-black text-white h-14 flex items-center justify-between px-6 hover:bg-gray-900 transition-all duration-300 group"
            >
               <span className="font-medium tracking-wide">Sign In</span>
               {isLoading ? <Loader2 className="animate-spin h-5 w-5"/> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>

            <div className="mono-item text-center pt-6">
              <Link to="/register" className="text-sm text-gray-400 hover:text-black transition-colors">
                No account? <span className="text-black font-medium underline underline-offset-4 decoration-1">Register</span>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {showForgot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-xl flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white w-full max-w-md border border-gray-100 shadow-2xl p-10 relative"
            >
              <button onClick={() => setShowForgot(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
                 <X size={24} strokeWidth={1} />
              </button>

              <div className="mb-8">
                <h3 className="text-2xl font-serif font-medium text-black mb-2">Recovery.</h3>
                <p className="text-gray-500 font-light">Enter your credentials to reset access.</p>
              </div>

              <div className="space-y-6">
                {!otpSent ? (
                  <>
                    <div className="relative">
                        <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-gray-50 border-none text-black p-4 text-sm focus:ring-1 focus:ring-black placeholder-gray-400 transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button onClick={sendOtp} className="w-full bg-black text-white h-12 text-sm uppercase tracking-widest hover:bg-gray-900 transition-all">
                      Request Code
                    </button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="text-xs uppercase tracking-widest text-center text-gray-400 border border-gray-100 p-2">
                       Code dispatched to {email}
                    </div>
                    <input placeholder="0  0  0  0  0  0" className="w-full bg-gray-50 border-none text-black p-4 text-center tracking-[0.5em] text-lg focus:ring-1 focus:ring-black placeholder-gray-300" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <input type="password" placeholder="New Password" className="w-full bg-gray-50 border-none text-black p-4 text-sm focus:ring-1 focus:ring-black" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm Password" className="w-full bg-gray-50 border-none text-black p-4 text-sm focus:ring-1 focus:ring-black" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button onClick={resetPassword} className="w-full bg-black text-white h-12 text-sm uppercase tracking-widest hover:bg-gray-900 transition-all mt-4">
                      Confirm Reset
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;