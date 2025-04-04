"use client";

import { motion } from "framer-motion";
import { Twitter, Github, ClipboardCheck } from "lucide-react";

export function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <motion.div
            variants={footerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaskOptimy
            </h3>
            <p className="text-gray-600">
              Revolutionizing task management and boosting productivity for
              individuals and teams.
            </p>
            <div className="flex space-x-5">
              {[Twitter, Github].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 text-gray-600" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={footerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-3">
              {["About", "Features", "Documentation"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quote Section */}
          <motion.div
            variants={footerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <ClipboardCheck className="w-6 h-6 text-blue-600" />
              <h4 className="text-lg font-semibold text-gray-900">
                Daily Motivation
              </h4>
            </div>
            <blockquote className="border-l-4 border-blue-600 pl-4 py-2">
              <p className="text-gray-800 italic font-medium">
                Every small step forward is proof that you&apos;re stronger than
                yesterday. Keep going, even if the progress feels invisible
                today—it’s building the foundation for tomorrow.
              </p>
            </blockquote>
          </motion.div>
        </div>

        {/* Copyright Bar */}
        <motion.div
          variants={footerVariants}
          initial="hidden"
          animate="visible"
          className="pt-8 mt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TaskOptimy. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </a>
              <span className="h-4 w-px bg-gray-300"></span>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
