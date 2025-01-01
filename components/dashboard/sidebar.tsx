"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  FileText,
  Grid,
  CheckSquare,
  ChevronLeft,
  Calendar,
  Settings,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: BarChart2, label: "Dashboard", id: "dashboard" },
  { icon: Grid, label: "Eisenhower Matrix", id: "eisenhower-matrix" },
  { icon: FileText, label: "Notes", id: "notes" },
  { icon: CheckSquare, label: "To Do", id: "todo" },
  { icon: Calendar, label: "Calendar", id: "calendar" },
];

export function Sidebar({ activeSection, setActiveSection }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      className={cn(
        "bg-gradient-to-b from-blue-500 to-blue-700 text-white flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-4">
        <motion.h1
          className={cn("text-xl font-semibold", isCollapsed && "hidden")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-slate-950">TaskOptimy</span>
        </motion.h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-white/10"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-white hover:bg-white/10",
                  activeSection === item.id && "bg-white/20"
                )}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
              </Button>
            </motion.li>
          ))}
        </ul>
      </nav>
      <div className="p-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10"
          onClick={() => setActiveSection("settings")}
        >
          <Settings className="mr-2 h-5 w-5" />
          {!isCollapsed && <span className="text-sm">Settings</span>}
        </Button>
      </div>
    </motion.aside>
  );
}
