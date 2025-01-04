"use client";

import { useState } from "react";

import { ProgressGraph } from "./progress-graph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProgress } from "./user-progress";
import {
  CalendarDays,
  CheckCircle2,
  Target,
  Activity,
  TrendingUp,
  Users,
} from "lucide-react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

import { EisenhowerMatrix } from "./eisenhower-matrix";
import { Notes } from "./notes";
import { Todo } from "./todo";

//As of now, many components and features are just dummy,will try to implement them in future
//And layout needs improvement
function QuickStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed Tasks
                </p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Goals Achieved
                </p>
                <p className="text-2xl font-bold">4/5</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Current Streak
                </p>
                <p className="text-2xl font-bold">7 days</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Productivity Score
                </p>
                <p className="text-2xl font-bold">92%</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
//just dummy data and implementation for now!
function RecentActivities() {
  const activities = [
    {
      icon: CheckCircle2,
      text: "Completed project",
      time: "2 hours ago",
    },
    { icon: Target, text: "Set new quarterly goals", time: "Yesterday" },
    { icon: Users, text: "Team meeting", time: "7 days ago" },
    {
      icon: TrendingUp,
      text: "Increased productivity by 25%",
      time: "2 week ago",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-center space-x-3">
              <activity.icon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{activity.text}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="overflow-y-auto flex flex-col flex-1 overflow-hidden">
        {activeSection === "dashboard" && (
          <div className="sticky top-0 z-10 bg-background border-b opacity-95">
            <Header activeSection={activeSection} />
          </div>
        )}
        <main className="flex-1">
          {activeSection === "dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              <div className="lg:col-span-2 space-y-4">
                <ProgressGraph />
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <QuickStats />
                </div>
              </div>
              <div className="space-y-6">
                <UserProgress />
                <RecentActivities />
              </div>
            </div>
          )}

          {activeSection === "eisenhower-matrix" && <EisenhowerMatrix />}
          {activeSection === "notes" && <Notes />}
          {activeSection === "todo" && <Todo />}
        </main>
      </div>
    </div>
  );
}
