
import React, { useContext, useState, useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, Loader2, Command } from 'lucide-react';
import gsap from 'gsap';
import toast from "react-hot-toast";


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

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

  if (!name || !email || !password) {
    toast.error("All fields are required");
    return;
  }

  setIsLoading(true);
  try {
    await signup({
      name: name.trim(),
      email: email.trim(),
      password
    });

    toast.success("Account created successfully");
    navigate("/login");

  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Registration failed";

    toast.error(message);
  } finally {
    setIsLoading(false);
  }
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

      <div className="register-card relative z-10 w-full max-w-[440px] p-6">
        
        <div className="bg-white border border-black/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] p-12 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-black" />

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