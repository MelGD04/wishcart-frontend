/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores base personalizados
        light: {
          bg: "#f9fafb",     // fondo claro
          text: "#111827",   // texto oscuro
          accent: "#2563eb", // azul
        },
        dark: {
          bg: "#0f172a",     // fondo oscuro
          text: "#e2e8f0",   // texto claro
          accent: "#60a5fa", // azul claro
        },
      },
    },
  },
  plugins: [],
};
