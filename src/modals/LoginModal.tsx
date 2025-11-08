"use client";

import { useState } from "react";
import { X, LogIn } from "lucide-react";
import axios from "axios";
import SignUpModal from "./SignUpModal";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (showSignUp) return <SignUpModal onClose={() => setShowSignUp(false)} />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");
  try {
    const res = await axios.post("http://localhost:5000/auth/login", formData);

    // Guardamos el usuario y el token correctamente
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: res.data.id,
        fullName: res.data.fullName,
        email: res.data.email,
      })
    );
    localStorage.setItem("token", res.data.token);

    console.log("✅ Usuario guardado en localStorage:", res.data);

    setMessage("✅ Login exitoso");
    setTimeout(() => onClose(), 1000);
  } catch (error: any) {
    console.error(error);
    setMessage(
      "❌ Error al iniciar sesión: " +
        (error.response?.data?.message || "Servidor no disponible")
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="relative w-[90%] max-w-md p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-lg">
        <button onClick={onClose} className="absolute top-4 right-4 hover:text-red-500 transition">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <LogIn className="w-10 h-10 mb-2" />
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm">Log in to continue using Wishcart</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          

          {message && <p className="text-sm text-center text-red-500">{message}</p>}

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

        <p className="text-sm text-center mt-5 text-gray-700 dark:text-gray-400">
          Don’t have an account?{" "}
          <button
            onClick={() => setShowSignUp(true)}
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
