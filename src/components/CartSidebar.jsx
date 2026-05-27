import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import {
  toggleCart,
  updateQuantity,
  removeFromCart,
  toggleCheckout,
} from "../store";

//سبد خرید
const CartSidebar = () => {
  const { isOpen, items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleCart())}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.section
            initial={{ x: "100%" }} //از راست صفحه خارج است
            animate={{ x: 0 }}
            exit={{ x: "100%" }} //// به راست می‌رود و ناپدید می‌شود
            transition={{ type: "spring", damping: 30 }} //// حرکت فنری نرم
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/90 backdrop-blur-md border-l border-white/20 shadow-2xl z-50 overflow-y-auto">
            {/* Header */}
            <section className="p-6 border-b border-white/20">
              <section className="flex items-center justify-between">
                <h2 className="text-2xl font-light text-gray-800 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6" />
                  Your Cart
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(toggleCart())}
                  className="p-2 hover:bg-gray-100/50 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </motion.button>
              </section>
            </section>

            {/* Cart Items */}
            <section className="p-6 space-y-4">
              {items.length === 0 ? (
                <section className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </section>
              ) : (
                items.map((item) => (
                  <motion.section
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-4 bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />

                    <section className="flex-1">
                      <h3 className="font-light text-gray-800">{item.name}</h3>
                      <p className="text-orange-500 font-light">
                        ${item.price}
                      </p>
                    </section>

                    <section className="flex items-center gap-2">
                      {/* ارسال برای ریداکس با دیسپچ*/}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                        className="p-1 hover:bg-gray-100/50 rounded-full">
                        <Minus className="w-4 h-4" />
                      </motion.button>

                      <span className="w-8 text-center font-light">
                        {item.quantity}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        className="p-1 hover:bg-gray-100/50 rounded-full">
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </section>

                    <motion.button
                      //حذف از سبد
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="p-2 hover:bg-red-50/50 text-red-500 rounded-full transition-colors">
                      <X className="w-4 h-4" />
                    </motion.button>
                  </motion.section>
                ))
              )}
            </section>

            {/* Footer */}
            {items.length > 0 && (
              <section className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20 bg-white/50 backdrop-blur-md">
                <section className="flex justify-between items-center mb-4">
                  <span className="text-lg font-light text-gray-800">
                    Total:
                  </span>
                  <span className="text-2xl font-light text-orange-500">
                    ${total.toFixed(2)}
                  </span>
                </section>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#ea580c" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    //اول سبد و میبنده بعد چک اوت باز میشه 
                    dispatch(toggleCart());
                    dispatch(toggleCheckout());
                  }}
                  className="w-full bg-orange-500 text-white py-4 rounded-2xl font-light text-lg backdrop-blur-sm border border-white/20 shadow-lg">
                  Proceed to Checkout
                </motion.button>
              </section>
            )}
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
