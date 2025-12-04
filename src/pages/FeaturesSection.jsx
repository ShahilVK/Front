




import React from "react";
import { Truck, Headphones, RefreshCw, Lock, Tag } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-8 h-8 text-teal-600" />,
    title: "Free Shipping",
    desc: "Get your orders delivered with no extra cost, right to your doorstep.",
  },
  {
    icon: <Headphones className="w-8 h-8 text-teal-600" />,
    title: "Support 24/7",
    desc: "Our dedicated team is here to assist you anytime, day or night.",
  },
  {
    icon: <RefreshCw className="w-8 h-8 text-teal-600" />,
    title: "100% Money Back",
    desc: "We offer a full refund if you are not completely satisfied with your purchase.",
  },
  {
    icon: <Lock className="w-8 h-8 text-teal-600" />,
    title: "Payment Secure",
    desc: "Your payment information is encrypted and safe with our secure gateway.",
  },
  {
    icon: <Tag className="w-8 h-8 text-teal-600" />,
    title: "Best Discounts",
    desc: "Enjoy the most competitive prices and special offers on all our products.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-teal-50/50 py-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl">
                Why Shop With Us?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
                We provide the best services and features for a seamless shopping experience.
            </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-xl shadow-sm bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-5 group-hover:bg-teal-500 transition-colors duration-300">
                {React.cloneElement(feature.icon, { className: "w-8 h-8 text-teal-600 group-hover:text-white transition-colors duration-300" })}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

