"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";
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

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  label?: string;
  color?: string;
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
//primitive version of a kanban board
export function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumn[]>(defaultColumns);
  const [activeCard, setActiveCard] = useState<KanbanCard | null>(null);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [selectedColumnId, setSelectedColumnId] = useState<string>(""); // Add this
  const [draggedCard, setDraggedCard] = useState<KanbanCard | null>(null);
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(
    null
  );

  const handleAddCard = (columnId: string) => {
    if (!newCardTitle.trim()) return;

    const newCard: KanbanCard = {
      id: uuidv4(),
      title: newCardTitle.trim(),
    };

    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      )
    );

    setNewCardTitle("");
    setIsAddingCard(false);
  };

  const handleDragStart = (card: KanbanCard) => {
    setDraggedCard(card);
  };

  const handleDragOver = (columnId: string) => {
    setDraggedOverColumn(columnId);
  };

  const handleDrop = (columnId: string) => {
    if (!draggedCard) return;

    const sourceColumn = columns.find((col) =>
      col.cards.some((card) => card.id === draggedCard.id)
    );

    if (!sourceColumn) return;

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

    setDraggedCard(null);
    setDraggedOverColumn(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header activeSection="kanban" />
      <div className="max-w-7xl p-6 mx-auto">
        <div className="flex justify-center">
          <div className="flex gap-11 overflow-x-auto pb-5 max-w-full">
            {columns.map((column) => (
              <div
                key={column.id}
                className="flex-shrink-0 w-80"
                onDragOver={(e) => {
                  e.preventDefault();
                  handleDragOver(column.id);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(column.id);
                }}
              >
                <Card
                  className={`h-full ${
                    draggedOverColumn === column.id ? "bg-blue-50" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex mb-4 items-center justify-between">
                      <h3 className="font-semibold">{column.title}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedColumnId(column.id);
                          setIsAddingCard(true);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <AnimatePresence>
                        {column.cards.map((card) => (
                          <motion.div
                            key={card.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white p-3 rounded-lg shadow-sm cursor-move"
                            draggable
                            onDragStart={() => handleDragStart(card)}
                            onClick={() => setActiveCard(card)}
                          >
                            <h4 className="font-medium">{card.title}</h4>
                            {card.description && (
                              <p className="mt-1 text-sm text-gray-500">
                                {card.description}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <Input
              placeholder="Card title"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
            />
            <Button onClick={() => handleAddCard(selectedColumnId)}>
              Add Card
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
