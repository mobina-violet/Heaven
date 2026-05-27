import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import FiltersPanel from "./FiltersPanel";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const {
    items: products,
    filters,
    sort,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  //HOOK :useMemo
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      if (filters.category !== "All" && product.category !== filters.category) {
        return false;
      }
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }
      if (filters.color !== "all" && product.color !== filters.color) {
        return false;
      }
      return true;
    });
    // Sort products
    switch (sort) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "newest":
        return filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "popular":
        return filtered.sort(
          (a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0),
        );
      default:
        return filtered;
    }
  }, [products, filters, sort]);

  //animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <section className="py-16" id="catalog">
      <section className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-light text-center mb-12 text-gray-800 underline decoration-orange-500">
          Our Collection
        </motion.h2>

        {/*✨برای فیلتر ها یه کامپوننت جدا تعریف میکنیم ✨*/}
        <FiltersPanel />

        <AnimatePresence mode="wait">
          <motion.section
            key={JSON.stringify(filters) + sort}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.section>
        </AnimatePresence>

        {filteredAndSortedProducts.length === 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No products found matching your criteria.
            </p>
          </motion.section>
        )}
      </section>
    </section>
  );
};

export default ProductGrid;
