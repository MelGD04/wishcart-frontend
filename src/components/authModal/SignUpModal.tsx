"use client";

import React, { JSX, useState } from "react";
import { X, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/axios";
import type { AuthUser } from "@/context/AuthContext";

interface RegisterModalProps {
  onClose: () => void;
  setShowLogin: (v: boolean) => void;
}

export default function RegisterModal({ onClose, setShowLogin }: RegisterModalProps): React.ReactElement {
  const { login } = useAuth();

  const [formData, setFormData] = useState<{ fullName: string; email: string; password: string }>({
    fullName: "",
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
      if (!formData.fullName || !formData.email || !formData.password) {
        throw new Error("All fields are required.");
      }

      // Call backend register
      const res = await api.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      const token = res.data?.access_token;
      if (!token) throw new Error("Invalid register response");

      const userToSave: AuthUser = {
        id: 0,
        fullName: formData.fullName,
        email: formData.email,
        token,
      };

      login(userToSave);
      onClose();
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyErr = error as any;
      const serverMessage = anyErr?.response?.data?.message || anyErr?.response?.data || null;
      const errMsg =
        serverMessage || (error instanceof Error ? error.message : String(error));
      setMessage(errMsg || "Registration failed");
    }

    setLoading(false);
  };

  // 👉 Cerrar clicando fuera
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
      <div
        className="
          relative w-[90%] max-w-md p-6 rounded-2xl shadow-2xl
          border border-gray-200 dark:border-zinc-700
          bg-white/80 dark:bg-zinc-900/90 backdrop-blur-lg
          transition-all duration-300 animate-popup
        "
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-red-500 transition"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Título */}
        <div className="flex flex-col items-center mb-6">
          <UserPlus className="w-10 h-10 mb-2" />
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm">Sign up to get started with Wishcart</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Full Name</label>
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Mensaje de estado */}
          {message && (
            <p className="text-sm text-center mt-2 text-red-500 dark:text-gray-300">
              {message}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                onClose();
                setShowLogin(true);
              }}
              className="
                px-4 py-2 text-sm rounded-full border border-gray-400
                hover:bg-gray-200 dark:hover:bg-zinc-800 transition
              "
            >
              Back to LogIn
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white
                rounded-full shadow-md transition disabled:opacity-50
              "
            >
              {loading ? "Registering..." : "SignUp"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
