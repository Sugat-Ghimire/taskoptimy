"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Sign Up",
    description: "Create your TaskOptimy account in seconds.",
  },
  { title: "Add Tasks", description: "Input your tasks and set priorities." },
  {
    title: "Optimize",
    description: "Let TaskOptimy organize and optimize your workflow.",
  },
  {
    title: "Boost Productivity",
    description: "Complete tasks efficiently and achieve your goals.",
  },
];

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-100 to-white">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900"
          variants={itemVariants}
        >
          How It Works
        </motion.h2>
        <div className="relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-center mb-12 last:mb-0"
              variants={itemVariants}
            >
              <motion.div
                className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg will-change-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                {index + 1}
              </motion.div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-blue-200"></div>
        </div>
      </motion.div>
    </section>
  );
}
