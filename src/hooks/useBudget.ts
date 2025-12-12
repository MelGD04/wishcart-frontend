// src/hooks/useBudget.ts
import { useEffect, useState, useCallback } from "react";

export default function useBudget() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBalance = useCallback(async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user?.token) {
        setBalance(null);
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/budget", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (!res.ok) {
        setBalance(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      // Asegúrate de que tu backend devuelva { amount: number, ... }
      const amt = typeof data.amount === "number" ? data.amount : Number(data.amount || 0);
      setBalance(Number.isNaN(amt) ? 0 : amt);
    } catch (err) {
      console.error("Failed to fetch budget", err);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, loading, refresh: fetchBalance };
}
