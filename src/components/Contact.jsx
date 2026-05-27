import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      info: "hello@haven.com",
      link: "mailto:hello@haven.com",
    },
    {
      icon: Phone,
      title: "Phone",
      info: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "123 Design Street, Creative City",
      link: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-linear-to-br from-gray-50 to-gray-100">
      <section className="container mx-auto px-4">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-800 mb-4 underline decoration-orange-500">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions about our furniture? Need design advice? We'd love to
            hear from you.
          </p>
        </motion.section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6">
            <h3 className="text-2xl font-light text-gray-800 mb-6">
              Contact Information
            </h3>

            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.link}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <section className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  <method.icon className="w-6 h-6 text-orange-500" />
                </section>
                <section>
                  <h4 className="font-light text-gray-800">{method.title}</h4>
                  <p className="text-gray-600">{method.info}</p>
                </section>
              </motion.a>
            ))}

            {/* Business Hours */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <h4 className="font-light text-gray-800 mb-3">Business Hours</h4>
              <section className="space-y-2 text-gray-600">
                <section className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </section>
                <section className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </section>
                <section className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </section>
              </section>
            </motion.section>
          </motion.section>

          {/* Contact Form */}
          <motion.section
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
            <h3 className="text-2xl font-light text-gray-800 mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <section>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-light mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 font-light focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
                  placeholder="Enter your name"
                />
              </section>

              <section>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-light mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 font-light focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </section>

              <section>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-light mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 font-light focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project or question..."
                />
              </section>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, backgroundColor: "#ea580c" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-light text-lg backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.section>
        </section>
      </section>
    </section>
  );
};

export default ContactSection;
