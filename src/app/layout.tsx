"use client";

import "./globals.css";
import Navbar from "./components/navbar";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen w-full">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {mounted && (
            <div className="min-h-screen w-full transition-colors duration-300">
              {/* Navbar */}
              <Navbar />

              {/* Contenido */}
              <main className="min-h-screen w-full bg-my-light-blue dark:bg-my-dark-gray text-gray-900 dark:text-gray-100">
                {children}
              </main>
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
