"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Layout, ListTodo } from "lucide-react";

export const KanbanSection: React.FC = () => {
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

  const columns = [
    { title: "To Do", color: "bg-indigo-100", icon: ListTodo },
    { title: "In Progress", color: "bg-yellow-100", icon: ArrowRight },
    { title: "Done", color: "bg-green-100", icon: Layout },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Visual Task Management with Kanban Board
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {columns.map((column) => (
            <motion.div
              key={column.title}
              className={`p-6 rounded-lg shadow-lg ${column.color} will-change-transform`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
              }}
            >
              <div className="flex items-center mb-4 gap-3">
                <column.icon className="w-7 h-7 text-gray-700" />
                <h3 className="text-xl font-semibold text-gray-800">
                  {column.title}
                </h3>
              </div>
              <div className="space-y-3">
                <motion.div
                  className="bg-white p-3 rounded-md shadow-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="h-2 w-20 bg-blue-200 rounded mb-2"></div>
                  <div className="h-2 w-16 bg-gray-200 rounded"></div>
                </motion.div>
                <motion.div
                  className="p-3 bg-white rounded-md shadow-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="h-2 w-24 bg-blue-200 rounded mb-2"></div>
                  <div className="h-2 w-20 bg-gray-200 rounded"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-12 text-center text-gray-600 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Visualize your workflow with our intuitive Kanban board. Drag and drop
          tasks between columns, track progress at a glance, and keep you on
          track.
        </motion.p>
      </div>
    </section>
  );
};
