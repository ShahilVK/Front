
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';

const slides = [
    {
        id: 1,
        backgroundImage: "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        title: <>Immersive Sound, <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Unbeatable Prices.</span></>,
        description: "Discover premium headphones, accessories, and audio gear that elevate your listening experience. Shop with confidence.",
        
    },
    {
        id: 2,
        backgroundImage: "url('https://wallpapers.com/images/hd/hd-camera-on-dried-leaves-f1ft20hqpytgmz06.jpg')",
        title: <>Capture Every Moment, <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">Perfectly.</span></>,
        description: "From professional DSLRs to compact point-and-shoots, find the perfect camera to preserve your memories in stunning detail.",
        
    },
    {
        id: 3,
        backgroundImage: "url('https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        title: <>Stay Connected, <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Stay Ahead.</span></>,
        description: "Explore our latest collection of smartwatches with cutting-edge features to track your fitness and manage your day.",
        
    },
    
];

const HomeBannerWithBg = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (slideIndex) => {
      setCurrentSlide(slideIndex);
  }

  const activeSlide = slides[currentSlide];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full h-[90vh] md:h-screen overflow-hidden relative">
      <AnimatePresence>
        <motion.div 
            key={activeSlide.id}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: activeSlide.backgroundImage }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl w-full h-full mx-auto px-6 flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Text */}
          <div className="text-center md:text-left z-10">
            <AnimatePresence mode="wait">
                 <motion.div
                    key={activeSlide.id}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ staggerChildren: 0.2 }}
                 >
                    <motion.h1 
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tighter"
                        variants={itemVariants}
                        style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
                    >
                        {activeSlide.title}
                    </motion.h1>
                    <motion.p 
                        className="text-gray-300 text-base sm:text-lg md:text-xl mb-8"
                        variants={itemVariants}
                    >
                        {activeSlide.description}
                    </motion.p>
                    
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
                    >
                        <Link
                            to="/product"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                        >
                            Explore Products <ChevronRight size={20} />
                        </Link>
                        <Link
                            to="/home"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                        >
                            View Features
                        </Link>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side - Image */}
          {/* <div className="relative hidden md:flex justify-center items-center">
             <AnimatePresence>
                <motion.img
                    key={activeSlide.id}
                    src={activeSlide.productImage}
                    alt="Featured Product"
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -50 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-lg drop-shadow-2xl"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/500x500/FFFFFF/000000?text=Gadget'; }}
                />
             </AnimatePresence>
          </div> */}
        </div>
      </div>
       {/* Navigation Dots */}
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                />
            ))}
        </div>
    </div>
  );
};

export default HomeBannerWithBg;

