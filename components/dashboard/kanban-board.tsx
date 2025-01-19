"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Header } from "./header";

const cardColors = {
  blue: "bg-blue-100 border-blue-300 hover:bg-blue-200",
  yellow: "bg-yellow-100 border-yellow-300 hover:bg-yellow-200",
  red: "bg-red-100 border-red-300 hover:bg-red-200",
  green: "bg-green-100 border-green-300 hover:bg-green-200",
  purple: "bg-purple-100 border-purple-300 hover:bg-purple-200",
  pink: "bg-pink-100 border-pink-300 hover:bg-pink-200",
};

interface KanbanCard {
  id: string;
  title: string;
  description: string;
  color: keyof typeof cardColors;
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

const defaultColumns: KanbanColumn[] = [
  { id: "todo", title: "To Do", cards: [] },
  { id: "inprogress", title: "In Progress", cards: [] },
  { id: "done", title: "Done", cards: [] },
];

export function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumn[]>(defaultColumns);
  const [editingColumnId, setEditingColumnId] = useState<string>("");
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string>("");
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newCardColor, setNewCardColor] =
    useState<keyof typeof cardColors>("blue");
  const [draggedCard, setDraggedCard] = useState<KanbanCard | null>(null);
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(
    null
  );
  const [editingCard, setEditingCard] = useState<KanbanCard | null>(null);
  const [isEditingCard, setIsEditingCard] = useState(false);

  const handleAddCard = (columnId: string) => {
    if (!newCardTitle.trim()) return;

    const newCard: KanbanCard = {
      id: uuidv4(),
      title: newCardTitle.trim(),
      description: newCardDescription,
      color: newCardColor,
    };

    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      )
    );

    setNewCardTitle("");
    setNewCardDescription("");
    setNewCardColor("blue");
    setIsAddingCard(false);
  };

  const handleDeleteCard = (columnId: string, cardId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((card) => card.id !== cardId) }
          : col
      )
    );
  };

  const handleEditCard = (columnId: string, card: KanbanCard) => {
    setEditingCard(card);
    setEditingColumnId(columnId);
    setNewCardTitle(card.title);
    setNewCardDescription(card.description);
    setNewCardColor(card.color);
    setIsEditingCard(true);
  };

  const handleUpdateCard = () => {
    if (!editingCard || !newCardTitle.trim() || !editingColumnId) return;

    setColumns(
      columns.map((col) =>
        col.id === editingColumnId
          ? {
              ...col,
              cards: col.cards.map((card) =>
                card.id === editingCard.id
                  ? {
                      ...card,
                      title: newCardTitle,
                      description: newCardDescription,
                      color: newCardColor,
                    }
                  : card
              ),
            }
          : col
      )
    );

    setIsEditingCard(false);
    setEditingCard(null);
    setEditingColumnId("");
    setNewCardTitle("");
    setNewCardDescription("");
    setNewCardColor("blue");
  };

  const handleDragStart = (card: KanbanCard) => {
    setDraggedCard(card);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDraggedOverColumn(columnId);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedOverColumn) {
      setDraggedCard(null);
      setDraggedOverColumn(null);
      return;
    }

    handleDrop(draggedOverColumn);
  };

  const handleDrop = (columnId: string) => {
    if (!draggedCard) return;

    const sourceColumn = columns.find((col) =>
      col.cards.some((card) => card.id === draggedCard.id)
    );

    if (!sourceColumn) return;

    if (sourceColumn.id !== columnId) {
      setColumns(
        columns.map((col) => {
          if (col.id === sourceColumn.id) {
            return {
              ...col,
              cards: col.cards.filter((card) => card.id !== draggedCard.id),
            };
          }
          if (col.id === columnId) {
            return {
              ...col,
              cards: [...col.cards, draggedCard],
            };
          }
          return col;
        })
      );
    }

    setDraggedCard(null);
    setDraggedOverColumn(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header activeSection="kanban Board" />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-center">
          <div className="flex gap-4 pb-4 overflow-hidden max-w-full">
            {columns.map((column) => (
              <div
                key={column.id}
                className={`flex-shrink-0 w-80 p-3 relative -mt-1 rounded-lg transition-colors duration-200 ${
                  draggedOverColumn === column.id
                    ? "bg-blue-50/50"
                    : "bg-transparent"
                }`}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(column.id);
                }}
              >
                <Card className="h-24 bg-white/70 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {column.title}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {column.cards.length} cards
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedColumnId(column.id);
                          setIsAddingCard(true);
                        }}
                        className="hover:bg-blue-50"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3 mt-5 min-h-[200px] overflow-visible">
                  <AnimatePresence>
                    {column.cards.map((card) => (
                      <motion.div
                        key={card.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ scale: 1.02 }}
                        className={`${
                          cardColors[card.color]
                        } p-4 rounded-lg shadow-lg group break-words ${
                          draggedCard?.id === card.id ? "opacity-50" : ""
                        }`}
                        draggable
                        onDragStart={() => handleDragStart(card)}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 mb-2 break-words">
                              {card.title}
                            </h4>
                            {card.description && (
                              <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                                {card.description}
                              </p>
                            )}
                          </div>

                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditCard(column.id, card);
                              }}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCard(column.id, card.id);
                              }}
                              className="h-8 w-8 p-0 hover:text-rose-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Card title"
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  className="focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Add a description..."
                  value={newCardDescription}
                  onChange={(e) => setNewCardDescription(e.target.value)}
                  className="w-full min-h-[100px] rounded-md p-2 focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <div className="flex gap-2">
                  {Object.entries(cardColors).map(([color, className]) => (
                    <button
                      key={color}
                      onClick={() =>
                        setNewCardColor(color as keyof typeof cardColors)
                      }
                      className={`w-8 h-8 rounded-full ${className} ${
                        newCardColor === color
                          ? "ring-2 ring-blue-600 scale-110"
                          : ""
                      } transition-all duration-200`}
                    />
                  ))}
                </div>
              </div>
              <Button
                onClick={() => handleAddCard(selectedColumnId)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Add Card
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditingCard} onOpenChange={setIsEditingCard}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={newCardDescription}
                  onChange={(e) => setNewCardDescription(e.target.value)}
                  className="w-full min-h-[100px] rounded-md p-2 focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <div className="flex gap-2">
                  {Object.entries(cardColors).map(([color, className]) => (
                    <button
                      key={color}
                      onClick={() =>
                        setNewCardColor(color as keyof typeof cardColors)
                      }
                      className={`w-8 h-8 rounded-full ${className} ${
                        newCardColor === color
                          ? "ring-2 ring-blue-500 scale-110"
                          : ""
                      } transition-all duration-200`}
                    />
                  ))}
                </div>
              </div>
              <Button
                onClick={handleUpdateCard}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Update Card
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
