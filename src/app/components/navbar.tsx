"use client";

import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  List,
  DollarSign,
  User,
  Home,
} from "lucide-react";
import { useState } from "react";
import LoginModal from "@/modals/LoginModal";

export default function Navbar() {
  const router = useRouter();
  const { isDark, toggleTheme, mounted } = useTheme("dark");
  const [showLogin, setShowLogin] = useState(false);

  if (!mounted) return null;

  return (
    <>
      {/* 🌐 NAVBAR DESKTOP */}
      <nav
        className={`
          hidden md:flex
          fixed top-4 left-1/2 -translate-x-1/2
          w-[95%] max-w-5xl
          backdrop-blur-lg rounded-full shadow-2xl border border-white/10
          py-3 px-6 justify-between items-center z-50
          transition-all duration-300
          ${isDark ? "bg-white/10 text-gray-100" : "bg-black/20 text-gray-900"}
        `}
      >
        {/* Logo */}
        <h1
          onClick={() => router.push("/")}
          className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 cursor-pointer"
          style={{ color: "var(--color-text-main)" }}
        >
          Wishcart
        </h1>

        {/* Navegación */}
        <div className="flex gap-6 text-sm font-medium items-center">
          <button
            onClick={() => router.push("/products")}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            List
          </button>

          <button
            onClick={() => router.push("/budget")}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Budget
          </button>

          <button
            onClick={() => setShowLogin(true)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Login
          </button>

          {/* Tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-700/40 transition-colors"
            title="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>
        </div>
      </nav>

      {/* 📱 NAVBAR SUPERIOR MÓVIL */}
      <nav
        className={`
          md:hidden fixed top-3 left-1/2 -translate-x-1/2
          w-[92%] max-w-sm
          flex justify-between items-center
          backdrop-blur-xl border border-white/10
          rounded-full shadow-md z-50 px-5 py-3
          ${isDark ? "bg-white/10 text-gray-100" : "bg-black/20 text-gray-900"}
        `}
      >
        <h1
          onClick={() => router.push("/")}
          className="text-lg font-extrabold text-blue-600 dark:text-blue-400 cursor-pointer"
        >
          Wishcart
        </h1>

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
      </nav>

      {/* 📱 TAB BAR INFERIOR MÓVIL */}
      <nav
        className={`
          md:hidden fixed bottom-3 left-1/2 -translate-x-1/2
          w-[95%] max-w-sm
          flex justify-around items-center
          backdrop-blur-xl border border-white/10
          rounded-2xl shadow-xl z-50 py-2
          ${isDark ? "bg-white/10 text-gray-100" : "bg-black/10 text-gray-900"}
        `}
      >
        {/* Home */}
        <button
          onClick={() => router.push("/")}
          className="flex flex-col items-center justify-center text-xs hover:text-blue-500 transition"
        >
          <Home className="w-5 h-5 mb-1" />
          <span>Home</span>
        </button>

        <div className="h-6 w-px bg-gray-400/30" />

        {/* List */}
        <button
          onClick={() => router.push("/products")}
          className="flex flex-col items-center justify-center text-xs hover:text-blue-500 transition"
        >
          <List className="w-5 h-5 mb-1" />
          <span>List</span>
        </button>

        <div className="h-6 w-px bg-gray-400/30" />

        {/* Budget */}
        <button
          onClick={() => router.push("/budget")}
          className="flex flex-col items-center justify-center text-xs hover:text-blue-500 transition"
        >
          <DollarSign className="w-5 h-5 mb-1" />
          <span>Budget</span>
        </button>

        <div className="h-6 w-px bg-gray-400/30" />

        {/* Profile/Login */}
        <button
          onClick={() => setShowLogin(true)}
          className="flex flex-col items-center justify-center text-xs hover:text-blue-500 transition"
        >
          <User className="w-5 h-5 mb-1" />
          <span>Profile</span>
        </button>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
