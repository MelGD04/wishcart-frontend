"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import AddProductModal from "@/modals/AddProductModal";

export default function AddProductCard({
  onAdd,
}: {
  onAdd?: (p: { title: string; price: string; priority: string; imageUrl?: string }) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={
          "relative flex flex-col gap-3 p-3 sm:p-4 w-full rounded-xl shadow-lg border border-dashed cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        }
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
          boxShadow: `0 8px 20px var(--card-shadow)`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Top placeholder matches ProductCard image area so heights align */}
        <div className="relative z-10 w-full h-24 sm:h-28 md:h-32 bg-zinc-100 rounded-md overflow-hidden flex items-center justify-center">
          <PlusCircle className="w-10 h-10 text-blue-500 opacity-80" />
        </div>

        {/* Title area matches ProductCard title styling */}
        <div className="w-full text-sm sm:text-base font-semibold capitalize truncate text-center sm:text-left">
          Add New Product
        </div>
      </button>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={(p) => {
            if (onAdd) onAdd(p);
          }}
        />
      )}
    </>
  );
}

