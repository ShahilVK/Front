
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Twitter size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "#" },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ✨ 1. New dynamic grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <h2 className="text-3xl font-bold text-white mb-3">TekTrov</h2>
            <p className="text-gray-400 max-w-md">
              Your one-stop shop for premium mobile accessories. Shop with us and experience the best in quality and service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-red-400 transition-colors">Home</Link></li>
              <li><Link to="/product" className="hover:text-red-400 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-red-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter + Socials */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider">Join Our Newsletter</h3>
            <p className="text-gray-400 mb-4">Get exclusive deals and updates straight to your inbox.</p>
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="bg-red-500 p-3 rounded-r-md text-white hover:bg-red-600 transition flex items-center">
                <Send size={20} />
              </button>
            </div>

            {/* ✨ 2. New styled social media icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ✨ 3. Improved bottom bar layout */}
        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} TekTrov. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

