import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  //براساس ایدی میره به اون بخش ها ایدی و میگیره از دام
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset - 80;
      // این فرمول موقعیت مطلق المنت را از بالای صفحه محاسبه می‌کند.

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };
  //به صورت یک آبجکت تعریف میکنیم بعد مپ میزنیم
  const quickLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "catalog", label: "Catalog" },
    { id: "contact", label: "Contact" },
  ];

  const policyLinks = [
    {
      label: "Shipping Info",
      onClick: () => alert("Shipping information would go here."),
    },
    { label: "Returns", onClick: () => alert("Return policy would go here.") },
    {
      label: "Privacy Policy",
      onClick: () => alert("Privacy policy would go here."),
    },
    {
      label: "Terms of Service",
      onClick: () => alert("Terms of service would go here."),
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-white/70 backdrop-blur-md border-t border-white/20">
      <section className="container mx-auto px-4 py-12">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <section>
            <motion.h3
              whileHover={{ color: "#f97316" }}
              className="text-2xl font-light mb-4 text-gray-800 cursor-pointer"
              onClick={() => scrollToSection("home")}>
              Haven<span className="text-2xl text-orange-500 font-bold">.</span>
            </motion.h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Creating spaces that inspire peace and simplicity through
              minimalist furniture design.
            </p>
          </section>

          {/* Quick Links */}
          <section>
            <h4 className="font-light text-gray-800 mb-4">Quick Links</h4>
            <section className="space-y-2">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  whileHover={{ color: "#f97316", x: 5 }}
                  className="block text-gray-600 font-light hover:text-orange-500 transition-colors text-left cursor-pointer">
                  {link.label}
                </motion.button>
              ))}
            </section>
          </section>

          {/* Policies */}
          <section>
            <h4 className="font-light text-gray-800 mb-4">Policies</h4>
            <section className="space-y-2">
              {policyLinks.map((link) => (
                <motion.button
                  key={link.label}
                  onClick={link.onClick}
                  whileHover={{ color: "#f97316", x: 5 }}
                  className="block text-gray-600 font-light hover:text-orange-500 transition-colors text-left cursor-pointer">
                  {link.label}
                </motion.button>
              ))}
            </section>
          </section>

          {/* Contact & Social */}
          <section>
            <h4 className="font-light text-gray-800 mb-4">Connect With Us</h4>
            <section className="space-y-2 text-gray-600 font-light mb-4">
              <p>123 Design Street</p>
              <p>Creative City, CC 10001</p>
              <p>hello@haven.com</p>
              <p>+1 (555) 123-4567</p>
            </section>
          </section>
        </section>

        {/* Copyright */}
        <section className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-gray-600 font-light">
            © 2025 Haven. All rights reserved. Crafted with simplicity in mind.
          </p>
        </section>
      </section>
    </motion.footer>
  );
};

export default Footer;
