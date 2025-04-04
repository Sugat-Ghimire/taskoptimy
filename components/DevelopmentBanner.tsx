"use client";
import { X, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DevelopmentBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert
      variant="default"
      className="w-[400px] bg-white/90 backdrop-blur-sm border-yellow-600 shadow-lg"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
          <AlertDescription className="text-sm text-yellow-700">
            This application is under development.
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          className="h-6 w-6 hover:bg-yellow-50 ml-3 flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  );
}
