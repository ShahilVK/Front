


// import React, { useState } from "react";
// import { Mail, Phone, MapPin, User, MessageSquare } from "lucide-react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { motion } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";

// // Updated InfoCard to look good on the new dark background
// const InfoCard = ({ icon, title, children }) => (
//   <div className="flex items-start gap-4">
//     <div className="bg-red-500/20 text-red-400 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
//       {icon}
//     </div>
//     <div>
//       <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
//       <div className="text-gray-400">{children}</div>
//     </div>
//   </div>
// );

// const Contact = () => {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", form);
//     toast.success("Thank you for your message! We'll get back to you soon.");
//     setForm({ name: "", email: "", message: "" });
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <Navbar />
//       <Toaster position="top-right" />
      
//       <main className="flex-grow flex items-center justify-center py-16 pt-24">
//         <div className="max-w-6xl w-full mx-auto px-4">
//           {/* ✨ New Feature: Main container with a card-like effect */}
//           <div className="bg-white shadow-2xl rounded-2xl overflow-hidden grid md:grid-cols-5">
            
//             {/* ✨ New Feature: Left "Information Panel" */}
//             <motion.div 
//               initial={{ opacity: 0, x: -100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.7 }}
//               className="md:col-span-2 bg-gray-800 text-white p-8 space-y-8"
//             >
//               <h2 className="text-3xl font-bold">Contact Information</h2>
//               <p className="text-gray-400">
//                 Fill up the form and our team will get back to you within 24 hours.
//               </p>
//               <div className="space-y-6">
//                 <InfoCard icon={<Phone size={24} />} title="Call Us">
//                   <p>+91 8714059965</p>
//                 </InfoCard>
//                 <InfoCard icon={<Mail size={24} />} title="Email Us">
//                   <p>support@tektrov.com</p>
//                 </InfoCard>
//                 <InfoCard icon={<MapPin size={24} />} title="Our Office">
//                   <p>123 TekTrov Lane, Tech City, 560001</p>
//                 </InfoCard>
//               </div>
//             </motion.div>

//             {/* ✨ New Feature: Right "Form Panel" */}
//             <motion.div 
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.7 }}
//               className="md:col-span-3 p-8"
//             >
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3"><User className="h-5 w-5 text-gray-400" /></span>
//                   <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400"/>
//                 </div>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Mail className="h-5 w-5 text-gray-400" /></span>
//                   <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400"/>
//                 </div>
//                 <div className="relative">
//                   <span className="absolute top-3 left-0 flex items-center pl-3"><MessageSquare className="h-5 w-5 text-gray-400" /></span>
//                   <textarea name="message" placeholder="Your Message" rows="5" value={form.message} onChange={handleChange} required className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400"></textarea>
//                 </div>
//                 <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform duration-300">
//                   Send Message
//                 </button>
//               </form>
//             </motion.div>

//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default Contact;







import React, { useState } from "react";
import { Mail, Phone, MapPin, User, MessageSquare, Send, Clock, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const InfoCard = ({ icon, title, children }) => (
  <motion.div 
    whileHover={{ scale: 1.05, x: 10 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group"
  >
    <div className="bg-gradient-to-br from-red-500 to-yellow-500 text-white w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-red-500/50 transition-shadow duration-300">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">{title}</h3>
      <div className="text-gray-300">{children}</div>
    </div>
  </motion.div>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", form);
    toast.success("Thank you for your message! We'll get back to you soon.", {
      icon: "🎉",
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    setForm({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Navbar />
      <Toaster position="top-right" />
      
      <main className="flex-grow flex items-center justify-center py-16 pt-24 relative z-10">
        <div className="max-w-6xl w-full mx-auto px-4">
          
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="text-yellow-500" size={28} />
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                Get In Touch
              </h1>
              <Sparkles className="text-red-500" size={28} />
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-5 backdrop-blur-sm border border-gray-200"
          >
            
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:col-span-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-10 space-y-10 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500 opacity-20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500 opacity-20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                >
                  Contact Information
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400 leading-relaxed"
                >
                  Fill up the form and our team will get back to you within 24 hours.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-6 relative z-10"
              >
                <InfoCard icon={<Phone size={24} />} title="Call Us">
                  <p className="font-medium">+91 8714059965</p>
                  <p className="text-sm text-gray-400">Mon-Fri 9am-6pm</p>
                </InfoCard>
                <InfoCard icon={<Mail size={24} />} title="Email Us">
                  <p className="font-medium">support@tektrov.com</p>
                  <p className="text-sm text-gray-400">24/7 Support</p>
                </InfoCard>
                <InfoCard icon={<MapPin size={24} />} title="Our Office">
                  <p className="font-medium">123 TekTrov Lane</p>
                  <p className="text-sm text-gray-400">Tech City, 560001</p>
                </InfoCard>
                <InfoCard icon={<Clock size={24} />} title="Working Hours">
                  <p className="font-medium">Monday - Friday</p>
                  <p className="text-sm text-gray-400">9:00 AM - 6:00 PM IST</p>
                </InfoCard>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20 relative z-10"
              >
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-white">1000+</span> customers trust us with their tech needs
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:col-span-3 p-10 bg-gradient-to-br from-white to-gray-50"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative group"
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <span className="absolute top-11 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-red-500 transition-colors">
                    <User className="h-5 w-5" />
                  </span>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="John Doe" 
                    value={form.name} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative group"
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <span className="absolute top-11 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-red-500 transition-colors">
                    <Mail className="h-5 w-5" />
                  </span>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="john@example.com" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative group"
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                  <span className="absolute top-11 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-red-500 transition-colors">
                    <MessageSquare className="h-5 w-5" />
                  </span>
                  <textarea 
                    name="message" 
                    placeholder="Tell us what's on your mind..." 
                    rows="5" 
                    value={form.message} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 hover:border-gray-300 resize-none"
                  ></textarea>
                </motion.div>

                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center text-sm text-gray-500 mt-4"
                >
                  By submitting this form, you agree to our{" "}
                  <a href="#" className="text-red-500 hover:text-red-600 font-semibold underline">
                    Privacy Policy
                  </a>
                </motion.p>
              </form>
            </motion.div>

          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;