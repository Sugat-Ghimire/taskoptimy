"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
export function Hero() {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        className="max-w-5xl mx-auto z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl text-center sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight"
          variants={itemVariants}
        >
          Revolutionize Your Productivity
        </motion.h1>
        <motion.p
          className="text-xl text-center sm:text-2xl mb-12 text-gray-700 leading-relaxed"
          variants={itemVariants}
        >
          TaskOptimy: Prioritize, optimize, and conquer your tasks like never
          before.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
        >
          {[
            {
              icon: CheckCircle,
              title: "Task Mastery",
              description: "Effortlessly manage and prioritize your tasks",
            },
            {
              icon: Clock,
              title: "Time Optimization",
              description: "Maximize your productivity with smart scheduling",
            },
            {
              icon: TrendingUp,
              title: "Progress Tracking",
              description: "Visualize your achievements and stay motivated",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 will-change-transform"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
              }}
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center" variants={itemVariants}>
          <p className="text-lg text-gray-600 mb-6">
            Organize your life, one task at a time.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              variant="default"
              className=" bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-medium shadow-lg"
            >
              Get Started
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
