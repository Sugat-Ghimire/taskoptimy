"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Trash2, Check, Plus } from "lucide-react";
import { Header } from "./header";

type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
};

const colors = [
  "bg-white",
  "bg-red-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-yellow-100",
  "bg-indigo-100",
  "bg-purple-100",
];
//just an primitive implementation of a notes section
export function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const newNoteRef = useRef<HTMLInputElement>(null);
  const [newNoteColor, setNewNoteColor] = useState(colors[0]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(
        JSON.parse(storedNotes, (key, value) =>
          key === "createdAt" || key === "updatedAt" ? new Date(value) : value
        )
      );
    }
  }, []);

  useEffect(() => {
    if (isAddingNote && newNoteRef.current) {
      newNoteRef.current.focus();
    }
  }, [isAddingNote]);

  const addNote = () => {
    if (newNoteTitle.trim() || newNoteContent.trim()) {
      const note: Note = {
        id: uuidv4(),
        title: newNoteTitle.trim(),
        content: newNoteContent.trim(),
        color: newNoteColor,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setNotes([note, ...notes]);
      setIsAddingNote(false);
      setNewNoteTitle("");
      setNewNoteContent("");
      setNewNoteColor(colors[0]);
    }
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(
      notes.map((note) =>
        note.id === updatedNote.id
          ? { ...updatedNote, updatedAt: new Date() }
          : note
      )
    );
    setActiveNote(null);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (activeNote?.id === id) {
      setActiveNote(null);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const NoteCard = ({ note }: { note: Note }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      className={`${note.color} rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer`}
      onClick={() => setActiveNote(note)}
    >
      {note.title && (
        <h3 className="font-semibold mb-1 line-clamp-1">{note.title}</h3>
      )}
      <p className="text-sm line-clamp-3">{note.content}</p>
      <div className="text-xs text-gray-500 mt-2">
        {format(note.updatedAt, "MMM d, yyyy HH:mm")}
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header activeSection="notes" />
      <div className="flex-grow overflow-hidden p-4">
        <div className="max-w-7xl mx-auto h-full flex flex-col space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow bg-white"
            />
            <Button
              onClick={() => setIsAddingNote(true)}
              className="bg-blue-500 hover:bg-indigo-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </div>
          <Card className="flex-grow overflow-hidden bg-white shadow-sm">
            <CardContent className="p-4 h-full">
              <ScrollArea className="h-full">
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  <AnimatePresence>
                    {filteredNotes.map((note) => (
                      <NoteCard key={note.id} note={note} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
      {(isAddingNote || activeNote) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3"
          onClick={() => {
            setIsAddingNote(false);
            setActiveNote(null);
            setNewNoteTitle("");
            setNewNoteContent("");
            setNewNoteColor(colors[0]);
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
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {!activeNote &&
                  colors.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full ${color} border border-gray-300`}
                      onClick={() => setNewNoteColor(color)}
                    />
                  ))}
              </div>
              <div className="flex space-x-2">
                {activeNote && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNote(activeNote.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
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
