
// import React from "react";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Link } from "react-router-dom";
// import { ShieldCheck, BadgePercent, Truck, Rocket, Award, Users as TeamIcon, Smile, Package, Star } from "lucide-react";

// // Animation variants for Framer Motion
// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

// const staggerContainer = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.2 } },
// };

// function About() {
//   const values = [
//     { icon: <ShieldCheck size={32} className="text-red-500" />, title: "Quality Products", desc: "Every product is handpicked and tested for durability, design, and reliability to ensure you get the best." },
//     { icon: <BadgePercent size={32} className="text-red-500" />, title: "Affordable Prices", desc: "We believe in fair, transparent pricing without ever compromising on the quality of our accessories." },
//     { icon: <Truck size={32} className="text-red-500" />, title: "Fast Delivery", desc: "Get your favorite accessories delivered quickly and securely right to your doorstep, anywhere in India." },
//   ];
  
//   const stats = [
//       { icon: <Smile size={32} className="text-red-500"/>, value: "10,000+", label: "Happy Customers" },
//       { icon: <Package size={32} className="text-red-500"/>, value: "200+", label: "Products Delivered" },
//       { icon: <Star size={32} className="text-red-500"/>, value: "4.9/5", label: "Average Rating" },
//   ];

//   const timelineEvents = [
//     { icon: <Rocket />, year: "2025", title: "Our Humble Beginning", desc: "TekTrov was born from a passion for great tech, starting as a small online shop with a big dream." },
//     { icon: <Award />, year: "2026", title: "10,000 Happy Customers", desc: "We celebrated serving thousands of satisfied tech lovers across the country, a milestone that fuels our journey." }
//   ];

//   const galleryImages = [
//       "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop",
//       "https://img.freepik.com/premium-photo/stylish-headphones-background-music-equipment-with-bright-colored-lighting_199743-24510.jpg",
//       "https://kevurugames.com/wp-content/uploads/2023/07/men-futuristic-vr-simulator-wearing-protective-eyewear-generative-ai.webp"
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       <Navbar />

//       <main className="flex-grow pt-16">
//         {/* Hero Section */}
//         <section className="relative bg-cover bg-center text-white py-28" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop')" }}>
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40"></div>
//           <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
//             <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: "spring" }} className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
//               About TekTrov
//             </motion.h1>
//             <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
//               We're not just a store; we're a community of tech enthusiasts dedicated to enhancing your digital life.
//             </motion.p>
//           </div>
//         </section>
        
//         {/* Statistics Section */}
//         <section className="bg-white py-16">
//             <motion.div 
//                 initial="hidden" 
//                 whileInView="visible" 
//                 viewport={{ once: true, amount: 0.3 }} 
//                 variants={staggerContainer} 
//                 className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6"
//             >
//                 {stats.map((stat, index) => (
//                     <motion.div key={index} variants={fadeUp} className="p-6 border border-gray-200 rounded-lg">
//                         <div className="flex justify-center items-center mb-4 text-red-500">{stat.icon}</div>
//                         <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
//                         <p className="text-gray-500 mt-1">{stat.label}</p>
//                     </motion.div>
//                 ))}
//             </motion.div>
//         </section>

//         {/* Company Timeline Section */}
//         <section className="bg-gray-50 py-20">
//             <div className="max-w-4xl mx-auto px-6">
//                 <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Our Journey</h2>
//                 <div className="relative">
//                     <div className="absolute left-9 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
//                     <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="space-y-12">
//                        {timelineEvents.map((event, index) => (
//                          <motion.div key={index} variants={fadeUp} className="pl-24 relative">
//                             <div className="absolute left-0 top-1 flex items-center justify-center w-10 h-10 bg-white rounded-full border-2 border-gray-200">
//                                 <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center animate-pulse">
//                                     {event.icon}
//                                 </div>
//                             </div>
//                             <p className="font-bold text-red-500">{event.year}</p>
//                             <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
//                             <p className="text-gray-600">{event.desc}</p>
//                          </motion.div>
//                        ))}
//                     </motion.div>
//                 </div>
//             </div>
//         </section>

//         {/* Values Section */}
//         <section className="py-20 bg-white">
//           <div className="max-w-6xl mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
//             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8 text-center">
//               {values.map((item, i) => (
//                 <motion.div key={i} variants={fadeUp} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
//                   <div className="bg-red-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6">
//                     {item.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
//                   <p className="text-gray-600">{item.desc}</p>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>
        
//         {/* Gallery Section */}
//         <section className="bg-gray-50 py-20">
//             <div className="max-w-6xl mx-auto px-6">
//                 <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">A Glimpse Into Our World</h2>
//                 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {galleryImages.map((src, index) => (
//                         <motion.div key={index} variants={fadeUp} className="group overflow-hidden rounded-lg shadow-lg">
//                            <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>
//         </section>
        
//         {/* Call to Action (CTA) Section */}
//         <section className="bg-white text-gray-800">
//             <div className="max-w-6xl mx-auto px-6 py-20 text-center">
//                 <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl font-bold mb-4">Join Our Tech Community</motion.h2>
//                 <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-600 mb-8 max-w-2xl mx-auto">
//                     Ready to upgrade your mobile experience? Shop today and discover the TekTrov difference.
//                 </motion.p>
//                 <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
//                     <Link to="/product" className="inline-block bg-red-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors duration-300 transform hover:scale-105">
//                         Shop All Products
//                     </Link>
//                 </motion.div>
//             </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default About;







import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ShieldCheck, BadgePercent, Truck, Rocket, Award, Users as TeamIcon, Smile, Package, Star } from "lucide-react";

// Animation variants for Framer Motion
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

function About() {
  const values = [
    { icon: <ShieldCheck size={32} className="text-red-500" />, title: "Quality Products", desc: "Every product is handpicked and tested for durability, design, and reliability to ensure you get the best." },
    { icon: <BadgePercent size={32} className="text-red-500" />, title: "Affordable Prices", desc: "We believe in fair, transparent pricing without ever compromising on the quality of our accessories." },
    { icon: <Truck size={32} className="text-red-500" />, title: "Fast Delivery", desc: "Get your favorite accessories delivered quickly and securely right to your doorstep, anywhere in India." },
  ];
  
  const stats = [
      { icon: <Smile size={32} className="text-red-500"/>, value: "10,000+", label: "Happy Customers" },
      { icon: <Package size={32} className="text-red-500"/>, value: "200+", label: "Products Delivered" },
      { icon: <Star size={32} className="text-red-500"/>, value: "4.9/5", label: "Average Rating" },
  ];

  const timelineEvents = [
    { icon: <Rocket />, year: "2025", title: "Our Humble Beginning", desc: "TekTrov was born from a passion for great tech, starting as a small online shop with a big dream." },
    { icon: <Award />, year: "2026", title: "10,000 Happy Customers", desc: "We celebrated serving thousands of satisfied tech lovers across the country, a milestone that fuels our journey." }
  ];

  const galleryImages = [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop",
      "https://img.freepik.com/premium-photo/stylish-headphones-background-music-equipment-with-bright-colored-lighting_199743-24510.jpg",
      "https://kevurugames.com/wp-content/uploads/2023/07/men-futuristic-vr-simulator-wearing-protective-eyewear-generative-ai.webp"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section - Enhanced with gradient overlay and particle effect */}
        <section className="relative bg-cover bg-center text-white py-32 overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-red-900/40 to-black/70"></div>
          
          {/* Animated floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"
            ></motion.div>
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 right-10 w-40 h-40 bg-red-600/20 rounded-full blur-3xl"
            ></motion.div>
          </div>

          <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4"
            >
              <span className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-200 px-4 py-2 rounded-full text-sm font-semibold">
                Welcome to Our Story
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }} 
              className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-red-100 to-white"
            >
              About TekTrov
            </motion.h1>
            
            <motion.p 
              variants={fadeUp} 
              initial="hidden" 
              animate="visible" 
              className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light"
            >
              We're not just a store; we're a community of tech enthusiasts dedicated to enhancing your digital life.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8"
            >
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500"></div>
                <span className="text-sm uppercase tracking-wider">Est. 2025</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500"></div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Statistics Section - Enhanced with gradient backgrounds */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YzZjRmNiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Impact</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.3 }} 
              variants={staggerContainer} 
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  variants={scaleIn} 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                >
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="flex justify-center items-center mb-4"
                    >
                      <div className="bg-red-50 p-4 rounded-full group-hover:bg-red-100 transition-colors duration-300">
                        {stat.icon}
                      </div>
                    </motion.div>
                    <p className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </p>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Company Timeline Section - Enhanced with gradient line */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20"></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Journey</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Every great story has a beginning. Here's ours.</p>
              <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mt-4"></div>
            </motion.div>

            <div className="relative">
              {/* Gradient timeline line */}
              <div className="absolute left-9 h-full w-1 bg-gradient-to-b from-red-500 via-red-400 to-red-300 rounded-full" aria-hidden="true"></div>
              
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.2 }} 
                variants={staggerContainer} 
                className="space-y-16"
              >
                {timelineEvents.map((event, index) => (
                  <motion.div 
                    key={index} 
                    variants={fadeUp}
                    whileHover={{ x: 5 }}
                    className="pl-28 relative"
                  >
                    {/* Enhanced timeline dot */}
                    <div className="absolute left-0 top-1 flex items-center justify-center w-20 h-20">
                      <div className="absolute w-20 h-20 bg-red-100 rounded-full animate-ping opacity-20"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-shadow duration-300">
                        {event.icon}
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <span className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-bold mb-3">
                        {event.year}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{event.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section - Enhanced with gradient cards */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 left-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 right-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-20"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">We're committed to delivering excellence in every aspect of your experience.</p>
              <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mt-4"></div>
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.2 }} 
              variants={staggerContainer} 
              className="grid md:grid-cols-3 gap-8"
            >
              {values.map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  className="relative bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="bg-gradient-to-br from-red-100 to-red-50 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-6 group-hover:from-red-500 group-hover:to-red-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/30">
                        <div className="group-hover:text-white transition-colors duration-300">
                          {item.icon}
                        </div>
                      </div>
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Gallery Section - Enhanced with hover effects */}
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
        
        {/* Call to Action (CTA) Section - Enhanced with gradient background */}
        <section className="relative bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"
            ></motion.div>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"
            ></motion.div>
          </div>

          <div className="relative max-w-6xl mx-auto px-6 py-24 text-center z-10">
            <motion.div
              variants={fadeUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Join Us Today
              </span>
            </motion.div>

            <motion.h2 
              variants={fadeUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-100 to-white"
            >
              Join Our Tech Community
            </motion.h2>

            <motion.p 
              variants={fadeUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Ready to upgrade your mobile experience? Shop today and discover the TekTrov difference.
            </motion.p>

            <motion.div 
              variants={fadeUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
            >
              <Link 
                to="/product" 
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-red-500/50 group"
              >
                Shop All Products
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-red-400" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={20} className="text-red-400" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={20} className="text-red-400" />
                <span>Quality Guaranteed</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;