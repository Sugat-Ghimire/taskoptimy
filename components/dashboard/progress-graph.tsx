"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//just dummy data for now!
const weeklyData = [
  { name: "Mon", tasks: 4, hours: 6, efficiency: 70 },
  { name: "Tue", tasks: 3, hours: 5, efficiency: 75 },
  { name: "Wed", tasks: 5, hours: 7, efficiency: 85 },
  { name: "Thu", tasks: 2, hours: 4, efficiency: 70 },
  { name: "Fri", tasks: 6, hours: 8, efficiency: 70 },
  { name: "Sat", tasks: 4, hours: 5, efficiency: 82 },
  { name: "Sun", tasks: 3, hours: 4, efficiency: 78 },
];

const monthlyData = [
  { name: "Week 1", tasks: 20, hours: 35, efficiency: 78 },
  { name: "Week 2", tasks: 25, hours: 40, efficiency: 82 },
  { name: "Week 3", tasks: 22, hours: 48, efficiency: 80 },
  { name: "Week 4", tasks: 28, hours: 42, efficiency: 85 },
];

export function ProgressGraph() {
  return (
    <Card className="w-full h-[450px]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Progress Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="h-[320px]">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly" className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weeklyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="tasks"
                  stroke="#8884d8"
                  name="Tasks Completed"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="hours"
                  stroke="#82ca9d"
                  name="Hours Worked"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#ffc658"
                  name="Efficiency (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly" className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="tasks"
                  stroke="#8884d8"
                  name="Tasks Completed"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="hours"
                  stroke="#82ca9d"
                  name="Hours Worked"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#ffc658"
                  name="Efficiency (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
