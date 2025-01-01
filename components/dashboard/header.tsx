"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Bell } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";

export function Header({ activeSection }: { activeSection: string }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b bg-card p-4">
      <div className="flex items-center space-x-4">
        {activeSection === "dashboard" && (
          <motion.h2
            className="text-2xl font-semibold text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to TaskOptimy!
          </motion.h2>
        )}
        {activeSection !== "dashboard" && (
          <h2 className="text-2xl font-semibold capitalize">{activeSection}</h2>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <motion.div
          className="relative"
          initial={false}
          animate={{ width: isSearchOpen ? "auto" : 0 }}
        >
          <Input
            type="search"
            placeholder="Search..."
            className={`w-full ${isSearchOpen ? "opacity-100" : "opacity-0"}`}
          />
        </motion.div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="sm">
          <UserPlus className="h-4 w-4 mr-2" />
          Sign Up
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}
