
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import FeaturesSection from "./FeaturesSection";
import TopProducts from "./TopProducts";
import Footer from "../components/Footer";
import ProductsWithFilter from "./ProductsWithFilter";
import HomeBanner from "./HomeBanner";


// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Gallery animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

// Gallery images
const galleryImages = [
  "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop",
  "https://img.freepik.com/premium-photo/stylish-headphones-background-music-equipment-with-bright-colored-lighting_199743-24510.jpg",
  "https://kevurugames.com/wp-content/uploads/2023/07/men-futuristic-vr-simulator-wearing-protective-eyewear-generative-ai.webp",
];


function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10">
      {/* Navbar (No animation, stays fixed at top) */}
      <Navbar />

      {/* Home Banner */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full"
      >
        <HomeBanner />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full"
      >
        {/* <Hero /> */}
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full"
      >
        
        
         {/* <ProductsWithFilter /> */}
         {/* <TopProducts /> */}
         
         
         
      </motion.div>

      {/* Top Products */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full"
      >
        {/* <TopProducts /> */}
        <FeaturesSection />

      </motion.div>

      {/* Products with Filter */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full"
      >
        {/* <ProductsWithFilter /> */}
        <ProductsWithFilter />
      </motion.div>

        <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full"
      >

                <section className="bg-gradient-to-b from-gray-50 to-white py-24">
                  <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-center mb-16"
                    >
                      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">A Glimpse Into Our World</h2>
                      <p className="text-gray-600 text-lg max-w-2xl mx-auto">Experience the innovation and quality that defines TekTrov.</p>
                      <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mt-4"></div>
                    </motion.div>
        
                    <motion.div 
                      initial="hidden" 
                      whileInView="visible" 
                      viewport={{ once: true, amount: 0.2 }} 
                      variants={staggerContainer} 
                      className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                      {galleryImages.map((src, index) => (
                        <motion.div 
                          key={index} 
                          variants={scaleIn}
                          whileHover={{ scale: 1.05 }}
                          className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                          <div className="relative overflow-hidden">
                            <img 
                              src={src} 
                              alt={`Gallery image ${index + 1}`} 
                              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700" 
                            />
                            
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Image number indicator */}
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {index + 1}/{galleryImages.length}
                            </div>
                          </div>
        
                          {/* Border accent */}
                          <div className="absolute inset-0 border-2 border-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </section>
        
        
         
         
         
      </motion.div>

      {/* Footer */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full"
      >
        <Footer />
      </motion.div>
    </div>
  );
}

export default Home;
