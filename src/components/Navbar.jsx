import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { ShoppingBag, Menu, X } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { toggleCart } from "../store";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items); //خواندن محصولات سبد خرید از ریداکس
  const dispatch = useDispatch(); //برای فرستادن دستورات به ریداکس
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); //وضعیت باز/بسته بودن منوی موبایل

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0); //محاسبه تعداد کل محصولات

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false); // Close mobile menu after click
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };
  //بستن منوی موبایل با کلیک خارج از آن یا دکمه
  // Close mobile menu when clicking outside or escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (
        isMobileMenuOpen &&
        !e.target.closest(".mobile-menu") &&
        !e.target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  /*فشردن کلید Escape منو را می‌بندد
☝🏼☝🏼
کلیک بیرون از منوی موبایل آن را می‌بندد

کلیک روی دکمه منو باعث بسته شدن نمی‌شود*/

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "catalog", label: "Catalog" },
    { id: "contact", label: "Contact" },
  ];
  //انیمیشن‌های framer-motion
  /*منوی موبایل با جلوه محو و کوچک شدن ظاهر می‌شود
آیتم‌های منو یکی پس از دیگری از چپ به راست وارد می‌شوند */
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const mobileMenuItemVariants = {
    closed: {
      x: -20,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-orange-300 shadow-lg">
      <section className="container mx-auto px-4 py-4">
        <section className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            //هنگام هاور، 5% بزرگتر می‌شود
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-4xl font-semibold text-orange-800 cursor-pointer">
            Haven<span className="text-2xl text-orange-500 font-bold">.</span>
          </motion.button>

          {/* Desktop Navigation Links */}
          <section className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ color: "#f97316" }}
                className="text-orange-300 hover:text-orange-500 transition-colors font-normal cursor-pointer">
                {item.label}
              </motion.button>
            ))}
          </section>

          {/* Mobile menu button and cart */}
          <section className="flex items-center gap-4">
            {/* Cart Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:cursor-pointer">
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-orange-500" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg mobile-menu-button hover:cursor-pointer">
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.section
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}>
                    <X className="w-6 h-6 text-gray-700 hover:text-orange-500" />
                  </motion.section>
                ) : (
                  <motion.section
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="w-6 h-6 text-gray-700 hover:text-orange-500" />
                  </motion.section>
                )}
              </AnimatePresence>
            </motion.button>
          </section>
        </section>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              />

              {/* Mobile Menu Panel */}
              <motion.section
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="absolute left-4 right-4 top-20 mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl z-50 overflow-hidden md:hidden mobile-menu">
                <section className="p-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      variants={mobileMenuItemVariants}
                      initial="closed"
                      animate="open"
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left px-4 py-3 rounded-xl font-light text-gray-600 hover:bg-gray-100/50 hover:text-orange-500 transition-all duration-200 hover:cursor-pointer">
                      {item.label}
                    </motion.button>
                  ))}

                  {/* Cart in mobile menu */}
                  <motion.section
                    variants={mobileMenuItemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: navItems.length * 0.1 }}
                    className="border-t border-white/20 pt-2 mt-2">
                    <button
                      onClick={() => {
                        dispatch(toggleCart());
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl font-light text-gray-600 hover:bg-gray-100/50 hover:text-orange-500 transition-all duration-200 flex items-center justify-between hover:cursor-pointer">
                      <span>Cart</span>
                      {itemCount > 0 && (
                        <span className="bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                          {itemCount}
                        </span>
                      )}
                    </button>
                  </motion.section>
                </section>
              </motion.section>
            </>
          )}
        </AnimatePresence>
      </section>
    </motion.nav>
  );
};

export default Navbar;
