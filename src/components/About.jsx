import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Heart } from "lucide-react";
const About = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "Every piece is crafted with the finest materials and attention to detail.",
    },
    {
      icon: Users,
      title: "For Modern Living",
      description:
        "Designed for contemporary lifestyles that value simplicity and functionality.",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description:
        "We pour passion into every design to create pieces you'll love for years.",
    },
  ];
  return (
    //text
    <section id="about" className="py-20 bg-white/50 backdrop-blur-sm">
      <section className="container mx-auto px-4">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-800 mb-4 underline decoration-orange-500">
            About Haven
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We believe in creating furniture that brings peace and simplicity to
            your living spaces. Our minimalist designs are crafted to stand the
            test of time, both in quality and style.
          </p>
        </motion.section>
        {/*  سه تا ایکونی که بالا  تعریف کردیم داخل یک سکشن ولی هر کذام را جدا انیمیشن دادیم*/}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.section
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center p-6">
              <motion.section
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-orange-500" />
              </motion.section>
              <h3 className="text-xl font-light text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.section>
          ))}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <section>
            <section className="text-3xl font-light text-orange-500 mb-2">
              500+
            </section>
            <section className="text-gray-600">Happy Customers</section>
          </section>
          
          <section>
            <section className="text-3xl font-light text-orange-500 mb-2">
              3
            </section>
            <section className="text-gray-600">Years Experience</section>
          </section>
          <section>
            <section className="text-3xl font-light text-orange-500 mb-2">
              50+
            </section>
            <section className="text-gray-600">Unique Designs</section>
          </section>
          <section>
            <section className="text-3xl font-light text-orange-500 mb-2">
              24/7
            </section>
            <section className="text-gray-600">Customer Support</section>
          </section>
        </motion.section>
      </section>
    </section>
  );
};

export default About;
