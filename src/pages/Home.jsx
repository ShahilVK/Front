
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
         <TopProducts />
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
