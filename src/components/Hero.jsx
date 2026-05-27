import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // آیکون فلش

const Hero = () => {
  //اسکرول بشه به بخش کاتولوگ
 const scrollToCatalog = () => {
    const catalogSection = document.getElementById("catalog");
    if (catalogSection) {
      const offsetTop =
        catalogSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden">
      <section
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://plus.unsplash.com/premium_photo-1706140675031-1e0548986ad1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fGZ1cm5pdHVyZSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500")',
        }}
      />
      {/* یه هاله شیشه ای بده به صفحه*/}
      <section className="absolute inset-0 bg-linear-to-b from-black/90 to-orange-400/30 backdrop-blur-[1px]" />

      {/* Content */}
      <section className="relative z-10 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-light mb-6">
          Elevate your Space
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto">
          Discover furniture that brings peace and simplicity to your space
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05, backgroundColor: "#ea580c" }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToCatalog}
          className="bg-orange-500/90 backdrop-blur-sm text-white px-8 py-4 rounded-full font-light text-lg flex items-center gap-2 mx-auto border border-white/20 shadow-2xl hover:cursor-pointer">
          Explore Collection
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </section>
    </section>
  );
};

export default Hero;
