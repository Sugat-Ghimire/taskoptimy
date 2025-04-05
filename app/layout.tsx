import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

import "./globals.css";
import { DevelopmentBanner } from "@/components/DevelopmentBanner";
const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaskOptimy",
  description:
    "TaskOptimy is a smart task management app that helps you prioritize, organize, and optimize your workflow using the Eisenhower Matrix and Kanban board.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className}`}>
        {children}
        <div className="fixed bottom-0 right-0 p-4 ">
          <DevelopmentBanner />
        </div>
      </body>
    </html>
  );
}
