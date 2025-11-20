"use client";

import React, { useState } from "react";
import { X, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { AuthUser } from "@/context/AuthContext";

interface LoginModalProps {
  onClose: () => void;
  setShowSignUp?: (v: boolean) => void;
}

export default function LoginModal({ onClose, setShowSignUp }: LoginModalProps): React.ReactElement {
  const { login } = useAuth();

  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 🔥 Aquí simulas login. Reemplaza por tu API real después.
      if (formData.email === "" || formData.password === "") {
        throw new Error("Please enter your email and password.");
      }

      // Resultado simulado
      const fakeUser: AuthUser = {
        id: 1,
        fullName: "Demo User",
        email: formData.email,
      };

      login(fakeUser); // ⬅️ Actualiza el context
      onClose(); // Cierra modal
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      setMessage(errMsg || "Login failed");
    }

    setLoading(false);
  };

  // 👉 para cerrar si clicas afuera del modal
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === "modal-bg") onClose();
  };

  return (
    <div
      id="modal-bg"
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
    >
      <div className="relative w-[90%] max-w-md p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-lg animate-popup">
        
        {/* ❌ Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-red-500 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <LogIn className="w-10 h-10 mb-2" />
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm">Log in to continue using Wishcart</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Error message */}
          {message && (
            <p className="text-sm text-center text-red-500">{message}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-full border border-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-5 text-gray-700 dark:text-gray-400">
          Don’t have an account?{" "}
          <button
            onClick={() => {
              onClose();
              if (typeof setShowSignUp === "function") setShowSignUp(true);
            }}
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
