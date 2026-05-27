import React from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Eye, Star } from "lucide-react";
import { openProductModal, addToCart } from "../store";
import { useState } from "react";

const ProductCard = ({ product, index }) => {
  const dispatch = useDispatch(); //افزودن به سبد خرید و باز کردن مودال
  const [quantity, setQuantity] = useState(1);
  //تعداد محصولی که کاربر می‌خواهد بخرد  پیش فرض 1
  //وقتی کاربر روی آیکون چشم کلیک می‌کند اجرا می‌شود و یه اکشن میفرسته به ریداکس تا مودال باز بشه
  const handlePreview = () => {
    dispatch(openProductModal(product));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setQuantity(1);
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Image Container */}
      <section className="relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        {/* Overlay */}
        <section className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

        {/* Badges */}
        <section className="absolute top-4 left-4 flex gap-2">
          {product.isNew && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-light backdrop-blur-sm">
              New
            </span>
          )}
          {product.isPopular && (
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-light backdrop-blur-sm flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Popular
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-light backdrop-blur-sm">
              Out of Stock
            </span>
          )}
        </section>

        {/* Quick View Button */}
        <motion.button
          initial={{ opacity: 1, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm p-2 rounded-full shadow-lg z-50 hover:cursor-pointer"
          onClick={handlePreview}>
          <Eye className="w-5 h-5 text-orange-800" />
        </motion.button>
      </section>

      {/* Content */}
      <section className="p-6">
        <h3 className="text-xl font-light text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <section className="flex items-center justify-between">
          <span className="text-2xl font-light text-orange-500">
            ${product.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#f97316" }}
            whileTap={{ scale: 0.95 }}
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className={`px-6 py-2 rounded-full font-light text-white ${
              product.inStock
                ? "bg-orange-500/90 backdrop-blur-sm hover:bg-orange-600"
                : "bg-gray-400 cursor-not-allowed"
            } border border-white/20 shadow-lg`}>
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </motion.button>
        </section>
      </section>
    </motion.section>
  );
};

export default ProductCard;
