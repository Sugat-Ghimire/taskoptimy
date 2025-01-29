"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Bell, ChevronDown, Plus } from "lucide-react";
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
                className="z-10 absolute left-0 mt-5 -ml-3 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black/5 overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2 space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-gray-500">
                    Your Boards
                  </div>

                  <motion.a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gradient-to-r from-blue-50 to-purple-50 group"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div>
                      <div className="font-medium">Project Board 1</div>
                      <div className="text-xs text-gray-500">
                        Last edited 2h ago
                      </div>
                    </div>
                  </motion.a>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 my-1" />

                  {/* Creates New Board Button */}
                  <motion.button
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 group"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span>Create New Board</span>
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
