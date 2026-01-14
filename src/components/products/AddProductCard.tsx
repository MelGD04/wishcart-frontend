"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import AddProductModal from "@/modals/AddProductModal";

export default function AddProductCard({
  onAdd,
}: {
  onAdd?: (p: {
    name: string;
    price: string;
    priority: string;
    imageUrl?: string;
  }) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="
          relative
          w-[232px]
          h-[306px]
          rounded-xl
          border
          border-dashed
          border-zinc-300/50
          bg-white/10
          backdrop-blur-md
          cursor-pointer
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:bg-white/15
          flex
          items-center
          justify-center
          text-center
        "
      >
        <div className="flex flex-col items-center gap-2">
          <PlusCircle className="w-12 h-12 text-blue-500 opacity-80" />
          <span className="text-sm sm:text-base font-semibold text-zinc-700 dark:text-zinc-200">
            Add Product
          </span>
        </div>
      </button>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={(p) => onAdd?.(p)}
        />
      )}
    </>
  );
}
