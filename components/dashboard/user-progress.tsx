"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Sparkles, Target } from "lucide-react";
//As of now, many components and features are just dummy and values are hardcoded,will try to implement them in future
export function UserProgress() {
  const progress = 75;
  const level = 7;
  const nextLevel = 8;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center justify-between">
          Your Progress
          <Badge variant="secondary" className="text-xs font-normal">
            <Sparkles className="h-3 w-3 mr-1" />
            Level {level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="w-full h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-primary" />
              <div>
                <div className="text-sm font-medium">Next Level</div>
                <div className="text-2xl font-bold">{nextLevel}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div>
                <div className="text-sm font-medium">Progress Rate</div>
                <div className="text-2xl font-bold">+7%</div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Recent Achievements</h4>
            <ul className="space-y-1">
              <li className="text-sm">• Completed 5 tasks in a day</li>
              <li className="text-sm">• Maintained a 7-day streak</li>
              <li className="text-sm">• Reached 80% efficiency</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
