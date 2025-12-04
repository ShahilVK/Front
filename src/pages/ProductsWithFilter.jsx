
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        const categoryMap = {};
        res.data.forEach((p) => {
          if (!categoryMap[p.category]) {
            categoryMap[p.category] = p.image;
          }
        });

        const uniqueCats = Object.keys(categoryMap).map((cat) => ({
          name: cat,
          image: categoryMap[cat],
        }));

        setCategories(uniqueCats);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/product?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="py-16 w-full relative bg-gradient-to-r from-white   overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/pattern.png')] bg-repeat opacity-10"></div>
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 border-l-4 border-red-500 pl-4">
          Shop by Category
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => handleCategoryClick(cat.name)}
              className="cursor-pointer relative border-2 border-transparent rounded-xl p-6 flex flex-col items-center bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group hover:border-gradient-to-r hover:from-red-50 hover:via-white hover:to-white transform hover:-translate-y-2"
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 via-white to-blue-200 rounded-xl blur opacity-25 group-hover:opacity-30 transition-all duration-500"></div>

              {/* Category Content */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-24 h-24 object-contain mb-4 relative z-10"
              />
              <h3 className="text-gray-900 font-bold text-lg md:text-xl relative z-10">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
