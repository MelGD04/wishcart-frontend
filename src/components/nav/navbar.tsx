"use client";

import { useAuth } from "@/hooks/useAuth";

import { Sun, Moon, List, DollarSign, User, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import LoginModal from "@/components/authModal/LoginModal";
import SignUpModal from "@/components/authModal/SignUpModal";

export default function Navbar() {
  const router = useRouter();
  const { isDark, toggleTheme, mounted } = useTheme("dark");
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  if (!mounted) return null;

  const firstLetter = user?.email?.[0]?.toUpperCase() || "";



  const randomColor = () => {
    const colors = ["bg-blue-500", "bg-red-500", "bg-green-500", "bg-purple-500", "bg-yellow-500"];
    return colors[user ? user.id % colors.length : 0];
  };

  return (
    <>
      <nav
        className={`
          hidden md:flex
          fixed top-4 left-1/2 -translate-x-1/2
          w-[95%] max-w-5xl
          backdrop-blur-lg rounded-full shadow-2xl border border-white/10
          py-3 px-6 justify-between items-center z-50
          ${isDark ? "bg-white/10 text-gray-100" : "bg-black/20 text-gray-900"}
        `}
      >
        <h1
          onClick={() => router.push("/")}
          className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 cursor-pointer"
        >
          Wishcart
        </h1>

        <div className="flex gap-6 text-sm font-medium items-center">
          <button onClick={() => router.push("/products")} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            List
          </button>
          <button onClick={() => router.push("/budget")} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Budget
          </button>

          {/* Separador */}
          <div className="h-6 w-px bg-gray-400/30 mx-1" />

          {/* User/Login */}
          {user ? (
            <button
              onClick={logout}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${randomColor()} cursor-pointer`}
              title={`Cerrar sesión (${user.email})`}
            >
              {firstLetter}
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
          )}

          {/* Separador */}
          <div className="h-6 w-px bg-gray-400/30 mx-1" />

          {/* Tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-700/40 transition-colors"
            title="Cambiar tema"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>
        </div>
      </nav>

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} setShowSignUp={setShowSignUp} />
      )}

      {showSignUp && (
        <SignUpModal onClose={() => setShowSignUp(false)} setShowLogin={setShowLogin} />
      )}
    </>
  );
}
