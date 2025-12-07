"use client";

import { useEffect, useState, useRef } from "react";
import { Trash, Wallet } from "lucide-react";

export default function BudgetPage() {
  const [amount, setAmount] = useState(0);
  const [movements, setMovements] = useState<any[]>([]);
  const [value, setValue] = useState("");

  const leftCardRef = useRef<HTMLDivElement>(null);
  const [leftCardHeight, setLeftCardHeight] = useState<number | null>(null);

  const fetchBudget = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.token) return;

    const res = await fetch("http://localhost:5000/budget", {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const data = await res.json();
    setAmount(data.amount);
    setMovements(data.movements);
  };

  const modify = async (type: "add" | "remove") => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.token) return;

    await fetch("http://localhost:5000/budget/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        type,
        amount: Number(value),
      }),
    });

    setValue("");
    fetchBudget();
  };

  const handleClearHistory = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.token) return;

    const res = await fetch("http://localhost:5000/budget/history", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to clear history");
      return;
    }

    // Vaciar el historial en el frontend
    setMovements([]);
  } catch (err) {
    console.error("Error clearing history:", err);
  }
};


  // Ajustar altura derecha según izquierda
  useEffect(() => {
    const updateHeight = () => {
      if (leftCardRef.current) {
        setLeftCardHeight(leftCardRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, [amount, value]);

  useEffect(() => {
    fetchBudget();
  }, []);

  return (
    <div className="w-[95%] pt-23 px-6 md:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-6 flex flex-col items-center text-center gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Budget</h1>
          <Wallet className="w-6 h-6 text-blue-600 animate-bounce" />
        </div>
        <p className="text-zinc-500 mb-10 text-lg">
          Track your available money, add or remove funds, and view your financial history.
        </p>
      </header>

      {/* Layout: two cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT CARD — Balance + Modify Money */}
        <div
          ref={leftCardRef}
          className="flex-1 flex flex-col gap-4 bg-zinc-900/30 dark:bg-white/10 backdrop-blur-md rounded-xl p-4"
        >
          <h2 className="text-2xl font-semibold mb-4">Current Balance</h2>

          <p className="text-4xl font-bold text-green-500 mb-8">${amount}</p>

          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 rounded-lg border bg-zinc-50 dark:bg-zinc-800 mb-5"
          />

          <div className="flex gap-4">
            <button
              onClick={() => modify("add")}
              className="flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow"
            >
              Add Money
            </button>

            <button
              onClick={() => modify("remove")}
              className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* RIGHT CARD - History */}
        <div
          className="flex-1 flex flex-col gap-4 bg-zinc-900/30 dark:bg-white/10 backdrop-blur-md rounded-xl p-4"
          style={{ height: leftCardHeight ?? "auto" }}
        >
            {/* Header con título + botón */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Transaction History</h2>
            <button
              onClick={() => handleClearHistory()}
              className="p-2 rounded-lg hover:bg-red-600/70 transition-colors"
              title="Clear History"
            >
              <Trash className="w-5 h-5 text-red-400 hover:text-white" />
            </button>
          </div>
          {/* Scrollable container */}
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {movements.map((m) => (
              <div
                key={m.id}
                className={`group relative w-full h-20 rounded-xl overflow-hidden font-sans flex flex-col isolate
                ${m.type === "add" ? "bg-green-900/70" : "bg-red-900/70"} border border-white/10`}
              >
                {/* Pseudo-elements */}
                <div className="absolute inset-[1px] rounded-xl bg-zinc-900/20 z-20"></div>
                <div
                  className={`absolute inset-y-2 left-2 w-1 rounded-sm z-40 transition-transform duration-300 ${
                    m.type === "add"
                      ? "bg-gradient-to-b from-green-400 via-green-500 to-green-600"
                      : "bg-gradient-to-b from-red-400 via-red-500 to-red-600"
                  } group-hover:translate-x-1`}
                ></div>

                {/* Glow effects */}
                <div className="absolute w-72 h-72 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_closest-side,_white,_transparent)] opacity-0 z-30 transition-opacity duration-300 group-hover:opacity-10"></div>
                <div className="absolute w-72 h-72 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_closest-side,_white,_transparent)] opacity-0 z-10 transition-opacity duration-300 group-hover:opacity-10"></div>

                {/* Text */}
                <div className="relative z-50 px-5 py-3 flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-white">
                      {m.type === "add" ? "Added" : "Withdrawn"}
                    </span>
                    <span className="text-gray-300 mt-1">${m.amount}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(m.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
