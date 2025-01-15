"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Check, Search, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Header } from "./header";

type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
};

const colors = [
  "bg-gray-50",
  "bg-red-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-yellow-100",
  "bg-indigo-100",
  "bg-purple-300",
];

const categories = ["Personal", "Work", "Ideas", "Tasks", "Other"];

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const newNoteRef = useRef<HTMLInputElement>(null);
  const [newNoteColor, setNewNoteColor] = useState(colors[0]);
  const [noteCategory, setNoteCategory] = useState<string>("Personal");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/api/notes");
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    if (isAddingNote && newNoteRef.current) {
      newNoteRef.current.focus();
    }
  }, [isAddingNote]);
  const addNote = async () => {
    if (!newNoteTitle.trim() && !newNoteContent.trim()) return;

    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newNoteTitle,
        content: newNoteContent,
        color: newNoteColor,
        category: noteCategory,
      }),
    });

    if (response.ok) {
      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      setNewNoteTitle("");
      setNewNoteContent("");
      setNoteCategory("Personal");
      setIsAddingNote(false);
    }
  };

  const updateNote = async (updatedNote: Note) => {
    try {
      const response = await fetch(`/api/notes/${updatedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedNote,
          category: updatedNote.category,
          updatedAt: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note in the database");
      }

      // Update the note locally
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id
            ? { ...note, ...updatedNote, updatedAt: new Date() }
            : note
        )
      );

      setActiveNote(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      } else {
        throw new Error(data.message || "Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());

    return selectedCategory === "All"
      ? matchesSearch
      : matchesSearch && note.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <Header activeSection="Notes" />
        <div className="max-w-7xl mx-auto p-6 space-y-4">
          {/* Search and Add Note Bar */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              onClick={() => setIsAddingNote(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Note
            </Button>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex gap-2 flex-wrap"
          >
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              onClick={() => setSelectedCategory("All")}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scrollable Notes Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200">
          <CardContent className="p-6">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <LayoutGroup>
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <AnimatePresence>
                    {filteredNotes.map((note) => (
                      <motion.div
                        key={note.id}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ y: -5 }}
                        className={`rounded-xl shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden ${note.color}`}
                      >
                        <div className="flex flex-col p-4 h-full">
                          <h3 className="font-semibold text-lg mb-2">
                            {note.title}
                          </h3>
                          <p className="text-gray-600 flex-1 line-clamp-3">
                            {note.content}
                          </p>
                          <div className="mt-4 pt-4 border-t border-gray-200/50 flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              {format(note.updatedAt, "MMM dd, yyyy")}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:text-blue-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveNote(note);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:text-red-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNote(note.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </LayoutGroup>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {(isAddingNote || activeNote) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 p-3 flex items-center justify-center"
          onClick={() => {
            setIsAddingNote(false);
            setActiveNote(null);
            setNewNoteTitle("");
            setNewNoteContent("");
            setNewNoteColor(newNoteColor);
            setNoteCategory("Personal");
          }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className={`${
              activeNote ? activeNote.color : newNoteColor
            } w-full p-6 max-w-md  rounded-lg shadow-xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              value={activeNote ? activeNote.title : newNoteTitle}
              onChange={(e) =>
                activeNote
                  ? setActiveNote({ ...activeNote, title: e.target.value })
                  : setNewNoteTitle(e.target.value)
              }
              placeholder="Title"
              className="border-none font-semibold text-xl focus:outline-none mb-2 w-full"
              ref={newNoteRef}
            />
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 ml-1 mb-2 block">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      (activeNote ? activeNote.category : noteCategory) ===
                      category
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      if (activeNote) {
                        setActiveNote({ ...activeNote, category: category });
                      } else {
                        setNoteCategory(category);
                      }
                    }}
                    className={`rounded-full ${
                      (activeNote ? activeNote.category : noteCategory) ===
                      category
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <textarea
              value={activeNote ? activeNote.content : newNoteContent}
              onChange={(e) =>
                activeNote
                  ? setActiveNote({ ...activeNote, content: e.target.value })
                  : setNewNoteContent(e.target.value)
              }
              placeholder="Take a note..."
              className="w-full bg-transparent text-sm focus:outline-none resize-none mb-4"
              rows={6}
            />
            <div className={`flex justify-between items-center`}>
              <div
                className={`                
                flex space-x-2     
                `}
              >
                {!activeNote &&
                  colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewNoteColor(color)}
                      className={`h-8 w-8 rounded-full ${color} transition-all duration-200 ${
                        newNoteColor === color
                          ? "ring-2 ring-blue-500 scale-110"
                          : ""
                      }`}
                    />
                  ))}
              </div>
              <div className="flex space-x-2">
                {activeNote && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveNote(activeNote);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(activeNote.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (activeNote) {
                      updateNote(activeNote);
                    } else {
                      addNote();
                    }
                  }}
                >
                  <Check className="h-4 w-4 mr-1" />{" "}
                  {activeNote ? "Save" : "Add"}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
