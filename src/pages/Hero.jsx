
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Apple Airpods Max",
    subtitle: "Wireless Over-Ear Headphones",
    price: "£499.99",
    image: "/assets/air7.png",
    features: [
      "Pro-Level Active Noise Cancellation",
      "USB-C Charging",
      "Transparency mode for real-world awareness",
    ],
  },
  {
    title: "Canon EOS R5 Mark",
    subtitle: "Mirrorless Camera",
    price: "£249.99",
    image:
      "https://www.jdinstitute.edu.in/media/2021/06/National-Camera-Day-Various-types-of-cameras-for-photography-2.jpg",
    features: [
      "30 fps continuous shooting with AF/AE tracking",
      "Eye Control AF + Vehicle Priority AF",
      "6K RAW recording + 4K movie oversampling",
    ],
  },
  {
    title: "Titan Heritage Premium Smartwatch",
    subtitle: "Luxury Analog & Smart Features",
    price: "£59.99",
    image:
      "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwdbbe49f7/images/Titan/Catalog/90207KM01_1.jpg?sw=600&sh=600",
    features: [
      "BT Calling, Advanced Chipset",
      "Toughened Glass Protection",
      "Alarm, Stopwatch, Weather Display",
    ],
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Auto-slide every 5s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10" />

      <div className="max-w-7xl w-full px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* LEFT TEXT SECTION */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                {slides[current].title}
              </h1>
              <h2 className="text-lg md:text-2xl text-yellow-400 font-semibold">
                {slides[current].subtitle}
              </h2>

              <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                {slides[current].features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>

              <div className="flex items-center gap-6 pt-4">
                <span className="text-3xl font-bold text-yellow-400">
                  {slides[current].price}
                </span>
                <Link
                  to="/product"
                  className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-all"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="flex-1 flex justify-center relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={slides[current].image}
              src={slides[current].image}
              alt={slides[current].title}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              transition={{ duration: 0.8 }}
              className="w-[18rem] md:w-[26rem] lg:w-[30rem] object-contain drop-shadow-2xl"
            />
          </AnimatePresence>
          {/* Floating Effect */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-yellow-500/20 to-transparent rounded-full blur-3xl"
          />
        </div>
      </div>

      {/* NAVIGATION BUTTONS */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full hover:bg-yellow-500 hover:text-black transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full hover:bg-yellow-500 hover:text-black transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* DOTS INDICATOR */}
      <div className="absolute bottom-6 flex space-x-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === i ? "bg-yellow-400 scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
