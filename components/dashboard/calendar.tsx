"use client";

import { useState } from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { Header } from "./header";
import { v4 as uuidv4 } from "uuid";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
type Event = {
  id: string;
  title: string;
  date: Date;
  time?: string;
};
//primitive implementation of a calendar component
export default function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventTime, setNewEventTime] = useState("");

  const addEvent = () => {
    if (date && newEventTitle.trim()) {
      const newEvent: Event = {
        id: uuidv4(),
        title: newEventTitle.trim(),
        date: date,
        time: newEventTime,
      };
      setEvents([...events, newEvent]);
      setNewEventTitle("");
      setNewEventTime("");
    }
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const eventsForSelectedDate = events.filter(
    (event) => event.date.toDateString() === date?.toDateString()
  );

  return (
    <div className="flex flex-col h-screen">
      <Header activeSection="calendar" />
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <DayPicker
                mode="single"
                selected={new Date()}
                onSelect={setDate}
              />
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Events for {date?.toDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input
                    id="event-title"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="Enter event title"
                  />
                  <Label htmlFor="event-time">Event Time (optional)</Label>
                  <Input
                    id="event-time"
                    type="time"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                  />
                  <Button
                    onClick={addEvent}
                    className="w-full mt-2 bg-indigo-500 hover:bg-indigo-600"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Event
                  </Button>
                </div>
                <ScrollArea className="h-[300px] w-full rounded-md p-4 border">
                  <AnimatePresence>
                    {eventsForSelectedDate.length === 0 ? (
                      <p className="text-center text-gray-500">
                        No events scheduled for this day.
                      </p>
                    ) : (
                      <motion.ul className="space-y-2">
                        {eventsForSelectedDate.map((event) => (
                          <motion.li
                            key={event.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-between bg-secondary p-3 rounded-lg"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="h-4 w-4 rounded-full bg-primary mr-2"></span>
                              <span className="font-medium">{event.title}</span>
                              {event.time && (
                                <span className="text-sm text-gray-500">
                                  ({event.time})
                                </span>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEvent(event.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
