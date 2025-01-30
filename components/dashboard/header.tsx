"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Bell, ChevronDown, Plus, Clock } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Header({ activeSection }: { activeSection: string }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleProfileClick = () => {
    router.push("/dashboard/profile");
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="flex items-center justify-between border-b bg-card p-4">
      {/* Left Section */}
      <motion.div
        className="relative flex items-center space-x-2 p-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
        ref={dropdownRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        whileHover={{
          scale: 1.005,
          transition: { duration: 0.2 },
        }}
      >
        <div className="absolute rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-50 blur-xl -z-10" />

        {activeSection === "dashboard" ? (
          <motion.h2
            className="text-2xl font-semibold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Welcome to TaskOptimy!
          </motion.h2>
        ) : activeSection === "kanban Board" ? (
          <div className="relative group">
            <motion.button
              className="flex items-center space-x-2 text-2xl font-semibold text-white capitalize"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{activeSection}</span>
              <motion.div
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
            {isDropdownOpen && (
              <motion.div
                className="z-[100] absolute left-0 mt-3 w-72 rounded-xl shadow-2xl bg-white/95 backdrop-blur-sm border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Search Section */}
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search boards..."
                      className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Boards List */}
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recent Boards
                  </div>

                  <div className="space-y-0.5 p-2">
                    {/* Board Item */}
                    <motion.button
                      className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gradient-to-r from-blue-50/80 to-purple-50/80 group transition-all"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-700 group-hover:text-gray-900">
                          Project Alpha
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Last viewed 2h ago
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </div>

                {/* Create New Board */}
                <div className="p-2 bg-gray-50/50 border-t border-gray-100">
                  <motion.button
                    className="flex items-center gap-2 w-full p-2 rounded-lg text-blue-600 hover:bg-blue-50/50 font-medium"
                    whileHover={{ x: 4 }}
                  >
                    <Plus className="w-5 h-5" />
                    Create New Board
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.h2
            className="text-2xl font-semibold text-white capitalize"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {activeSection}
          </motion.h2>
        )}
      </motion.div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <motion.div
          className="relative"
          initial={false}
          animate={{ width: isSearchOpen ? "auto" : 0 }}
        >
          <Input
            type="search"
            placeholder="Search..."
            className={`transition-all ${
              isSearchOpen ? "opacity-100 w-full" : "opacity-0 w-0"
            }`}
          />
        </motion.div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Authentication Section */}
        {status === "authenticated" ? (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src={session?.user?.image || "/vercel.svg"}
              alt={`${session?.user?.name}'s profile picture`}
              width={35}
              height={35}
              className="rounded-full"
            />
            <span className="font-medium">
              {" "}
              {session?.user?.name?.split(" ")[0]}
            </span>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={handleProfileClick}>
            <UserPlus className="h-4 w-4 mr-2" />
            Sign Up
          </Button>
        )}

        {/* Mode Toggle */}
        <ModeToggle />
      </div>
    </header>
  );
}
