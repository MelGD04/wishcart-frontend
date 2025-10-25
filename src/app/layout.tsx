import "./globals.css";
import Navbar from "./components/navbar";

import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="
          bg-[rgba(255,255,255,0.1)]
          dark:bg-[rgba(0,0,0,0.6)]
          text-gray-900 dark:text-gray-100
          transition-colors duration-300
          min-h-screen w-full
        "
      >
       
        <Navbar/>
         <main className="min-h-screen w-full">{children}</main>

      </body>
    </html>
  );
}
