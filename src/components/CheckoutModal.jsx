import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { toggleCheckout, clearCart } from "../store";

const CheckoutModal = () => {
  const { isCheckoutOpen } = useSelector((state) => state.modal);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleConfirmOrder = () => {
    // Simulate order confirmation
    dispatch(clearCart());
    dispatch(toggleCheckout());
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          {/* Backdrop */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleCheckout())}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-20 bg-white/90 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl z-50 overflow-y-auto">
            <section className="p-8 max-w-2xl mx-auto">
              {/* Header */}
              <section className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-light text-gray-800">Checkout</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(toggleCheckout())}
                  className="p-2 hover:bg-gray-100/50 rounded-full">
                  <X className="w-6 h-6" />
                </motion.button>
              </section>

              {/* Order Summary */}
              <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
                <h3 className="text-xl font-light text-gray-800 mb-4">
                  Order Summary
                </h3>
                <section className="space-y-3">
                  {cartItems.map((item) => (
                    <section
                      key={item.id}
                      className="flex justify-between items-center">
                      <section className="flex items-center gap-3">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <section>
                          <p className="font-light text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </section>
                      </section>
                      <p className="font-light text-orange-500">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </section>
                  ))}
                </section>
                <section className="border-t border-white/20 mt-4 pt-4">
                  <section className="flex justify-between items-center">
                    <span className="text-lg font-light text-gray-800">
                      Total:
                    </span>
                    <span className="text-2xl font-light text-orange-500">
                      ${total.toFixed(2)}
                    </span>
                  </section>
                </section>
              </section>

              {/* Shipping Form */}
              <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
                <h3 className="text-xl font-light text-gray-800 mb-4">
                  Shipping Information
                </h3>
                <form className="space-y-4">
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 font-light focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 font-light focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                  </section>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 font-light focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 font-light focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                  <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 font-light focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 font-light focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 font-light focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                    <select className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 font-light focus:outline-none focus:ring-2 focus:ring-orange-500/50">
                      <option>Country</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </section>
                </form>
              </section>

              {/* Payment Method */}
              <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
                <h3 className="text-xl font-light text-gray-800 mb-4">
                  Payment Method
                </h3>
                <section className="space-y-3">
                  <label className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="text-orange-500"
                    />
                    <span className="font-light">Credit Card</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="text-orange-500"
                    />
                    <span className="font-light">PayPal</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="text-orange-500"
                    />
                    <span className="font-light">Apple Pay</span>
                  </label>
                </section>
              </section>

              {/* Confirm Button */}
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#ea580c" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirmOrder}
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-light text-lg backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Confirm Order - ${total.toFixed(2)}
              </motion.button>
            </section>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
