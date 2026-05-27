import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { X, ChevronLeft, ChevronRight, Plus, Minus, ShoppingCart } from "lucide-react";
import { closeProductModal, addToCart } from "../store";

const ProductModal = () => {
  //گرفتن داده از ریداکس
  const { isProductModalOpen, selectedProduct } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // ایندکس تصویر فعلی در گالری
  const [quantity, setQuantity] = useState(1); //مقدار محصول

  //اگر محصولی نبود
  if (!selectedProduct) return null;

  //تابع تعویض تصویر به چپ و راست:
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  //اضافه کردن به سبد خرید
  const handleAddToCart = () => {
    //اضافه به سبد خرید با توجه به کوانتیتی
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(selectedProduct));
    }
    dispatch(closeProductModal()); //بستن مودال
    setQuantity(1); //ریست محصولات
  };

  return (
    <AnimatePresence>
      {isProductModalOpen && (
        //اگر مودال باز بود و پشتش بلور بشه و کلیک شد رو صفحه مودال بسته بشه
        <>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeProductModal())}
            className="fixed inset-0 bg-black/56 backdrop-blur-sm z-50"
          />
          {/*کادر اصلی مودال */}
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-20 bg-white/90 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl z-50 overflow-auto"
          >
            {/*برای بستن مودال علامت ضبدر */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(closeProductModal())}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <section className="h-full flex flex-col lg:flex-row">
              {/* Image Gallery */}
              <section className="lg:w-1/2 relative bg-gray-50">
                <section className="relative h-64 lg:h-full">
                  <img
                    src={selectedProduct.images[currentImageIndex]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {selectedProduct.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Indicators */}
                  <section className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {selectedProduct.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-orange-500' : 'bg-white/80'
                        }`}
                      />
                    ))}
                  </section>
                </section>
              </section>

              {/* Product Details */}
              <section className="lg:w-1/2 p-8 flex flex-col">
                <section className="flex-1">
                  <h1 className="text-3xl font-light text-gray-800 mb-4">
                    {selectedProduct.name}
                  </h1>
                  
                  <p className="text-2xl font-light text-orange-500 mb-6">
                    ${selectedProduct.price}
                  </p>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                  
                  {/* Features */}
                  <section className="mb-6">
                    <h3 className="font-light text-gray-800 mb-3">Features:</h3>
                    <section className="flex flex-wrap gap-2">
                      {selectedProduct.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-sm font-light border border-white/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </section>
                  </section>
                </section>

                {/* Add to Cart Section */}
                <section className="border-t border-white/20 pt-6">
                  {/* Quantity Selector */}
                  <section className="flex items-center justify-between mb-6">
                    <span className="font-light text-gray-700">Quantity:</span>
                    <section className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-100/50 rounded-full"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      
                      <span className="w-8 text-center font-light text-lg">{quantity}</span>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-100/50 rounded-full"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </section>
                  </section>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#ea580c' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={!selectedProduct.inStock}
                    className={`w-full py-4 rounded-2xl font-light text-lg flex items-center justify-center gap-2 ${
                      selectedProduct.inStock
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    } backdrop-blur-sm border border-white/20 shadow-lg`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {selectedProduct.inStock 
                      ? `Add ${quantity} to Cart - $${(selectedProduct.price * quantity).toFixed(2)}`
                      : 'Out of Stock'
                    }
                  </motion.button>
                </section>
              </section>
            </section>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;