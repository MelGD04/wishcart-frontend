"use client";

import { UserPlus, X } from "lucide-react";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function SignUpModal({ onClose }: { onClose: () => void }) {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) return <LoginModal onClose={() => setShowLogin(false)} />;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      {/* Contenedor principal del modal */}
      <div
        className="
          relative w-[90%] max-w-md p-6 rounded-2xl shadow-2xl
          border border-gray-200 dark:border-zinc-700
          bg-white/80 dark:bg-zinc-900/90 backdrop-blur-lg
          transition-all duration-300
        "
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            hover:text-red-500 transition
          "
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Título */}
        <div className="flex flex-col items-center mb-6">
          <UserPlus className="w-10 h-10 mb-2" style={{ color: "var(--color-text-main)" }}/>
          <h2 className="text-2xl font-bold">
            Create Account
          </h2>
          <p className="text-sm">
            Sign up to get started with Wishcart
          </p>
        </div>

        {/* Formulario */}
        <form className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">
                    Full Name
                </label>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="
                        px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700
                        bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    className="
                        px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700
                        bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">
                    Password
                </label>
                <input
                    type="text"
                    placeholder="••••••••"
                    className="
                        px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700
                        bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="
                px-4 py-2 text-sm rounded-full border border-gray-400
                hover:bg-gray-200 dark:hover:bg-zinc-800 transition
              "
            >
              Back to LogIn
            </button>
            <button
              type="submit"
              className="
                px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700
                text-white rounded-full shadow-md transition
              "
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
