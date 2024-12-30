"use client";

import { motion } from "framer-motion";
import { CheckCircle, Target, Workflow } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Smart Task Prioritization",
    description:
      "Automatically organize your tasks based on importance and urgency.",
  },
  {
    icon: Target,
    title: "Eisenhower Matrix",
    description:
      "Prioritize tasks effectively using the proven four-quadrant system.",
  },
  {
    icon: Workflow,
    title: "Intuitive Workflows",
    description:
      "Create and manage custom workflows that fit your unique needs.",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 rounded-lg p-6 shadow-md will-change-transform"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
