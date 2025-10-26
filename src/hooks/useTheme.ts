"use client";

import { useEffect, useMemo, useState } from "react";

const ThemeProps = {
  key: "theme",
  light: "light",
  dark: "dark",
} as const;

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark;

export const useTheme = (defaultTheme: Theme = ThemeProps.light) => {
  // Estado del tema (se inicializa vacío hasta montar para evitar hydration errors)
  const [theme, setTheme] = useState<Theme | null>(null);

  // Detectar si está montado el componente (cliente)
  const [mounted, setMounted] = useState(false);

  // --- EFFECT 1: Leer el tema guardado en localStorage al montar
  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(ThemeProps.key) as Theme | null;
      const initialTheme = storedTheme || defaultTheme;

      // Aplicar la clase al <html>
      document.documentElement.classList.remove(ThemeProps.light, ThemeProps.dark);
      document.documentElement.classList.add(initialTheme);

      setTheme(initialTheme);
    }
  }, [defaultTheme]);

  // --- EFFECT 2: Cada vez que cambia el tema, sincronizarlo con el DOM y el localStorage
  useEffect(() => {
    if (!mounted || !theme) return;

    localStorage.setItem(ThemeProps.key, theme);
    document.documentElement.classList.remove(ThemeProps.light, ThemeProps.dark);
    document.documentElement.classList.add(theme);
  }, [theme, mounted]);

  // --- Helpers
  const isDark = useMemo(() => theme === ThemeProps.dark, [theme]);
  const isLight = useMemo(() => theme === ThemeProps.light, [theme]);

  const setLightTheme = () => setTheme(ThemeProps.light);
  const setDarkTheme = () => setTheme(ThemeProps.dark);
  const toggleTheme = () =>
    setTheme((prev) =>
      prev === ThemeProps.dark ? ThemeProps.light : ThemeProps.dark
    );

  return {
    theme,
    isDark,
    isLight,
    setLightTheme,
    setDarkTheme,
    toggleTheme,
    mounted,
  };
};
