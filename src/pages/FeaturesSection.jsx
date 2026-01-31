
import React from "react";
import { Truck, Headphones, RefreshCw, Lock, Tag } from "lucide-react";

const features = [
  {
    Icon: Truck,
    title: "Free Shipping",
    desc: "Complimentary delivery on all orders, directly to your door.",
  },
  {
    Icon: Headphones,
    title: "24/7 Support",
    desc: "Expert assistance available around the clock for your peace of mind.",
  },
  {
    Icon: RefreshCw,
    title: "Money Back Guarantee",
    desc: "30-day return policy if you are not completely satisfied.",
  },
  {
    Icon: Lock,
    title: "Secure Payments",
    desc: "Encrypted transactions ensuring your financial data stays safe.",
  },
  {
    Icon: Tag,
    title: "Exclusive Offers",
    desc: "Access to competitive pricing and members-only discounts.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-display">
            Why Shop With Us?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Experience the difference of premium service. We prioritize your satisfaction at every step of the journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              {/* Icon Container */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                <feature.Icon className="w-6 h-6" />
              </div>

              {/* Text Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;