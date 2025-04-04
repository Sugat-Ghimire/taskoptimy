"use client";

import React from "react";
import { motion } from "framer-motion";

export const EisenhowerMatrix: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Prioritize with the Eisenhower Matrix
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              title: "Do",
              description: "Important and Urgent",
              color: "bg-red-100",
            },
            {
              title: "Schedule",
              description: "Important but Not Urgent",
              color: "bg-yellow-100",
            },
            {
              title: "Delegate",
              description: "Not Important but Urgent",
              color: "bg-green-100",
            },
            {
              title: "Eliminate",
              description: "Not Important and Not Urgent",
              color: "bg-blue-100",
            },
          ].map((quadrant) => (
            <motion.div
              key={quadrant.title}
              className={`p-6 rounded-lg shadow-md ${quadrant.color} will-change-transform`}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
              }}
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {quadrant.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {quadrant.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          className="mt-8 text-center text-gray-600 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          TaskOptimy helps you categorize and manage your tasks using the
          Eisenhower Matrix, ensuring you focus on what truly matters.
        </motion.p>
      </div>
    </section>
  );
};
