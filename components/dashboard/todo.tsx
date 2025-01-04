"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  Clock,
  CheckCircle2,
  Plus,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { format, isSameDay, subDays } from "date-fns";
import { Header } from "./header";

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  timestamp: Date;
};

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

const priorityIcons = {
  low: Clock,
  medium: AlertCircle,
  high: CheckCircle2,
};

export function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] =
    useState<TodoItem["priority"]>("medium");
  const [activeTab, setActiveTab] = useState("today");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo.trim(),
          completed: false,
          priority: newPriority,
          timestamp: new Date(),
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const PriorityIcon = ({ priority }: { priority: TodoItem["priority"] }) => {
    const Icon = priorityIcons[priority];
    return <Icon className="h-4 w-4 mr-2" />;
  };

  const filterTodosByDate = (date: Date) => {
    return todos.filter((todo) => isSameDay(todo.timestamp, date));
  };

  const renderTodoList = (filteredTodos: TodoItem[]) => (
    <AnimatePresence>
      {filteredTodos.map((todo) => (
        <motion.li
          key={todo.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`flex items-center justify-between p-3 rounded-lg mb-2 ${
            priorityColors[todo.priority]
          }`}
        >
          <div className="flex items-center space-x-2 flex-grow">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            <div className="flex flex-col">
              <label
                htmlFor={`todo-${todo.id}`}
                className={`text-sm ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </label>
              <span className="text-xs text-gray-500">
                {format(todo.timestamp, "HH:mm")}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              <PriorityIcon priority={todo.priority} />
              {todo.priority}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTodo(todo.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.li>
      ))}
    </AnimatePresence>
  );

  return (
    <div className="flex flex-col h-screen">
      <Header activeSection="todo" />
      <div className="flex-grow overflow-y-hidden">
        <Card className="w-full max-w-2xl my-8 mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">
              Your tasks for today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-grow"
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
              <select
                value={newPriority}
                onChange={(e) =>
                  setNewPriority(e.target.value as TodoItem["priority"])
                }
                className="border rounded p-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <Button onClick={addTodo}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Tabs
              defaultValue="today"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="today">
                <ScrollArea className="h-[400px] w-full p-4 rounded-md border">
                  <motion.ul className="space-y-2">
                    {renderTodoList(filterTodosByDate(new Date()))}
                  </motion.ul>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="history">
                <ScrollArea className="h-[400px] w-full p-4 rounded-md border">
                  {[...Array(7)].map((_, index) => {
                    const date = subDays(new Date(), index + 1);
                    const filteredTodos = filterTodosByDate(date);
                    return (
                      <div key={index} className="mb-4">
                        <h3 className="text-sm font-semibold mb-2 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {format(date, "MMMM d, yyyy")}
                        </h3>
                        {filteredTodos.length > 0 ? (
                          <motion.ul className="space-y-2">
                            {renderTodoList(filteredTodos)}
                          </motion.ul>
                        ) : (
                          <p className="text-sm text-gray-500 italic">
                            No tasks for this day
                          </p>
                        )}
                      </div>
                    );
                  })}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
