import React from "react";
import { useSelector, useDispatch } from "react-redux";
//	برای ارسال اکشن به Redux Store usedispatch
//برای خواندن داده‌ها از Redux Store -use selector
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { setFilters, setSort } from "../store";

const FiltersPanel = () => {
  const { filters, sort } = useSelector((state) => state.products);
  const dispatch = useDispatch(); //تابعی که باعث میشه اکشن هارو به ریداکس بفرستیم وقتی استیت ها تغییر میکند

  const categories = [
    "all",
    "chairs",
    "desks",
    "sofas",
    "storage",
    "beds",
    "tables",
  ];
  const colors = ["all", "oak", "walnut", "white", "black", "gray", "clear"];

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20 shadow-lg">
      <section className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        {/* Left side - Filters */}
        <section className="flex flex-wrap gap-4 items-center">
          <section className="flex items-center gap-2 text-gray-700">
            <Filter className="w-5 h-5" />
            <span className="font-light">Filters:</span>
          </section>

          {/* Category Filter */}
          <select
          //مقداری که از ریداکس میاد
            value={filters.category}
            //وقتی کاربر گزینه‌ای انتخاب می‌کند، اکشن setFilters فرستاده می‌شود
            onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
            className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 font-light text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          {/* Color Filter */}
          <select
            value={filters.color}
            onChange={(e) => dispatch(setFilters({ color: e.target.value }))}
            className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 font-light text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50">
            {colors.map((color) => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>

          {/* Price Range */}
          <section className="flex items-center gap-2">
            <span className="font-light text-gray-700">Price:</span>
            <span className="text-orange-500 font-light">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </span>
          </section>
        </section>

        {/* Right side - Sort */}
        <section className="flex items-center gap-4">
          <span className="font-light text-gray-700">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 font-light text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50">
            <option value="newest">Newest</option>
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </section>
      </section>
    </motion.section>
  );
};

export default FiltersPanel;
