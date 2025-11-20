// src/hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    // Mensaje claro para desarrollador si olvidaste envolver con el provider.
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
