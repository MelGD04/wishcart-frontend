"use client";

import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  // ✅ Ahora incluimos `mounted` para evitar el hydration error
  const { isDark, toggleTheme, mounted } = useTheme("dark");

  // 🔒 Evitar render hasta que se monte el tema correctamente
  if (!mounted) return null;

  return (
    <nav
      className={`
        fixed top-4 left-1/2 -translate-x-1/2
        w-[95%] max-w-5xl
        backdrop-blur-xl text-white 
        rounded-full shadow-2xl border border-white/10
        py-3 px-6 flex justify-between items-center z-50
        transition-all duration-300
        ${isDark ? "bg-white/10" : "bg-black/30"}
      `}
    >
      {/* Logo */}
      <h1
        onClick={() => router.push("/")}
        className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 cursor-pointer"
      >
        Wishcart
      </h1>

      {/* Navegación */}
      <div className="flex gap-6 text-sm font-medium items-center">
        <a
          onClick={() => router.push("/products")}
          className="text-gray-800 dark:text-gray-200 hover:text-blue-600 cursor-pointer"
        >
          Lista
        </a>

        <a
          href="/budget"
          className="text-gray-800 dark:text-gray-200 hover:text-blue-600"
        >
          Presupuesto
        </a>

        <a
          onClick={() => setShowLogin(true)}
          className="text-gray-800 dark:text-gray-200 hover:text-blue-600 cursor-pointer"
        >
          Login
        </a>

        {/* Botón de tema */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-zinc-700/40 transition-colors"
          title="Cambiar tema"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>
      </div>

      {/* Modal de login */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </nav>
  );
}
