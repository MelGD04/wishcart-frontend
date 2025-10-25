"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const { theme, setTheme } = useTheme();

 const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;


  return (
    <nav
      className="
        fixed top-4 left-1/2 -translate-x-1/2
        w-[95%] max-w-5xl
        dark:bg-white/10 bg-black/30 
        backdrop-blur-xl text-white 
        rounded-full shadow-2xl border border-white/10
        py-3 px-6
        flex justify-between items-center
        z-50
        transition-all duration-300
      "
    >
      {/* Logo */}
      <h1
        className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight cursor-pointer"
        onClick={() => router.push("/")}
      >
        Wishcart
      </h1>

      {/* Navegación */}
      <div className="flex gap-6 text-sm font-medium items-center">
        <a
          onClick={() => router.push("/products")}
          className="text-gray-800 dark:text-gray-200 hover:text-blue-600 transition cursor-pointer"
        >
          Lista
        </a>
        <a
          href="/budget"
          className="text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
        >
          Presupuesto
        </a>
        <a
          onClick={() => setShowLogin(true)}
          className="text-gray-800 dark:text-gray-200 hover:text-blue-600 transition cursor-pointer"
        >
          Login
        </a>

        {/* Botón de tema */}
        <button
           onClick={() => {
            console.log("🌗 Tema actual:", theme);
            const newTheme = theme === "light" ? "dark" : "light";
            console.log("🔄 Cambiando a:", newTheme);
            setTheme(newTheme);
          }}
          className="
            p-2 rounded-full
            bg-white/50 dark:bg-gray-800/60
            hover:scale-110 transition-transform
          "
          title="Cambiar tema"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-gray-300" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </button>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </nav>
  );
}

