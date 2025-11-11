"use client";

import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import { Sun, Moon, List, DollarSign, User, Home } from "lucide-react";
import { useEffect, useState } from "react";
import LoginModal from "@/modals/LoginModal";

export default function Navbar() {
  const router = useRouter();
  const { isDark, toggleTheme, mounted } = useTheme("dark");
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<any>(null);

  //Colores aleatorios para los avatares
  const colors = [
    "#2563EB", // azul
    "#DC2626", // rojo
    "#059669", // verde
    "#9333EA", // violeta
    "#EA580C", // naranja
    "#EAB308", // amarillo
    "#DB2777", // rosado
  ];

  // Cargar usuario desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      setUser(null);
    }
  }, []);

  //Generar color basado en el email (para que sea consistente)
  const getColorForEmail = (email: string) => {
    const hash = email
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    return colors[Math.abs(hash) % colors.length];
  };

  if (!mounted) return null;

  return (
    <>
      {/*NAVBAR DESKTOP */}
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

          {/*Botón de Login o Avatar */}
          {user ? (
            <div
              className="flex items-center gap-2 cursor-pointer group"
              title={user.email}
              onClick={() => {
                if (confirm("¿Cerrar sesión?")) {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  setUser(null);
                }
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: getColorForEmail(user.email) }}
              >
                {user.email.charAt(0).toUpperCase()}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center border
                  ${isDark ? "border-gray-500/50" : "border-gray-800/50"}
                `}
              >
                <User className="w-4 h-4" />
              </div>
            </button>
          )}

          {/* Separador */}
          <div className="h-6 w-px bg-gray-400/30 mx-0.5" />

          {/* Botón para cambiar tema */}
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
      </nav>

      {/* 📱 NAVBAR SUPERIOR Y TAB BAR (sin cambios) */}
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

      {/* Modal de login */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
