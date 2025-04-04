"use client";
import { X, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SignInRequest() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  if (!isVisible) return null;

  return (
    <Alert
      variant="default"
      className="w-[400px] bg-white/90 backdrop-blur-sm border-blue-600 shadow-lg"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <AlertDescription className="text-sm text-blue-700">
            Sign in to use all features effectively.
          </AlertDescription>
        </div>
        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard/profile")}
            className="text-xs hover:bg-blue-50"
          >
            Sign in
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 hover:bg-blue-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Alert>
  );
}
