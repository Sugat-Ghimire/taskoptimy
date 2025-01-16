"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, subDays, isToday, isYesterday } from "date-fns";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle2, Clock, Edit2, Plus, X } from "lucide-react";
import { Header } from "./header";
import { getSession } from "next-auth/react";

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-300 text-red-950",
};

const priorityIcons = {
  low: Clock,
  medium: AlertCircle,
  high: CheckCircle2,
};

const PriorityIcon = ({ priority }: { priority: TodoItem["priority"] }) => {
  const Icon = priorityIcons[priority];
  return <Icon className="h-4 w-4 mr-2" />;
};

export function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const [newTodoPriority, setNewTodoPriority] =
    useState<TodoItem["priority"]>("medium");
  const [newTodoCategory, setNewTodoCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([
    "Work",
    "Personal",
    "Shopping",
    "Health",
  ]);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

  // Fetch Todos from the API

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        if (!response.ok) throw new Error("Failed to fetch todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);
  if (!todos?.length) return;

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const session = await getSession();
    const userId = session?.user?.id;
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newTodo.trim(),
          completed: false,
          priority: newTodoPriority,
          category: newTodoCategory || "Uncategorized",
          userId,
        }),
      });

      if (!response.ok) throw new Error("Failed to add todo");
      const data = await response.json();

      setTodos((prev) => [...prev, data]);
      setNewTodo("");
      setNewTodoPriority("medium");
      setNewTodoCategory("");

      if (
        isAddingNewCategory &&
        newTodoCategory &&
        !categories.includes(newTodoCategory)
      ) {
        setCategories((prev) => [...prev, newTodoCategory]);
        setIsAddingNewCategory(false);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id: string, updates: Partial<TodoItem>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Failed to update todo");
      const data = await response.json();

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...data } : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const getDateString = (date: Date) => {
    const dateObj = new Date(date);
    if (isToday(dateObj)) return "today";
    if (isYesterday(dateObj)) return "yesterday";
    return format(dateObj, "MMM d");
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    return getDateString(date);
  });

  const groupedTodos = todos.reduce((acc, todo) => {
    const dateString = getDateString(new Date(todo.createdAt));
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(todo);
    return acc;
  }, {} as Record<string, TodoItem[]>);
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header activeSection="to do" />
      <div className="flex-grow overflow-hidden p-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-2xl text-center font-bold text-gray-900">
            Your tasks for {getDateString(new Date())}!
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4 flex space-x-2">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-grow"
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
              <Select
                value={newTodoPriority}
                onValueChange={(value: TodoItem["priority"]) =>
                  setNewTodoPriority(value)
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              {isAddingNewCategory ? (
                <Input
                  placeholder="New Category"
                  value={newTodoCategory}
                  onChange={(e) => setNewTodoCategory(e.target.value)}
                  className="w-[150px]"
                />
              ) : (
                <Select
                  value={newTodoCategory}
                  onValueChange={(value) => {
                    if (value === "new") {
                      setIsAddingNewCategory(true);
                      setNewTodoCategory("");
                    } else {
                      setNewTodoCategory(value);
                    }
                  }}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ New Category</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <Button onClick={addTodo}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Tabs defaultValue={getDateString(new Date())} className="w-full">
              <TabsList className="mb-2">
                {last7Days.map((day) => (
                  <TabsTrigger key={day} value={day}>
                    {day}
                  </TabsTrigger>
                ))}
              </TabsList>
              {last7Days.map((day) => (
                <TabsContent key={day} value={day}>
                  <TodoList
                    todos={groupedTodos[day] || []}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

function TodoList({
  todos,
  updateTodo,
  deleteTodo,
}: {
  todos: TodoItem[];
  updateTodo: (id: string, updates: Partial<TodoItem>) => void;
  deleteTodo: (id: string) => void;
}) {
  return (
    <ScrollArea className="h-[370px]">
      <AnimatePresence>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </AnimatePresence>
    </ScrollArea>
  );
}

function TodoItem({
  todo,
  updateTodo,
  deleteTodo,
}: {
  todo: TodoItem;
  updateTodo: (id: string, updates: Partial<TodoItem>) => void;
  deleteTodo: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [isHovered, setIsHovered] = useState(false);

  const handleUpdate = () => {
    updateTodo(todo.id, { text: editedText });
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      exit={{
        opacity: 0,
        y: -10,
        transition: { duration: 0.2, ease: "easeIn" },
      }}
      className={`flex items-center justify-between mb-2 p-4 rounded-lg ${
        priorityColors[todo.priority]
      } relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center flex-grow mr-4">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={(checked) =>
            updateTodo(todo.id, { completed: checked as boolean })
          }
          className="mr-2"
        />
        {isEditing ? (
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleUpdate}
            onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
            className="flex-grow"
          />
        ) : (
          <span
            className={`flex-grow ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="text-xs">
          <PriorityIcon priority={todo.priority} />
          {todo.priority}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {todo.category}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {format(todo.createdAt, "MMM d, HH:mm")}
        </Badge>
        {isHovered && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTodo(todo.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      {isHovered && todo.updatedAt > todo.createdAt && (
        <div className="absolute bottom-0 right-0 text-xs text-gray-500 p-1">
          Updated: {format(todo.updatedAt, "MMM d, HH:mm")}
        </div>
      )}
    </motion.div>
  );
}
