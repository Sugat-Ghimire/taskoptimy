"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Edit,
  Trash2,
  List,
  Info,
  Grid,
  AlertCircle,
  Calendar,
  Users,
} from "lucide-react";
import { Header } from "./header";

type Task = {
  id: string;
  text: string;
  description: string;
};

type QuadrantType = "do" | "schedule" | "delegate" | "eliminate";

type EditingTask = {
  id?: string;
  text: string;
  description: string;
  quadrant: QuadrantType;
  isNew: boolean;
};

const quadrants: {
  id: QuadrantType;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    id: "do",
    title: "Do",
    description: "Important and Urgent",
    color: "bg-red-100",
  },
  {
    id: "schedule",
    title: "Schedule",
    description: "Important but Not Urgent",
    color: "bg-yellow-100",
  },
  {
    id: "delegate",
    title: "Delegate",
    description: "Not Important but Urgent",
    color: "bg-green-100",
  },
  {
    id: "eliminate",
    title: "Eliminate",
    description: "Not Important and Not Urgent",
    color: "bg-blue-100",
  },
];

export const EisenhowerMatrix: React.FC = () => {
  const [tasks, setTasks] = useState<{ [key in QuadrantType]: Task[] }>({
    do: [],
    schedule: [],
    delegate: [],
    eliminate: [],
  });
  const [editingTask, setEditingTask] = useState<EditingTask | null>(null);
  const [view, setView] = useState<"matrix" | "list">("matrix");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const viewTransitionVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const addTask = (quadrant: QuadrantType) => {
    setEditingTask({
      text: "",
      description: "",
      quadrant,
      isNew: true,
    });
  };

  const updateTask = (updatedTask: EditingTask) => {
    setTasks((prev) => {
      if (updatedTask.isNew) {
        const newTask: Task = {
          id: uuidv4(),
          text: updatedTask.text,
          description: updatedTask.description,
        };
        return {
          ...prev,
          [updatedTask.quadrant]: [...prev[updatedTask.quadrant], newTask],
        };
      } else {
        return {
          ...prev,
          [updatedTask.quadrant]: prev[updatedTask.quadrant].map((task) =>
            task.id === updatedTask.id
              ? {
                  ...task,
                  text: updatedTask.text,
                  description: updatedTask.description,
                }
              : task
          ),
        };
      }
    });
    setEditingTask(null);
  };

  const removeTask = (taskId: string, quadrant: QuadrantType) => {
    setTasks((prev) => ({
      ...prev,
      [quadrant]: prev[quadrant].filter((task) => task.id !== taskId),
    }));
  };

  const handleDialogClose = () => {
    setEditingTask(null);
  };

  const renderTask = (task: Task, quadrant: QuadrantType) => (
    <motion.div
      key={task.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white p-2 mb-2 rounded shadow-sm"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">{task.text}</span>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setEditingTask({
                id: task.id,
                text: task.text,
                description: task.description,
                quadrant,
                isNew: false,
              })
            }
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeTask(task.id, quadrant)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      {task.description && (
        <p className="mt-1 text-xs text-gray-600">{task.description}</p>
      )}
    </motion.div>
  );

  const renderListView = () => (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {quadrants.map((quadrant) => (
        <motion.div
          key={quadrant.id}
          className={`p-4 rounded-lg shadow-sm ${quadrant.color}`}
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            {quadrant.title}
          </h3>
          <div className="space-y-2">
            <AnimatePresence>
              {tasks[quadrant.id].map((task) => renderTask(task, quadrant.id))}
            </AnimatePresence>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addTask(quadrant.id)}
            className="mt-3"
          >
            <Plus className="h-3 w-3 mr-1" /> Add Task
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderMatrixView = () => (
    <motion.div
      className="grid grid-cols-2 gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {quadrants.map((quadrant) => (
        <motion.div
          key={quadrant.id}
          className={`p-3 rounded-lg shadow-sm ${quadrant.color}`}
          variants={itemVariants}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <h3 className="text-sm mb-2 font-semibold text-gray-800">
            {quadrant.title}
          </h3>
          <div className="min-h-[100px]">
            <AnimatePresence>
              {tasks[quadrant.id].map((task) => renderTask(task, quadrant.id))}
            </AnimatePresence>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addTask(quadrant.id)}
            className="mt-2 w-full"
          >
            <Plus className="h-3 w-3 mr-1" /> Add Task
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <div className="flex flex-col h-screen">
      <Header activeSection="eisenhower-matrix" />
      <section className="flex-grow px-4 py-12 sm:px-6 lg:px-9 bg-gray-50 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between mb-8 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setView(view === "matrix" ? "list" : "matrix")}
            >
              {view === "matrix" ? (
                <List className="h-4 w-4 mr-1" />
              ) : (
                <Grid className="h-4 w-4 mr-1" />
              )}
              {view === "matrix" ? "List View" : "Matrix View"}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Info className="h-4 w-4 mr-2" />
                  Info
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Using the Eisenhower Matrix
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 mt-2">
                    Prioritize your tasks effectively using this time-tested
                    method
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-6">
                  <p className="text-gray-700 leading-relaxed">
                    The Eisenhower Matrix is a powerful decision-making tool
                    that helps you organize tasks based on their importance and
                    urgency:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg bg-red-50 border border-red-100"
                    >
                      <h3 className="font-semibold text-red-700 flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-red-100">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        Do First
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Important and Urgent tasks that require immediate
                        attention
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg bg-blue-50 border border-blue-100"
                    >
                      <h3 className="font-semibold text-blue-700 flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-blue-100">
                          <Calendar className="h-4 w-4" />
                        </div>
                        Schedule
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Important but Not Urgent tasks that need planning
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg bg-yellow-50 border border-yellow-100"
                    >
                      <h3 className="font-semibold text-yellow-700 flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-yellow-100">
                          <Users className="h-4 w-4" />
                        </div>
                        Delegate
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Not Important but Urgent tasks that can be assigned
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-gray-100">
                          <Trash2 className="h-4 w-4" />
                        </div>
                        Eliminate
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Not Important and Not Urgent tasks to reconsider
                      </p>
                    </motion.div>
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      💡 <span className="font-medium">Pro Tip:</span> Focus on
                      completing &quot;Do First&quot; tasks while planning ahead
                      for &quot;Schedule&quot; items. Learn to delegate
                      effectively and minimize time spent on tasks that could be
                      eliminated.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              variants={viewTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {view === "matrix" ? renderMatrixView() : renderListView()}
            </motion.div>
          </AnimatePresence>
          <motion.p
            className="mt-8 text-center text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            TaskOptimy helps you categorize and manage your tasks using the
            Eisenhower Matrix, ensuring you focus on what truly matters.
          </motion.p>
        </div>
      </section>
      <Dialog open={!!editingTask} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTask?.isNew ? "Add Task" : "Edit Task"}
            </DialogTitle>
          </DialogHeader>
          {editingTask && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-task">Task</Label>
                <Input
                  id="edit-task"
                  value={editingTask.text}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, text: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <Button onClick={() => updateTask(editingTask)}>
                {editingTask.isNew ? "Add Task" : "Save Changes"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
