"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, subDays, isToday, isYesterday } from "date-fns";
import { v4 as uuidv4 } from "uuid";
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
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);

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

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: TodoItem = {
        id: uuidv4(),
        text: newTodo.trim(),
        completed: false,
        priority: newTodoPriority,
        category: newTodoCategory || "Uncategorized",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      setNewTodoPriority("medium");
      setNewTodoCategory("");

      if (
        isAddingNewCategory &&
        newTodoCategory &&
        !categories.includes(newTodoCategory)
      ) {
        setCategories([...categories, newTodoCategory]);
        setIsAddingNewCategory(false);
      }
    }
  };

  const updateTodo = (id: string, updates: Partial<TodoItem>) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates, updatedAt: new Date() } : todo
      )
    );
    setEditingTodo(null);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const getDateString = (date: Date) => {
    if (isToday(date)) return "today";
    if (isYesterday(date)) return "yesterday";
    return format(date, "MMM d");
  };

  const groupedTodos = todos.reduce((acc, todo) => {
    const dateString = getDateString(todo.createdAt);
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(todo);
    return acc;
  }, {} as Record<string, TodoItem[]>);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    return getDateString(date);
  });

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
