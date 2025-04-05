import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DevelopmentBanner } from "@/components/DevelopmentBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <div className="fixed bottom-0 right-0 p-4 ">
          <DevelopmentBanner />
        </div>
      </body>
    </html>
  );
}
