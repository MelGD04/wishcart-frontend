"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import AddProductModal from "@/modals/AddProductModal";

export default function AddProductCard({
  onAdd,
}: {
  onAdd?: (p: { title: string; price: string; priority: string }) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="
          relative flex flex-col items-center justify-center gap-3
          p-3 sm:p-4 w-full
          rounded-xl shadow-lg hover:shadow-2xl
          border border-dashed cursor-pointer
          transition-all duration-300 hover:scale-[1.02]
        "
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
          boxShadow: `0 8px 20px var(--card-shadow)`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <PlusCircle className="w-10 h-10 text-blue-500 opacity-70" />
        <span className="text-sm sm:text-base font-medium opacity-80">
          Add New Product
        </span>
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

