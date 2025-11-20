"use client";

import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "../components/nav/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

